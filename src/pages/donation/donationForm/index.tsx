import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import CustomButton from "../../../components/common/button";
import CommonFunctions from "../../../utils/commonFunctions";
import Utils from "../../../utils";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import AboutOrganization from "./aboutOrganization";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(3, 8),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(3,2),
      },
    },

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      color: "var(--green-color)",
    },

    inputWidth: {
      width: "100%",
      height: "50px",
      [theme.breakpoints.down("xs")]: {
        "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
          padding: theme.spacing(0),
        },
      },
    },

    btnWidth: {
      "& .MuiButton-fullWidth": {
        width: theme.spacing(18),
      },
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--green-color)",
      margin: theme.spacing(0, 0, 1.5, 0),
    },
    innerBox: {
      border: "1px solid var(--border-color)",
      padding: theme.spacing(2,10,2,2),
      margin: theme.spacing(1.5, 0),
      [theme.breakpoints.down("xs")]:{
        padding: theme.spacing(1.2),
      }
    },
    toggleButton: {
      "& .MuiToggleButton-root.Mui-selected": {
        background: "var(--main-opacity)",
        color: "var(--white)",
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )}px Work Sans `,
      },
      "& .MuiToggleButtonGroup-groupedHorizontal": {
        margin: theme.spacing(0, 2, 0, 0),
        padding: theme.spacing(1, 2),
        color: "var(--light-gray)",
        border: "1px solid var(--light-gray-text)",
        borderRadius: "0px",
        [theme.breakpoints.down("xs")]:{
          margin: theme.spacing(0,1,0,0
            ),
          padding: theme.spacing(1,1.4),
        }
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt `,
      letterSpacing: "0.06em",
      color: "var(--secondary-black)",
      margin: theme.spacing(1,0)
    },
    description: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "rgba(51, 51, 51, 0.99)",
      margin: theme.spacing(1,0)

    },
  })
);

const price = [
  { id: 1, value: "₹ 20", price: "₹ 20" },
  { id: 2, value: "₹ 40", price: "₹ 40" },
  { id: 3, value: "₹ 60", price: "₹ 60" },
  { id: 4, value: "₹ 80", price: "₹ 80" },
];

function DonationForm() {
  const classes = useStyles();
  const [alignment, setAlignment] = useState("₹ 40");

  const handleAlignment = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };
  const WriteUsSchema = Yup.object().shape({
    fullName: Yup.string().trim().required("Please enter name"),
    addressLine: Yup.string().trim().required("Please enter address"),
    amount: Yup.number()
      .required("Please enter Order Number")
      .min(4, "Amount must be at least in thousands"),

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
    location: Yup.string().trim().required("Please enter city"),
  });

  return (
    <>
      <div className={classes.writeDiv}>
        <Typography variant="h4" className={classes.heading}>
          Donation
        </Typography>
        <div className={classes.innerBox}>
          <Formik
            initialValues={{
              others: "",
              amount: "",
              mobileNumber: "",
              emailId: "",
              fullName: "",
              addressLine: "",
              location: "",
            }}
            validationSchema={WriteUsSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
            }}
          >
            {({ values, errors, touched, isSubmitting, setFieldTouched }) => (
              <Form>
                <Typography className={classes.subHeading}>
                  {" "}
                  Contribute for a better tomorrow
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputField
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Name"}
                      placeHolder={"Name"}
                      id="fullName"
                      name="fullName"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.fullName}
                      isRequired={true}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputField
                      onFocus={() =>
                        CommonFunctions.removeScroll(["mobileNumber"])
                      }
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
                      touched={touched}
                      errors={errors}
                      value={values.mobileNumber}
                      isRequired={true}
                      // prefixContent={
                      //   <input
                      //     className={classes.prefixContent}
                      //     disabled
                      //     defaultValue={"+91"}
                      //   />
                      // }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      setFieldTouched={setFieldTouched}
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Email ID"}
                      placeHolder={"Email ID"}
                      id="emailId"
                      name="emailId"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.emailId}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Address"}
                      placeHolder={"Address"}
                      id="addressLine"
                      name="addressLine"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.addressLine}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Amount"}
                      placeHolder={"Amount"}
                      id="amount"
                      name="amount"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.amount}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Location"}
                      placeHolder={"Location"}
                      id="location"
                      name="location"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.location}
                      isRequired={true}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      className={classes.toggleButton}
                    >
                      {price.map((item: any) => (
                        <ToggleButton
                          value={item.value}
                          aria-label="left aligned"
                        >
                          {item.price}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.title}>
                      About the Organization
                    </Typography>
                    <Typography className={classes.description}>
                      Shared meals will help some of WFP's most critical
                      operations around the world.
                    </Typography>
                    <Typography className={classes.description}>
                      Around the world, 690 million people don't have enough
                      food to lead an active and healthy life. As countries face
                      a record number of emergencies, many fueled by conflict
                      and the effects of climate change, more people are being
                      pushed further into hunger.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.btnWidth}>
                      <CustomButton
                        type="submit"
                        text={"Donate"}
                        variant={"contained"}
                        fullWidth
                      />
                    </div>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <AboutOrganization />
    </>
  );
}

export default DonationForm;
