import {
  makeStyles,
  createStyles,
  Theme,
  Divider,
  Typography,
  Hidden,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Utils from "../../utils";
import request from "../../utils/request";
import { showLoader, hideLoader } from "../home/actions";
import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../../utils/session";
import { Logout } from "../../utils/event/action";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import VerifyEmail from "../../components/common/verifyEmail";
import { ReducersModal } from "../../models";
import { sendOtp, verifyOtp } from "../../components/common/otp/action";
import MessageDialog from "../../components/common/messageDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      // padding: theme.spacing(0, 2),
      background: "var(--white)",
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
            "& > a": {
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
              backgroundImage: `url(${Utils.images.SIGNOUT_FILLED})`,
            },
          },
          "&:hover": {
            borderLeft: "3px solid var(--main-opacity)",
            borderRadius: "0px 2px 2px 0px",
          },
          "& >  a": {
            padding: theme.spacing(0, 2),
            height: 30,
            color: "var(--black)",
            display: "flex",
            alignItems: "center",
            font: "normal 400 16px Work Sans",
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
                backgroundImage: `url(${Utils.images.SIGNOUT_FILLED})`,
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
              backgroundImage: `url(${Utils.images.SIGNOUT})`,
            },
          },
        },
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
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
  })
);

const SideList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params: any = useParams();
  const location = useLocation();
  const [timer, setTimer] = useState(0);
  const [settingsOpen, setSettingOpen] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [signoutPopup, showSignoutPop] = useState(false);
  const resendOtpTime = useSelector(
    (state: ReducersModal) =>
      state.configReducer?.generalConfigs?.resend_otp_time
  );
  let platformType = localStorage.getItem("googleId") ? "Google":"Web";
  const handleClick = () => {
    dispatch(showLoader());
    
    request
      .patch(Utils.endPoints.LOGOUT)
      .then((resp) => {
        removeSession();
        let eventPayload = {
          Platform: platformType
        };
        Logout(eventPayload);
        dispatch(hideLoader());
        dispatch({ type: "RESET_STORE" });
        // window.location.href = Utils.routes.LOGIN_OTP
        // history.push(Utils.routes.LOGIN_OTP);
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert",
            payload: {
              type: "error",
              message: err.response.data.message,
            },
          });
      });
  };

  const orderRoutes = [Utils.routes.ORDER_HISTORY, "/order/detail"];
  const data =
    useSelector((state: ReducersModal) => state.userDetailReducer).userInfo ||
    {};

  // const redirectToOrderHistory = () => {
  //   props.checkOrderlistHasData();
  // };
  const onSettingsClick = () => {
    setSettingOpen(!settingsOpen);
  };
  const payload: any = {
    type: "profile",
    otpVia: "email",
    email: data.email,
  };

  const sendOtpOnClick = () => {
    dispatch(
      sendOtp(payload, () => {
        setTimer(Date.now() + resendOtpTime * 1000);
      })
    );
  };

  const handleSetPasswordClick = () => {
    if (!data?.isEmailVerified) {
      // || email !== data.email) {
      setShowVerifyEmail(true);
      // payload.email = email
      // setEmail(email)
      // dispatch(sendOtp(payload));
      sendOtpOnClick();
    } else {
      window.scrollTo(0, 0);
      history.push({
        pathname: Utils.routes.CHANGE_PASSWORD,
        state: { setPassword: true },
      });
    }
  };

  const verify = (otp: string | undefined) => {
    dispatch(showLoader());
    payload.OTP = otp;
    dispatch(
      verifyOtp(payload, (data: any) => {
        if (data.httpCode === 201 || data.httpCode === 200) {
          window.scrollTo(0, 0);
          // setEmailVerified(true);
          setShowVerifyEmail(false);
          history.push({
            pathname: Utils.routes.CHANGE_PASSWORD,
            state: { setPassword: true },
          });
        }
        dispatch(hideLoader());
      })
    );
  };

  return (
    <>
      <div className={classes.outerDiv}>
        <ul>
          {/* <li onClick={()=>props.setCurrentField('myAccount')} className={(location.pathname === Utils.routes.MY_PROILE&&(!props?.noDataField||props?.noDataField==='')) ? "active" : ""}> */}
          <li
            key="myAccount"
            className={
              location.pathname === Utils.routes.MY_PROILE ? "active" : ""
            }
          >
            <Link
              to={{
                pathname: Utils.routes.MY_PROILE,
                state: { accountVisibile: false },
              }}
            >
              <span className="icon myAccount"></span>
              My Account
            </Link>
          </li>
          <li
            key={"myDashboard"}
            className={
              ["dashboard", "rewards", "vouchers"].indexOf(params?.slug) > -1
                ? "active"
                : ""
            }
          >
            <Link
              to={{
                pathname: Utils.CommonFunctions.replaceUrlParams(
                  Utils.routes.LYBC,
                  { ":slug": "dashboard" }
                ),
              }}
              // to={Utils.routes.LYBC}
            >
              <span className="icon myDashboard"></span>
              My Dashboard
            </Link>
          </li>
          <li
            key={"wallet"}
            className={
              location.pathname === Utils.routes.WALLET ? "active" : ""
            }
          >
            <Link to={Utils.routes.WALLET}>
              <span className="icon wallet"></span>
              My Wallet
            </Link>
          </li>
          <li
            // onClick={() => {
            //   redirectToOrderHistory();
            //   props.setCurrentField('orderHistory')
            // }}
            // className={props?.currentField === 'orderHistory' ? "active" : ""}
            // className={location.pathname === Utils.routes.ORDER_HISTORY ? "active" : ""}
            className={location.pathname.indexOf("/order") > -1 ? "active" : ""}
            // className={orderRoutes.includes(location.pathname) ? "active" : ""}
          >
            <Link to={Utils.routes.ORDER_HISTORY}>
              <span className="icon order"></span>
              My Orders
            </Link>
          </li>
          <li
            key={"wishlist"}
            className={
              location.pathname === Utils.routes.WISHLIST ? "active" : ""
            }
          >
            <Link to={Utils.routes.WISHLIST}>
              <span className="icon wishlist"></span>
              My Wishlist
            </Link>
          </li>
          <li
            className={
              location.pathname === Utils.routes.ADDRESS ? "active" : ""
            }
            // className={props?.currentField === 'addresses' ? "active" : ""}
            key={"addresses"}
          >
            <Link to={Utils.routes.ADDRESS}>
              <span className="icon address"></span>
              My Address
            </Link>
          </li>
          <Divider light />
          {/* <li key={"paymentMethods"}
          >
            <Link to="/">
              <span className="icon gift"></span>
              My Gift Card
            </Link>
          </li>
          <li key={"rewards"}>
            <Link to={Utils.routes.BANKOFFER}>
              <span className="icon points"></span>
              My Offer and Store Offer
            </Link>
          </li> */}
          <li
            key={"payments"}
            className={
              location.pathname === Utils.routes.PAYMENT_METHOD ? "active" : ""
            }
          >
            <Link to={Utils.routes.PAYMENT_METHOD}>
              <span className="icon payments"></span>
              My Payment Methods
            </Link>
          </li>

          <li
            key={"preferences"}
            className={
              location.pathname === Utils.routes.SKIN_PREFERENCE ? "active" : ""
            }
          >
            <Link to={Utils.routes.SKIN_PREFERENCE}>
              <span className="icon preferences"></span>
              My Skin Preferences
            </Link>
          </li>
          <Divider light />
          <li
            key={"settings"}
            className={
              location.pathname === Utils.routes.CHANGE_PASSWORD ||
              location.pathname === Utils.routes.NOTIFICATION
                ? "active"
                : ""
            }
          >
            <a href="javascript:void(0)" onClick={() => onSettingsClick()}>
              <span className="icon settings"></span>
              Settings
            </a>
            {(settingsOpen ||
              location.pathname === Utils.routes.CHANGE_PASSWORD ||
              location.pathname === Utils.routes.NOTIFICATION) && (
              <div className={classes.outerDiv}>
                <ul>
                  {!data.isPasswordGenerated ? (
                    <li
                      onClick={() => handleSetPasswordClick()}
                      className={
                        location.pathname === Utils.routes.CHANGE_PASSWORD
                          ? "active"
                          : ""
                      }
                      key="settings-change-password"
                    >
                      <a href="#">
                        <span className="icon"></span>
                        Set Password
                      </a>
                    </li>
                  ) : (
                    <li
                      // onClick={() => handleSetPasswordClick()}
                      className={
                        location.pathname === Utils.routes.CHANGE_PASSWORD
                          ? "active"
                          : ""
                      }
                      key="settings-change-password"
                    >
                      <Link to={Utils.routes.CHANGE_PASSWORD}>
                        <span className="icon"></span>
                        Change Password
                      </Link>
                    </li>
                  )}
                  <li
                    className={
                      location.pathname === Utils.routes.NOTIFICATION
                        ? "active"
                        : ""
                    }
                    key="settings-notification"
                  >
                    <Link to={Utils.routes.NOTIFICATION}>
                      <span className="icon"></span>
                      Notifications
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li
            key={"faq"}
            className={
              location.pathname === Utils.routes.HELP_SUPPORT ? "active" : ""
            }
          >
            <Link to={Utils.routes.HELP_SUPPORT}>
              <span className="icon faq"></span>
              Order Related Queries
            </Link>
          </li>
          {/* <li key={"profile"}>
            <Link to="/">
              <span className="icon profile"></span>
              Profile
            </Link>
          </li>

          <li key={"password"}>
            <Link to="/">
              <span className="icon password"></span>
              Update Password
            </Link>
          </li> */}

          <Divider light />
          <li key={"signOut"}>
            <a href="javascript:;" onClick={() => showSignoutPop(true)}>
              <span className="icon signout"> </span>
              {/* Sign Out */}
              Logout
            </a>
          </li>
        </ul>
        {showVerifyEmail && (
          <VerifyEmail
            removeEdit={true}
            resendOtp={sendOtpOnClick}
            verifyOtp={verify}
            showVerifyEmail={showVerifyEmail}
            currentDate={Date.now()}
            timer={timer}
            email={data?.email || ""}
            onClose={() => {
              setTimer(0);
              setShowVerifyEmail(false);
            }}
          />
        )}

        {
          <MessageDialog
            closePopUp={false}
            onClosePopUp={() => showSignoutPop(false)}
            open={signoutPopup}
            onOk={handleClick}
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

export default SideList;
