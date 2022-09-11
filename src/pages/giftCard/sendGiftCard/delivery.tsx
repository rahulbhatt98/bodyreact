import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import Utils from "../../../utils";
import clsx from "clsx";
import CustomCalender from "../../../components/common/calendar";
import SimpleTimePicker from "../../../components/common/timePicker";
import CommonFunctions from "../../../utils/commonFunctions";
import GreenRadio from "../../../components/common/customRadio";

// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//     height: "20px",
//     width: "20px",
//   },
//   checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(2.5, 0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 3),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Recoleta Alt Bold`,
      lineHeight: "33px",
      color: "var(--secondary-black)",
      letterSpacing: "0.02em",
    },
    outerDiv: {
      padding: theme.spacing(1, 2, 2, 2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    wishlistDiv: {
      width: "calc(100% + 40px)",
      margin: theme.spacing(-2),
      [theme.breakpoints.down("xs")]: {
        width: "calc(100% + 0px)",
        margin: theme.spacing(0),
      },

    },
    imgDiv: {
      position: "absolute",
    },
    deleteImg: {
      position: "relative",
      top: "5px",
      left: "115px",
    },
    parentDiv: {
      height: theme.spacing(18),
      width: theme.spacing(24),
    },
    outsideBox: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
    inputBox: {
      background: "#E3F2F1",
      border: "1px solid #40857E",
      borderRadius: "2px",
      height: theme.spacing(18),
      width: theme.spacing(17.8),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    detailsName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1,0,0, 0)
      },
    },
    padding:{
      paddingBottom:'10px',
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0)
      }
    },

    scndBlock: {
      padding: theme.spacing(2, 0, 0, 0),
    },
    outBox: {
      display: "flex",
      margin: theme.spacing(2, 0),
    },
    optionsName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans Regular`,
      lineHeight: "19px",
      color: "var(--black300)",
      margin: theme.spacing(0, 1),
    },
    link: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "22px",
      color: "var(--grey-color)",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0,1,0),
      }
    },
    linkText:{
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "22px",
      color: "var(--grey-color)",
      margin: theme.spacing(-1.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0,1,0),
      }
    },
    inputWidth: {
      width: "100%",
      height: "54px",
    },
    dateTime: {
      font: "normal 400 15px Work Sans",
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
    },
    root: {
      margin: theme.spacing(2.5, 0),
    },
    skeltonView:{
      padding: theme.spacing(24),
    },
    skeltonView1:{
      padding: theme.spacing(2,6)
    },
    dateTimeContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    }
  })
);

// const Input = styled("input")({
//   display: "none",
// });
interface Props {
  formRef: any;
  setDeliveryDetails: Function;
  activeStep: number;
  setActiveStep: Function;
  deliveryDetails: any;
  details: any;
  setError?: Function;
  error?: string;
}

const Delivery: React.FC<Props> = ({
  details,
  deliveryDetails,
  setDeliveryDetails,
  activeStep,
  setActiveStep,
  formRef,
  setError,
  error,
}: Props) => {
  const classes = useStyles();
  const [deliveryStatus, setDeliveryStatus] = useState(
    deliveryDetails.date ? "later" : "now"
  );
  const DeliverySchema = Yup.object().shape({
    date:
      deliveryStatus !== "now"
        ? Yup.string().required("Please enter date")
        : Yup.string(),
    time:
      deliveryStatus !== "now"
        ? Yup.string().required("Please enter time")
        : Yup.string(),
    emailId: Yup.string()
      .required("Please enter an email")
      .matches(Utils.regex.emailRegex, {
        message: "Please enter a valid email",
      }),
    mobileNumber: Yup.string()
      .required("Please enter a mobile number")
      .max(10, "Please enter a valid 10 digit mobile number")
      .matches(Utils.regex.onlyNumberRegex, {
        message: "Please enter a valid mobile number",
      }),
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const initialDate = new Date();
  const futureDate = new Date(initialDate.getTime() + 10 * 60000);

  
  return (
    <>
      <div className={classes.root}>
        <div className={classes.headerDiv}>
          <Hidden xsDown>
          <Typography variant="h4" className={classes.heading}>
            Delivery Options
          </Typography>
          </Hidden>
          <Hidden smUp>
          <Typography variant="h4" className={classes.heading}>
            Delivery 
          </Typography>
          </Hidden>
         
        </div>
        
       
        <div className={classes.writeDiv}>
          <Formik
            innerRef={formRef}
            initialValues={{
              time: deliveryDetails.time || futureDate,
              date: deliveryDetails.date || initialDate,
              mobileNumber:
                details.mobileNumber || deliveryDetails.mobileNumber || "",
              emailId: details.emailId || deliveryDetails.emailId || "",
            }}
            validationSchema={DeliverySchema}
            onSubmit={(values, { setSubmitting }) => {
              if (values) {
                if (deliveryStatus === "now") {
                  values.date = "";
                  values.time = "";
                }
                setDeliveryDetails(values);
                setActiveStep(activeStep + 1);
              }
            }}
          >
            {({ values, errors, touched, isSubmitting, setFieldTouched, setFieldValue }) => {
              return (
                <Grid container>
                  <Form>
                    <Grid container className={classes.wishlistDiv}>
                      
                      <Grid item xs={12} md={12} className={classes.outerDiv}>
                        <Hidden xsDown>
                        <Typography className={classes.detailsName}>
                          E-Gift Card will be delivered on
                        </Typography>
                        </Hidden>
                        <Hidden smUp>
                        <Typography className={classes.link}>
                        Link to the E-Gift Card will be sent to the recipient on
                        SMS and email on selected date and time
                      </Typography>
                        </Hidden>
                       
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.outerDiv}>
                        <InputField
                          onFocus={() => CommonFunctions.removeScroll(['mobileNumber'])}
                          setFieldTouched={setFieldTouched}
                          isDisabled={true}
                          alwaysShowLabel={true}
                          inputWidth={classes.inputWidth}
                          label={"Mobile Number"}
                          placeHolder={"Mobile Number"}
                          id="mobileNumber"
                          name="mobileNumber"
                          type="number"
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
                        <>
                          <InputField
                            setFieldTouched={setFieldTouched}
                            isDisabled={true}
                            alwaysShowLabel={true}
                            inputWidth={classes.inputWidth}
                            label={"Email ID"}
                            placeHolder={"Email ID"}
                            id="emailId"
                            name="emailId"
                            type="email"
                            touched={touched}
                            errors={errors}
                            value={values.emailId}
                            isRequired={true}
                          />
                        </>
                      </Grid>
                    </Grid>
                   
                    <Grid item xs={12} md={6} >
                      <Hidden xsDown>
                      <Typography className={classes.link}>
                        Link to the E-Gift Card will be sent to the recipient on
                        SMS and email on selected date and time
                      </Typography>
                      </Hidden>
                     
                    </Grid>
                    <Typography className={clsx(classes.detailsName,classes.padding)}>
                      Delivery Time
                    </Typography>
                    <Grid container className={classes.wishlistDiv}>
                      <Grid item xs={6} md={6} className={clsx(classes.outerDiv, classes.dateTimeContainer)}>
                        <div className={classes.outBox}>
                          <GreenRadio
                            className={classes.radioButton}
                            checked={deliveryStatus === "now"}
                            onChange={() => {
                              setDeliveryStatus("now")
                              setFieldValue('date', new Date())
                              setFieldValue('time', new Date().getTime())
                            }}
                            value="homeAddress"
                            name="radio-button-demo"
                            inputProps={{ "aria-label": "C" }}
                          />
                          <Typography className={classes.optionsName}>
                            Now
                          </Typography>
                        </div>
                        <div className={classes.outBox}>
                          <GreenRadio
                            className={classes.radioButton}
                            checked={deliveryStatus === "later"}
                            onChange={() => setDeliveryStatus("later")}
                            value="homeAddress"
                            name="radio-button-demo"
                            inputProps={{ "aria-label": "C" }}
                          />
                          <Typography className={classes.optionsName}>
                            Later
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item xs={6} md={6} className={classes.outerDiv} />


                      <Grid item xs={12} md={12} className={classes.outerDiv}>
                        {deliveryStatus === "now" ? (
                          <>
                            <Typography className={classes.linkText}>
                              The gift card will be sent immediately.
                            </Typography>
                          </>
                        ) : (
                          <Grid container spacing={3}>
                            <Grid
                              item
                              xs={12}
                              md={6}
                            // className={classes.outerDiv}
                            >
                              {/* <InputField
                              setFieldTouched={setFieldTouched}
                              alwaysShowLabel={true}
                              inputWidth={clsx(classes.inputWidth, classes.dateTime)}
                              label={"Date"}
                              placeHolder={"date"}
                              id="date"
                              name="date"
                              type="date"
                              touched={touched}
                              errors={errors}
                              value={values.date}
                              isRequired={deliveryStatus !== "now"}
                            /> */}
                              <CustomCalender
                                isRequired={deliveryStatus !== "now"}
                                minDate={new Date()}
                                maxDate={maxDate}
                                id={"date"}
                                name={"date"}
                                value={values.date || new Date()}
                                formLabel={"Date"}
                                placeholder={"date"}
                                icon={<img src={Utils.images.DATE_ICON} alt="dateIcon" />}
                                setError={setError}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                            // className={classes.outerDiv}
                            >
                              {/* <InputField
                              setFieldTouched={setFieldTouched}
                              alwaysShowLabel={true}
                              inputWidth={clsx(classes.inputWidth, classes.dateTime)}
                              label={"Time"}
                              placeHolder={"Enter Time"}
                              id="time"
                              name="time"
                              type="time"
                              touched={touched}
                              errors={errors}
                              value={values.time}
                              isRequired={deliveryStatus !== "now"}
                            /> */}
                              <SimpleTimePicker
                                // minDateMessage={'Date should not be before minimal date'}
                                initialFocusedDate={
                                  values.date
                                    ? values.date.getTime()
                                    : new Date().getTime()
                                }
                                isRequired={deliveryStatus !== "now"}
                                id="time"
                                name="time"
                                formLabel={"Time"}
                                placeHolder={"Enter Time"}
                                value={values.time}
                                keyboardIcon={<img src={Utils.images.TIMER} alt="timeIcon" />}
                                minDate={values.date ? values.date : new Date()}
                                maxDate={maxDate}
                                setError={setError}
                                error={error}
                              // disabled={true}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Delivery;
