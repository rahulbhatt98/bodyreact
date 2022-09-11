import { Dialog, DialogContentText, Hidden } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../utils";

/**
 * components
 */
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootConatiner: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(5, 15),
      borderRadius: 5,
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(4, 1),
        "& .MuiTypography-h3": {
          marginBottom: 10,
          fontFamily: "Recoleta Alt",
        },
      },
      "& .MuiTypography-h3": {
        marginBottom: 10,
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
    dialogDiv: {
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

    backArrow: {
      width: theme.spacing(2.5),
      height: "auto",
    },
  })
);

interface Props {
  open: boolean;
  submitHanlder: Function;
  hanldeClose: Function;
  title: string;
  subTitle: string;
  buttonText: string
}
const ResetPassword = ({ open = true, submitHanlder, hanldeClose, title, subTitle, buttonText }: Props) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter password")
      .matches(Utils.regex.passwordRegex, {
        message: "Password should be a minimum of 8 characters & a combination of alphabets & numbers",
      }),
    confirmPassword: Yup.string()
      .when("password", {
        is: (value: string) => value && value.length > 0,
        then: Yup.string().required("Please enter confirm password"),
      })
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must match"
      ),
  });

  const handleCloseModal = () => {
    hanldeClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      className={classes.dialogDiv}
      aria-labelledby="form-dialog-title"
    >
      <>
        <Hidden smUp>
          <div className={classes.mobileHeaderContainer}>
            <span onClick={handleCloseModal}>
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
            {title}
          </Typography>
          <Typography align="center" variant="h5">
            {subTitle}
          </Typography>
          <div className={classes.btnAndInputDiv}>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={ResetSchema}
              onSubmit={(values, { setSubmitting }) => {
                submitHanlder(values);
                // checkUser(values)
                // dispatch(onSubmitContactus(values, setSubmitting, history, true));
              }}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form>
                  <DialogContentText>
                    <InputField
                      label={t("New Password*")}
                      placeHolder={t("New Password*")}
                      id="password"
                      name="password"
                      type="password"
                      touched={touched}
                      errors={errors}
                      value={values.password}
                    />
                    <InputField
                      label={t("Confirm Password*")}
                      placeHolder={t("Confirm Password*")}
                      id="confirm_password"
                      name="confirmPassword"
                      type="password"
                      touched={touched}
                      errors={errors}
                      value={values.confirmPassword}
                    />
                  </DialogContentText>
                  <CustomButton
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    disabled={!_.isEmpty(errors)}
                    text={t(buttonText)}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default ResetPassword;
