import { makeStyles, createStyles, Theme, Hidden } from "@material-ui/core";
import { Helmet } from 'react-helmet';
// ************************ components *****
import Banner from "./banner";
import DiscoverMore from "./discoverMore";
import DoYouThink from "./doYouThink";
import FindOutMore from "./findOutMore";
import HaveYouSeen from "./haveYouSeen";
import DoubleCard from "../../components/doubleCard";
import Testimonial from "./testimonial";
import MoreToShop from "./moreToShop";
import Recommended from "./recommended";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import { saveLocationHistory } from "../../components/breadCrumb/action";
import { useHistory } from "react-router";
import Utils from "../../utils";
import { getConfig, getRatingData } from "./actions";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
import { HomeSkeletonList } from "../../components/common/skeletonList/homeSkeletonList";
import HomeMobileView from "./mobileView";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeRoot: {

      maxWidth: "1920px",
      margin: "0 auto"

    },
    skeleton: {
      margin: theme.spacing(2, 0)
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const homeData = useSelector((state: ReducersModal) => state.homeReducer.homeData)
  const dispatch = useDispatch()
  const history = useHistory()


  // useEffect(() => {
  //   dispatch(getHomeData())
  // }, [])

  // const bannerData = homeData?.find((data: any) => data?.block_key === "promotional_banner")
  // const promotionalProduct = homeData?.find((data: any) => data?.block_key === "promotional_products")
  // const giftData = homeData?.find((data: any) => data?.block_key === "gift_block")
  // const haveYouSeenData = homeData?.find((data: any) => data?.block_key === "have_seen")
  // const shareLoveData = homeData?.find((data: any) => data?.block_key === "share_love")
  // const tipsAdvicesData = homeData?.find((data: any) => data?.block_key === "tips_block")
  // const testimonialData = homeData?.find((data: any) => data?.block_key === "testimonial_block")
  // const recommendedProducts = homeData?.find((data: any) => data?.block_key === "recommended_products");
  // const moreToShopData = homeData?.find((data: any) => data?.block_key === "more_shop")
  const [ratingData, setRatingData] = useState([])
  const [sortedHomedata, setSortedHomedata] = useState<any>([])
  const getRateOrdersData = () => {
    dispatch(getRatingData('?page=1&limit=10', (resp: any) => {
      setRatingData(resp?.data || [])
    }))
  }

  useEffect(() => {
    let breadCrumbData = [
      {
        title: "Home",
        action: "/",
      },
    ];
    dispatch(saveLocationHistory(breadCrumbData));
    getRateOrdersData();

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_HOME,
      CTGenerated: "WEB"
    })
    dispatch(getConfig({ configCode: "general" }));



  }, []);

  useEffect(() => {
    const promotionalProduct = homeData?.find((data: any) => data?.block_key === "promotional_products")
    const giftData = homeData?.find((data: any) => data?.block_key === "gift_block")
    const haveYouSeenData = homeData?.find((data: any) => data?.block_key === "have_seen")
    const testimonialData = homeData?.find((data: any) => data?.block_key === "testimonial_block")
    const recommendedProducts = homeData?.find((data: any) => data?.block_key === "recommended_products");
    const productReviews = homeData?.find((data: any) => data?.block_key === "product_reviews")
    const shareLoveData = homeData?.find((data: any) => data?.block_key === "share_love");
    const moreToShopData = homeData?.find((data: any) => data?.block_key === "more_shop")
    const tipsAdvicesData = homeData?.find((data: any) => data?.block_key === "tips_block")

    const arr = [promotionalProduct, giftData, haveYouSeenData, testimonialData, recommendedProducts, productReviews, shareLoveData, moreToShopData, tipsAdvicesData]
    const sortedMobileHomeData = arr.sort((a: any, b: any) => {
      return Number(a?.position) - Number(b?.position)
    })
    setSortedHomedata(sortedMobileHomeData)
  }, [homeData]);

  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === 'product') {
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others").replace("/c/", "/p/")
        history.push(pathname)
        // history.push(Utils.CommonFunctions.replaceUrlParams(
        //   Utils.routes.PRODUCT_DETAIL,
        //   { ":id": item?.entity_id }
        // ))
      }
      else if (item.entity === 'offers') {
        history.push({ pathname: '/offers', search: `?offer=${item?.entity_id}` ,state: { pageName: "Offers" } });
      }
      else if (item.entity === "url") {
        window.open(item?.entity_id);
      }
      else if (item.entity === "page") {
        if (item.entity_id === "about")
          history.push({ pathname: '/about-us', state: { pageName: "About" } });
        else if (item.entity_id === "terms")
          history.push({ pathname: '/terms-conditions', state: { pageName: "Terms And Conditions" } });
        else if (item.entity_id === "policy")
          history.push({ pathname: '/privacy-policy', state: { pageName: "Privacy Policy" } });
        else if (item.entity_id === "gift-card") {
          history.push({ pathname: '/gift-card', state: { pageName: "Gift Card" } });
        }
        else if (item.entity_id === "faq")
          history.push({ pathname: '/faq', state: { pageName: "FAQ's" } });
        else if (item.entity_id === "stores")
          history.push({ pathname: '/stores', state: { pageName: "Find Stores" } });
        else
          history.push('/' + item?.entity_id);
        // }
        // else
        //   history.push('/' + item?.entity_id);

      }
      else if (item.entity === "category") {
        // const path = `${Utils.routes.PRODUCT_LIST}`;
        // history.push({ pathname: path, search: `?categoryId=${item.entity_id}`, state: { fromPath: "home" } });
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others")
        history.push({ pathname, state: { fromPath: "home" } })

      }
    }
  }
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });


  return (
    skeletonLoader ? <HomeSkeletonList /> :
      <>
        <Helmet>
          <title>Buy Cruelty-Free Beauty & Body Care Products at The Body Shop India</title>
          <link rel="canonical" href={window.location.href} />
        </Helmet>

        <Hidden xsDown>
          <div className={classes.homeRoot}>
            {/* {bannerData?.status === '1' && <Addvertisement key='promotional_banner' data={bannerData} />} */}
            {/* {promotionalProduct?.status === '1' && <Banner navigateTo={navigateTo} key={"promotional_products"} data={promotionalProduct} />}
            {ratingData.length > 0 &&
              <DoYouThink getRateOrdersData={getRateOrdersData} key={'static'} data={ratingData} />
            }
            {giftData?.status === '1' && <FindOutMore navigateTo={navigateTo} data={giftData} />}
            {haveYouSeenData?.status === '1' && <HaveYouSeen key={"have_seen"} data={haveYouSeenData} />}
            {shareLoveData?.status === '1' && <DiscoverMore navigateTo={navigateTo} key={'share_love'} data={shareLoveData} />}
            {tipsAdvicesData?.status === '1' &&
              <>
                <DoubleCard navigateTo={navigateTo} data={tipsAdvicesData?.content?.[0] || {}} />
                {tipsAdvicesData?.content?.[1] && <DoubleCard navigateTo={navigateTo} data={tipsAdvicesData?.content?.[1] || {}} rightImg />}
              </>
            }
            {moreToShopData?.status === '1' && <MoreToShop data={moreToShopData} />}
            {testimonialData?.status === '1' && <Testimonial key={'testimonial_block'} data={testimonialData} />}
            {recommendedProducts?.status === '1' && <Recommended data={recommendedProducts} />} */}
            {/* if recommended products status is one make api  which is already done*/}

            {
              sortedHomedata.map((section: any) => {
                if (section?.status === '1' && section?.block_key == 'recommended_products')
                  return (
                    <Recommended key="recommended_products" data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'promotional_products')
                  return (
                    <Banner navigateTo={navigateTo} key={"promotional_products"} data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'product_reviews' && ratingData.length > 0)
                  return (
                    <DoYouThink getRateOrdersData={getRateOrdersData} key={'product_reviews'} data={ratingData} />
                  )
                if (section?.status === '1' && section?.block_key == 'gift_block')
                  return (
                    <FindOutMore key="gift_block" navigateTo={navigateTo} data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'have_seen')
                  return (
                    <HaveYouSeen key="have_seen" data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'share_love')
                  return (
                    <DiscoverMore navigateTo={navigateTo} key='share_love' data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'tips_block')
                  return (
                    <>
                      <DoubleCard navigateTo={navigateTo} data={section?.content?.[0] || {}} />
                      {section?.content?.[1] && <DoubleCard navigateTo={navigateTo} data={section?.content?.[1] || {}} rightImg />}
                    </>
                  )
                if (section?.status === '1' && section?.block_key == 'more_shop')
                  return (
                    <MoreToShop data={section} />
                  )
                if (section?.status === '1' && section?.block_key == 'testimonial_block')
                  return (
                    <Testimonial key="testimonial_block" data={section} />
                  )

              })
            }
          </div>

        </Hidden>
        <Hidden smUp>
          <HomeMobileView />
        </Hidden>
      </>
  );
};

export default Home;