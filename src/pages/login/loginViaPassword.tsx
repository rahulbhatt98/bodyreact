import React, { useEffect } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  FormControlLabel,
  Checkbox,
  Typography,

} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import Utils from "../../utils";
import _ from "lodash";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  setSession,
  removeSession,
  getAuthToken,
  isAuthenticated,
  onUserLogin,
} from "../../utils/session";
import request from "../../utils/request";
import { ReducersModal } from "../../models";
import { normalLogin, updateProfile } from "../../utils/event/action";
import events from "../../utils/event/constant";
/**
 * components
 */
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";
import ResetViaEmail from "./resetViaEmail";
import ResetViaMobile from "./resetViaMobile";
import SocialLogin from "./socialLogin";
import Otp from "../../components/common/otp";
import ResetPassword from "./resetPassword";

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
        padding: theme.spacing(2),
      },
    },
    remember: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    checkBox: {
      color: "#666666",
      "& .Mui-checked": {
        color: "var(--main-opacity)",
      },
    },
    btnAndInputDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& .MuiFormGroup-root": {
        margin: theme.spacing(1, 0),
      },
    },
    boxShadowDiv: {
      margin: theme.spacing(6, 0),
      padding: theme.spacing(3, 10),
      boxShadow: "var(--box-shadow-div)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "var(--white)",
      borderRadius: 3,
      [theme.breakpoints.down("xs")]: {
        boxShadow: "none",
        padding: 0,
        backgroundColor: "var( --backgroun-color)",
      },
    },
    heading: {
      color: "var(--black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
    subheading: {
      color: "var(--black)",
      margin: theme.spacing(0.5, 0, 1.5),
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },

    forget: {
      cursor: "pointer",
    },

  })
);

interface Values {
  email: string;
  password: any;
}

const LoginViaPassword = (props: any) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const authToken = !isAuthenticated() && getAuthToken() ? getAuthToken() : "";

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
  let stateData = history?.location?.state || {}

  const loginReducer = useSelector(
    (state: ReducersModal) => state.loginReducer
  );
  const otpReducer = useSelector((state: ReducersModal) => state.otpReducer);
  // const { authToken } = useSelector((state: ReducersModal) => state.userReducer)

  const [showResetMobile, setShowResetMobile] = React.useState(false);
  const [showResetEmail, setShowResetEmail] = React.useState(false);
  const [showResetModal, setShowResetModal] = React.useState(false);

  const header = Utils.CommonFunctions.getApiAuthHeader();

  React.useEffect(() => {
    if (_.isEmpty(loginReducer.email)) {
      history.push(Utils.routes.LOGIN_OTP);
    }

  });

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  const showMobileDialog = () => {
    setShowResetMobile(true);
    setShowResetEmail(false);
  };
  const showEmailDialog = () => {
    setShowResetEmail(true);
    setShowResetMobile(false);
  };

  const hanldeClose = () => {
    setShowResetEmail(false);
    setShowResetMobile(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Please enter email")
      .matches(Utils.regex.emailRegex, {
        message: "Please enter valid email",
      }),
    password: Yup.string()
      .required("Please enter password")
      .min(8, "Password length must be at least 8 characters long"),
  });

  const handleSubmit = (values: Values) => {
    request
      .post(Utils.endPoints.LOGIN, values, header)
      .then((resp) => {
        dispatch({
          type: "login",
          payload: resp.data.data,
          guestToken: authToken,
        });
        let userData = resp.data.data;
        setSession(resp.data.data);

        /**
         * Event logger
         */
        let eventPayload = {
          EmailID: userData.email,
          PhoneNo: `${userData.countryCode.indexOf("+") > -1 ? "" : "+"}${userData.countryCode
            }${userData.mobileNo}`,
          TierType: 'Friend',
          DeviceDetails: `WEB`,
          is_social_login: false,
          push_pause_all: false,
          push_order_status: false,
          push_offers: false,
          push_payments: false,
        };

        normalLogin(eventPayload);
        updateProfile('last_login_date', Utils.CommonFunctions.unixToDate(
          Date.now(),
          "DD/MM/YYYY, HH:mm:ss"
        ));
        history.push({ pathname: redirectTo, state: stateData });
        onUserLogin({
          EmailID: userData?.email,
          PhoneNo: `${userData?.countryCode?.indexOf("+") > -1 ? "" : "+"}${userData?.countryCode ?? "91"}${userData?.mobileNo}`,
          TierType: 'Friend',
          DeviceDetails: `WEB`,
          is_social_login: false,
        })

        // history.push("/");
        // history.goBack();
        // history.goBack();
        dispatch({
          type: "show-alert",
          payload: {
            type: "success",
            message: "Login successfully",
          },
        });
      })
      .catch((err) => {
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
    let OtpData = {
      otpVia: otpReducer.otpVia,
      type: "forgot",
      email: otpReducer.email,
      OTP: otpReducer.OTP,
      mobileNo: otpReducer.mobileNo,
      countryCode: otpReducer.countryCode,
      guestToken: authToken,
    };
    request
      .post(Utils.endPoints.VERIFY_OTP, OtpData, header)
      .then((resp) => {
        if (resp) {
          dispatch({ type: "verify-otp", payload: OtpData });
          dispatch({ type: "hide-otp" });
          setShowResetModal(true);
        }
      })
      .catch((err) => {
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
    request
      .put(
        Utils.endPoints.RESET_PASSWORD,
        { password: values.password, authToken: getAuthToken() },
        header
      )
      .then((resp) => {
        // dispatch({ type: "login", payload: resp.data.data })
        // setSession(resp.data.data)
        removeSession();
        dispatch({ type: "RESET_STORE" });
        history.push(Utils.routes.LOGIN_OTP);
        dispatch({
          type: "show-alert",
          payload: {
            type: "success",
            message: resp.data.message,
          },
        });
      })
      .catch((err) => {
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

      <Otp verifyOpt={verifyOpt} />
      <ResetPassword
        title="Reset Password"
        subTitle="Kindly enter the new password!"
        buttonText="Update Password"
        open={showResetModal}
        submitHanlder={resetPassword}
        hanldeClose={() => setShowResetModal(false)}
      />
      <ResetViaMobile
        open={showResetMobile}
        showEmailDialog={showEmailDialog}
        hanldeClose={hanldeClose}
      />
      <ResetViaEmail
        open={showResetEmail}
        showMobileDialog={showMobileDialog}
        hanldeClose={hanldeClose}
      />

      <div className={classes.loginRoot}>
        <div className={classes.boxShadowDiv}>
          <Typography variant="h3" className={classes.heading}>
            Welcome Back!
          </Typography>
          <Typography variant="h5" className={classes.subheading}>
            Sign In Using Your Mobile Number or Email ID
          </Typography>
          <div className={classes.btnAndInputDiv}>
            <Formik
              initialValues={{ email: loginReducer.email, password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values);
              }}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form>
                  <InputField
                    label={t("email")}
                    placeHolder={t("email")}
                    id="name"
                    name="email"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.email}
                    isDisabled={!_.isEmpty(loginReducer.email)}
                    isRequired={true}
                  />
                  <InputField
                    label={t("password")}
                    placeHolder={t("password")}
                    id="password"
                    name="password"
                    type="password"
                    touched={touched}
                    errors={errors}
                    value={values.password}
                    isRequired={true}
                  />
                  <div className={classes.remember}>
                    <FormControlLabel
                      value="Remember me"
                      name="remember_me"
                      control={<Checkbox />}
                      label="Remember me"
                      labelPlacement="end"
                      className={classes.checkBox}
                    />

                    <Typography
                      align="right"
                      variant="body1"
                      className={classes.forget}
                    >
                      <span onClick={() => showEmailDialog()}>
                        {t("forget_password")}
                      </span>
                    </Typography>
                  </div>
                  <CustomButton
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    disabled={
                      !_.isEmpty(errors) ||
                      (_.isEmpty(values.email) && _.isEmpty(values.password))
                    }
                    text={t("proceed")}
                  />
                </Form>
              )}
            </Formik>

            {loginReducer.socialId === "" ? <SocialLogin /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginViaPassword;
