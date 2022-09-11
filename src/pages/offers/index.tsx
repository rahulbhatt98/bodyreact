import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import { useHistory } from "react-router";
import Utils from "../../utils";
import { hideSkeleton, showSkeleton } from "../home/actions";
import { getOffers } from "./action";
import AllOffers from "./allOffers";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
import Banner from "./banner";
import { AllOffersSkeleton } from "../../components/common/skeletonList/allOffers";
import { Skeleton } from "@mui/material";
import { ReducersModal } from "../../models";
import { Hidden } from "@material-ui/core";

function BankOffer(props: any) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ content: [] });
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(showSkeleton());
    dispatch(
      getOffers((resp: any) => {
        setData(resp || []);
        dispatch(hideSkeleton());
      })
    );

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_OFFERS,
      CTGenerated: "WEB"
    })



  }, []);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  const { menuData } = useSelector((state: ReducersModal) => {
    return state.homeReducer
  });


  const navigateTo = (item: any) => {
    if (item.url_type && item.id && (item.type.toLowerCase() !== "store offer" && item.type.toLowerCase() !== "store offers")) {
      if (item.url_type === "product") {
        let pathname = Utils.CommonFunctions.seoUrl(item, "others").replace("/c/", "/p/")
        history.push(pathname)
        // history.push(
        //   Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL, {
        //     ":id": item?.id,
        //   })
        // );
      }
      else if (item.url_type === "category") {
        let pathname = Utils.CommonFunctions.seoUrl(item, "others")
        history.push(pathname)
        // history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${item.id}`);
      }
    } else if (item.type && (item.type.toLowerCase() === "store offer" || item.type.toLowerCase() === "store offers")) {
      history.push(`/stores`);
    } else {
      // history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${3}`);
      let pathname = Utils.CommonFunctions.seoUrl(menuData?.[0], "others")
      history.push(pathname);
    }
  };
  // const promotionalProduct = {}
  // = data?.find((data: any) => data.block_key === "promotional_products");

  return (
    <div>
      <Helmet>
        <title>Offers | The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {
        skeletonLoader ?
          <>
            <Skeleton variant="rectangular" height={400} />
            <AllOffersSkeleton />
          </>
          :
          <>
            <Hidden xsDown>
              <Banner navigateTo={navigateTo} promotionalProduct={data} />
            </Hidden>
            <AllOffers promotionalProduct={data} data={data?.content || []} navigateTo={navigateTo} />
          </>
      }
    </div>
  );
}

export default BankOffer;
