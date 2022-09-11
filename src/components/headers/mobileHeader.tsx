import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  Collapse,
  Icon,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Utils from "../../utils";
import SearchField from "./searchField";
import { createStyles, Theme, Typography } from "@material-ui/core";
import { isAuthenticated } from "../../utils/session";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "./../../models";
import { useHistory, useLocation } from "react-router";
import LybcRewards from "./lybcRewards";
import clsx from "clsx";
import { getWalletBalance } from "../../pages/payment/action";
import { hideSkeleton } from "../../pages/home/actions";
// import _ from "lodash";
import { getUserProfile } from "../../pages/account/profile/action";
import { getDashboardData } from "../../pages/account/lybc/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 295,
      "& .MuiList-root": {
        padding: theme.spacing(1),
      },
      "& a": {
        color: "var(--secondary-black)",
      },
      "& .MuiListItem-root": {
        padding: theme.spacing(1.6, 0),
        // fontFamily: theme.typography.fontFamily,
        font: `normal 15px Work Sans Bold`,
        lineHeight: "24px",
        justifyContent: "space-between",
      },
    },
    listFont: {
      color: "var(--secondary-black)",
      padding: theme.spacing(1.6, 0),
      // fontFamily: theme.typography.fontFamily,
      font: `normal 15px Work Sans SemiBold !important`,
      lineHeight: "24px",
      justifyContent: "space-between",
    },
    sideBar: {
      backgroundColor: theme.palette.primary.main,
    },
    sideBarTop: {
      padding: theme.spacing(5, 1, 2, 1),
      // paddingLeft: theme.spacing(1),
      "& .MuiTypography-body2 , .MuiTypography-body1": {
        color: "var(--white)",
      },
      "& .MuiTypography-body1 span": {
        color: theme.palette.secondary.main,
      },
    },
    sideBarLogo: {
      display: "flex",
      padding: theme.spacing(2, 1),
      "& div": {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(1),

        "& .MuiTypography-body2": {
          font: `normal 20px Druk`,
          color: theme.palette.secondary.main,
          letterSpacing: "2px",
        },
        "& .MuiTypography-body1": {
          font: `normal 400  12px Work Sans`,
          color: "var(--white)",
        },
      },
    },
    logo: {
      height: "45px",
      width: "45px",
    },
    divider: {
      backgroundColor: "var(--white)",
      height: 2,
    },
    menuButton: {
      // marginRight: theme.spacing(1),
    },
    toolBarRoot: {
      display: "flex",
      position: "relative",
      // justifyContent: "space-around",
      justifyContent: "space-between",
      alignItems: "center",
    },
    root: {
      padding: theme.spacing(1, 1.6),
      backgroundColor: "var(--white)",
      // margin: theme.spacing(1, "auto"),
      maxWidth: "var(--max-width)",
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
      boxShadow: "0px 1px #f2f2f2",
    },
    rootSecond: {
      padding: theme.spacing(1, 1.6),
      backgroundColor: "var(--medium-creame-color)",
      // margin: theme.spacing(1, "auto"),
      maxWidth: "var(--max-width)",
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
      boxShadow: "0px 1px #f2f2f2",
    },
    collapse: {
      "& .MuiList-root": {
        padding: 0,
      },
      // marginLeft: theme.spacing(1.5),
      "& .MuiListItem-root": {
        font: `normal 500 14px Work Sans `,
        lineHeight: "24px",
      },
    },
    badge: {
      color: theme.palette.primary.main,
    },
    lybc: {
      marginLeft: 10,
      "& .MuiTypography-body1": {
        color: "var(--secondary-black)",
        font: "normal 400 12px Work Sans",
        lineHeight: "14.8px",
      },
      "& .MuiTypography-body2": {
        font: "normal 600 14px Work Sans",
        lineHeight: "16.42px",
      },
    },
    imgNameDivContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "6px",
    },
    img: {
      height: "30px",
      width: "30px",
      borderRadius: "50%",
      // background: "lightgrey",
      objectFit: "cover",
      marginRight: "5px",
    },
    noImage: {
      // background: "lightgrey",
      // border: "1px solid lightgrey",
      width: "30px",
      height: "30px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "50%",
      background: "#D6CD56",
      alignItems: "center",
      objectFit: "scale-down",
      padding: "5px",
      marginRight: "5px",
    },
    walletAmountDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      textTransform: "capitalize",
    },
    walletIcon: {
      width: "30px",
      height: "30px",
    },
    walletAmount: {
      font: "normal 17px Work Sans Bold",
      marginLeft: "5px",
    },
    upwardArrow: {
      transform: "rotate(180deg)",
    },
    rightSideIcons: {
      display: "flex",
      flexBasis: "20%",
      justifyContent: "space-between",
    },
    rightSideSecondIcons: {
      display: "flex",
      flexBasis: "70%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "35px",
    },
    headerGreen: {
      background: "#044236",
      color: "white",
      boxShadow: "none",
    },
    heading: {
      textAlign: "center",
      width: "90%",
      diplay: "flex",
      font: `normal 700 ${theme.spacing(2)}px Work Sans`,
      lineHeight: "23.4px",
      letterSpacing: "0.8px",
    },
    rightContent: {
      float: "right",
    },
    outerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    secndDivContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: theme.spacing(1.5),
    },
    searchIcon: {
      width: theme.spacing(2),
      height: theme.spacing(2.2),
    },
    backArrow: {
      width: theme.spacing(2.2),
      height: "auto",
    },
    welcome: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      letterSpacing: "0.6px",
    },
    description: {
      font: `normal ${theme.spacing(1.4)}px Work Sans !important`,
    },
    tierName: {
      textTransform: "capitalize",
    },
    lybcLogo: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
    },
    lybcMember: {
      marginLeft: 5,
      "& .MuiTypography-body1": {
        color: "var(--secondary-black)",
        font: "normal 400 12px Work Sans",
        lineHeight: "14.8px",
      },
      "& .MuiTypography-body2": {
        font: "normal 600 14px Work Sans",
        lineHeight: "16.42px",
      },
    },
    subMenu: {
      marginLeft: "10px !important"

    }
  })
);

export default function MobileHeader(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const pathNameArray = location?.pathname?.split("/");

  const heading = location?.state?.pageName ? 
  location?.state?.pageName : (pathNameArray?.includes("order") && pathNameArray?.includes("detail")) ? "Order Detail" : "";

  const totalItems = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer.totalItems
  );
  
  const dispatch = useDispatch();
  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const addressFlag: any = useSelector(
    (state: ReducersModal) => state.addressReducer.addressFlag
  );

  const balance =
    useSelector(
      (state: ReducersModal) => state.userDetailReducer?.walletBalance
    ) || 0;

  const [sideBar, setSideBar] = useState(false);
  const [open, setOpen] = useState<any>({});
  const [openBlock, setOpenBlock] = useState<any>({});
  const [openCategory, setOpenCategory] = useState<any>({});
  const [walletBalance, setBalance] = useState(0);
  useEffect(() => {
    setBalance(balance);
  }, [balance]);
  const [profilePicture, setProfilePicture] = useState("");
  // const dashboardData =
  //   useSelector((state: ReducersModal) => state.userDetailReducer.dashboard) ||
  //   {};
  // const date = userInfo?.tierDetails?.enrollDate || null;
  // const paymentOptions =
  //   useSelector(
  //     (state: ReducersModal) =>
  //       state.configReducer.paymentConfigs?.paymentOptions
  //   ) || [];
  // const memberData = [
  //   {
  //     title: `${userInfo?.tierDetails?.currentTier ?? "N/A"} Member`,
  //     subTitle: `Member Since  ${date ? format(new Date(date), "dd/M/yyyy") : ""
  //       }`,
  //   },
  //   {
  //     title: dashboardData?.TotalEarnedPoints || 0,
  //     subTitle: "Total Available Points ",
  //   },
  // ];
  let menuData = props.menuData;
  // const linkData = Utils.constants.linkData;

  const linkDataBeforeAuth = [
    {
      title: "Home",
      action: "/",
    },
    {
      title: "Shop By Category",
      values: [...menuData],
    },
  ];

  // const linkDataAfterAuth = [
  //   {
  //     title: "My Profile",
  //     // action: Utils.routes.MY_PROILE
  //     action: Utils.routes.MOBILE_SIDE_LIST

  //   },
  //   {
  //     title: "My WishList",
  //     action: Utils.routes.WISHLIST

  //   },
  // ];

  const navMenu = [
    ...linkDataBeforeAuth,
    // ...linkData,
    // ...(isAuthenticated() ? linkDataAfterAuth : []),
    ...(isAuthenticated()
      ? Utils.constants.mobileSideLinkData
      : Utils.constants.mobileGuestSideLinkData),
  ];

  const getBalance = () => {
    dispatch(
      getWalletBalance((resp: any) => {
        dispatch(hideSkeleton());
      })
    );
  };
  // const showMode = (code: string) => {
  //   const data = paymentOptions?.length > 0 ? _.find(paymentOptions, {
  //     code
  //   }) : false
  //   return data ? true : false
  // }
  // const toggleSubCategoryDrawer = (event: any) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  // };
  const handleLabelClick = (e: any, val: any, name: string) => {
    let pathname = Utils.CommonFunctions.seoUrl(val, "others");
    let action = val.action ?? pathname;
    history.push({
      pathname: action,
      state: {
        pageName:
          name?.toLowerCase() ===
            "order related queries"
            ? "Help & Support"
            : name?.toLowerCase() === "faq"
              ? "FAQ's"
              : "",
        // : name || "",
      },
      search: val?.search,
    });
  }
  const handleArrowClick = (e: any, subCategories: any, val: any, name: string) => {
    if (subCategories?.length)
      setOpenBlock({
        title: openBlock?.title === val?.title ? "" : val?.title,
      })
    else {
      toggleDrawer(e);
      let pathname = Utils.CommonFunctions.seoUrl(val, "others");
      let action = val.action ?? pathname;
      history.push({
        pathname: action,
        state: {
          pageName:
            name?.toLowerCase() ===
              "order related queries"
              ? "Help & Support"
              : name?.toLowerCase() === "faq"
                ? "FAQ's"
                : "",
          // : name || "",
        },
        search: val?.search,
      });
    }
  }
  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (
      !sideBar &&
      isAuthenticated()
      // &&showMode("wallet")
    ) {
      // dispatch(showLoader())
      dispatch(getUserProfile());
      getBalance();

      dispatch(getDashboardData(() => { }));
      // ()=>{
      // dispatch(hideLoader())})
      // );
    }
    setSideBar(!sideBar);
  };

  useEffect(() => {
    setProfilePicture(userInfo?.profilePicture);
  }, [userInfo?.profilePicture]);
  const img = profilePicture
    ? profilePicture
    : Utils.images.PROFILE_IMAGE_OUTLINE;

  const FirstLevelBlock = ({ val, name, key, index }: any) => {
    let subCategories: any = []
    val?.block?.forEach((block: any) => {
      subCategories = subCategories.concat(block.subcategory)
    })
    return (
      <div key={key}>
        <ListItem
          className={subCategories?.length ? classes.listFont : ""}
          key={`${index}${key}`}
        >
          {name === "Chat" ? (
            <div
              style={{ width: "100%" }}
              onClick={() => {
                //@ts-ignore
                zE.activate();
              }}
            >
              {"Chat"}
            </div>
          ) :
            <div onClick={(e) => handleLabelClick(e, val, name)}  >
              {name}
            </div>
          }
          {val.name !== "Chat" && val.name !== "Order Related Queries" && val.name !== "FAQ" && <>
            {openBlock?.title === val.title ? (
              <Icon onClick={(e) => handleArrowClick(e, subCategories, val, name)}  >
                <img
                  className={classes.upwardArrow}
                  src={Utils.images.DOWN_ARROW}
                  alt="icon"
                />
              </Icon>
            ) : (
              <Icon onClick={(e) => handleArrowClick(e, subCategories, val, name)}>
                <img src={Utils.images.DOWN_ARROW} alt="icon" />
              </Icon>
            )}
          </>
          }
        </ListItem>
        <Collapse
          in={openBlock?.title === val?.title}
          timeout="auto"
          className={classes.collapse}
          unmountOnExit
        >
          <List
            className={classes.subMenu}
            component="div"
            disablePadding
          >
            {subCategories?.map((sub: any, subIndex: number) => {
              return (
                <ListItem
                  onClick={(e) => {
                    navigate(e, sub, false, val)
                  }}
                  key={`${subIndex}${key}`}
                >
                  {sub?.title}
                </ListItem>
              )
            })}
          </List>
        </Collapse>
      </div>
    )
  }

  const navigate = (e: any, val: any, flag: boolean, parent: any) => {
    if (flag)
      setOpenCategory({
        title: openCategory?.title === val?.title ? "" : val?.title,
      })
    else {
      toggleDrawer(e);
      let pathname = Utils.CommonFunctions.seoUrl(val, "others");
      let action = val.action ?? pathname;
      history.push({
        pathname: action,
        state: {
          categoryId: parent.id
        }
      });
    }
  }

  const sideList = (side: any) => (
    <div className={classes.list} role="presentation">
      <div className={classes.sideBar}>
        <div className={classes.sideBarTop}>
          <Typography variant="body2" className={classes.welcome}>
            Welcome
          </Typography>
          {isAuthenticated() ? (
            <div className={classes.imgNameDivContainer}>
              <div className={classes.walletAmountDiv}>
                <img
                  className={
                    userInfo?.profilePicture ? classes.img : classes.noImage
                  }
                  src={img}
                  alt="icon"
                  onClick={() =>
                    history.push({
                      pathname: "/my-profile",
                      state: { pageName: "My Account" },
                    })
                  }
                />
                <Typography
                  variant="body1"
                  className={classes.walletAmount}
                  onClick={() =>
                    history.push({
                      pathname: "/my-profile",
                      state: { pageName: "My Account" },
                    })
                  }
                >
                  {userInfo?.fullName
                    ? userInfo.fullName
                    : localStorage.getItem("fullName")}
                </Typography>
              </div>
              <div
                className={classes.walletAmountDiv}
                onClick={() =>
                  history.push({
                    pathname: "/wallet",
                    state: { pageName: "My Wallet" },
                  })
                }
              >
                <img
                  className={classes.walletIcon}
                  src={Utils.images.WALLETICON}
                  alt="icon"
                />
                <Typography variant="body1" className={classes.walletAmount}>
                  {`₹${Utils.CommonFunctions.addCommaToAmount(walletBalance)}`}{" "}
                </Typography>
              </div>
            </div>
          ) : (
            <Typography variant="body1">
              Guest,
              <Link to={Utils.routes.LOGIN_OTP} onClick={toggleDrawer}>
                <span> sign in</span>
              </Link>
            </Typography>
          )}
        </div>
        <Divider className={classes.divider} />
        { // (userInfo?.tierType ===3||userInfo?.tierType === 2)
          userInfo?.tierType !== 1 && userInfo?.tierType !== 2 && (
            <div
              className={classes.sideBarLogo}
              onClick={(e: any) => {
                toggleDrawer(e);
                // redirect();
                if (!isAuthenticated())
                          history.push(Utils.routes.LOGIN_OTP);
                        else redirect();
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
                <Typography className={classes.description} variant="body1">
                  {configs?.lybc_banner_description || ""}{" "}
                </Typography>
              </div>
            </div>
          )
        }
      </div>
      {/* {(userInfo?.tierType ==2||userInfo?.tierType ===1)&&
        <div className={classes.rewardRoot}>
          <Grid container className={classes.rewardDiv}>
            {memberData.map((item: any, index: number) => (
              <div className={clsx(classes.pointBox, index === 1 ? classes.leftPointBox : "")} key={index}>
                <div className={classes.pointInner}>
                  <div className={classes.centerAlign}>
                    <Typography className={classes.point}>{item?.title}</Typography>
                  </div>
                  <div className={classes.centerAlign}>
                    <Typography className={classes.pointName}>
                      {item.subTitle}
                    </Typography>
                  </div>

                </div>
              </div>
            ))}
          </Grid>
        </div>
      } */}
      <LybcRewards userInfo={userInfo} />
      <List>
        {navMenu.map((item: any, index) =>
          "values" in item ? (
            <div key={index}>
              <ListItem
                onClick={() =>
                  setOpen({
                    title: open?.title === item.title ? "" : item?.title,
                  })
                }
              >
                {item.title}
                {open?.title === item.title ? (
                  <Icon>
                    <img
                      className={classes.upwardArrow}
                      src={Utils.images.DOWN_ARROW}
                      alt="icon"
                    />
                  </Icon>
                ) : (
                  <Icon>
                    <img src={Utils.images.DOWN_ARROW} alt="icon" />
                  </Icon>
                )}
                {/* <ListItemText primary={text} /> */}
              </ListItem>
              <Collapse
                in={open?.title === item.title}
                timeout="auto"
                unmountOnExit
                className={classes.collapse}
              >
                <List className={classes.subMenu} component="div" disablePadding>
                  {item?.values?.map((val: any, key: any) => {
                    const name = val?.name || val?.title || "";
                    return (
                      <FirstLevelBlock val={val} key={key} index={index} name={name} />

                    )
                  })}
                </List>
              </Collapse>

              <Divider light />
            </div>
          ) : (
            <div key={index}>
              <ListItem
                onClick={(e) => {
                  toggleDrawer(e);
                  if (item.action && item.title !== "Home") {
                    history.push({
                      pathname: item.action,
                      state: {
                        pageName: item?.title || "",
                        icon: Utils.images.FILTER,
                      },
                    });
                  } else {
                    let pathname = Utils.CommonFunctions.seoUrl(item, "others");
                    let action = item.action ?? pathname;
                    history.push({ pathname: action });
                  }
                }}
              >
                {/* <Link to={item.action ?? `/c/?categoryId=${item?.id}`} > */}
                {item.title}
                {/* </Link> */}
                {/* <ListItemText primary={text} /> */}
              </ListItem>
              <Divider light />
            </div>
          )
        )
        }
      </List >
    </div >
  );
  const redirect = () => {
    if (userInfo?.tierType !== 1) {
      const type = userInfo.tierType === 2 ? 1 : 2;
      history.push({
        pathname: Utils.routes.UPGRADE_MEMBERSHIP,
        state: { type, pageName: "Love Your Body Club" },
      });
    }
  };
  const tier = Utils.constants.tierType.find(
    (type: any) => type.id === userInfo?.tierType
  );
  return (
    <div
      className={
        location.pathname === "/send-gift-card"
          || location.pathname.includes("/shopping-bag")
          ? ""
          : location.pathname === "/my-profile"
            ? clsx(classes.headerGreen, classes.root)
            : location.pathname === "/login-via-otp" ||
              location.pathname === "/sign-up"
              ? classes.rootSecond
              : classes.root
      }
    >
      <div className={classes.toolBarRoot}>
        {location.pathname == "/" ? (
          <>
            <div className={classes.outerContainer}>
              <div onClick={toggleDrawer}>
                <img src={Utils.images.TOGGLE} alt="img one" />
              </div>
              {(userInfo?.tierType === 1 || userInfo?.tierType === 2) &&
                isAuthenticated() ? (
                <div className={classes.secndDivContainer}>
                  <div>
                    <div onClick={redirect}>
                      <img
                        className={classes.lybcLogo}
                        src={Utils.images.LYBC_FIVE}
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className={classes.lybcMember}>
                    <div
                      onClick={() => {
                        if (!isAuthenticated())
                          history.push(Utils.routes.LOGIN_OTP);
                        else redirect();
                      }}
                    >
                      <Typography
                        color="primary"
                        variant="body2"
                        className={classes.tierName}
                      >
                        {tier?.label
                          ? tier?.label?.toLowerCase() + " Member"
                          : ""}
                      </Typography>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes.secndDivContainer}>
                  <div>
                    <div
                      onClick={() => {
                        if (isAuthenticated()) redirect();
                        else {
                          history.push(Utils.routes.LOGIN_OTP);
                        }
                      }}
                    >
                      <img
                        className={classes.lybcLogo}
                        src={Utils.images.LYBC_FIVE}
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className={classes.lybc}>
                    <div
                      onClick={() => {
                        if (!isAuthenticated())
                          history.push(Utils.routes.LOGIN_OTP);
                        else redirect();
                      }}
                    >
                      <Typography variant="body1">Become</Typography>
                      <Typography color="primary" variant="body2">
                        LYBC Member
                      </Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {location.pathname === "/send-gift-card"
              || location.pathname.includes("/shopping-bag") ? (
              ""
            ) : (
              <div className={classes.mobileHeaderContainer}>
                <span
                  onClick={() => {
                    if (location.pathname.includes("/c/")) {
                      dispatch({
                        type: "getProductList",
                        payload: {},
                      });
                      history.push("/");
                    } else if (
                      location.pathname === "/gift-card" ||
                      location.pathname === "/shopping-bag" ||
                      location.pathname === "/not-found"
                    ) {
                      history.push("/");
                    } else if (location.pathname === Utils.routes.UPGRADE_MEMBERSHIP) {
                      const path = Utils.CommonFunctions.replaceUrlParams(Utils.routes.LYBC, { ":slug": "dashboard" })
                      history.push({
                        pathname: path,
                        state: { pageName: "Love Your Body Club" },
                      });
                    } else if (location.pathname === "/lybc/dashboard") {
                      history.push("/");

                    }
                    else {
                      if (
                        addressFlag === "Add Address" ||
                        addressFlag === "Edit Address"
                      ) {
                        dispatch({ type: "addressFlag", payload: null });
                        // history.push({
                        //   pathname:"/address",state:{
                        //     pageName:'Address Book'
                        //   }
                        // })
                      }
                      else {
                        if (location?.state?.prevRoute === Utils.routes.LOGIN_OTP) {
                          history.push("/")
                        } else {
                          history.goBack();
                        }
                      }
                    }
                  }}
                >
                  <img
                    src={
                      location.pathname === "/my-profile"
                        ? Utils.images.WHITE_ARROW
                        : Utils.images.BACK_ARROW
                    }
                    alt="backarrow"
                    className={classes.backArrow}
                  />
                </span>
                <Typography className={classes.heading}>
                  {addressFlag ? addressFlag : heading}
                </Typography>
                <div className={classes.rightContent}></div>
              </div>
            )}
          </>
        )}
        {location.pathname == "/" || location.pathname.includes("/c/") ? (
          <>
            <div
              className={clsx(
                location.pathname.includes("/c/")
                  ? classes.rightSideSecondIcons
                  : classes.rightSideIcons
              )}
            >
              {location.pathname.includes("/c/") && (
                <>
                  <div
                    className={classes.searchIcon}
                    onClick={() => history.push(Utils.routes.MOBILE_SEARCH)}
                  >
                    <img src={Utils.images.SEARCHICON} alt="google" />
                  </div>
                  <div
                    className={classes.searchIcon}
                    onClick={() =>
                      history.push({
                        pathname: Utils.routes.WISHLIST,
                        state: { pageName: "My Wishlist" },
                      })
                    }
                  >
                    <img src={Utils.images.BLACK_HEART} alt="logo" />
                  </div>
                </>
              )}
              {location.pathname == "/" && (
                <div
                  className={classes.searchIcon}
                  onClick={() =>
                    history.push({
                      pathname: Utils.routes.STORE,
                      state: { pageName: "Find Stores" },
                    })
                  }
                >
                  <img src={Utils.images.LOCATIONM} alt="logo" />
                  {/* <img src={Utils.images.BLACK_HEART} alt="logo" /> */}
                </div>
              )}
              {(location.pathname == "/" ||
                location.pathname.includes("/c/")) && (
                  <>
                    {/* <div>
                    <div
                      className={classes.searchIcon}
                      onClick={() =>
                        history.push({
                          pathname: Utils.routes.STORE,
                          state: { pageName: "Find Stores" },
                        })
                      }
                    >
                      <img src={Utils.images.LOCATIONM} alt="logo" />
                    </div>
                  </div> */}
                    <div className={classes.searchIcon}>
                      <div onClick={() => history.push({ pathname: Utils.routes.SHOPPING_BAG, state: { pageName: "My Bag" } })}>
                        <Badge
                          badgeContent={totalItems}
                          className={classes.badge}
                        >
                          <img src={Utils.images.CARTM} alt="logo" />
                        </Badge>
                      </div>
                    </div>
                    {/* <div className={classes.searchIcon}>
                      <Link to="/">
                        <img src={Utils.images.NOTIFICATION} alt="logo" />
                      </Link>
                    </div> */}
                  </>
                )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {location.pathname == "/" && (
        <>
          <SearchField
            handleClick={() => history.push(Utils.routes.MOBILE_SEARCH)}
          />
          <Drawer
            BackdropProps={{ invisible: true }}
            open={sideBar}
            onClose={toggleDrawer}
          >
            {sideList("left")}
          </Drawer>
        </>
      )}
    </div>
  );
}
