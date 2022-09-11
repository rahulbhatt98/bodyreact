import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/common/button";
import InputField from "../../components/common/inputField";
import Utils from "../../utils";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addCorporateGift } from "./action";
import CustomRadioGroup from "../../components/common/radioGroup";
import CommonFunctions from "../../utils/commonFunctions";
import ThankYouModal from "./giftModals/thankYou";
import clsx from "clsx";

const dataModes = [
  {
    id: 1,
    title: "Call",
  },
  {
    id: 2,
    title: "Email",
  },
  {
    id: 3,
    title: "Whatsapp",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(2.5),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 3),
      },
    },
    corporateDiv: {
      padding: theme.spacing(1, 6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginBottom: "30px",
      padding: theme.spacing(0, 6),
      [theme.breakpoints.down("xs")]: {
        marginBottom: "0px",
        padding: theme.spacing(2, 0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      lineHeight: "33px",
      color: "var(--secondary-black)",
      letterSpacing: "0.02em",
    },
    outerDiv: {
      padding: theme.spacing(1, 2, 0, 2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    required: {
      color: "#f44336",
    },
    wishlistDiv: {
      width: "calc(100% + 40px)",
      margin: theme.spacing(-2),
    },

    scndBlock: {
      padding: theme.spacing(4, 0, 2, 0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, -2),
      },
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      display: "flex",
      width: "100%",
      alignItems: "center",
    },

    nameDiv: {
      display: "flex",
      marginTop: "25px",
    },
    title: {
      width: "20px",
      height: "20px",
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
      letterSpacing: "-0.02em",
      margin: theme.spacing(0, 1.2),
      // 'input[type="radio" i]': {
      //   backgroundColor: 'green',
      //   color: 'green'
      // },
    },
    inputWidth: {
      width: "100%",
      height: "54px",
    },
    prefixContent: {
      width: "20%",
      textAlign: "center",
      border: "none",
      borderRight: "1px solid #E2E2E2",
      backgroundColor: "white",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "33px",
    },
    textArea: {
      width: "100%",
      height: "160px",
      border: "none",
    },
    radioGroup: {
      // display: 'flex',
      // alignItems: "center"
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: 11,
      fontFamily: "Work Sans Medium",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    errorContainer: {
      marginTop: "3px",
      height: 10,
      alignSelf: "flex-start",
      textAlign: "left",
    },
    formLabel: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--secondary-black)",
      height: theme.spacing(2),
      fontWeight: 500,
    },
    container: {
      marginTop: theme.spacing(1.5),
    },
    radioColor: {
      // "& .MuiRadio-colorSecondary": {
      color: "var(--main-opacity) !important",
      // }
    },
    test: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(0.5),
    },
    radioDiv: {
      display: "flex",
      "& .MuiFormGroup-root": {
        flexDirection: "row",
      },
    },
    thirdBlock: {
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0.4),
      },
    },
    scndBtn: {
       
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0.4),
      },
    },
  })
);

function CorporateForm() {
  const classes = useStyles();
  const [modalVisibility, setModalVisibility] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const WriteUsSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter a name")
      .min(2, "Please enter a valid name")
      .max(50, "Please enter a valid name")
      .matches(Utils.regex.fullName, {
        message: "Please enter a valid name",
      }),
    emailId: Yup.string()
      .required("Please enter an email")
      .matches(Utils.regex.emailRegex, {
        message: "Please enter a valid email",
      }),
    mobileNumber: Yup.string()
      .required("Please enter a mobile number")
      .max(10, "Please enter a valid mobile number")
      .matches(Utils.regex.onlyNumberRegex, {
        message: "Please enter a valid mobile number",
      }),
  });
  const cancel = () => {
    history.push(Utils.routes.GIFT_CARD);
  };

  const handleGetBalanceClose = () => {
    setModalVisibility(false);
    history.push(Utils.routes.GIFT_CARD);
  };

  const handleRadio = (event: any, setFieldValue: any) => {
    setFieldValue("picked", event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={classes.writeDiv}>
        <div className={classes.headerDiv}>
          <Typography variant="h4" className={classes.heading}>
            Corporate Form
          </Typography>
        </div>

        <Formik
          initialValues={{
            name: localStorage.getItem("fullName") || "",
            picked: "call",
            mobileNumber: localStorage.getItem("mobileNo") || "",
            emailId: localStorage.getItem("email") || "",
            comment: "",
          }}
          validateOnChange
          validationSchema={WriteUsSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { name, picked, mobileNumber, comment, emailId } = values;
            const payload = {
              name,
              countryCode: "+91",
              mobileNo: String(mobileNumber),
              email: emailId,
              comment,
              contactVia: picked,
            };
            dispatch(
              addCorporateGift(payload, (response: any) => {
                // history.push("/gift-card");
                setModalVisibility(true);
              })
            );
            setSubmitting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <Grid container className={classes.corporateDiv}>
                <Grid item xs={12} md={9}>
                  <Form>
                    <Grid container className={classes.wishlistDiv}>
                      <Grid item xs={12} md={6} className={classes.outerDiv}>
                        <InputField
                          setFieldTouched={setFieldTouched}
                          alwaysShowLabel={true}
                          inputWidth={classes.inputWidth}
                          label={"Name"}
                          placeHolder={"Name"}
                          id="name"
                          name="name"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.name}
                          isRequired={true}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.outerDiv}>
                        <InputField
                          setFieldTouched={setFieldTouched}
                          alwaysShowLabel={true}
                          inputWidth={classes.inputWidth}
                          label={"Mobile Number"}
                          placeHolder={"Mobile Number"}
                          id="mobileNumber"
                          name="mobileNumber"
                          type="text"
                          pattern="\d*"
                          maxLength={10}
                          onFocus={() =>
                            CommonFunctions.removeScroll(["mobileNumber"])
                          }
                          touched={touched}
                          errors={errors}
                          value={values.mobileNumber}
                          isRequired={true}
                          prefixContent={
                            <input
                              className={classes.prefixContent}
                              disabled
                              defaultValue={"+91"}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.outerDiv}>
                        <InputField
                          setFieldTouched={setFieldTouched}
                          alwaysShowLabel={true}
                          inputWidth={classes.inputWidth}
                          label={"Email Address"}
                          placeHolder={"Email Address"}
                          id="emailId"
                          name="emailId"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.emailId}
                          isRequired={true}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.outerDiv}>
                        <div className={classes.radioDiv}>
                          <CustomRadioGroup
                            data={dataModes.map((item: any, index: any) => {
                              return (
                                <div className={classes.radioDiv} key={index}>
                                  <FormControlLabel
                                    value={`${item.title?.toLowerCase()}`}
                                    className={classes.test}
                                    control={
                                      <Radio className={classes.radioColor} />
                                    }
                                    label={item.title}
                                  />
                                </div>
                              );
                            })}
                            label={"Preferred mode of contact"}
                            value={values.picked}
                            onSelect={
                              (event: any) =>
                                // choosePaymentType(event)
                                handleRadio(event, setFieldValue)
                              // setFieldValue("picked", "call");
                            }
                          />
                        </div>
                      </Grid>
                      {/* </Grid>
                    <Grid container> */}
                      <Grid item xs={12} md={12} className={classes.outerDiv}>
                        <InputField
                          setFieldTouched={setFieldTouched}
                          alwaysShowLabel={true}
                          inputWidth={classes.textArea}
                          label={"Comment"}
                          placeHolder={"Add Comment"}
                          id="comment"
                          name="comment"
                          type="text"
                          touched={touched}
                          errors={errors}
                          value={values.comment}
                          isRequired={false}
                          actAs="textarea"
                        />
                      </Grid>

                      <Grid
                        item
                        xs={6}
                        md={3}
                        className={clsx(classes.outerDiv, classes.thirdBlock)}
                      >
                        <CustomButton
                          type="button"
                          color="primary"
                          fullWidth
                          variant="outlined"
                          text={"Cancel"}
                          onClick={cancel}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        className={clsx(classes.outerDiv, classes.scndBtn)}
                      >
                        <CustomButton
                          type="submit"
                          color="primary"
                          fullWidth
                          variant="contained"
                          text={"Submit"}
                        />
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
        <ThankYouModal
          message={
            "Thank You for sharing your details, The Body Shop team will connect with you within 24 - 48 hours."
          }
          open={modalVisibility}
          handleClose={handleGetBalanceClose}
        />
      </div>
    </>
  );
}

export default CorporateForm;
