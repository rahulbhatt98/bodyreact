import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
import _ from "lodash";
import GoogleLogin from "react-google-login";
import { showLoader, hideLoader } from "../home/actions";
import request from "../../utils/request";
import { useHistory } from "react-router";
import { getAuthToken, isAuthenticated, onUserLogin, setSession } from "../../utils/session";
import { socialLogin } from "../../utils/event/action";
import events from "../../utils/event/constant";
/**
 * Modals
 */

// ** icons and images **
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orSignin: {
      position: "relative",
      margin: theme.spacing(1.5, 0),
      "&::before": {
        position: "absolute",
        content: "''",
        top: "50%",
        left: -62,
        width: 60,
        height: 1,
        backgroundColor: "var(--border-color)",
      },
      "&::after": {
        position: "absolute",
        content: "''",
        top: "50%",
        right: -62,
        width: 60,
        height: 1,
        backgroundColor: "var(--border-color)",
      },
    },
    mobileSignIn: {
      position: "relative",
      margin: theme.spacing(1.5, 0),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.7
        )}px Work Sans SemiBold`,
      }
    },
    btnGoogle: {
      "&.MuiButton-root": {
        borderRadius: "4px",
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(1.5, 0),
        color: "var(--secondary-black)",
        [theme.breakpoints.down("xs")]: {
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans Medium`,
        }
      },
      "& .MuiButton-startIcon": {
        marginLeft: -30,
      },
      "& .MuiButton-label": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
  })
);

const SocialLogin = () => {
  // const { t } = useTranslation();
  const header = Utils.CommonFunctions.getApiAuthHeader();

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = Utils.CommonFunctions.useQuery();
  let redirectTo = query.get("redirectTo") ?? "/";
  const path=redirectTo;
  redirectTo=path === "/change-password"||
  path === "/my-profile" ||
  path === "/lybc/dashboard"||
  path === "/order/list"||
  path === "/wallet"||
  path === "/address"||
  path === "/wishlist"||
  path ==="/skin-preference"||  path === "/notification"||
  path==="payment-method"
  ? "/" : redirectTo;
    const authToken = !isAuthenticated() && getAuthToken() ? getAuthToken() : "";
  let stateData = history?.location?.state || {}

  // const [showGoogle, setShowGoogle] = React.useState(true)
  // const loginReducer = useSelector((state: ReducersModal) => state.loginReducer)

  const responseGoogle = (resp: any) => {
    if (_.has(resp, "profileObj")) {
      let socialResponse = resp.profileObj;
      dispatch({
        type: "check-user",
        payload: {
          email: socialResponse.email,
          socialType: "google",
          socialId: socialResponse.googleId,
          fullName: socialResponse.name,
          imageUrl: socialResponse.imageUrl,
        },
      });
      checkUser({ socialResponse }, () => { }, "social");
    } else {
      console.log("googleError", resp)
      // if (resp.details) {
      //     dispatch({
      //         type: "show-alert", payload: {
      //             type: "error",
      //             message: resp.details
      //         }
      //     })
      // }
    }
  };
  let platformType = localStorage.getItem("googleId") ? "Google" : "Web";
  const checkUser = (
    values: any,
    resetForm?: Function,
    callVia?: "social" | "login" | "forgot"
  ) => {
    let data = { type: "email", email: values?.socialResponse?.email, guestToken: authToken, socialType: "google", "socialId": values?.socialResponse?.googleId };

    dispatch(showLoader());
    request
      .post(Utils.endPoints.CHECK_USER, data, header)
      .then((resp) => {
        dispatch(hideLoader());
        // setStatusCode(resp.data.statusCode)
        dispatch({
          type: "check-user",
          payload: {
            ...resp.data.data,
            ...data,
            responseCode: resp.data.statusCode,
          },
        });
        if (resp.data.statusCode === Utils.statusCode.USER_EXIST_IN_POS) {
          history.push(Utils.routes.SIGNUP);
        } else if (resp.data.statusCode === Utils.statusCode.USER_EXIST_IN_DB) {
          dispatch({ type: "login", payload: resp.data.data });
          let userData = resp.data.data;
          setSession(resp.data.data);
          /**
           * Event logger
           */
          let eventPayload = {
            socialId: userData.googleId,
            EmailID: userData.email,
            PhoneNo: `${userData.countryCode.indexOf("+") > -1 ? "" : "+"}${userData.countryCode
              }${userData.mobileNo}`,
            TierType: userData.tierType,
            DeviceDetails: `WEB`,
            is_social_login: true,
            Platform: 'Google',
            push_pause_all: false,
            push_order_status: false,
            push_offers: false,
            push_payments: false,
          };

          socialLogin(eventPayload);

          history.push({ pathname: redirectTo, state: stateData });
          onUserLogin({
            EmailID: userData?.email,
            PhoneNo: `${userData.countryCode.indexOf("+") > -1 ? "" : "+"}${userData.countryCode}${userData.mobileNo}`, TierType: 'Friend',
            DeviceDetails: `WEB`,
            is_social_login: true,
            socialId: userData.googleId,
          })
          // history.push("/")
          // history.goBack()
          dispatch({
            type: "show-alert",
            payload: {
              type: "success",
              message: "Login successfully",
            },
          });
        } else {
          history.push(Utils.routes.SOCIAL_MOBILE);
        }
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

  return (
    <React.Fragment>
      {/* {showGoogle ? ( */}
      <>
        <Hidden xsDown>
          <Typography variant="h5" className={classes.orSignin}>
            Or Sign In Using
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h5" className={classes.mobileSignIn}>
            <b>or</b>
          </Typography>
        </Hidden>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          render={(renderProps: any) => (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img src={Utils.images.GOOGLE} alt="google" />}
              className={classes.btnGoogle}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Continue with Google
            </Button>
            // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </>
      {/* ) : null} */}
    </React.Fragment>
  );
};

export default SocialLogin;
