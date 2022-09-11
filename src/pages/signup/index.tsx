import React, { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Hidden,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { ReducersModal } from "../../models";
import request from "../../utils/request";
import { hideLoader, showLoader } from "../home/actions";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import Utils from "../../utils";
// import { useEffect } from "react";
import _ from "lodash";
import { getAuthToken, isAuthenticated, setSession } from "../../utils/session";
import {
  normalSignup,
  socialSignup as eventSocialSignup,
  screenViewed,
  updateProfile,
} from "../../utils/event/action";
import events from "../../utils/event/constant";

/**
 * components
 */
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";
import CustomCalender from "../../components/common/calendar";
import Otp from "../../components/common/otp";
import CustomCheckbox from "../../components/common/customCheckbox";
import SuccessModal from "../../components/common/successModal";
import { Helmet } from "react-helmet";

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
        padding: theme.spacing(0),
      },
    },
    boxShadowDiv: {
      margin: theme.spacing(6, 0),
      padding: theme.spacing(3, 7),
      boxShadow: "var(--box-shadow-div)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "var(--white)",
      borderRadius: 3,
      width: "60%",
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        // boxShadow: "none",
        padding: theme.spacing(2),
        margin: 0,
        backgroundColor: "var(--medium-creame-color)",
        width: "100%",
      },
    },
    heading: {
      color: "var(--black)",
      lineHeight: "30px",
      [theme.breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
    subheading: {
      color: "var(--black)",
      margin: theme.spacing(0.5, 0, 1),
      textAlign: "center",
      lineHeight: "19px",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          2.2
        )}px Recoleta Alt Bold`,
      },
    },
    btnAndInputDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    radioContainer: {
      marginTop: theme.spacing(1),
      "& .Mui-checked": {
        color: "var(--main-opacity)",
      },
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-body1": {
          fontWeight: "bold",
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans SemiBold`,
          lineHeight: 1.6
        }
      }
    },
    radioLabel: {
      color: "var(--black)",
    },
    termsAndCondition: {
      color: "var(--light-gray)",
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
        fontFamily: "Work Sans Regular !important",
      },
    },
    bodyTitle: {
      fontWeight: "bold",
      color: "var(--black)",
    },
    termsConatiner: {
      alignItems: "baseline",
    },
    verified: {
      display: "flex",
      color: "#4EB75E",
      "& img": {
        marginRight: 2,
        marginTop: 3,
      },
    },
    termsLink: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      width: "100%",
      margin: theme.spacing(0, 0, 1, 1),
      position: "relative",
      "& .MuiTypography-body1": {
        color: "var(--light-gray)",
        marginLeft: 10
      },
      "& a": {
        color: "var(--black)",
        textDecoration: "underline",
        // position: "absolute",
        // top: "18%",
        // left: "34%",
        fontSize: 15,
        fontStyle: "normal",
        fontFamily: "Work Sans",
        fontWeight: 500,
        lineHeight: 1.5,
        marginLeft: "-14px",
      },
      // [theme.breakpoints.down("xs")]: {
      //     "& a": {
      //         left: "30%",
      //     },
      // },
      // [theme.breakpoints.down("sm")]: {
      //     "& a": {
      //         left: "25%",
      //     },
      // },
    },
    checkbox: {
      float: "left",
    },
    bottomText: {
      textAlign: "center",
      margin: theme.spacing(3),
      "& span": {
        cursor: "pointer",
        color: theme.palette.primary.main,
        textDecoration: "underline",
        fontWeight: theme.spacing(50),
      },
      [theme.breakpoints.down("xs")]: {

        font: `normal ${theme.spacing(
          1.5
        )}px Work Sans Regular`,

      }
    },
    whatsAppButton: {
      margin: theme.spacing(0, 0, 0, 0.3),
      display: "flex",
      alignItems: "center",
      "& .MuiTypography-body1": {
        fontWeight: 600,
      },
      "& .MuiFormControlLabel-root": {
        margin: "0px -4px !important",
      },

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "initial",
        font: `Work Sans SemiBold`,
      },
    },
    checkboxBtn: {
      marginRight: theme.spacing(1),
    },
    prefixContent: {
      width: "15%",
      textAlign: "center",
      border: "none",
      borderRight: "1px solid #E2E2E2",
      backgroundColor: "white",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
    },
    signInBtn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans !important`,
    },
    verifyBtn: {
      letterSpacing: "-0.04em",
      fontSize: "14px",
      fontWeight: 600,
    },
    mobileHeading: {
      [theme.breakpoints.down("xs")]: {
        zIndex: 1200,
        position: "fixed",
        top: "14px",
        left: "70px",
      },
    },
    heading2: {
      color: "var(--primary)",
      [theme.breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
  })
);




const Signup = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const header = Utils.CommonFunctions.getApiAuthHeader();


  let otpData = useSelector((state: ReducersModal) => state.otpReducer);
  let { email, mobileNo, fullName, gender, dob, socialId, responseCode } =
    useSelector((state: ReducersModal) => state.loginReducer);

  const [emailVerified, SetEmailVerified] = React.useState(socialId && socialId !== "" ? true : false);

  const [mobileVerified, SetMobileVerified] = React.useState(
    mobileNo ? true : false
  );
  // const [btnDisabled, SetBtnDisabled] = React.useState(socialId === "" ? true : false);
  const [validEmail, SetValid] = React.useState(
    _.isEmpty(email) ? false : true
  );
  // const [statusCode, setStatusCode] = React.useState(socialId !== "" ? Utils.statusCode.USER_NOT_EXIST : Utils.statusCode.USER_EXIST_IN_DB)
  const [statusCode, setStatusCode] = React.useState(
    !_.isEmpty(email)
      ? Utils.statusCode.USER_NOT_EXIST
      : Utils.statusCode.USER_EXIST_IN_DB
  );
  const [successModalVisibility, setSuccessModalVisibility] =
    React.useState(false);

  // React.useEffect(() => {
  //   if (validEmail) {
  //     setSubmitBtn(false)
  //   } else {

  //     setSubmitBtn(true)
  //   }
  // }, [validEmail])

  // const [submitBtn, setSubmitBtn] = useState(!socialId);
  const [submitBtn, setSubmitBtn] = useState(false);
  const authToken = !isAuthenticated() && getAuthToken() ? getAuthToken() : "";

  React.useEffect(() => {
    if (email === "" && mobileNo === "") {
      history.push(Utils.routes.LOGIN_OTP);
    }

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_SIGN_UP,
      CTGenerated: "WEB",
    });
  }, []);

  const initialValues = {
    gender: "",
    dob: dob ?? null,
    mobileNo,
    email,
    fullName,
    password: "",
    confirmPassword: "",
    countryCode: Utils.constants.countryCode,
    isWhatsAppConsent: false,
    isTermsConsent: false,
    isEmailVerified: emailVerified,
  };


  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().trim().required("Please enter name"),
    mobileNo: Yup.string()
      .required("Please enter mobile number")
      .matches(Utils.regex.onlyNumberRegex, {
        message: "Please enter valid mobile number",
      }),
    email: Yup.string()
      .required("Please enter email")
      .matches(Utils.regex.emailRegex, { message: "Please enter valid email" }),
    password: Yup.string().when("email", {
      is: (value: string) =>
        emailVerified && socialId === "" && value && value.length > 0,
      then: Yup.string()
        .required("Please enter password")
        .matches(Utils.regex.passwordRegex, {
          message: "Password should be a minimum of 8 characters & a combination of alphabets & numbers",
        }),
    }),
    // password: Yup.string().trim().required("Please enter password"),
    confirmPassword: Yup.string()
      .when("password", {
        is: (value: string) => value && value.length > 0,
        then: Yup.string().required("Please enter confirm password"),
      })
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must match"
      ),
    isTermsConsent: Yup.boolean().oneOf(
      [true],
      "Please accept terms and conditions"
    ),
    // isWhatsAppConsent: Yup.boolean().oneOf([true], 'Please accept whatsapp notification'),
  });

  const verifyData = (type: "mobile" | "email", data: string) => {
    dispatch(showLoader());

    let otpSendTo = type === "mobile" ? { mobileNo: data } : { email: data };
    let OtpSendData = {
      otpVia: type,
      type: "signup",
      countryCode: Utils.constants.countryCode,
      ...otpSendTo,
    };
    request
      .post(Utils.endPoints.RESEND_OTP, OtpSendData, header)
      .then((resp) => {
        dispatch(hideLoader());
        // setOpenModal(true);
        if (resp) {
          dispatch({ type: "send-otp", payload: { ...OtpSendData } });
          if (resp?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "success",
                message: resp.data.message,
              },
            });
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

  const verifyOpt = () => {
    dispatch(showLoader());
    let { OTP, email, otpVia, type, countryCode, mobileNo } = otpData;
    request
      .post(
        Utils.endPoints.VERIFY_OTP,
        {
          OTP,
          email,
          otpVia,
          type,
          countryCode,
          mobileNo,
          guestToken: authToken,
        },
        header
      )
      .then((resp) => {
        dispatch(hideLoader());
        if (resp) {
          dispatch({ type: "verify-otp", payload: otpData });
          dispatch({ type: "hide-otp" });
          if (otpVia === "email") {
            SetEmailVerified(true);
          } else if (otpVia === "mobile") {
            SetMobileVerified(true);
          }
        }
        // if (statusCode === Utils.statusCode.USER_NOT_EXIST) {
        //     history.push("/sign-up")
        // } else if (statusCode === Utils.statusCode.USER_EXIST_IN_DB) {
        //     // login({resp.data.data.email,})
        //     setSession(userData)
        //     history.push("/")

        // }
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
        dispatch(hideLoader());
      });
  };

  const signup = (formValues: any) => {
    dispatch(showLoader());

    let {
      fullName,
      email,
      password,
      countryCode,
      mobileNo,
      dob,
      gender,
      isWhatsAppConsent,
      isTermsConsent,
    } = formValues;
    request
      .post(
        Utils.endPoints.SIGNUP,
        {
          fullName,
          email,
          password,
          countryCode,
          mobileNo,
          dob: dob ?? 0,
          gender,
          isWhatsAppConsent,
          isTermsConsent,
          isEmailVerified: emailVerified,
          guestToken: authToken,
        },
        header
      )
      .then((resp) => {
        dispatch(hideLoader());
        if (resp) {
          dispatch({ type: "login", payload: resp.data.data });
          let userData = resp.data.data;

          setSession(userData);

          /**
           * Event Logger
           */
          let eventPayload = {
            Userstatus: 'LoggedIn',
            DOB: Utils.CommonFunctions.unixToDate(
              userData.dob,
              "MMM DD, YYYY"
            ),
            UserName: userData.fullName,
            PhoneNo: `${userData.mobileNo}`,
            EmailID: userData.email,
            Gender: userData.gender,
            RegistrationType: "Normal",
            RegistrationPlaform: "Web",
            // Created:At: userData.createdAt,
            ZendeskId: userData.zendeskId,
            "Wallet Id": userData.walletId,
            TierType: 'Friend',
            Identity: userData.mobileNo,
            DeviceDetails: `${resp.config.headers.deviceid},${resp.config.headers.platform}`,
            is_social_signup: false,
            // UserId: userData.userId,
            push_pause_all: false,
            push_order_status: false,
            push_offers: false,
            push_payments: false,
          };
          normalSignup(eventPayload);
          updateProfile(
            "Signup_date",
            Utils.CommonFunctions.unixToDate(
              Date.now(),
              "DD/MM/YYYY, HH:mm:ss"
            )
          );
          setSuccessModalVisibility(true);

          // history.push("/")
          // dispatch({
          //     type: "show-alert", payload: {
          //         type: "success",
          //         message: "Login successfully"
          //     }
          // })
        }

        // setSession(resp.data.data)
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
        setSubmitBtn(true)
      });
  };

  const socialSignup = (formValues: any) => {
    dispatch(showLoader());
    let {
      fullName,
      email,
      countryCode,
      mobileNo,
      dob,
      gender,
      isWhatsAppConsent,
      isTermsConsent,
    } = formValues;
    request
      .post(
        Utils.endPoints.SOCIAL_SIGNUP,
        {
          socialType: "google",
          socialId,
          fullName,
          email,
          countryCode,
          mobileNo,
          dob: dob ?? 0,
          gender,
          isWhatsAppConsent,
          isTermsConsent,
          isMobileVerified: mobileVerified,
          guestToken: authToken,
        },
        header
      )
      .then((resp) => {
        dispatch(hideLoader());
        if (resp) {
          dispatch({ type: "login", payload: resp.data.data });
          let userData = resp.data.data;
          setSession(userData);
          console.log('userData>>>>>>>>>>>>>>>', userData)
          console.log('resp.config>>>>>>>>>>>>>>>', resp.config)
          console.log('resp>>>>>>>>>>>>>>>', resp)

          /**
           * Event logger
           */
          let eventPayload = {
            socialId: socialId,
            Userstatus: "LoggedIn",
            DOB: Utils.CommonFunctions.unixToDate(
              userData.dob,
              "DD MMMM, YYYY"
            ),
            UserName: userData.fullName,
            PhoneNo: `${userData.mobileNo}`,
            EmailID: userData.email,
            Gender: userData.gender,
            "RegistrationType": "Social",
            "RegistrationPlaform": "Web",
            // CreatedAt: userData.createdAt,
            ZendeskId: userData.zendeskId,
            "Wallet Id": userData.walletId,
            TierType: 'Friend',
            Identity: userData.mobileNo,
            DeviceDetails: `${resp.config.headers.deviceid},${resp.config.headers.platform}`,
            // UserId: userData.userId,
            is_social_signup: true,
            push_pause_all: false,
            push_order_status: false,
            push_offers: false,
            push_payments: false,
            socialPlatform: "Google"
          };

          eventSocialSignup(eventPayload);
          updateProfile(
            "Signup_date",
            Utils.CommonFunctions.unixToDate(
              Date.now(),
              "DD/MM/YYYY, HH:mm:ss"
            )
          );
          setSuccessModalVisibility(true);
        }

        // history.push("/")
        // dispatch({
        //     type: "show-alert", payload: {
        //         type: "success",
        //         message: "Login successfully"
        //     }
        // })
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
  const handleSuccessModalClose = () => {
    setSuccessModalVisibility(false);
    // window.location.href = "/";
    history.push("/");
  };

  const checkUser = (values: any, resetForm?: Function) => {
    let data = { type: "email", email: values };
    // let data = Utils.regex.emailRegex.test(values.login) ? { type: "email", email: values.login }:{ type: "mobile", mobileNo: values.login, countryCode: Utils.constants.countryCode }

    dispatch(showLoader());

    request
      .post(Utils.endPoints.CHECK_USER, data, header)
      .then((resp) => {
        dispatch(hideLoader());
        if (resp) {
          dispatch({
            type: "check-user",
            payload: { ...data, responseCode: resp.data.statusCode },
          });
          setStatusCode(resp.data.statusCode);
          if (resp.data.statusCode !== Utils.statusCode.USER_NOT_EXIST) {
            SetValid(false);
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: "Email already registered",
              },
            });
          } else {
            SetValid(true);
          }
        }

        // if (data.type === "mobile") {
        //     // sendOtp(data)

        // } else if (data.type === "email") {
        //     if (resp.data.statusCode === Utils.statusCode.USER_NOT_EXIST) {
        //         // setFieldValue(field.name, "")()
        //         if (resetForm) {
        //             resetForm()
        //         }
        //         if (loginReducer.socialId === "") {
        //             dispatch({
        //                 type: "show-alert", payload: {
        //                     type: "success",
        //                     message: "Please try login using mobile number"
        //                 }
        //             })

        //         }

        //     } else {
        //         setIsPasswordGenerated(resp.data.data.isPasswordGenerated)
        //         if (resp.data.data.isEmailVerified && resp.data.data.isPasswordGenerated) {
        //             history.push("/login-via-email")

        //         } else if (!resp.data.data.isEmailVerified || !resp.data.data.isPasswordGenerated) {
        //             sendOtp(data)
        //         }

        //     }
        // }
      })
      .catch((err) => {
        dispatch(hideLoader());
        initialValues.email = "";
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





  // const handleChange = (e: any) => {
  //   // setEmail(e.target.value)
  //   if (Utils.regex.emailRegex.test(e.target.value)) {
  //     setTimeout(() => {
  //       if (e.keyCode == 8 || e.keyCode == 229 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)
  //       ) {
  //         checkUser(e.target.value);
  //       }
  //     }, 1000);
  //   }
  // };

  const handleChange = (e: any) => {
    checkUserApi(e)
  };

  const checkUserApi = _.debounce((e) => {
    if (Utils.regex.emailRegex.test(e.target.value)) {
      // if (e.keyCode == 8 || e.keyCode == 229 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
      if (e.keyCode <= 37 || e.keyCode >= 40) {
        checkUser(e.target.value);
      }
    }

  }, 1000)


  // useEffect(() => {
  //   if (emailId) {
  //     const delayDebounceFn = setTimeout(() => {
  //       checkUser(emailId);
  //       // Send Axios request here
  //     }, 2000)
  //     return () => clearTimeout(delayDebounceFn)
  //   }

  // }, [emailId])

  // }

  const handleClick = () => {
    // dispatch({ type: "RESET_STORE" })
    history.push(Utils.routes.LOGIN_OTP);
  };
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let yearMax = new Date(year - 13, month, day);


  return (
    <React.Fragment>
      <Helmet>
        <title>Create New Customer Account | The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Otp verifyOpt={verifyOpt} />
      <Hidden smUp>
        <div className={classes.mobileHeading}>
          <Typography variant="h3" className={classes.heading2}>
            THE BODY SHOP
          </Typography>
        </div>
      </Hidden>
      <div className={classes.loginRoot}>
        <div className={classes.boxShadowDiv}>
          <Hidden xsDown>
            <Typography variant="h3" className={classes.heading}>
              Create Account
            </Typography>
          </Hidden>

          <Typography variant="h5" className={classes.subheading}>
            {responseCode === Utils.statusCode.USER_EXIST_IN_POS
              ? `We have already met, Please review and Confirm Your details.`
              : socialId !== ""
                ? `Please review and confirm your details.`
                : `Please enter your details below to complete registration`}
            {/* {socialId === "" ? `Sign Up to get started!` : `Sign Up to get started! Please review you details`} */}
          </Typography>
          {/* <Typography variant="h5" className={classes.subheading}>
                        You are already a LYBC member! You can edit details if you want.
                    </Typography> */}
          <div className={classes.btnAndInputDiv}>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting, validateForm }) => {
                validateForm()
                if (socialId === "") {
                  signup(values);
                } else {
                  socialSignup(values);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                validateForm,
                setFieldValue,
              }) => {
                // if (!_.isEmpty(touched)) {

                //   if (_.isEmpty(errors)) {
                //     setSubmitBtn(false)
                //   } else {
                //     setSubmitBtn(true)
                //   }
                // }
                return (
                  <Form autoComplete="off">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <InputField
                          label={t("name")}
                          placeHolder={t("Name*")}
                          id="fullName"
                          name="fullName"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.fullName}
                          // isRequired={true}
                          maxLength={40}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputField
                          label={t("email")}
                          placeHolder={t("Email Address*")}
                          id="email"
                          name="email"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.email}
                          isDisabled={emailVerified}
                          // isRequired={true}
                          onChange={(e: any) => handleChange(e)}
                          // Verify={values.email && !errors.email && statusCode !== Utils.statusCode.USER_EXIST_IN_DB ? emailVerified ? (
                          Verify={
                            values.email &&
                              !errors.email &&
                              statusCode === Utils.statusCode.USER_NOT_EXIST ? (
                              emailVerified ? (
                                <div className={classes.verified}>
                                  <img
                                    src={Utils.images.VERIFIED}
                                    alt="verified"
                                  />
                                  <Typography>Verified</Typography>
                                </div>
                              ) : (
                                <Typography
                                  color="primary"
                                  className={classes.verifyBtn}
                                  onClick={() =>
                                    verifyData("email", values.email)
                                  }
                                >
                                  VERIFY NOW
                                </Typography>
                              )
                            ) : null
                          }
                        />
                      </Grid>
                    </Grid>
                    {/* {socialId === "" ? ( */}
                    {/* {emailVerified  ? ( */}
                    {emailVerified && socialId === "" ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <InputField
                            label={t("password")}
                            placeHolder={t("password")}
                            id="password"
                            name="password"
                            type="password"
                            touched={touched}
                            errors={errors}
                            value={values.password}
                          // isRequired={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <InputField
                            label={t("confirm_password")}
                            placeHolder={t("confirm_password")}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            touched={touched}
                            errors={errors}
                            value={values.confirmPassword}
                          // isRequired={true}
                          />
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <CustomCalender
                          id={"dob"}
                          name={"dob"}
                          maxDate={yearMax}
                          value={values.dob && values.dob != 0 ? values.dob : null}
                          // formLabel={`${t("dob")}(${t("optional")})`}
                          formLabel={`Date of Birth (optional)`}
                          placeholder={`Date of Birth (optional)`}
                          // placeholder={`${t("dob")}(${t("optional")})`}
                          icon={
                            <img src={Utils.images.PICKER} alt="datePicker" />
                          }
                          format="dd/MM/yyyy"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputField
                          label={t("mobile")}
                          placeHolder={t("mobile")}
                          id="mobileNo"
                          name="mobileNo"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.mobileNo}
                          // isRequired={true}
                          maxLength={10}
                          prefixContent={
                            <input
                              className={classes.prefixContent}
                              disabled
                              defaultValue={"+91"}
                            />
                          }
                          isDisabled={
                            !_.isEmpty(values.mobileNo) &&
                            !_.has(errors, "mobileNo") &&
                            mobileVerified
                          }
                          Verify={
                            values.mobileNo && !errors.mobileNo ? (
                              mobileVerified ? (
                                <div className={classes.verified}>
                                  <img
                                    src={Utils.images.VERIFIED}
                                    alt="verified"
                                  />
                                  <Typography>Verified</Typography>
                                </div>
                              ) : (
                                <Typography
                                  color="primary"
                                  onClick={() =>
                                    verifyData("mobile", values.mobileNo)
                                  }
                                >
                                  VERIFY NOW
                                </Typography>
                              )
                            ) : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <FormControl
                      component="fieldset"
                      className={classes.radioContainer}
                    >
                      {/* <FormLabel
                        component="legend"
                        className={classes.radioLabel}
                      >{`${t("Gender")}${" "}(${t("optional")})`}</FormLabel> */}
                      <FormLabel
                        component="legend"
                        className={classes.radioLabel}
                      >
                        Gender (optional)
                      </FormLabel>
                      <RadioGroup
                        onChange={(e: any) => {
                          setFieldValue("gender", e?.target?.value);
                        }}
                        row
                        aria-label="gender"
                        name="gender"
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              checked={values.gender === "female"}
                            />
                          }
                          value="female"
                          label={t("female")}
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              checked={values.gender === "male"}
                            />
                          }
                          value="male"
                          label={t("male")}
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              checked={values.gender === "other"}
                            />
                          }
                          value="other"
                          label={t("Others")}
                        />
                      </RadioGroup>
                    </FormControl>
                    <Grid
                      container
                      className={classes.termsConatiner}
                      spacing={2}
                    >
                      <Grid item xs={12} md={12}>
                        <div className={classes.whatsAppButton}>
                          <Hidden smUp>
                            <Typography className={classes.termsAndCondition}>
                              ( I would like to receive latest news from{" "}
                              <span className={classes.bodyTitle}>
                                The Body Shop )
                              </span>
                            </Typography>
                          </Hidden>
                          <FormControlLabel
                            control={
                              <CustomCheckbox
                                className={classes.checkboxBtn}

                                // color="primary"
                                checked={values.isWhatsAppConsent}
                                onChange={(e: any) => setFieldValue('isWhatsAppConsent', e.target.checked)}

                              />
                            }
                            label={`Whatsapp`}
                            className={classes.checkbox}

                          />
                          {/* <CustomCheckbox
                            text="Whatsapp "
                            name="isWhatsAppConsent"
                            id="isWhatsAppConsent"
                            className={classes.checkboxBtn}
                            checked={values.isWhatsAppConsent}
                            error={errors.isWhatsAppConsent}
                          /> */}
                          <Hidden xsDown>
                            <Typography className={classes.termsAndCondition}>
                              ( I would like to receive latest news from{" "}
                              <span className={classes.bodyTitle}>
                                The Body Shop )
                              </span>
                            </Typography>
                          </Hidden>
                        </div>
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                        <div className={classes.whatsAppButton}>

                          <CustomCheckbox
                            text="Whatsapp"
                            name="isWhatsAppConsent"
                            id="isWhatsAppConsent"
                            checked={values.isWhatsAppConsent}
                            error={errors.isWhatsAppConsent}
                            onChange={() => setFieldValue('isWhatsAppConsent', values.isWhatsAppConsent)}


                          />
                        </div>
                      </Grid> */}
                      <Grid item xs={12} md={6}>
                        <div className={classes.termsLink}>
                          <FormControlLabel
                            control={
                              <CustomCheckbox
                                // color="primary"
                                checked={values.isTermsConsent}
                                onChange={(e: any) => {
                                  setFieldValue('isTermsConsent', e.target.checked);
                                  setSubmitBtn(e.target.checked)
                                }}

                              />
                            }
                            label={`I agree to the`}
                            className={classes.checkbox}

                          />


                          {/* <CustomCheckbox
                            text={`I agree to the`}
                            name="isTermsConsent"
                            id="isTermsConsent"
                            checked={values.isTermsConsent}
                            error={errors.isTermsConsent}
                            className={classes.checkbox}
                          /> */}
                          {/* <Link to={Utils.routes.TERMS_CONDITION} >Terms Of Use</Link> */}
                          <a
                            href={Utils.routes.TERMS_CONDITION}
                            target="_blank"
                          >
                            Terms Of Use
                          </a>
                        </div>
                        {errors.isTermsConsent &&
                          <Typography component="span" variant='body2' color="error">
                            {errors.isTermsConsent}
                          </Typography>
                        }
                      </Grid>
                    </Grid>
                    <CustomButton
                      type="submit"
                      color="primary"
                      fullWidth
                      variant="contained"
                      // disabled={
                      //   !_.isEmpty(errors) || !mobileVerified || btnDisabled
                      // }
                      // disabled={submitBtn || !mobileVerified || !validEmail}
                      disabled={!submitBtn || !validEmail}
                      text={t("sign_up")}
                    />
                    <Typography variant="h5" className={classes.bottomText}>
                      Already have an account?{" "}
                      <span
                        className={classes.signInBtn}
                        onClick={() => handleClick()}
                        color="primary"
                      >
                        Sign In
                      </span>{" "}
                      here
                    </Typography>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <SuccessModal
        displayDivider={true}
        title={`Congratulations!`}
        description={
          <Typography>
            You’ve successfully Registered yourself on The Body Shop
          </Typography>
        }
        buttonText="Shop Now"
        open={successModalVisibility}
        handleClose={handleSuccessModalClose}
      />
    </React.Fragment>
  );
};

export default Signup;
