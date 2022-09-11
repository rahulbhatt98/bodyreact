// import {
//   makeStyles,
//   createStyles,
//   Theme,
//   Grid,
//   Typography,
// } from "@material-ui/core";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import InputField from "../../../components/common/inputField";
// import Utils from "../../../utils";
// import CommonFunctions from "../../../utils/commonFunctions";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginTop: "10px",
//       [theme.breakpoints.down("xs")]: {
//         display: "block",
//       },
//     },
//     addressFormContainer: {
//       width: "80%",
//       [theme.breakpoints.down("xs")]: {
//         width: "100%",
//       },
//     },
//     heading: {
//       font: "normal 700 24px Recoleta Alt",
//       color: "var(--secondary-black)",
//       lineHeight: "33px",
//       letterSpacing: "0.02em",
//     },
//     title: {
//       font: "normal 600 14px Work Sans",
//       color: "var(--secondary-black)",
//       marginTop: "18px",
//       lineHeight: "16px",
//     },
//     inputWidth: {
//       width: "100%",
//       height: "43px",
//     },
//     radioContainer: {
//       marginTop: theme.spacing(2),
//       "& .Mui-checked": {
//         color: "var(--main-opacity)",
//       },
//     },
//     radioGroup: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     radioLabel: {
//       color: "var(--black)",
//     },
//     button: {
//       width: "100%",
//       borderRadius: "4px",
//       marginLeft: "10px",
//       marginRight: "10px",
//       float: "right",
//       padding: "14px",
//       textTransform: "none",
//       font: `normal 600 14px Work Sans`,
//     },
//     rightButton: {
//       marginRight: "0px",
//     },
//     footer: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginTop: "20px",
//     },
//     buttonContainer: { textAlign: "right" },
//     divider: { marginTop: "12px" },
//     gridContainer: { marginTop: "10px" },
//     prefixContent: {
//       width: "20%",
//       textAlign: "center",
//       border: "none",
//       borderRight: "1px solid #E2E2E2",
//       backgroundColor: "white",
//       font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
//         1.4
//       )}px Work Sans`,
//     },
//     "&$checked": {
//       color: "#3d857e",
//     },
//   })
// );

// function Message() {
//   const classes = useStyles();
//   const initialValues = {
//     fullName: "",
//     mobile: "",
//     emailId: "",
//   };
//   const AddressSchema = Yup.object().shape({
//     fullName: Yup.string().trim().required("Please enter name"),
//     mobile: Yup.string()
//       .required("Please enter mobile number")
//       .matches(Utils.regex.onlyNumberRegex, {
//         message: "Please enter valid mobile number",
//       }),
//     emailId: Yup.string()
//       .required("Please enter Email id")
//       .matches(Utils.regex.emailRegex, {
//         message: "Please enter valid Email Id",
//       }),
//   });

//   return (
//     <>
//       <div className={classes.root}>
//         <Typography className={classes.heading}>Message</Typography>
//       </div>
//       <div className={classes.addressFormContainer}>
//         <div className={classes.heading}></div>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={AddressSchema}
//           onSubmit={(values, { setSubmitting }) => {
//             // const payload: any = {
//             //   name: values.fullName,
//             //   countryCode: "+91",
//             //   mobileNo: values.mobile,
//             // };
//           }}
//         >
//           {({ values, errors, touched, isSubmitting, validateForm }) => {
//             return (
//               <Form autoComplete="off">
//                 <div className={classes.title}>Sender’s Detail</div>
//                 <Grid container className={classes.gridContainer} spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <InputField
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Name"}
//                       placeHolder={"Name"}
//                       id="fullName"
//                       name="fullName"
//                       type="text"
//                       touched={touched}
//                       errors={errors}
//                       value={values.fullName}
//                       isRequired={true}
//                     />
//                   </Grid>
//                   {/* <Grid item xs={12} md={6}>
//                     <InputField
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Mobile Number"}
//                       placeHolder={"Mobile Number"}
//                       id="mobile"
//                       name="mobile"
//                       type="number"
//                       touched={touched}
//                       errors={errors}
//                       value={values.mobile}
//                       isRequired={true}
//                       prefixContent={
//                         <input
//                           className={classes.prefixContent}
//                           disabled
//                           defaultValue={"+91"}
//                         />
//                       }
//                     />
//                   </Grid> */}
//                 </Grid>

//                 <div className={classes.title}>Receiver’s Detail</div>
//                 <Grid container className={classes.gridContainer} spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <InputField
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Name"}
//                       placeHolder={"Name"}
//                       id="fullName"
//                       name="fullName"
//                       type="text"
//                       touched={touched}
//                       errors={errors}
//                       value={values.fullName}
//                       isRequired={true}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <InputField
//                       onFocus={() =>
//                         CommonFunctions.removeScroll(["mobileNumber"])
//                       }
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Mobile Number"}
//                       placeHolder={"Mobile Number"}
//                       id="mobile"
//                       name="mobile"
//                       type="number"
//                       touched={touched}
//                       errors={errors}
//                       value={values.mobile}
//                       isRequired={true}
//                       prefixContent={
//                         <input
//                           className={classes.prefixContent}
//                           disabled
//                           defaultValue={"+91"}
//                         />
//                       }
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <InputField
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Email ID"}
//                       placeHolder={"Email ID"}
//                       id="emailId"
//                       name="emailId"
//                       type="email"
//                       touched={touched}
//                       errors={errors}
//                       value={values.emailId}
//                       isRequired={true}
//                     />
//                   </Grid>
//                 </Grid>
//                 <div className={classes.title}>Message</div>
//                 <Grid container className={classes.gridContainer} spacing={2}>
//                   <Grid item xs={12} md={12}>
//                     <InputField
//                       alwaysShowLabel={true}
//                       inputWidth={classes.inputWidth}
//                       label={"Add Greetings Here"}
//                       placeHolder={
//                         "Hey Aditya, Wish you a very very happy birthday"
//                       }
//                       id="fullName"
//                       name="fullName"
//                       type="text"
//                       touched={touched}
//                       errors={errors}
//                       value={values.fullName}
//                       isRequired={false}
//                     />
//                   </Grid>
//                 </Grid>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </>
//   );
// }
// export default Message;



import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import Utils from "../../../utils";
import CommonFunctions from "../../../utils/commonFunctions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(2.5, 0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 2),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 3),
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
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
    wishlistDiv: {
      width: "calc(100% + 40px)",
      margin: theme.spacing(-2),
      [theme.breakpoints.down("xs")]: {
        width: "calc(100% + 60px)",
        margin: theme.spacing(-3),
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
    detailsName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(4.5, 0, 1, 0),
      },
    },
    seconddetailsName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(3, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(4.5, 0, 1, 0),
      },
    },
    scndBlock: {
      padding: theme.spacing(2, 0, 0, 0),
    },
    inputWidth: {
      width: "100%",
      height: "54px",
    },
    textArea: {
      width: "100%",
      height: "160px",
      border: "none",
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
    secndDiv: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    skeltonView: {
      width: "100%",
      padding: theme.spacing(23),
    },
  })
);

// const Input = styled("input")({
//   display: "none",
// });
interface Props {
  formRef: any;
  setDetails: Function;
  setActiveStep: Function;
  activeStep: number;
  details: any;
}

const Messages: React.FC<Props> = ({
  formRef,
  setDetails,
  setActiveStep,
  activeStep,
  details,
}: Props) => {
  const classes = useStyles();
  const WriteUsSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter a name")
      .min(2, "Please enter a valid name")
      .max(50, "Please enter a valid name")
      .matches(Utils.regex.fullName, {
        message: "Please enter a valid name",
      }),
    receiversName: Yup.string()
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
    message: Yup.string().max(200, "Please enter a valid message"),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <div className={classes.root}>
        <div className={classes.headerDiv}>
          <Typography variant="h4" className={classes.heading}>
            Message
          </Typography>
        </div>

        <div className={classes.writeDiv}>
          <Formik
            innerRef={formRef}
            initialValues={{
              name: details.name || "",
              receiversName: details.receiversName || "",
              mobileNumber: details.mobileNumber || "",
              emailId: details.emailId || "",
              message: details.message || "",
            }}
            validationSchema={WriteUsSchema}
            validateOnChange
            onSubmit={(values, { setSubmitting }) => {
              // setSubmitting(true);
              if (values) {
                setDetails(values);
                setActiveStep(activeStep + 1);
              }
            }}
          >
            {({ values, errors, touched, isSubmitting, setFieldTouched }) => (
              // <Grid container>
              <Form>
                <Grid container className={classes.wishlistDiv}>
                  <Grid item xs={12} md={12} className={classes.outerDiv}>
                    <Typography className={classes.detailsName}>
                      Sender’s Detail
                    </Typography>
                  </Grid>
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
                </Grid>

                <Grid container className={classes.wishlistDiv}>
                  <Grid item xs={12} md={12} className={classes.outerDiv}>
                    {/* <div className={classes.scndBlock}> */}
                    <Typography className={classes.seconddetailsName}>
                      Receiver’s Detail
                    </Typography>
                    {/* </div> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={[classes.outerDiv, classes.secndDiv].join(" ")}
                  >
                    <InputField
                      setFieldTouched={setFieldTouched}
                      alwaysShowLabel={true}
                      inputWidth={classes.inputWidth}
                      label={"Name"}
                      placeHolder={"Name"}
                      id="receiversName"
                      name="receiversName"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.receiversName}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={[classes.outerDiv, classes.secndDiv].join(" ")}
                  >
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
                      prefixContent={
                        <input
                          className={classes.prefixContent}
                          disabled
                          defaultValue={"+91"}
                        />
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={[classes.outerDiv, classes.secndDiv].join(" ")}
                  >
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
                </Grid>

                <Grid container className={classes.wishlistDiv}>
                  <Grid item xs={12} md={12} className={classes.outerDiv}>
                    {/* <div className={classes.scndBlock}> */}
                    <Typography className={classes.seconddetailsName}>
                      Message
                    </Typography>
                    {/* </div> */}
                  </Grid>
                  <Grid item xs={12} md={12} className={classes.outerDiv}>
                    <InputField
                      maxLength={200}
                      setFieldTouched={setFieldTouched}
                      alwaysShowLabel={true}
                      inputWidth={classes.textArea}
                      label={"Add Greetings Here"}
                      placeHolder={"Greetings here"}
                      id="message"
                      name="message"
                      type="text"
                      touched={touched}
                      errors={errors}
                      value={values.message}
                      isRequired={false}
                      actAs="textarea"
                    />
                  </Grid>
                </Grid>
              </Form>
              // </Grid>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Messages;

