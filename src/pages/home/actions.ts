import Utils from "../../utils";
import ActionName from "../../utils/actionName"
import request from "../../utils/request";

export function showSkeleton() {
  return { type: ActionName.SKELETON_LOADING, payload: { skeletonLoader: true } }
}
export function hideSkeleton() {
  return { type: ActionName.SKELETON_LOADING, payload: { skeletonLoader: false } }
}

export function showLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: true } }
}
export function hideLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: false } }
}

export function showPaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: true } }
}
export function hidePaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: false } }
}


export const getConfig = (payload: any) => {
  return (dispatch: any, setState: any) => {
    request.get(Utils.endPoints.CONFIG, { params: payload }).then((resp) => {
      if (payload.configCode === 'general') {
        localStorage.setItem("underMaintenance", resp.data.data.underMaintenance)
        dispatch({
          type: "setConfig",
          payload: { generalConfigs: resp.data.data },
        });
      } else {
        dispatch({
          type: "setConfig",
          payload: { paymentConfigs: resp.data.data },
        });
      }
    })
  }
}


export const getLatestReviews = (query: string) => {
  return request.get(Utils.endPoints.LATEST_REVIEWS + query)
}


// const convertObjToArray = (data: any) => {
//   const arr: any = [];

//   if (Object.keys(data)?.length > 0) {
//     const keysArr = Object.keys(data)
//     const sortedKeys = keysArr?.sort((a: string, b: string) => {
//       const no1 = a.split('_')?.length > 1 && a.split('_')[1] ? Number(a.split('_')[1]) : 0;
//       const no2 = b.split('_')?.length > 1 && b.split('_')[1] ? Number(b.split('_')[1]) : 0
//       return no1 - no2
//     })
//     sortedKeys.forEach((key: string) => {
//       arr.push(data[key])
//     })

//   }
//   return arr;
// }
const filterDataForWeb = (data: any) => {
  const webData = data.filter((obj: any) => obj.ui_type === 'web' || obj.ui_type === 'both')
  return webData;
}
const filterDataForMobile = (data: any) => {
  const mobileData = data.filter((obj: any) => obj.ui_type === 'mobile' || obj.ui_type === 'both')
  return mobileData;
}

export const getHomeData = (callback?: Function) => {
  return (dispatch: any, getState: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.HOME
    request.get(url).then((resp) => {
      if (resp) {
        // all data
        const data = [...resp?.data?.data];
        // web home data
        // const arr = convertObjToArray(data)
        const webData = filterDataForWeb(data);
        const sortedData = webData.sort((a: any, b: any) => {
          return Number(a.position) - Number(b.position)
        })
        dispatch({
          type: 'getHomeData',
          payload: [...sortedData]
        });

        // mobile home data
        const mobileData = filterDataForMobile(data);
        const sortedMobileData = mobileData.sort((a: any, b: any) => {
          return Number(a?.position) - Number(b?.position)
        });
        dispatch({
          type: 'getMobileHomeData',
          payload: [...sortedMobileData]
        });
        if (callback) {
          callback(resp?.data?.data)
        }
      }
      // else{
      //   dispatch(hideLoader());
      //   dispatch(hideSkeleton())
      // }
      // dispatch(hideLoader())
    })
      .catch((err) => {
        dispatch(hideSkeleton())
        // dispatch({
        //   type: "show-alert",
        //   payload: {
        //     type: "error",
        //     message: "Something went wrong",
        //   },
        // });
      });
  };
}

export const getRatingData = (query: string, callback: Function) => {
  return (dispatch: any, getState: any) => {
    let url = Utils.endPoints.RATE_ORDERS
    request.get(url + query).then((resp) => {
      if (callback) {
        callback(resp?.data?.data)
      }
    })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton())
      });
  };
}



export const getTopSearch = () => {
  let url = Utils.endPoints.TOP_SEARCH

  return request.get(url)
}
export const userSearch = (params: any) => {
  let url = Utils.endPoints.USER_SEARCH
  return request.get(url, { params })
}