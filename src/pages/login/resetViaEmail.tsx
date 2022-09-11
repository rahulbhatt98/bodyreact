import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Theme,
  makeStyles,
  createStyles,
  Dialog,
  DialogContentText,
  Typography,
  Hidden,
} from "@material-ui/core";
import _ from "lodash";
import Utils from "../../utils";
import request from "../../utils/request";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../home/actions";
import React from "react";

/**
 * components
 */
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootConatiner: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(5, 15),
      borderRadius: 5,
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2.5, 1),
      },
      "& .MuiTypography-h3": {
        marginBottom: 10,
        fontFamily: "Recoleta Alt Bold",
          fontSize: "22px"
      },
    },
    btnAndInputDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minWidth: 300,
      marginTop: theme.spacing(2),
    },
    bottomText: {
      textDecoration: "underline",
      marginTop: theme.spacing(1),
      cursor: "pointer",
      [theme.breakpoints.down("xs")]:{
       
        font: `normal ${theme.spacing(
          1.5
        )}px Work Sans Regular`,
    
    }
    },
    paperDiv: {
      [theme.breakpoints.down("xs")]: {
        "& .MuiDialog-paper": {
          width: "100vw",
          height: "100vh",
          margin: 0,
          maxHeight: "initial",
          backgroundColor: "var(--medium-creame-color)",
          paddingTop: "20px",
        },
      },
    },
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      // height: "35px",
      padding: theme.spacing(1.6, 1.6),
      backgroundColor: "var(--medium-creame-color)",
      // position: "sticky",
      // top: 0,
      zIndex: 9999,

    },
    heading: {
      textAlign: "center",
      width: "90%",
      diplay: "flex",
      font: `normal 700 ${theme.spacing(2)}px Work Sans`,
      lineHeight: "23.4px",
      letterSpacing: "0.8px",
      [theme.breakpoints.down("xs")]: {
        letterSpacing: "0.02em",
      },
    },
    subHeading: {
      letterSpacing: "0.02px",
      font: `normal ${theme.spacing(1.4)}px Work Sans Regular`,

    },
    backArrow: {
      width: theme.spacing(2.5),
      height: "auto",
    },
    subTitle: {
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(1.4)}px Work Sans SemiBold`,

      }
    }
  })
);
interface Props {
  open: boolean;
  showMobileDialog: Function;
  hanldeClose: Function;
}
const ResetViaEmail = ({
  open = true,
  showMobileDialog,
  hanldeClose,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const header = Utils.CommonFunctions.getApiAuthHeader();

  const handleCloseModal = () => {
    hanldeClose();
  };

  const handleSubmit = (values: any) => {
    dispatch(showLoader());

    request
      .post(
        Utils.endPoints.FORGET_PASSWORD,
        { ...values, otpVia: "email" },
        header
      )
      .then((resp) => {
        localStorage.setItem("authToken", resp.data.data.authToken);
        dispatch(hideLoader());
        handleCloseModal();
        dispatch({
          type: "send-otp",
          payload: { type: "forgot", ...JSON.parse(resp.config.data) },
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

  // const resetPassword = (values: any) => {
  //     dispatch(showLoader())

  //     request.put(Utils.endPoints.RESET_PASSWORD, { password: values.password, authToken },header).then((resp) => {
  //         dispatch(hideLoader())
  //         dispatch({ type: "login", payload: resp.data.data })
  //         setSession(resp.data.data)
  //         history.push("/")
  //         dispatch({
  //             type: "show-alert", payload: {
  //                 type: "success",
  //                 message: "Login successfully"
  //             }
  //         })

  //     }).catch((err) => {
  //         dispatch(hideLoader())
  //         dispatch({
  //             type: "show-alert", payload: {
  //                 type: "error",
  //                 message: err.response.data.message
  //             }
  //         })
  //     })
  // }

  const Schema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter email")
      .matches(Utils.regex.emailRegex, { message: "Please enter valid email" }),
  });

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        className={classes.paperDiv}
        aria-labelledby="form-dialog-title"
      >
        <>
          <Hidden smUp>
            <div className={classes.mobileHeaderContainer}>
              <span
                  onClick={handleCloseModal}
              >
                <img
                  src={Utils.images.BACK_ARROW}
                  alt="backarrow"
                  className={classes.backArrow}
                />
              </span>

              <Typography className={classes.heading}>THE BODY SHOP</Typography>
            </div>
          </Hidden>
          <div className={classes.rootConatiner}>
            <Typography align="center" variant="h3">
              {"Forgot Password"}
            </Typography>
            <Hidden xsDown>
              <Typography align="center" variant="h5">
                {"Reset Using Your Email Address"}
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography
                align="center"
                variant="h5"
                className={classes.subHeading}
              >
                Reset Using
              </Typography>
              <Typography align="center" variant="h5" className={classes.subTitle}>
                <b>Your Email Address</b>
              </Typography>
            </Hidden>

            <div className={classes.btnAndInputDiv}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Schema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  // handleSubmit(values)
                  handleSubmit(values);
                }}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form>
                    <DialogContentText>
                      <InputField
                        label={t("email")}
                        placeHolder={t("email")}
                        id="email"
                        name="email"
                        type="text"
                        touched={touched}
                        errors={errors}
                        value={values.email}
                      />
                    </DialogContentText>
                    <CustomButton
                      type="submit"
                      color="primary"
                      fullWidth
                      variant="contained"
                      disabled={!_.isEmpty(errors) || values.email == ""}
                      text={t("continue")}
                    />
                  </Form>
                )}
              </Formik>
              <Typography
                variant="body1"
                className={classes.bottomText}
                color="primary"
              >
                <span onClick={() => showMobileDialog()}>
                  Reset Using Mobile Number
                </span>
              </Typography>
            </div>
          </div>
        </>
      </Dialog>
    </React.Fragment>
  );
};

export default ResetViaEmail;
