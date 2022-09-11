import { makeStyles, createStyles, Theme, Divider, Typography } from "@material-ui/core";
import Utils from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useState } from "react";
import { ReducersModal } from "../../../models";
import LybcRewards from "../../../components/headers/lybcRewards";
import { useParams } from "react-router-dom";
import MobileMyAccountHeader from "./mobileMyAccountHeader";
import { hideLoader, showLoader } from "../../home/actions";
import { logout } from "../profile/action";
import MessageDialog from "../../../components/common/messageDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbDiv: {
      margin: theme.spacing(2, 0),
    },
    divider: {
      color: "#F2F2F2",
      margin: "0px 10px",
      opacity: 0.5,
    },
    rewards: {
      padding: "20px 0px",
    },
    outerDiv: {
      // padding: theme.spacing(0, 2),
      background: "white",
      top: "22%",
      position: "sticky",
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      "& > ul": {
        listStyle: "none",

        "& > li": {
          padding: theme.spacing(1, 0),
          "&.active": {
            borderLeft: "3px solid var(--main-opacity)",
            borderRadius: "0px 2px 2px 0px",
            "& > div": {
              color: "var(--main-opacity)",
              fontWeight: 600,
            },
            "& .myAccount": {
              backgroundImage: `url(${Utils.images.MY_ACCOUNT_FILLED})`,
            },
            "& .myDashboard": {
              backgroundImage: `url(${Utils.images.MY_DASHBOARD_FILLED})`,
            },
            "& .profile": {
              backgroundImage: `url(${Utils.images.PROFILE_FILLED})`,
            },
            "& .gift": {
              backgroundImage: `url(${Utils.images.GIFT_FILLED})`,
            },
            "& .preferences": {
              backgroundImage: `url(${Utils.images.SKIN_FILLED})`,
            },
            "& .settings": {
              backgroundImage: `url(${Utils.images.SETTING_FILLED})`,
            },
            "& .password": {
              backgroundImage: `url(${Utils.images.PASSWORD_FILLED})`,
            },
            "& .wishlist": {
              backgroundImage: `url(${Utils.images.WISHLIST_FILLED})`,
            },
            "& .wallet": {
              backgroundImage: `url(${Utils.images.WALLET_FILLED})`,
            },
            "& .points": {
              backgroundImage: `url(${Utils.images.REWARDS_FILLED})`,
            },
            "& .order": {
              backgroundImage: `url(${Utils.images.ORDER_FILLED})`,
            },
            "& .address": {
              backgroundImage: `url(${Utils.images.ADDRESS_FILLED})`,
            },
            "& .payments": {
              backgroundImage: `url(${Utils.images.CARD_FILLED})`,
            },
            "& .faq": {
              backgroundImage: `url(${Utils.images.FAQ_FILLED})`,
            },
            "& .signout": {
              backgroundImage: `url(${Utils.images.SIGN_OUT})`,
            },
            "& .privacy": {
              backgroundImage: `url(${Utils.images.PRIVACY_POLICY})`,
            },
            "& .terms": {
              backgroundImage: `url(${Utils.images.TERMS})`,
            },
            "& .about": {
              backgroundImage: `url(${Utils.images.ABOUT})`,
            },
            "& .tutorial": {
              backgroundImage: `url(${Utils.images.TUTORIAL})`,
            },
            "& .notification": {
              backgroundImage: `url(${Utils.images.NOTIFICATION})`,
            },
            "& .update_password": {
              backgroundImage: `url(${Utils.images.UPDATE_PASSWORD})`,
            },
          },
          "&:hover": {
            borderLeft: "3px solid var(--main-opacity)",
            borderRadius: "0px 2px 2px 0px",
          },
          "& >  div": {
            padding: theme.spacing(0, 2),
            height: 30,
            color: "var(--black)",
            display: "flex",
            alignItems: "center",
            font: "normal 400 16px Work Sans",
            [theme.breakpoints.down("xs")]: {
              font: "normal 14px Work Sans Medium",
              letterSpacing: "0.02em"
            },
            "&:hover": {
              color: "var(--main-opacity)",
              fontWeight: 600,
              "& .myAccount": {
                backgroundImage: `url(${Utils.images.MY_ACCOUNT_FILLED})`,
              },
              "& .myDashboard": {
                backgroundImage: `url(${Utils.images.MY_DASHBOARD_FILLED})`,
              },
              "& .profile": {
                backgroundImage: `url(${Utils.images.PROFILE_FILLED})`,
              },
              "& .gift": {
                backgroundImage: `url(${Utils.images.GIFT_FILLED})`,
              },
              "& .preferences": {
                backgroundImage: `url(${Utils.images.SKIN_FILLED})`,
              },
              "& .settings": {
                backgroundImage: `url(${Utils.images.SETTING_FILLED})`,
              },
              "& .password": {
                backgroundImage: `url(${Utils.images.PASSWORD_FILLED})`,
              },
              "& .wishlist": {
                backgroundImage: `url(${Utils.images.WISHLIST_FILLED})`,
              },
              "& .wallet": {
                backgroundImage: `url(${Utils.images.WALLET_FILLED})`,
              },
              "& .points": {
                backgroundImage: `url(${Utils.images.REWARDS_FILLED})`,
              },
              "& .order": {
                backgroundImage: `url(${Utils.images.ORDER_FILLED})`,
              },
              "& .address": {
                backgroundImage: `url(${Utils.images.ADDRESS_FILLED})`,
              },
              "& .payments": {
                backgroundImage: `url(${Utils.images.CARD_FILLED})`,
              },
              "& .faq": {
                backgroundImage: `url(${Utils.images.FAQ_FILLED})`,
              },
              "& .signout": {
                backgroundImage: `url(${Utils.images.SIGN_OUT})`,
              },
              "& .privacy": {
                backgroundImage: `url(${Utils.images.PRIVACY_POLICY})`,
              },
              "& .terms": {
                backgroundImage: `url(${Utils.images.TERMS})`,
              },
              "& .about": {
                backgroundImage: `url(${Utils.images.ABOUT})`,
              },
              "& .tutorial": {
                backgroundImage: `url(${Utils.images.TUTORIAL})`,
              },
              "& .notification": {
                backgroundImage: `url(${Utils.images.NOTIFICATION})`,
              },
              "& .update_password": {
                backgroundImage: `url(${Utils.images.UPDATE_PASSWORD})`,
              },
            },
            "& .icon": {
              height: 20,
              width: 20,
              // backgroundSize: 20,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "inline-block",
              marginRight: theme.spacing(1),
            },
            "& .myAccount": {
              backgroundImage: `url(${Utils.images.MY_ACCOUNT})`,
            },
            "& .myDashboard": {
              backgroundImage: `url(${Utils.images.MY_DASHBOARD})`,
            },
            "& .profile": {
              backgroundImage: `url(${Utils.images.PROFILE_OUTLINE})`,
            },
            "& .gift": {
              backgroundImage: `url(${Utils.images.PROFILE_GIFT})`,
            },
            "& .preferences": {
              backgroundImage: `url(${Utils.images.SKIN})`,
            },
            "& .settings": {
              backgroundImage: `url(${Utils.images.SETTING})`,
            },
            "& .password": {
              backgroundImage: `url(${Utils.images.PASSWORD})`,
            },
            "& .wishlist": {
              backgroundImage: `url(${Utils.images.WISHLIST})`,
            },
            "& .wallet": {
              backgroundImage: `url(${Utils.images.WALLET})`,
            },
            "& .points": {
              backgroundImage: `url(${Utils.images.REWARDS})`,
            },
            "& .order": {
              backgroundImage: `url(${Utils.images.ORDER})`,
            },
            "& .address": {
              backgroundImage: `url(${Utils.images.ADDRESS})`,
            },
            "& .payments": {
              backgroundImage: `url(${Utils.images.CARD})`,
            },
            "& .faq": {
              backgroundImage: `url(${Utils.images.FAQ})`,
            },
            "& .signout": {
              backgroundImage: `url(${Utils.images.SIGN_OUT})`,
            },
            "& .privacy": {
              backgroundImage: `url(${Utils.images.PRIVACY_POLICY})`,
            },
            "& .terms": {
              backgroundImage: `url(${Utils.images.TERMS})`,
            },
            "& .about": {
              backgroundImage: `url(${Utils.images.ABOUT})`,
              padding: "11px",
            },
            "& .tutorial": {
              backgroundImage: `url(${Utils.images.TUTORIAL})`,
            },
            "& .notification": {
              backgroundImage: `url(${Utils.images.NOTIFICATION_ICON})`,
            },
            "& .update_password": {
              backgroundImage: `url(${Utils.images.UPDATE_PASSWORD})`,
            },
          },
        },
      },
    },
    description: {
      font: `normal 500 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#333333",
      textAlign: "center",
      // display:"flex"
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    // divdiv: {
    //   padding: theme.spacing(0, 2),
    //   // height: 30,
    //   color: "var(--black)",
    //   display: "flex",
    //   alignItems: "center",
    //   font: "normal 400 16px Work Sans",

    //   '& .icon': {
    //     height: 20,
    //     width: 20,
    //     backgroundImage: `url(${Utils.images.ORDER})`,

    //     // backgroundSize: 20,
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //     display: "inline-block",
    //     marginRight: theme.spacing(1)
    //   },

    //   '&:hover': {
    //     color: "var(--main-opacity)",
    //     fontWeight: 600,
    //     '& .myAccount': {
    //       backgroundImage: `url(${Utils.images.MY_ACCOUNT_FILLED})`,
    //     },
    //     '& .profile': {
    //       backgroundImage: `url(${Utils.images.PROFILE_FILLED})`,
    //     },
    //     '& .preferences': {
    //       backgroundImage: `url(${Utils.images.SETTING_FILLED})`,
    //     },
    //     '& .password': {
    //       backgroundImage: `url(${Utils.images.PASSWORD_FILLED})`,
    //     },
    //     '& .wishlist': {
    //       backgroundImage: `url(${Utils.images.WISHLIST_FILLED})`,
    //     },
    //     '& .order': {
    //       backgroundImage: `url(${Utils.images.ORDER_FILLED})`,
    //     },
    //     // '&:hover': {
    //     //   color: "var(--main-opacity)",
    //     //   fontWeight: 600,
    //     //   '& .myAccount': {
    //     //     backgroundImage: `url(${Utils.images.MY_ACCOUNT_FILLED})`,
    //     //   },
    //     //   '& .profile': {
    //     //     backgroundImage: `url(${Utils.images.PROFILE_FILLED})`,
    //     //   },
    //     //   '& .preferences': {
    //     //     backgroundImage: `url(${Utils.images.SETTING_FILLED})`,
    //     //   },
    //     //   '& .password': {
    //     //     backgroundImage: `url(${Utils.images.PASSWORD_FILLED})`,
    //     //   },
    //     //   '& .wishlist': {
    //     //     backgroundImage: `url(${Utils.images.WISHLIST_FILLED})`,
    //     //   },
    //     //   '& .order': {
    //     //     backgroundImage: `url(${Utils.images.ORDER_FILLED})`,
    //     //   },
    //   },
    // }
  })
);

const MobileMyAccount = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params: any = useParams();
  const [signoutPopup, showSignoutPop] = useState(false);

  //   const [settingsOpen, setSettingOpen] = useState(false);
  //   const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [timer, setTimer] = useState(0);
  const location = useLocation();
  //   const resendOtpTime = useSelector((state: ReducersModal) => state.configReducer?.generalConfigs?.resend_otp_time);
  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const data =
    useSelector((state: ReducersModal) => state.userDetailReducer).userInfo ||
    {};

  const payload: any = {
    type: "profile",
    otpVia: "email",
    email: data.email,
  };
  const handleClick = () => {
    showSignoutPop(true);
    // dispatch(logout(() => {
    //   history.push(Utils.routes.LOGIN_OTP);
    // }))

  };

  const orderRoutes = [Utils.routes.ORDER_HISTORY, "/order-detail"];
  const logoutCall = () => {
    dispatch(showLoader());
    dispatch(logout())
  };

  // const redirectToOrderHistory = () => {
  //   props.checkOrderlistHasData();
  // };

  return (
    <>
      <MobileMyAccountHeader />
      {userInfo?.tierType == 2 || userInfo?.tierType === 1 ? (
        <div className={classes.rewards}>
          <LybcRewards userInfo={userInfo} />
        </div>
      ) : null}

      <Divider className={classes.divider} />

      <div className={classes.outerDiv}>
        <ul>
          <li
            key={"myDashboard"}
            className={
              ["dashboard", "rewards", "vouchers"].indexOf(params?.slug) > -1
                ? "active"
                : ""
            }
          >
            <div
              onClick={() => {
                history.push({
                  pathname: Utils.CommonFunctions.replaceUrlParams(
                    Utils.routes.LYBC,
                    { ":slug": "dashboard" }
                  ),
                  state: { pageName: "Love Your Body CLub" },
                });
              }}
            >
              My Dashboard
            </div>
          </li>
          <Divider className={classes.divider} />

          <li
            key={"wallet"}
            className={
              location.pathname === Utils.routes.WALLET ? "active" : ""
            }
            onClick={() =>
              history.push({
                pathname: Utils.routes.WALLET,
                state: { pageName: "My Wallet" },
              })
            }
          >
            <div>My Wallet </div>
          </li>
          <Divider className={classes.divider} />

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.ORDER_HISTORY,
                state: { pageName: "My Orders" },
              })
            }
            className={location.pathname.indexOf("/order") > -1 ? "active" : ""}
          >
            <div>My Orders</div>
          </li>
          <Divider className={classes.divider} />

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.WISHLIST,
                state: { pageName: "My Wishlist" },
              })
            }
            key={"wishlist"}
            className={
              location.pathname === Utils.routes.WISHLIST ? "active" : ""
            }
          >
            <div>My Wishlist</div>
          </li>
          <Divider className={classes.divider} />

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.ADDRESS,
                state: { pageName: "Address Book" },
              })
            }
            className={
              location.pathname === Utils.routes.ADDRESS ? "active" : ""
            }
            key="addresses"
          >
            <div>My Address</div>
          </li>
          <Divider className={classes.divider} />
          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.PAYMENT_METHOD,
                state: { pageName: "My Payment Methods" },
              })
            }
            key={"payments"}
            className={
              location.pathname === Utils.routes.PAYMENT_METHOD ? "active" : ""
            }
          >
            <div>My Payment Methods</div>
          </li>
          <Divider className={classes.divider} />
          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.BANKOFFER,
                state: { pageName: "Offers" },
              })
            }
            key={"offer"}
            className={
              location.pathname === Utils.routes.BANKOFFER ? "active" : ""
            }
          >
            <div>My Offer and Store Offer</div>
          </li>
          <Divider className={classes.divider} />
          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.SKIN_PREFERENCE,
                state: { pageName: "My Skin Preferences" },
              })
            }
            key={"preferences"}
            className={
              location.pathname === Utils.routes.SKIN_PREFERENCE ? "active" : ""
            }
          >
            <div>My Skin Preferences</div>
          </li>
          <Divider className={classes.divider} />

          <li
            onClick={handleClick}
            key={"preferences"}
          // className={
          //   location.pathname === Utils.routes.SKIN_PREFERENCE ? "active" : ""
          // }
          >
            <div>Logout</div>
          </li>
          {/* <li key={"signOut"}>
            <div onClick={() => handleClick()}>
              <span className="icon signout"> </span>
              Sign Out
            </div>
          </li> */}



        </ul>
        {
          <MessageDialog
            closePopUp={false}
            onClosePopUp={() => showSignoutPop(false)}
            open={signoutPopup}
            onOk={logoutCall}
            okText="Okay"
            headingClass={classes.messageHeading}
            heading={"Logout"}
            message={
              <Typography className={classes.description}>
                Are you sure you want to logout?
              </Typography>
            }
            cancelText="Cancel"
            handleClose={() => showSignoutPop(false)}
          />
        }
      </div>
    </>
  );
};

export default MobileMyAccount;
