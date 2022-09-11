import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Hidden,
  Badge,
} from "@material-ui/core";
import Utils from "../../utils";
import { isAuthenticated, getAuthToken } from "../../utils/session";
import SearchIndex from "../searchModal";
import React, { useEffect, useState } from "react";
import MobileHeader from "./mobileHeader";
import { useHistory } from "react-router";
import request from "../../utils/request";
import MiniHeader from "./miniHeader";
import { ReducersModal } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { getShoppingBagList } from "../common/addToCart/action";
import { getWishList } from "../../pages/wishlist/action";
import {
  getHomeData,
  hideLoader,
  hideSkeleton,
  showLoader,
  showSkeleton,
} from "../../pages/home/actions";
import { getPLPCategories } from "../../pages/productListing/action";
import MessageDialogue from "../common/product/messageDialogue";
import { getUserProfile } from "../../pages/account/profile/action";
import { getDashboardData } from "../../pages/account/lybc/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stickyHeader: {
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
    },
    headerRoot: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(1, 2),
      // zIndex: theme.zIndex.appBar,
    },
    gridContainer: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
    },

    leftStores: {
      display: "flex",
      alignItems: "center",
    },
    locationImg: {
      width: 15,
      cursor: "pointer",
    },
    stores: {
      color: "var(--white)",
      marginLeft: theme.spacing(1),
      cursor: "pointer",
    },
    centerLogo: {
      textAlign: "center",
    },
    rightIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    Img: {
      cursor: "pointer",
    },
    badge: {
      color: "var(--white)",
      "& .MuiBadge-badge": {
        fontSize: 15,
        top: -5,
        right: -2,
      },
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    cursor: {
      cursor: "pointer",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [mobileMenus, setMobileMenus] = React.useState([]);
  const [loginAlert, showLoginAlert] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAuthToken()) dispatch(getShoppingBagList());
    if (isAuthenticated()) {
      dispatch(getWishList({ limit: 10, page: 1 }));
    }
  }, []);
  const pathname = history?.location?.pathname || "";
  useEffect(() => {
    if (!pathname.includes("/p/") && !pathname.includes("/c/"))
      dispatch({ type: "mobile-applied-filters", payload: null });
  }, [pathname]);

  const totalItems = useSelector((state: ReducersModal) => {
    return (
      (state.shoppingBagReducer.totalItems ?? 0) -
      (state.shoppingBagReducer.freeProductCount ?? 0)
    );
  });
  const totalCount = useSelector(
    (state: ReducersModal) => state.wishlistReducer.totalCount
  );
  const { authToken } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );
  const menuData = useSelector(
    (state: ReducersModal) => state.homeReducer.menuData
  );

  const handleSuggestionClick = (item: any) => {
    dispatch({ type: "mobile-applied-filters", payload: null });
    setOpen(false);
    let url = `${Utils.CommonFunctions.replaceUrlParams(
      Utils.routes.PRODUCT_SEARCH_LIST,
      { ":keyword": item }
    )}?isSearched=true`;
    history.push(url);
    // history.push(`productss`)
  };

  const handleProductClick = (item: any, type: "search" | "trending") => {
    setOpen(false);
    // history.push(
    //   `${Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL, {
    //     ":id": id,
    //   })}?isSearched=true`
    // );
    dispatch({ type: "mobile-applied-filters", payload: null });
    if (type == "search") {
      history.push({ pathname: `/${item.url}`, search: "?isSearched=true" });
    } else if (type == "trending") {
      let pathname = `${Utils.CommonFunctions.seoUrl(item, "pdp")}`;
      history.push({ pathname, search: "?isSearched=true" });
    }
    // history.push(`productss`)
  };
  const [menusData, setMenusData] = React.useState(menuData);

  let obj: any = {
    limit: 10,
    page: 1,
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (authToken) {
      if (!menuData.length) {
        let url = Utils.CommonFunctions.replaceUrlParams(
          Utils.endPoints.MENU_LIST,
          obj
        );
        request
          .get(url)
          .then((resp) => {
            let menuRespData = resp.data.data.filter(
              (value: any, index: number) => value.id !== null
            );
            setMenusData(menuRespData);
            dispatch({
              type: Utils.ActionName.MENU_DATA,
              payload: { menuData: menuRespData },
            });
          })
          .catch((err) => {});
      }
      // getPLPCategories()
      //   .then((resp) => {

      //     setMobileMenus(resp?.data?.data?.data);
      //   })
      //   .catch((err) => {
      //   });
    }
  }, [authToken]);

  const redirectToHome = () => {
    dispatch(showSkeleton());
    dispatch(
      getHomeData(() => {
        dispatch(hideSkeleton());
      })
    );
    history.push("/");
  };

  return (
    <>
      <MessageDialogue
        cancelText={"Cancel"}
        okText={"Okay"}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          history.push(`${Utils.routes.LOGIN_OTP}`);
          showLoginAlert(false);
        }}
        message={"Please login to proceed"}
        heading={"The Body Shop"}
        headingClass={classes.messageHeading}
      />
      <Hidden xsDown>
        <div className={classes.stickyHeader}>
          <div className={classes.headerRoot}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={3}>
                <div className={classes.leftStores}>
                  {/* <Link to="/stores" className={classes.leftStores}> */}
                  <img
                    src={Utils.images.LOCATION}
                    alt="location"
                    className={classes.locationImg}
                    onClick={() => history.push(Utils.routes.STORE)}
                  />
                  <Typography
                    className={classes.stores}
                    variant="body1"
                    onClick={() => history.push(Utils.routes.STORE)}
                  >
                    STORES
                  </Typography>
                  {/* </Link> */}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.centerLogo}>
                  {/* <Link to="/"> */}
                  <div>
                    <img
                      src={Utils.images.LOGO}
                      alt="logo"
                      className={classes.Img}
                      onClick={redirectToHome}
                    />
                  </div>
                  {/* </Link> */}
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.rightIcon}>
                  {/* <Link to="" >  */}
                  <img
                    src={Utils.images.SEARCH}
                    alt="search"
                    className={classes.Img}
                    onClick={() => setOpen(true)}
                  />

                  {/* </Link> */}
                  <div
                    className={classes.cursor}
                    onClick={() => {
                      if (isAuthenticated())
                        history.push(Utils.routes.WISHLIST);
                      else showLoginAlert(true);
                    }}
                  >
                    <Badge badgeContent={totalCount} className={classes.badge}>
                      <img src={Utils.images.HEART_FILLED} alt="favorite" />
                    </Badge>
                  </div>
                  {/* {
                  isAuthenticated() ? */}

                  <div
                    className={classes.cursor}
                    onClick={() => {
                      if (isAuthenticated()) {
                        dispatch(showLoader());
                        dispatch(getDashboardData());
                        dispatch(
                          getUserProfile(() => {
                            dispatch(hideLoader());
                            history.push(Utils.routes.MY_PROILE);
                          })
                        );
                      } else if (
                        history?.location?.pathname !== "/login-via-otp"
                      ) {
                        showLoginAlert(true);
                      }
                    }}
                  >
                    <img src={Utils.images.PROFILE} alt="profile" />
                  </div>

                  {/* <Link to="/shopping-modal"> */}
                  <Badge badgeContent={totalItems} className={classes.badge}>
                    <img
                      src={Utils.images.CART}
                      alt="cart"
                      className={classes.Img}
                      onClick={() => history.push("/shopping-bag")}
                    />
                  </Badge>
                  {/* </Link> */}
                </div>
              </Grid>
            </Grid>
          </div>
          {menusData.length ? <MiniHeader menuData={menusData} /> : null}
        </div>
      </Hidden>

      <SearchIndex
        open={open}
        onClose={() => setOpen(false)}
        handleSuggestionClick={handleSuggestionClick}
        handleProductClick={handleProductClick}
      />

      <Hidden smUp>
        <MobileHeader handleClick={() => setOpen(true)} menuData={menusData} />
      </Hidden>
    </>
  );
};

export default Header;
