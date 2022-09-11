import Utils from "../../utils";
import request from "../../utils/request";
import { hideLoader, hideSkeleton } from "../home/actions";

export const getPageData = (slug: string, callback?: Function) => {
      return (dispatch: any) => {
      let url = `${Utils.endPoints.PAGE}/${slug}`
      request
        .get(url)
        .then((resp) => {
            if (callback)
              callback(resp?.data?.data || {})
          
          // dispatch({
          //   type: "eGiftCard",
          //   payload: resp.data?.data,
          // });
        })
        .catch((err) => {
          if (callback) callback();
          dispatch(hideLoader())
          dispatch(hideSkeleton())
        });
    };
  };