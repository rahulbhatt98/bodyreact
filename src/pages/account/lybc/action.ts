import Utils from "../../../utils";
import { updateProfile } from "../../../utils/event/action";
import request from "../../../utils/request";
import { hideLoader, hideSkeleton } from "../../home/actions";

export const getVouchers = (callback?: Function) => {
    return (dispatch: any, getState: any) => {
        let url = Utils.endPoints.VOUCHERS
        request
            .get(url)
            .then((resp) => {
                if (callback)
                    callback(resp?.data?.data || {})
            })
            .catch((err) => {
                dispatch(hideSkeleton());
                dispatch(hideLoader());
                if (callback)
                    callback()
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
};

export const getRedeemGv = (payload: { gvCode: string, amount: string }, callback?: Function) => {
    return (dispatch: any, getState: any) => {
        let url = Utils.endPoints.REDEEM_GV
        request
            .post(url, payload)
            .then((resp) => {
                if (callback)
                    callback(resp?.data?.data || {})
            })
            .catch((err) => {
                dispatch(hideSkeleton());
                dispatch(hideLoader());
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
};

export const verifyGv = (payload: any, callback?: Function) => {
    return (dispatch: any, getState: any) => {
        let url = Utils.endPoints.VERIFY_GV
        request
            .post(url, payload)
            .then((resp) => {
                if (callback)
                    callback(resp?.data?.data || {})
                dispatch(hideLoader())
            })
            .catch((err) => {
                dispatch(hideSkeleton());
                dispatch(hideLoader());
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
};

export const unblockGv = (payload: any, callback?: Function) => {
    return (dispatch: any, getState: any) => {
        let url = Utils.endPoints.UNBLOCK_GV
        request
            .post(url, payload)
            .then((resp) => {
                if (callback)
                    callback(resp?.data?.data || {})
            })
            .catch((err) => {
                dispatch(hideSkeleton());
                dispatch(hideLoader());
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
};


/* store offer details **/
export const getTierDetails = (query: object, callback?: Function) => {
    return (dispatch: any) => {
        let url = Utils.endPoints.TIER_OFFER_LIST
        request
            .get(url, { params: query })
            .then((resp) => {
                callback && callback(resp?.data?.data || {})
            })
            .catch((err) => {
                dispatch(hideSkeleton());
                dispatch(hideLoader());
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
};
export const updateTier = (payload: object) => {
    let url = Utils.endPoints.UPDATE_TIER
    return request.put(url, payload)
};


export const getGatewayOrderId = (payload: object) => {
    let url = Utils.endPoints.GATEWAY_ORDER_ID
    return request.post(url, payload)
};


export function getDashboardData(callback?: Function) {
    return (dispatch: any) => {
        let url = Utils.endPoints.DASHBOARD;
        request
            .get(url)
            .then((resp) => {
                dispatch(hideLoader())
                if (callback)
                    callback()
                dispatch({
                    type: 'dashboard',
                    payload: resp?.data?.data ? { ...resp?.data?.data } : {}
                })
                updateProfile('total_spend_value', resp?.data?.data?.TotalSpends)
            })
            .catch((err) => {
                dispatch(hideLoader())
                if (err?.response?.data?.statusCode == 205) {
                    syncDashboard()
                }
                if (callback)
                    callback()
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
}



const syncDashboard = () => {
    let url = Utils.endPoints.SYNC_ER;
    return request.post(url)
}

export function getRewardHistory(query: string, callback?: Function) {
    return (dispatch: any) => {
        let url = Utils.endPoints.REWARD_HISTORY + query
        request
            .get(url)
            .then((resp) => {
                // dispatch(hideLoader())
                if (callback)
                    callback(resp?.data?.data || {})
            })
            .catch((err) => {
                // dispatch(hideLoader())
                dispatch(hideSkeleton())
                if (callback)
                    callback()
                if (err?.response?.data?.message)
                    dispatch({
                        type: "show-alert", payload: {
                            type: "error",
                            message: err.response.data.message
                        }
                    })
            });
    };
}