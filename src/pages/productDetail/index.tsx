import React, { useState, useEffect } from "react";
import Rate from "./Rate";
import Return from "./Return";
import { makeStyles, Hidden, Typography, Grid, Badge } from "@material-ui/core";
import { Helmet } from 'react-helmet';
import AvailableOffers from "./AvailableOffers";
import DeliveryOptions from "./DeliveryOptions";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
// import CustomAccordion from "../../components/customAccordion";
import HowToUse from "./HowToUse";
import RatingsReviews from "./RatingsReviews";
import CustomerReviews from "./CustomerReviews";
import CompleteRoutine from "./CompleteRoutine";
import { useDispatch, useSelector } from "react-redux";
import { getProductData, getReviews } from "./action";
import { ReducersModal } from "../../models";
import ReactHtmlParser from "react-html-parser";
import RecommendationCarousel from "../../components/common/recommendationCarousel";
import Utils from "../../utils";
import BreadCrumb from "../../components/breadCrumb";
import { saveLocationHistory } from "../../components/breadCrumb/action";
import FixedBottomPanel from "./fixedBottomPanel";
// import ContainedButton from "../../components/containedButton";
import Skeleton from "@mui/material/Skeleton";
import { hideSkeleton, showSkeleton } from "../home/actions";
import Rewards from "./rewards";
import { productViewed, screenViewed, updateProfile } from "../../utils/event/action";
// import _ from "lodash";
import { Link, useHistory, useLocation } from "react-router-dom";
import AdditionalInformation from "./additionalInformation";
import SmallMighty from "./SmallMighty";
import _ from "lodash";
import events from "../../utils/event/constant"

declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(3, 4),
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    minWidth: "1000px",
    maxWidth: "1440px",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: theme.spacing(2, 1),
      maxWidth: "none",
      minWidth: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "100px",
      maxWidth: "none",
      minWidth: "auto",
    },
  },
  breadcrum: {
    display: "flex",
    flexBasis: "100%",
    width: "100%",
    "& .MuiTypography-body1": {
      color: "gray",
      font: `normal ${theme.typography.fontWeightLight} Work Sans`,
      padding: theme.spacing(0, 2),
    },
  },
  container: {
    flexBasis: "50%",
    position: "sticky",
    top: "220px",
  },
  productDetails: {
    flexBasis: "50%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("sm")]: {
      // maxHeight: '600px',
      overflowY: "auto",
      "& ::-webkit-scrollbar-thumb": {
        background: "rgba(90, 90, 90)",
      },
      "&::-webkit-scrollbar": {
        width: "0px",
        height: "0px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 0.2),
      flexBasis: "100%",
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Work Sans`,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: "var(--black)",
  },

  list: {
    padding: theme.spacing(1, 0, 0, 3),
  },

  filterFooter: {
    marginTop: theme.spacing(5),
    width: "100%",
    marginBlockStart: "370px",
    [theme.breakpoints.down("xs")]: {
      marginBlockStart: "0px",
    },
  },
  carouselHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}px  Recoleta Alt`,
    color: "#084236",
    lineHeight: 1.5,
    margin: theme.spacing(0, 0, 0.5, 2),
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px  Recoleta Alt Bold`,
      margin: theme.spacing(0, 0, 0.5, 0),
      color: "var(--black)",
    },
  },
  // accordionHeading: {
  //   fontWeight: "bold",
  // },
  content: {
    paddingLeft: "0px",
    [theme.breakpoints.down("xs")]: {
      "& strong": {
        color: "var(--black)",
      },
    },
  },

  skeletonView: {
    margin: theme.spacing(2),
  },
  description: {
    marginTop: "10px",
    font: `normal 400 ${theme.spacing(1.5)}px Work Sans`,
    lineHeight: "27px",
  },
  title: {
    marginTop: "10px",
    font: `normal 700 ${theme.spacing(1.4)}px  Recoleta Alt`,
    color: "black",
  },

  btnDiv: {
    [theme.breakpoints.down("xs")]: {
      zIndex: 1200,
      position: "fixed",
      top: "19px",
      right: "20px",
    },
  },
  fixedIcon: {
    display: "flex",
    placeItems: "center",
    position: "sticky",
    top: "19px",
  },
  searchIcon: {
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
    marginLeft: theme.spacing(2.5),
  },
  badge: {
    color: theme.palette.primary.main,
  },
  sideBarLogo: {
    display: "flex",
    padding: theme.spacing(1),
    backgroundColor: "var(--primary)",
    "& div": {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(1),

      "& .MuiTypography-body2": {
        font: `normal 700  18px Druk`,
        color: theme.palette.secondary.main,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      },
      "& .MuiTypography-body1": {
        font: `normal 400  12px Work Sans`,
        color: "var(--white)",
      },
    },
  },
  logo: {
    height: "40px",
    width: "40px",
  },
}));

const ProductDetail = (props: any) => {
  let query = Utils.CommonFunctions.useQuery();
  const location: any = useLocation();
  let isSearched = query.get("isSearched");
  const classes = useStyles();

  let productDetail: any = {};
  let linkedProducts: any = {};
  const id = props?.match?.params?.id || null;
  // const id = location?.state?.productId || null;
  const searched = location?.state?.isSearched || null;
  const isSearchOrRecommend = location?.state?.isSearchOrRecommend || null;
  const dispatch = useDispatch();
  const [opacity, toggleOpacity] = useState(true);
  // const [bottomPanel, setBottomPanel] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [rectHeight, setRectHeight] = useState(0);
  // const [ingredientModal, setIngredientModal] = useState(false);
  const [sideBar, setSideBar] = React.useState(false);
  const [breadCrumData, setBreadCrumb] = React.useState<any>([]);

  const productData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );
  const totalItems = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer.totalItems
  );
  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  const history = useHistory();
  useEffect(() => {
    dispatch({ type: Utils.ActionName.FROM_PATH, payload: { fromPath: "pdp" } })

    //@ts-ignore
    zE("webWidget", "updateSettings", {
      webWidget: {
        offset: {
          horizontal: "0px",
          vertical: "70px",
        },
      },
    });
    return () => {
      //@ts-ignore
      zE("webWidget", "updateSettings", {
        webWidget: {
          offset: {
            horizontal: "0px",
            vertical: "0px",
          },
        },
      });
    };
  }, []);

  const recommendedData = useSelector(
    (state: ReducersModal) => state.recommendReducer.recommendedData?.data
  );

  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  const getData = (callback?: any) => {
    let params: any = {
      id: id,
      subcategoryId: location?.state?.categoryId
    };
    if (isSearched || searched) {
      params.isSearched = 1;
    }
    dispatch(
      getProductData(params, (resp: any) => {
        dispatch(hideSkeleton());

        // const productSku = "BS-91942001"
        const productSku = resp?.product?.sku || "";
        dispatch(
          getReviews(`?sku=${productSku}&page=1&limit=3`, (resp: any) => {
            // setRatingData(resp?.data?.[0] || {})
            if (callback)
              callback()
          })
        );
      })
    );
  };


  // const breadCrumData = useSelector(
  //   (state: ReducersModal) => state.breadCrumReducer
  // );

  // useEffect(() => {
  //   if (productData) {
  //     if (productData?.redirect === "Not Found") {
  //       productData.redirect = "";
  //       props.history.push("/c/");
  //     } else if (productData?.product) {
  //       if (
  //         breadCrumData &&
  //         (breadCrumData.data === undefined ||
  //           breadCrumData.data === null ||
  //           breadCrumData.data.length === 0)
  //       ) {
  //         let breadCrumbData = [
  //           {
  //             title: "Home",
  //             action: "/",
  //           },
  //           {
  //             title: productData?.product?.name,
  //             action: props?.location?.pathname,
  //           },
  //         ];
  //         dispatch(saveLocationHistory(breadCrumbData));
  //       } else if (breadCrumData && breadCrumData.data.length !== 0) {
  //         const objIndex = breadCrumData.data.findIndex((el: any) =>
  //           // if (el.action.includes("/product-detail/")) {
  //           //   return true;
  //           // }
  //           // return false;
  //           el.action.includes("/p/")
  //         );
  //         const reviewListIndex = breadCrumData.data.findIndex((el: any) =>
  //           // if (el.action.includes("/review-list")) {
  //           //   return true;
  //           // }
  //           // return false;
  //           el.action.includes("/review-list")
  //         );
  //         let newData = [...breadCrumData.data];
  //         if (objIndex !== -1) {
  //           newData.splice(objIndex, 1);
  //         }
  //         if (reviewListIndex !== -1) {
  //           newData.splice(reviewListIndex, 1);
  //         }
  //         newData.push({
  //           title: productData?.product?.name,
  //           action: props?.location?.pathname,
  //         });
  //         dispatch(saveLocationHistory(newData));
  //       }
  //     }
  //   }
  // }, [productData?.product]);

  useEffect(() => {
    dispatch(showSkeleton());
    getData();
    window.scrollTo(0, 0);
    screenViewed({
      ScreenName: events.SCREEN_PDP,
      CTGenerated: "WEB",
    });

  }, [id]);

  // const listenToScroll = () => {
  //   // let heightToHideFrom = 1300;
  //   let heightToHideFrom =
  //     getOffset(document.querySelector("#container")) - 100;
  //   // let heightToHideFrom = element?.clientHeight ? parseInt(element?.clientHeight) + 200 : 1700
  //   const winScroll =
  //     document.body.scrollTop || document.documentElement.scrollTop;

  //   if (winScroll > heightToHideFrom) {
  //     bottomPanel && // to limit setting state only the first time
  //       setBottomPanel(false);
  //   } else {
  //     setBottomPanel(true);
  //   }
  // };

  const listenToScroll = () => {
    let heightToHideFrom =
      getOffset(document.querySelector("#container")) - 100;
    // let heightToHideFrom = element?.clientHeight ? parseInt(element?.clientHeight) + 200 : 1700
    // const winScroll =
    //   document.body.scrollTop || document.documentElement.scrollTop;

    // if (winScroll > heightToHideFrom) {
    //   bottomPanel && // to limit setting state only the first time
    //     setBottomPanel(false);
    // } else {
    //   setBottomPanel(true);
    // }
  };

  const getOffset = (element: any) => {
    const rect = element?.getBoundingClientRect();
    setRectHeight(rect!?.height);
    // scrollTop =
    // window.pageYOffset || document.documentElement.scrollTop;
    return rect!?.height;
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", listenToScroll);

  //   /**
  //    * Event logger
  //    */
  //   screenViewed({
  //     ScreenName: events.SCREEN_PDP,
  //     CTGenerated: "WEB",
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", listenToScroll);
  //     // dispatch({
  //     //   type: "ResetProductData",
  //     // });
  //   };
  // }, []);
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    if (productData) {
      if (productData?.redirect === "Not Found") {
        productData.redirect = "";
        props.history.push("/not-found");
      }
      if (productData?.product) {
        let categoryAttributesIndex = productData?.product?.customAttributes.findIndex((item: any) => item.attribute_code === "category_ids")
        let categoryAttributesData = productData?.product?.customAttributes[categoryAttributesIndex]
        let categoryArray = categoryAttributesData?.label.reduce((i: any, j: any) => {
          i.push({
            CategoryName: j.label,
            CategoryId: j.value,
          });
          return i;
        }, [])

        productViewed({
          ProductId: `${id}`,
          Category: JSON.stringify(categoryArray),
          ProductName: `${productData?.product?.name}`,
          ProductSKU: `${productData?.product?.sku}`,
          FromScreen: ``, //not available
        });
        let size = productData?.selectedVariantData?.customAttributes.find(
          (val: any) => val.attribute_code === "size"
        );
        if (productData.product?.configurableProductLinks.length > 0) {
          updateProfile('recent_viewed_product_parent_id', `${productData?.product?.sku}`) // outer
          updateProfile('recent_viewed_product_id', `${productData?.selectedVariantData?.magentoId}`) //child sku
        }
        else {
          updateProfile('recent_viewed_product_id', `${productData?.product?.magentoId}`)
        }
        updateProfile('recent_viewed_product_name', `${productData?.product?.name}`)
        updateProfile('recent_viewed_product_size', size?.label[0]?.label)

        //breadcrumb data
        let breadcrumb = [
          {
            title: "Home",
            action: "/",
          },
          {
            action: `${Utils.CommonFunctions.seoUrl(productData?.product?.categoryData, "plp")}`,
            title: `${productData?.product?.categoryData?.name}`,
          }
        ]
        if (productData?.product?.categoryData?.child_category?.name) {
          breadcrumb.push({
            action: `${Utils.CommonFunctions.seoUrl(productData?.product?.categoryData?.child_category, "plp")}`,
            title: `${productData?.product?.categoryData?.child_category?.name}`,
          })
        }
        breadcrumb.push(
          {
            title: productData?.product?.name,
            action: props?.location?.pathname,
          })
        setBreadCrumb(breadcrumb)
      }
    }
    setVideoUrl(getAttributeValue("how_to_video_url"));

    if (typeof window && window.gtag !== 'undefined') {
      window.gtag('event', 'view_product', {
        "content_type": "product",
        "items": [
          {
            "id": productData?.product?.stockItem?.product_id,
            "name": productData?.product?.name,
            "brand": "The Body Shop",
            "category": productData?.product?.categoryData?.name,
            "variant": productData?.selectedVariant?.label,
            "quantity": productData?.selectedVariantData?.price,
            "price": productData?.selectedVariantData?.price,
          }
        ]
      });
    }

  }, [productData]);

  if (productData) {
    productDetail = productData.product;
    linkedProducts = productData.linkedProducts;
  }

  const getAttributeValue = (attributeCode: any) => {
    if (productDetail && productDetail?.customAttributes?.length > 0) {
      const attributeObj = productDetail?.customAttributes?.find((el: any) => {
        return el.attribute_code === attributeCode;
      });
      if (attributeObj && attributeObj?.value) {
        if (attributeObj.value?.includes("&lt")) {
          let new_value = attributeObj?.value?.replaceAll("&lt;", "<");
          new_value = new_value?.replaceAll("&gt;", ">");
          return new_value;
        }
        return attributeObj.value;
      }
    }
    return "";
  };

  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideBar(!sideBar);
  };
  const redirect = () => {
    const type = userInfo.tierType === 2 ? 1 : 2;
    history.push({
      pathname: Utils.routes.UPGRADE_MEMBERSHIP,
      state: { type, pageName: "My Dashboard" },
    });
  };

  const metaTitle = productData && productData.product && _.find(productData.product.customAttributes, {
    attribute_code: "meta_title",
  });

  return (
    <>
      <Helmet>
        <title>
          {metaTitle && metaTitle.value ? metaTitle.value
            : productData?.product?.name ? `${productData?.product?.name} | The Body Shop`
              : 'The Body Shop'}
        </title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Hidden smUp>
        <div className={classes.btnDiv}>
          <div className={classes.fixedIcon}>
            <div
              className={classes.searchIcon}
              onClick={() => history.push(Utils.routes.MOBILE_SEARCH)}
            >
              <img src={Utils.images.SEARCHICON} alt="google" />
            </div>
            <div className={classes.searchIcon}>
              <Link to={Utils.routes.SHOPPING_BAG}>
                <Badge badgeContent={totalItems} className={classes.badge}>
                  <img src={Utils.images.CARTM} alt="logo" />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {
            // (userInfo?.tierType ===3||userInfo?.tierType === 2)
            userInfo?.tierType !== 1 && userInfo?.tierType !== 2 && (
              <div
                className={classes.sideBarLogo}
                onClick={(e: any) => {
                  toggleDrawer(e);
                  redirect();
                }}
              >
                <img
                  className={classes.logo}
                  src={Utils.images.LYBC_FIVE}
                  alt="logo"
                />
                <div>
                  <Typography variant="body2">
                    {configs?.lybc_banner_title || ""}
                  </Typography>
                  <Typography variant="body1">
                    {configs?.lybc_banner_description || ""}{" "}
                  </Typography>
                </div>
              </div>
            )
          }
        </div>
      </Hidden>
      <div className={classes.mainContainer}>
        <Hidden xsDown>
          <BreadCrumb
            breadcrumb={breadCrumData}
          />
        </Hidden>

        <Grid container id="container">
          <Hidden smUp>
            <Grid item xs={12}>
              <ProductDetails details={productDetail} />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={6} style={{ zIndex: 9, position: "relative" }}>
            <div className={classes.container}>
              {skeletonLoader ? (
                <Skeleton
                  variant="rectangular"
                  height={450}
                  className={classes.skeletonView}
                />
              ) : (
                <ProductImages
                  callback={() => { }}
                  details={productData && productData?.product}
                  opacity={opacity}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.productDetails}>
              <Hidden xsDown>
                <ProductDetails details={productDetail} />
              </Hidden>

              <Rate />

              <Return />

              {!skeletonLoader && (
                <Rewards details={productData?.rewardData || []} />
              )}

              <AvailableOffers />
              <DeliveryOptions />
              {skeletonLoader ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <>
                  <Hidden xsDown>
                    {ReactHtmlParser(getAttributeValue("how_to_use"))?.length >
                      0 ? (
                      <HowToUse
                        video_url={videoUrl}
                        howToUse={
                          <Typography>
                            {ReactHtmlParser(
                              getAttributeValue("how_to_use_video")
                            )}
                          </Typography>
                        }
                        textDescription={
                          <Typography>
                            {ReactHtmlParser(getAttributeValue("how_to_use"))}
                          </Typography>
                        }
                      />
                    ) : null}
                  </Hidden>

                  <Hidden smUp>
                    {ReactHtmlParser(getAttributeValue("how_to_use"))?.length >
                      0 ? (
                      <HowToUse
                        video_url={videoUrl}
                        howToUse={
                          <Typography>
                            {ReactHtmlParser(
                              getAttributeValue("how_to_use_video")
                            )}
                          </Typography>
                        }
                        textDescription={
                          <Typography>
                            {ReactHtmlParser(getAttributeValue("how_to_use"))}
                          </Typography>
                        }
                      />
                    ) : null}
                  </Hidden>

                  <SmallMighty />

                  <AdditionalInformation />
                </>
              )}
              <RatingsReviews getData={getData} />
              <CustomerReviews getData={getData} />
              {linkedProducts && linkedProducts.length > 0 ? (
                <CompleteRoutine
                  details={linkedProducts}
                  product={productDetail}
                />
              ) : null}
            </div>

            {/* {opacity ?
              <FixedBottomPanel data={productDetail} />
              :
              ''
            } */}
            <Hidden xsDown>
              {/* {bottomPanel && <FixedBottomPanel data={productDetail} />} */}
              <FixedBottomPanel
                isSearched={isSearched || searched || isSearchOrRecommend}
                rectHeight={rectHeight}
                data={productDetail}
              />
            </Hidden>
            <Hidden smUp>
              {/* {<FixedBottomPanel bottomPanel={bottomPanel} rectHeight={rectHeight} data={productDetail} />}  */}
              <FixedBottomPanel
                isSearched={isSearched || searched || isSearchOrRecommend}
                rectHeight={rectHeight}
                data={productDetail}
              />
            </Hidden>
          </Grid>
        </Grid>
        <div
          className={classes.filterFooter}
          onMouseEnter={() => toggleOpacity(false)}
          onMouseLeave={() => toggleOpacity(true)}
        >
          {recommendedData?.length > 0 ? (
            <Typography variant="h4" className={classes.carouselHeading}>
              Recommended for you
            </Typography>
          ) : null}
          <RecommendationCarousel type="pdp" />
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
