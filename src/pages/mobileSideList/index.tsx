import { makeStyles, createStyles, Theme, Divider } from "@material-ui/core";
import Utils from "../../utils";
import request from "../../utils/request";
import { showLoader, hideLoader } from "../home/actions";
import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../../utils/session";
import { useHistory, useLocation } from "react-router";
import { useState } from "react";
import { ReducersModal } from "../../models";
import { sendOtp, verifyOtp } from "../../components/common/otp/action";
import VerifyEmail from "../../components/common/verifyEmail";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbDiv: {
      margin: theme.spacing(2, 0),
    },
    outerDiv: {
      // padding: theme.spacing(0, 2),
      background: "white",
      top: "22%",
      position: "sticky",

      // boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      "& > ul": {
        listStyle: "none",

        "& > li": {
          padding: theme.spacing(1.5, 0),
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              height: 24,
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

const MobileSideList = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [settingsOpen, setSettingOpen] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [timer, setTimer] = useState(0);
  const location = useLocation();
  const resendOtpTime = useSelector(
    (state: ReducersModal) =>
      state.configReducer?.generalConfigs?.resend_otp_time
  );

  const data =
    useSelector((state: ReducersModal) => state.userDetailReducer).userInfo ||
    {};

  const payload: any = {
    type: "profile",
    otpVia: "email",
    email: data.email,
  };
  // const handleClick = () => {
  //   dispatch(showLoader());
  //   request
  //     .patch(Utils.endPoints.LOGOUT)
  //     .then((resp) => {
  //       dispatch(hideLoader());
  //       removeSession();
  //       dispatch({ type: "RESET_STORE" });
  //       history.push(Utils.routes.LOGIN_OTP);
  //     })
  //     .catch((err) => {
  //       dispatch(hideLoader());
  //       if (err?.response?.data?.message)
  //         dispatch({
  //           type: "show-alert",
  //           payload: {
  //             type: "error",
  //             message: err.response.data.message,
  //           },
  //         });
  //     });
  // };
  const orderRoutes = [Utils.routes.ORDER_HISTORY, "/order-detail"];

  // const redirectToOrderHistory = () => {
  //   props.checkOrderlistHasData();
  // };
  const onSettingsClick = () => {
    setSettingOpen(!settingsOpen);
  };

  const sendOtpOnClick = () => {
    dispatch(
      sendOtp(payload, () => {
        setTimer(Date.now() + resendOtpTime * 1000);
      })
    );
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
            state: { setPassword: true, pageName: "Update Password" },
          });
        }
        dispatch(hideLoader());
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
        state: { pageName: "Update Password", setPassword: true },
      });
    }
  };

  return (
    <>
      {/* <div className={classes.breadcrumbDiv}>
        <BreadCrumb
          breadcrumb={[
            { title: "Home", action: "/" },
            { title: " My Account", action: "/shopping-bag" },
          ]}
        />
      </div> */}

      <div className={classes.outerDiv}>
        <ul>
          {/* <li onClick={()=>props.setCurrentField('myAccount')} className={(location.pathname === Utils.routes.MY_PROILE&&(!props?.noDataField||props?.noDataField==='')) ? "active" : ""}> */}
          {/* <li
            key="myAccount"
            className={
              location.pathname === Utils.routes.MY_PROILE ? "active" : ""
            }
          >
            <div
              to={{
                pathname: Utils.routes.MY_PROILE,
                state: { accountVisibile: false },
              }}
            >
              <span className="icon myAccount"></span>
              My Account
            </div>
          </li> */}

          {/* <li
            onClick={() => history.push({ pathname: Utils.routes.CHANGE_PASSWORD, state: { pageName: "Change Password" } })}
            key={"change password"}
            className={
              location.pathname === Utils.routes.CHANGE_PASSWORD
                ? "active"
                : ""
            }
          >
            <div
            // to={Utils.routes.CHANGE_PASSWORD}
            >
              <span className="icon update_password"></span>
              Change Password
            </div>
          </li> */}

          {!data.isPasswordGenerated ? (
            <li
              onClick={() => handleSetPasswordClick()}
              className={
                location.pathname === Utils.routes.CHANGE_PASSWORD
                  ? "active"
                  : ""
              }
              key="set-password"
            >
              <div>
                <span className="icon update_password"></span>
                Set Password
              </div>
              <div>
                <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
              </div>
            </li>
          ) : (
            <li
              onClick={() =>
                history.push({
                  pathname: Utils.routes.CHANGE_PASSWORD,
                  state: { pageName: "Update Password" },
                })
              }
              className={
                location.pathname === Utils.routes.CHANGE_PASSWORD
                  ? "active"
                  : ""
              }
              key="change-password"
            >
              <div>
                <span className="icon update_password"></span>
                Update Password
              </div>
              <div>
                <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
              </div>
            </li>
          )}

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.NOTIFICATION,
                state: { pageName: "Notifications" },
              })
            }
            className={
              location.pathname === Utils.routes.NOTIFICATION ? "active" : ""
            }
            key="notification"
          >
            <div
            // to={Utils.routes.NOTIFICATION}
            >
              <span className="icon notification"></span>
              Notifications
            </div>
            <div>
              <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
            </div>
          </li>

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.ABOUT_US,
                state: { pageName: "About" },
              })
            }
            key={"about"}
            className={
              location.pathname === Utils.routes.ABOUT_US ? "active" : ""
            }
          >
            <div
            // to={Utils.routes.ABOUT_US}
            >
              <span className="icon about"></span>
              About
            </div>
            <div>
              <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
            </div>
          </li>

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.TERMS_CONDITION,
                state: { pageName: "Terms and Conditions" },
              })
            }
            key={"termsAndConditions"}
            className={
              location.pathname === Utils.routes.TERMS_CONDITION ? "active" : ""
            }
          >
            <div
            // to={Utils.routes.TERMS_CONDITION}
            >
              <span className="icon terms"></span>
              Terms and Conditions
            </div>
            <div>
              <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
            </div>
          </li>

          <li
            onClick={() =>
              history.push({
                pathname: Utils.routes.PRIVACY_POLICY,
                state: { pageName: "Privacy Policy" },
              })
            }
            key={"privacyPolicy"}
            className={
              location.pathname === Utils.routes.PRIVACY_POLICY ? "active" : ""
            }
          >
            <div
            // to={Utils.routes.PRIVACY_POLICY}
            >
              <span className="icon privacy"></span>
              Privacy Policy
            </div>
            <div>
              <img src={Utils.images.ARROW_NEXT} alt="nextImage" />
            </div>
          </li>
          {/* <Divider light />
          <li key={"signOut"}>
            <div onClick={() => handleClick()}>
              <span className="icon signout"> </span>
              Sign Out
            </div>
          </li> */}
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
      </div>
    </>
  );
};

export default MobileSideList;
