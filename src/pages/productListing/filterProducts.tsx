import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  MenuItem,
  Hidden,
} from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import clsx from "clsx"
import React, { useEffect, useState } from "react";
import Utils from "../../utils";
import Filters from "./filters";
import Products from "./listProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "./action";
import { ReducersModal } from "../../models";
import RecommendationCarousel from "../../components/common/recommendationCarousel";
// import Skeleton from "@mui/material/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import {
  hideLoader,
  hideSkeleton,
  showLoader,
  showSkeleton,
} from "../home/actions";
import { Skeleton } from "@mui/material";
import { FilterProductSkeleton } from "../../components/common/skeletonList/filterProductSkeleton";
import { getOthersRecommendations } from "../../components/common/recommendationCarousel/action";
import SkeletonProductView from "../../components/common/skeletonList/skeletonProductView";
import ProductNotFound from "./productNotFound";
import { getAuthToken } from "../../utils/session";

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
        top: "-8vh",
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
    productData: {
      // margin: theme.spacing(1, "0"),
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0),
      },
    },
  })
);

function FilterProducts() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const params: any = useParams();
  // const matches = useMediaQuery('(min-width:600px)');

  const sortingData = Utils.constants.sortingData;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const recommendedData = useSelector(
    (state: ReducersModal) => state.recommendReducer.recommendedData
  );
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const productData = useSelector(
    (state: ReducersModal) => state.productReducer?.data
  );
  const filters = useSelector(
    (state: ReducersModal) => state.productFilterReducer?.filters
  );

  const findSortingData = (id: string) => {
    let sortingObj = sortingData[0];
    if (id)
      sortingObj = sortingData?.find((data: any) => data?.id === Number(id));
    return sortingObj;
  };
  const mobileAppliedFilters: any = useSelector(
    (state: ReducersModal) =>
      state.productFilterReducer.mobileAppliedFilters || {}
  );
  const [page, setPage] = useState(mobileAppliedFilters?.page || 1);
  const products = productData?.products || {};
  const [sorting, setSorting] = React.useState(
    mobileAppliedFilters?.sortBy
      ? findSortingData(mobileAppliedFilters?.sortBy)
      : sortingData[0]
  );

  const fromRoutePath = useSelector(
    (state: ReducersModal) => state.homeReducer.fromPath
  );
  // let categoryId = query.get("categoryId") ?? "";
  // let categoryId = location.state?.categoryId ?? "";
  let keyword = params?.keyword ?? "";
  // let categoryId = location?.pathname?.split("/")?.pop() ?? ""
  let categoryId = Number(location?.pathname?.split("/")?.pop())
    ? location?.pathname?.split("/")?.pop()
    : "";

  //  params?.id
  const fromPath = location?.state?.fromPath || "";

  let obj: any = {
    query: keyword,
    categoryId: categoryId,
    sortBy: sorting?.id?.toString() || sortingData[0].id,
    selectedFilters: [],
  };

  // let obj1: any = {
  //   query: keyword,
  //   categoryId: categoryId,
  //   sortBy: "",
  // };
  const [productListParams, setParams] = useState(obj);
  const { menuData, authToken } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (categoryData?.id) {
  //     if (
  //       breadCrumData &&
  //       (breadCrumData.data === undefined ||
  //         breadCrumData.data === null ||
  //         breadCrumData.data.length === 0)
  //     ) {
  //       let breadCrumbData = [
  //         {
  //           title: "Home",
  //           action: { pathname: "/" },
  //         },
  //         {
  //           title: categoryData.name,
  //           action: { pathname, state: { categoryId: categoryData.id } },
  //           // action: `/product-listing?categoryId=${categoryData.id}`,
  //         },
  //       ];
  //       dispatch(saveLocationHistory(breadCrumbData));
  //     } else if (breadCrumData && breadCrumData.data.length !== 0) {
  //       const objIndex = breadCrumData.data.findIndex(function (el: any) {
  //         if (el.action.pathname.includes("/c/")) {
  //           return true;
  //         }
  //         return false;
  //       });
  //       let newData = [...breadCrumData.data];
  //       if (objIndex !== -1) {
  //         newData[objIndex] = {
  //           title: categoryData.name,
  //           action: { pathname, state: { categoryId: categoryData.id } },
  //           // action: `/product-listing?categoryId=${categoryData.id}`,
  //         };
  //       } else {
  //         newData.push({
  //           title: categoryData.name,
  //           action: { pathname, state: { categoryId: categoryData.id } },
  //           // action: `/product-listing?categoryId=${categoryData.id}`,
  //         });
  //       }

  //       dispatch(saveLocationHistory(newData));
  //     }
  //   }
  // }, [categoryData?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let params: any = { page, limit: 10, type: "history" }
    if (authToken) {
      dispatch(showSkeleton())
      dispatch(
        getOthersRecommendations(params, () => {
          dispatch(hideSkeleton())
        })
      );
    }

  }, [authToken]);

  const handleProductSort = (item: any) => {
    setAnchorEl(null);
    setSorting(item);
    const params = {
      ...obj,
      ...productListParams,
      ...mobileAppliedFilters,
      sortBy: item?.id?.toString(),
      page: 1,
    };
    setParams(params);
    dispatch({
      type: "mobile-applied-filters",
      payload: {
        ...mobileAppliedFilters,
        sortBy: item?.id?.toString(),
        page: 1,
      },
    });

    if (item) {
      window.scrollTo(0, 400);
      dispatch(showLoader());
      const payload = { ...params };
      delete payload.selectedFilters;
      dispatch(
        getProductList(payload, false, () => {
          dispatch(hideLoader());
        })
      );
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, 400);
  //   setParams({ ...productListParams, ...obj });
  //   // on category change set page to 1 and sort to default best seller
  //   setSorting(sortingData[0]);
  //   dispatch(showSkeleton());
  //   dispatch(
  //     getProductList(obj, true, (resp: any) => {
  //       dispatch(hideSkeleton())
  //     }, null,
  //       fromPath === "home" ? () => {
  //         let pathname = Utils.CommonFunctions.seoUrl(menuData?.[0], "others")
  //         // history.push({ pathname: `${Utils.routes.PRODUCT_LIST}`, search: `?categoryId=${menuData?.[0]?.id}` });
  //         history.push({ pathname });
  //       } : null
  //     ));
  // }, [keyword, categoryId]);

  useEffect(() => {
    window.scrollTo(0, 400);
    setParams({ ...productListParams, ...obj, categoryId });
    // on category change set page to 1 and sort to default best seller
    // setSorting(sortingData[0]);
    dispatch(showSkeleton());
    if (
      fromRoutePath === "pdp" &&
      mobileAppliedFilters?.categoryId === categoryId
    ) {
      console.log("fromRoutePath if", fromRoutePath);
      dispatch({
        type: "mobile-applied-filters",
        payload: { ...mobileAppliedFilters, categoryId, page },
      });
      const payload = { ...mobileAppliedFilters, categoryId };
      delete payload.selectedFilters;
      dispatch(
        getProductList(
          payload,
          false,
          (resp: any) => {
            dispatch(hideSkeleton());
            dispatch(hideLoader());

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
      setSorting(findSortingData("2"));
      dispatch({
        type: "mobile-applied-filters",
        payload: { ...productListParams, categoryId, sortBy: "2", page: 1 },
      });
      let dat = { ...obj, sortBy: "2" };
      dispatch(
        getProductList(
          { ...dat, categoryId, page: 1 },
          true,
          (resp: any) => {
            dispatch(hideSkeleton());
            dispatch(hideLoader());
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

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: any, page: number) => {
    window.scrollTo(0, 400);

    const params = {
      ...obj,
      ...productListParams,
      ...mobileAppliedFilters,
      page,
    };
    console.log("params", obj, productListParams, mobileAppliedFilters, params);
    dispatch({
      type: "mobile-applied-filters",
      payload: { ...mobileAppliedFilters, page },
    });
    setParams(params);
    setPage(page);
    dispatch(showLoader());
    const payload = { ...params };
    delete payload.selectedFilters;
    dispatch(
      getProductList(payload, false, () => {
        dispatch(hideLoader());
      })
    );
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.productContainer}>
      <Helmet>
        <title>
          {productData?.categoryData && productData?.categoryData?.metaTitle ?
            productData?.categoryData?.metaTitle
            : productData?.categoryData?.name ?
              `${productData?.categoryData?.name} | The Body Shop` : 'The Body Shop'}
        </title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
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
              <Hidden xsDown>
                <div className={classes.filterHead}>
                  <Grid container>
                    {filters && (
                      <Grid item xs={12} sm={3}>
                        <div className={classes.leftFilter}>
                          <img
                            src={Utils.images.TUNE}
                            alt="filter"
                            className={classes.filterImg}
                          />
                          <Typography
                            className={classes.filterProductText}
                            variant="body1"
                          >
                            FILTER PRODUCTS
                          </Typography>
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={6} sm={6}>
                      {productData?.products?.data ? (
                        <Typography className={classes.filters} variant="body1">
                          <strong> Showing </strong>
                          {`${productData?.products?.data?.length ?? "0"} of ${productData?.products?.totalCount ?? "0"
                            } ${productData?.products?.data?.length === 1
                              ? "product"
                              : "products"
                            }`}
                        </Typography>
                      ) : null}
                    </Grid>
                    {filters && products?.data && products?.data?.length > 0 && (
                      <Grid item xs={6} sm={3} className={classes.select}>
                        <div className={classes.button}>
                          <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            value={sorting.id}
                            color="inherit"
                          >
                            <Typography>{sorting.name}</Typography>
                            <img
                              src={Utils.images.DOWN_ARROW}
                              className={classes.arrow}
                              alt="downArrow"
                            />
                          </IconButton>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={open}
                            onClose={handleClose}
                          >
                            {sortingData.map((val: any, i: any) => (
                              <MenuItem
                                key={i}
                                value={val.id}
                                onClick={() => handleProductSort(val)}
                              >
                                {val.name}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </Hidden>
              {/* Listing Body Section */}
              <div className={classes.filterBody}>
                <Grid container>
                  <Hidden xsDown>
                    <Grid item xs={11} md={3}>
                      <Filters obj={obj} setParams={setParams} />
                    </Grid>
                  </Hidden>
                  {/* <Hidden smUp>
                    {keyword &&
                      <Grid item xs={12} md={9}>
                        <SearchField value={keyword} handleClick={() => history.push(Utils.routes.MOBILE_SEARCH)} />
                      </Grid>
                    }
                  </Hidden> */}

                  <Grid item xs={12} md={9}>
                    {/* <Hidden smUp>
                      <MobileSortAndFilter setParams={setParams} obj={obj} />
                      <Divider />
                    </Hidden> */}

                    <Products
                      setParams={setParams}
                      handleChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {!filters && (!products?.data || products?.data?.length === 0) && (
                  <Grid item xs={12} className={classes.productData}>
                    <ProductNotFound setParams={setParams} />
                  </Grid>
                )}
              </div>
            </>
          )}
          <div className={classes.filterFooter}>
            {skeletonLoader || Object.keys(recommendedData).length === 0 ? (
              <>
                <Skeleton height={20} width={"40%"} />
                <SkeletonProductView
                  flag={"recommend"}
                  gridsArray={[1, 2, 3, 4, 5]}
                />
              </>
            ) : recommendedData?.data?.length > 0 ? (
              <>
                <Typography variant="h4" className={classes.carouselHeading}>
                  Why not have another look?
                </Typography>
                <RecommendationCarousel type="plp" />
              </>
            ) : null}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default FilterProducts;
