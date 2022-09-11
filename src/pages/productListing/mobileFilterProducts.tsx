import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Hidden,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Utils from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "./action";
import { ReducersModal } from "../../models";
// import Skeleton from "@mui/material/Skeleton";
import {
  hideLoader,
  hideSkeleton,
  showLoader,
  showSkeleton,
} from "../home/actions";
import { FilterProductSkeleton } from "../../components/common/skeletonList/filterProductSkeleton";
import MobileSortAndFilter from "./mobileSortAndFilter";
import SearchField from "../../components/headers/searchField";
import MobileProducts from "./mobileProducts";
import { handleScrollHeight } from "../../utils/scroll";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerRoot: {
      background: "var(--white)",
      backdropFilter: "blur(2px)",
      position: "relative",
      // top: "-10vh",
    },
    bannerRoot2: {
      [theme.breakpoints.up("sm")]: {
        top: "-10vh",
      },
    },
    productContainer: {
      background: "var(--white)",
    },
    findContainer: {
      width: "1170px",
      margin: "0 auto",
      maxWidth: "100%",
    },
    filterHead: {
      padding: "60px 20px 15px",
    },
    filterProductText: {
      letterSpacing: "2px",
    },
    leftFilter: {
      display: "flex",
      alignItems: "center",
      "& .MuiTypography-body1": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2
        )}px Druk`,
        marginLeft: theme.spacing(2),
        lineHeight: "23px",
      },
    },
    filterImg: {
      width: 20,
    },
    filters: {
      fontSize: "16px",
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
        marginTop: theme.spacing(1.5),
        marginLeft: theme.spacing(0),
      },
      // width:"20px"
    },

    select: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Wrok Sans`,
      "& .MuiInput-underline:after": {
        border: "none",
      },
      "& .MuiInput-underline:before": {
        display: "none",
      },

      "& .MuiInput-input": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2
        )}px Druk`,
        marginLeft: theme.spacing(2),
        lineHeight: "23px",
      },
    },
    filterBody: {
      // height: 1400
      // maxHeight: 1000,
    },
    filterFooter: {
      marginTop: theme.spacing(10),
      width: "100%",
    },
    carouselHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px  Recoleta Alt`,
      color: "#084236",
      lineHeight: 1.5,
      marginBottom: theme.spacing(0.5),
      maxWidth: "500px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "none",
        fontSize: "16px",
        marginTop: theme.spacing(14.5),
      },
      marginLeft: "10px",
    },
    arrow: {
      padding: theme.spacing(0, 1),
    },
    button: {
      "& .MuiTypography-body1": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2
        )}px  Druk`,

        lineHeight: "23px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",

        color: "var(--black300)",
      },
      "& .MuiIconButton-root": {
        padding: 0,
      },
      "& .MuiIconButton-root:hover": {
        background: "none",
      },
    },
    link: {
      color: "lightblue",
      font: `normal 400 ${theme.spacing(2)}px  Work Sans`,
      cursor: "pointer",
    },
    searchDivComponent:{
      position : "sticky",
      width: "100%",
      top: "50px",
      background: "var(--white)",
      zIndex:9,
      padding: theme.spacing(0,1.6)
    }
  })
);

function MobileFilterProducts() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const params: any = useParams();

  const sortingData = Utils.constants.sortingData;
  const [sorting, setSorting] = React.useState(sortingData[0]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rectHeight, setRectHeight] = useState(0);
  const query = Utils.CommonFunctions.useQuery();
  let filter = query?.get("filters") ?? "";

  const menuData = useSelector(
    (state: ReducersModal) => state.homeReducer.mobileMenusData
  );
  const fromRoutePath = useSelector(
    (state: ReducersModal) => state.homeReducer.fromPath
  );
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const productData = useSelector(
    (state: ReducersModal) => state.productReducer?.data
  );
  const products = productData.products;

  const mobileAppliedFilters: any = useSelector(
    (state: ReducersModal) =>
      state.productFilterReducer.mobileAppliedFilters || {}
  );

  let keyword = params?.keyword ?? "";
  // let categoryId = location.state?.categoryId ?? "";
  let categoryId = params?.id ?? "";
  const fromPath = location?.state?.fromPath || "";

  const getOffset = (element: any) => {
    const rect = element?.getBoundingClientRect();
    setRectHeight(rect!?.height);
    return rect!?.height;
  };
  // const [filters, setFilters] = useState<any>({
  //     customAttributes: [],
  //     otherFilters: [],
  // });
  const listenToScroll = () => {
    let heightToHideFrom =
      getOffset(document.querySelector("#mobile-prod-container")) - 100;
  };
  let obj: any = {
    query: keyword,
    categoryId: categoryId,
    sortBy: sorting?.id?.toString(),
    limit: 18,
  };

  // let obj1: any = {
  //   query: keyword,
  //   categoryId: categoryId,
  //   sortBy: "",
  // };

  const [productListParams, setParams] = useState(
    Object.keys(mobileAppliedFilters)?.length > 0 ? mobileAppliedFilters : obj
  );

  // useEffect(() => {
  //     window.scrollTo(0, 0);
  //     if (categoryData?.id) {
  //         if (
  //             breadCrumData &&
  //             (breadCrumData.data === undefined ||
  //                 breadCrumData.data === null ||
  //                 breadCrumData.data.length === 0)
  //         ) {
  //             let breadCrumbData = [
  //                 {
  //                     title: "Home",
  //                     action: { pathname: "/" },
  //                 },
  //                 {
  //                     title: categoryData.name,
  //                     action: { pathname, state: { categoryId: categoryData.id } },
  //                     // action: `/product-listing?categoryId=${categoryData.id}`,
  //                 },
  //             ];
  //             dispatch(saveLocationHistory(breadCrumbData));
  //         } else if (breadCrumData && breadCrumData.data.length !== 0) {
  //             const objIndex = breadCrumData.data.findIndex(function (el: any) {
  //                 if (el.action.pathname.includes("/c/")) {
  //                     return true;
  //                 }
  //                 return false;
  //             });
  //             let newData = [...breadCrumData.data];
  //             if (objIndex !== -1) {
  //                 newData[objIndex] = {
  //                     title: categoryData.name,
  //                     action: { pathname, state: { categoryId: categoryData.id } },
  //                     // action: `/product-listing?categoryId=${categoryData.id}`,
  //                 };
  //             } else {
  //                 newData.push({
  //                     title: categoryData.name,
  //                     action: { pathname, state: { categoryId: categoryData.id } },
  //                     // action: `/product-listing?categoryId=${categoryData.id}`,
  //                 });
  //             }

  //             dispatch(saveLocationHistory(newData));
  //         }
  //     }
  // }, [categoryData?.id]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   let params: any = { page: 1, limit: 10, type: "history" }
  //   // dispatch(showSkeleton())
  //   dispatch(
  //     getOthersRecommendations(params, () => {
  //       dispatch(hideSkeleton())
  //     })
  //   );

  // }, [])
  useEffect(() => {
    setParams({ ...productListParams, ...obj, page: 1, categoryId });
    // on category change set page to 1 and sort to default best seller
    // setSorting(sortingData[0]);
    dispatch(showSkeleton());

    if (
      fromRoutePath === "pdp"
      // mobileAppliedFilters?.categoryId===categoryId
    ) {
      setPage(1);
      dispatch({
        type: "mobile-applied-filters",
        payload: { ...mobileAppliedFilters, page: 1 },
      });
      dispatch(
        getProductList(
          { ...mobileAppliedFilters, page: 1 },
          false,
          (resp: any) => {
            dispatch(hideSkeleton());
            dispatch({
              type: Utils.ActionName.FROM_PATH,
              payload: { fromPath: "" },
            });
          },
          null,
          fromPath === "home"
            ? () => {
                history.push(
                  `${Utils.routes.PRODUCT_LIST}?categoryId=${menuData?.[0]?.magentoId}`
                );
              }
            : null
        )
      );
    } else {
      setPage(1);
      let data = { ...obj, page: 1, sortBy: "", categoryId };
      if (filter) {
        let appliedFilter = JSON.parse(
          decodeURIComponent(decodeURIComponent(filter))
        );
        data = { ...data, ...appliedFilter };
        setParams(data);
      }

      dispatch({ type: "mobile-applied-filters", payload: data });
      dispatch(
        getProductList(
          data,
          true,
          (resp: any) => {
            dispatch(hideSkeleton());
          },
          null,
          fromPath === "home"
            ? () => {
                history.push(
                  `${Utils.routes.PRODUCT_LIST}?categoryId=${menuData?.[0]?.magentoId}`
                );
              }
            : null
        )
      );
    }
  }, [keyword, categoryId]);

  useEffect(() => {
    if (filter) {
      let appliedFilter = JSON.parse(
        decodeURIComponent(decodeURIComponent(filter))
      );
      const data = { ...obj, ...appliedFilter, page: 1 };
      dispatch(
        getProductList(data, false, () => {
          dispatch(hideLoader());
          dispatch({ type: "mobile-applied-filters", payload: data });
          setParams(data);
        })
      );
    }
  }, []);

  // const handleMenu = (event: any) => {
  //     setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //     setAnchorEl(null);
  // };

  const handleChange = (hasMore: boolean, pageNum?: number) => {
    if (hasMore && fromRoutePath !== "pdp") {
      let pageSize = pageNum ? pageNum : hasMore ? page + 1 : page;
      setPage(pageSize);
      const params = { ...obj, ...productListParams, page: pageSize };
      setParams(params);
      showLoader();
      dispatch(
        getProductList(
          params,
          false,
          () => {
            dispatch(hideLoader());
            dispatch(hideSkeleton());
          },
          products
        )
      );
    } else {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      fromRoutePath !== "pdp" &&
      mobileAppliedFilters?.categoryId === categoryId
    ) {
      // if (!products?.nextPage) {
      //     dispatch(showSkeleton())
      //     getProductList(obj, true, (resp: any) => {
      //         dispatch(hideLoader());
      //         dispatch(hideSkeleton())
      //     });
      // } else {
      //     setPage(1);
      // }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    listenToScroll();
    handleScrollHeight(e, (value: boolean) => {
      // if(fromPath!=="pdp")
      setIsFetching(value);
    });
  };
  useEffect(() => {
    if (!isFetching) return;
    // getOrderList(orderListData?.nextPage > 0 ? true : false);
    dispatch(showLoader());

    handleChange(products?.nextPage > 0 ? true : false);
  }, [isFetching]);

  return (
    <div id="mobile-prod-container" className={classes.productContainer}>
      <div className={classes.findContainer}>
        <div
          className={clsx({
            [classes.bannerRoot]: true,
            [classes.bannerRoot2]:
              productData?.categoryData?.id &&
              (productData?.categoryData?.description ||
                productData?.categoryData?.image),
          })}
        >
          {/* Filter Header Section */}
          {skeletonLoader || Object.keys(productData).length === 0 ? (
            <FilterProductSkeleton />
          ) : (
            <>
              {/* Listing Body Section */}
              <div className={classes.filterBody}>
                <Grid container>
                  <Hidden smUp>
                    {keyword && (
                      <Grid item xs={12} md={9} className={classes.searchDivComponent}>
                        <SearchField
                          value={keyword}
                          handleClick={() =>
                            history.push(Utils.routes.MOBILE_SEARCH)
                          }
                        />
                      </Grid>
                    )}
                  </Hidden>

                  <Grid item xs={12} md={9}>
                    <Hidden smUp>
                      <MobileSortAndFilter
                        rectHeight={rectHeight}
                        productData={productData}
                        setPage={setPage}
                        setParams={setParams}
                        obj={obj}
                      />
                    </Hidden>
                    <MobileProducts
                      products={products}
                      handleChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default MobileFilterProducts;
