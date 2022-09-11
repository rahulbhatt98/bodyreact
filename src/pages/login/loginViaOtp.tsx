import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import React from "react";
// import { Link } from 'react-router-dom'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../home/actions";
import request from "../../utils/request";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import {
  getAuthToken,
  isAuthenticated,
  setSession,
  onUserLogin,
  removeSession,
} from "../../utils/session";
import { normalLogin, updateProfile } from "../../utils/event/action";
/**
 * Modals
 */
import { ReducersModal } from "../../models";
/**
 * components
 */
import Otp from "../../components/common/otp";
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";
import ResetPassword from "./resetPassword";
import SocialLogin from "./socialLogin";

// ** icons and images **
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginRoot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down("xs")]: {
        minHeight: "100vh",
        padding: theme.spacing(1),
        backgroundColor: "var(--medium-creame-color)",
      },
    },
    boxShadowDiv: {
      margin: theme.spacing(6, 0),
      padding: theme.spacing(3, 15),
      boxShadow: "var(--box-shadow-div)",
      display: "flex",
      // width: "35%",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "var(--white)",
      borderRadius: 3,
      [theme.breakpoints.down("xs")]: {
        boxShadow: "none",
        padding: theme.spacing(3, 0),
        backgroundColor: "var(--medium-creame-color)",
        margin: 0,
      },
    },
    heading: {
      color: "var(--black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
    heading2: {
      color: "var(--primary)",
      [theme.breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
    subheading: {
      color: "var(--black)",
      margin: theme.spacing(0.5, 0, 1.5),
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          2.2
        )}px Recoleta Alt Medium`,
        "& b": {
          fontFamily: "Recoleta Alt Bold",
        }
      },
    },
    btnAndInputDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // width: "100%",
      width: theme.spacing(36),
      [theme.breakpoints.down("xs")]: {
        width: theme.spacing(35),
      },
      [theme.breakpoints.down(370)]: {
        width: theme.spacing(33),
      },
    },

    phoneBottomDiv: {
      display: "flex",
      alignItems: "center",
    },
    phoneSkipIcon: {
      color: "var(--black)",
      marginBottom: theme.spacing(0.3),
    },
    phoneSkipHeading: {
      color: "var(--black)",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "uppercase",
    },
    inputWidth: {
      width: "100%",
    },
    mobileHeading: {
      [theme.breakpoints.down("xs")]: {
        zIndex: 1200,
        position: "fixed",
        top: "14px",
        left: "70px",
      },
    },
    skipMsg: {
      color: "var(--black)",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
      textTransform: "uppercase",
      margin: theme.spacing(2.5, 0),
    },
    btnDiv: {
      [theme.breakpoints.down("xs")]: {
        "& .MuiButton-root": {
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans Medium`,
        }
      }
    }
  })
);

function Login(props: any) {
  // const firebaseConfig = {
  //     appName:"Bodyshop",
  //     apiKey: "AIzaSyA79lQSPm1NNUGRjGTibCsjr4X3mzQrFxA",
  //     projectId: "bodyshop-322001",
  //     appId: "1:396804377443:web:e0f8b945d44647f8c2e156",
  // };

  // const app = initializeApp(firebaseConfig);
  // const firebaseConfig = {
  //     apiKey: "AIzaSyA79lQSPm1NNUGRjGTibCsjr4X3mzQrFxA",
  //     projectId: "bodyshop-322001",
  //     appId: "1:396804377443:web:e0f8b945d44647f8c2e156",
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

  const { t } = useTranslation();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    dispatch({ type: "reset-user" });

    if (isAuthenticated()) {
      history.push("/");
    }
  }, []);

  const header = Utils.CommonFunctions.getApiAuthHeader();

  // const { setFieldValue } = useFormikContext()

  // React.useEffect(() => {
  //     setFieldValue("login", "")
  // },[])

  const classes = useStyles();
  const dispatch = useDispatch();
  const history: any = useHistory();

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
  ? "/" : redirectTo
  let stateData: object = history?.location?.state || {}
  const { otpVia, type, OTP, email, mobileNo, countryCode } = useSelector(
    (state: ReducersModal) => state.otpReducer
  );
  const userData = useSelector((state: ReducersModal) => state.userReducer);
  const loginReducer = useSelector(
    (state: ReducersModal) => state.loginReducer
  );
  const [OtpData, setOtpData] = React.useState({});
  const [statusCode, setStatusCode] = React.useState(Utils.statusCode.SUCCESS);
  const [isPasswordGenerated, setIsPasswordGenerated] = React.useState(false);
  const [showResetModal, setShowResetModal] = React.useState(false);
  const [resetToken, setResetToken] = React.useState("");
  const authToken = !isAuthenticated() && getAuthToken() ? getAuthToken() : "";

  const LoginSchema = Yup.object().shape({
    // login: Yup.string().required('Please enter email or mobile number').matches(Utils.regex.mobileOrEmail, { message: "Please enter valid emal or mobile number" }),
    login: Yup.string()
      .trim()
      .required("Please enter email or mobile number")
      .test(
        "isValidEmailMobile",
        "Please enter valid email or mobile number",
        function (value: any) {
          const emailRegex = Utils.regex.emailRegex;
          const phoneRegex = Utils.regex.onlyNumberRegex;
          let isValidEmail = emailRegex.test(value);
          let isValidPhone = phoneRegex.test(value);
          if (!isValidEmail && !isValidPhone) {
            return false;
          }
          return true;
        }
      ),
  });

  const checkUser = (values: any, resetForm?: Function) => {
    let data: any;
    if (Utils.regex.onlyNumberRegex.test(values.login)) {
      data = {
        type: "mobile",
        mobileNo: values.login,
        countryCode: Utils.constants.countryCode,
      };
    } else {
      data = { type: "email", email: values.login };
    }
    // let data = Utils.regex.emailRegex.test(values.login) ? { type: "email", email: values.login }:{ type: "mobile", mobileNo: values.login, countryCode: Utils.constants.countryCode }

    dispatch(showLoader());

    request
      .post(Utils.endPoints.CHECK_USER, data, header)
      .then((resp) => {
        dispatch(hideLoader());
        setStatusCode(resp.data.statusCode);

        dispatch({
          type: "check-user",
          payload: {
            ...resp.data.data,
            ...data,
            responseCode: resp.data.statusCode,
          }
        });
        dispatch({ type: "login", payload: resp.data.data });

        if (
          loginReducer.socialId &&
          resp.data.statusCode !== Utils.statusCode.USER_NOT_EXIST
        ) {
          dispatch({
            type: "show-alert",
            payload: {
              type: "error",
              message: `This mobile is already linked with ${resp.data.data?.email}`,
            },
          });
          return;
        }

        if (data.type === "mobile") {
          sendOtp(data);
        } else if (data.type === "email") {
          if (resp.data.statusCode === Utils.statusCode.USER_NOT_EXIST) {
            // setFieldValue(field.name, "")()
            if (resetForm) {
              resetForm();
            }
            if (loginReducer.socialId === "") {
              dispatch({ type: "reset-otp" });

              dispatch({
                type: "show-alert",
                payload: {
                  type: "success",
                  message:
                    "Email is not registered. Please try login using mobile number",
                },
              });
            }
          } else if (
            resp.data.statusCode === Utils.statusCode.USER_EXIST_IN_POS
          ) {
            sendOtp(data);
          } else {
            setIsPasswordGenerated(resp.data.data.isPasswordGenerated);
            if (
              resp.data.data.isEmailVerified &&
              resp.data.data.isPasswordGenerated
            ) {
              history.push({ pathname: `/login-via-email`, search: `?redirectTo=${redirectTo}`, state: { ...stateData, prevRoute: history.location.pathname } });
            } else if (
              !resp.data.data.isEmailVerified ||
              !resp.data.data.isPasswordGenerated
            ) {
              sendOtp(data);
            }
          }
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

  const sendOtp = (values: any) => {
    dispatch(showLoader());

    let OtpSendData = { ...values, otpVia: values.type, type: "signup" };
    request
      .post(Utils.endPoints.RESEND_OTP, OtpSendData, header)
      .then((resp) => {
        dispatch(hideLoader());
        if (resp?.data?.message) {
          dispatch({
            type: "show-alert",
            payload: {
              type: "success",
              message: resp.data.message,
            },
          });
        }
        dispatch({ type: "send-otp", payload: { ...OtpSendData } });
        setOtpData(OtpSendData);
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

  const verifyOpt = () => {
    dispatch(showLoader());
    request
      .post(
        Utils.endPoints.VERIFY_OTP,
        {
          otpVia,
          type,
          OTP,
          email,
          mobileNo,
          countryCode,
          guestToken: authToken,
        },
        header
      )
      .then((resp) => {
        dispatch(hideLoader());
        if (resp) {
          dispatch({ type: "verify-otp", payload: { ...OtpData } });
          dispatch({ type: "hide-otp" });
          if (otpVia === "mobile") {
            if (statusCode === Utils.statusCode.USER_NOT_EXIST) {
              history.push({ pathname: `/sign-up`, search: `?redirectTo=${redirectTo}`, state: { ...stateData, prevRoute: history.location.pathname } });
            } else if (statusCode === Utils.statusCode.USER_EXIST_IN_DB) {
              // login({resp.data.data.email,})
              if (
                loginReducer.socialId &&
                resp.data.statusCode !== Utils.statusCode.USER_NOT_EXIST
              ) {
                dispatch({
                  type: "show-alert",
                  payload: {
                    type: "error",
                    message:
                      "This number already associated with different email",
                  },
                });
              }

              // firebaseEventLogger(Utils.constants.EVENT_NORMAL_LOGIN, {
              //   events.ev
              // })

              /**
               * Event Logger
               */
              let eventPayload = {
                // Name: userData.fullName,
                EmailID: userData?.email,
                PhoneNo: `${userData?.countryCode?.indexOf("+") > -1 ? "" : "+"}${userData?.countryCode ?? "91"}${userData?.mobileNo}`,
                // UserId: userData.userId,
                // CreatedAt: Date.now(),
                // TierType: 'Friend',
                TierType: resp?.data?.data?.tierDetails?.currentTier,
                DeviceDetails: `${resp.config.headers.deviceid},${resp.config.headers.platform}`,
                // Identity: userData.mobileNo,
                is_social_login: false,
                // Platform:"",
                push_pause_all: false,
                push_order_status: false,
                push_offers: false,
                push_payments: false,
              };

              normalLogin(eventPayload);
              updateProfile(
                "last_login_date",
                Utils.CommonFunctions.unixToDate(
                  Date.now(),
                  "DD/MM/YYYY, HH:mm:ss"
                )
              );
              setSession(userData);
              history.push({ pathname: redirectTo, state: { ...stateData, prevRoute: history.location.pathname } });
              onUserLogin({
                EmailID: userData?.email,
                PhoneNo: `${userData?.countryCode?.indexOf("+") > -1 ? "" : "+"}${userData?.countryCode ?? "91"}${userData?.mobileNo}`,
                TierType: resp?.data?.data?.tierDetails?.currentTier,
                DeviceDetails: `${resp.config.headers.deviceid},${resp.config.headers.platform}`,
                is_social_login: false,

              })

              // history.goBack()
              dispatch({
                type: "show-alert",
                payload: {
                  type: "success",
                  message: "Login successfully",
                },
              });
            } else if (statusCode === Utils.statusCode.USER_EXIST_IN_POS) {
              history.push({ pathname: `/sign-up`, search: `?redirectTo=${redirectTo}`, state: { ...stateData, prevRoute: history.location.pathname } });
            }
          } else if (otpVia === "email") {
            if (statusCode === Utils.statusCode.USER_EXIST_IN_POS) {
              history.push({ pathname: `/sign-up`, search: `?redirectTo=${redirectTo}`, state: { ...stateData, prevRoute: history.location.pathname } });
            } else if (!isPasswordGenerated) {
              setResetToken(resp?.data?.data?.authToken)
              setShowResetModal(true);
            }
          }
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
        // setOtpError(err.response.data.message)
      });
  };

  const resetPassword = (values: any) => {
    dispatch(showLoader());

    request
      .put(
        Utils.endPoints.RESET_PASSWORD,
        { password: values.password, authToken: resetToken },
        header
      )
      .then((resp) => {
        dispatch(hideLoader());
        // dispatch({ type: "login", payload: resp.data.data })
        // let userData = resp.data.data
        // setSession({ ...userData, userId: userData._id })
        // normalLogin({
        //     Name: userData.fullName,
        //     Email: userData.email,
        //     Phone: `${userData.countryCode.indexOf('+') > -1 ? "" : "+"}${userData.countryCode}${userData.mobileNo}`,
        //     UserId: userData.userId,
        //     CreatedAt: Date.now(),
        //     TierType: "",
        //     DeviceDetails: `WEB`,
        //     Identity: userData.mobileNo
        // })
        // history.push(redirectTo)
        removeSession();
        dispatch({ type: "RESET_STORE" });
        history.push(Utils.routes.LOGIN_OTP);
        setShowResetModal(false)
        dispatch({
          type: "show-alert",
          payload: {
            type: "success",
            message: resp.data.message,
          },
        });
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

  const onClose = () => { };

  return (
    <>
      <Hidden smUp>
        <div className={classes.mobileHeading}>
          <Typography variant="h3" className={classes.heading2}>
            THE BODY SHOP
          </Typography>
        </div>
      </Hidden>
      <div className={classes.loginRoot}>
        <Otp verifyOpt={verifyOpt} onClose={onClose} />
        <ResetPassword
          title="Set Passwod"
          subTitle="Kindly create your password"
          buttonText="Proceed"
          open={showResetModal}
          submitHanlder={resetPassword}
          hanldeClose={() => setShowResetModal(false)}
        />
        <div className={classes.boxShadowDiv}>
          <Hidden xsDown>
            <Typography variant="h3" className={classes.heading}>
              {loginReducer.socialId === "" ? "Welcome!" : "Welcome"}
            </Typography>

            <Typography variant="h5" className={classes.subheading}>
              {loginReducer.socialId === ""
                ? "Sign-in or Sign-up using your Mobile Number"
                : "Please Enter Your Mobile Number"}
            </Typography>
          </Hidden>
          <Hidden smUp>
            {loginReducer.socialId === "" ? (
              <>
                <Typography variant="h5" className={classes.subheading}>
                  Sign In Using Your
                </Typography>
                <Typography variant="h5" className={classes.subheading}>
                  <b>Mobile Number or Email ID</b>
                </Typography>
              </>
            ) : (
              <Typography variant="h5" className={classes.subheading}>
                "Please Enter Your Mobile Number"
              </Typography>
            )}
          </Hidden>
          <div className={classes.btnAndInputDiv}>
            <Formik
              initialValues={{
                login: "",
                socialTrial: false,
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, { resetForm }) => {
                checkUser(values, resetForm);
                // dispatch(onSubmitContactus(values, setSubmitting, history, true));
              }}
            >
              {({ values, errors, touched, isSubmitting }) => {
                let maxLength = undefined;
                let isNumber = Utils.regex.onlyNumberRegex.test(values.login);
                let isEmail = Utils.regex.emailRegex.test(values.login);
                if (isNumber) {
                  maxLength = 10;
                }
                return (
                  <Form>
                    {loginReducer?.socialId && values.socialTrial === false
                      ? ((values.login = ""), (values.socialTrial = true))
                      : ""}
                    <InputField
                      inputWidth={classes.inputWidth}
                      label={isNumber ? t("mobile") : isEmail ? t("email") : ""}
                      placeHolder={
                        loginReducer.socialId === ""
                          ? t("mobile")
                          : t("mobile")
                      }
                      id="name"
                      name="login"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.login}
                      maxLength={maxLength}
                      isRequired={true}
                      prefixContent={null}
                    />
                    <div className={classes.btnDiv}>
                      <CustomButton
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        disabled={!_.isEmpty(errors) || _.isEmpty(values.login)}
                        text={t("proceed")}
                      />
                    </div>

                  </Form>
                );
              }}
            </Formik>
            {loginReducer.responseCode !== Utils.statusCode.USER_NOT_EXIST ? (
              <SocialLogin />
            ) : null}
            <Hidden smUp>
              <Link to="/" className={classes.skipMsg}>
                Skip For now {">"}
              </Link>
            </Hidden>
          </div>
        </div>
        {/* <Hidden smUp>
                <div className={classes.phoneBottomDiv}>
                    <Typography variant="body1" className={classes.phoneSkipHeading}>
                        Skip for now
                    </Typography>
                    <ChevronRightIcon
                        className={classes.phoneSkipIcon}
                        fontSize="small"
                    />
                </div>
            </Hidden> */}
      </div>
    </>
  );
}

export default Login;
