import Utils from "../../utils";
import { searchProducts } from "../../utils/event/action";
import request from "../../utils/request";
import { hideLoader, hideSkeleton } from "../home/actions";



export function getProductList(params: any, filter: boolean, callback?: Function, mobile?: any, callBack1?: any) {
  return (dispatch: any, getState: any) => {
    let data = { page: 1, limit: 12, ...params };
    let searchQuery = params.query;
    let url = Utils.endPoints.PRODUCT_LIST + '?data=' + encodeURIComponent(JSON.stringify(data));
    let str = encodeURI(url);
    request.get(str).then((resp) => {
      // request.post(url,data).then((resp) => {

      let data: any = resp?.data?.data ? { ...resp?.data?.data } : {}
      if (mobile?.data && data?.products?.data?.length > 0)
        data.products.data = [...mobile.data, ...data?.products?.data]
      data = { ...data };
      if (filter)
        dispatch({
          type: "product-filter",
          payload: resp?.data?.data?.filters?.data,
        });
      if (callback) {
        callback(resp)
      }
      dispatch({
        type: 'getProductList',
        payload: { ...data }
      });
      let eventPayload = {
        SearchKey: searchQuery,
        NoOfSearchResults: data.products.data?.length,
        NoOfOutofStock: data.products.data?.filter((item: any) => !item.isInStock)?.length,
        FromScreen: "Search",
        ClickBehaviour: "Search Result",
      };
      if(searchQuery)searchProducts(eventPayload);

    })
      .catch((err) => {
        if (callBack1) {
          callBack1();
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert", payload: {
                type: "error",
                message: err.response.data.message
              }
            })
        }
        else {
          dispatch(hideLoader())
          dispatch(hideSkeleton());

          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert", payload: {
                type: "error",
                message: err.response.data.message
              }
            })
        }
      });
  };
}

export function getPLPCategories(params?: any) {
  return request.get(Utils.endPoints.PLP_CATEGORY, { params: { limit: 20, page: 1, ...params } })
}
