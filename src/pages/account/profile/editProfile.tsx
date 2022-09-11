import React, { useEffect, useRef, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Button,
  Typography,
  Hidden,
  IconButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../../utils";
import { hideLoader, showLoader } from "../../home/actions";
import InputField from "../../../components/common/inputField";
import CustomCalender from "../../../components/common/calendar";
import { ReducersModal } from "../../../models";
import { checkUser, getUserProfile, updateUserInfo } from "./action";
import { deleteFromS3, uploadToS3 } from "../orders/action";
import { sendOtp, verifyOtp } from "../../../components/common/otp/action";
import VerifyEmail from "../../../components/common/verifyEmail";
import MessageDialog from "../../../components/common/messageDialog";
import CustomSelectBox from "../../../components/common/customSelectBox";
import {
  profileUpdate,
  updateProfileAttributes,
} from "../../../utils/event/action";
import { useHistory } from "react-router-dom";
import { isDeviceMobile } from "../../../components/common/deviceDetect";
import RemoveIcon from "@material-ui/icons/Remove";
import EditOptionsModal from "./editOptions";
import ViewImage from "./viewImage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addressFormContainer: {
      // background: "#FAFAFA",
      // border: "1px solid #E2E2E2",
      boxSizing: "border-box",
      borderRadius: "4px",
      width: "100%",
      // padding: "20px",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
    },
    title: {
      font: "normal 600 14px Work Sans",
      color: "#333333",
      marginTop: "18px",
    },
    inputWidth: {
      width: "100%",
      height: "55px",
    },
    radioContainer: {
      marginTop: theme.spacing(2),
      "& .Mui-checked": {
        color: "var(--main-opacity)",
      },
    },
    radioGroup: {
      display: "flex",
      flexDirection: "column",
    },
    radioLabel: {
      color: "var(--black)",
    },
    button: {
      width: "100%",
      borderRadius: "4px",
      // height: "43px",
      marginTop: "20%",
      marginLeft: "10px",
      marginRight: "10px",
      float: "right",
      padding: "14px",
      textTransform: "none",
      font: `normal 600 14px Work Sans`,
      [theme.breakpoints.down("xs")]: {
        marginTop: "5%",
        // position: "fixed",
        // bottom: "1px",
        width: "95%",
      },
    },
    rightButton: {
      marginRight: "0px",
      [theme.breakpoints.down("xs")]: {
        marginRight: "30px !important",
      },
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
    },
    buttonContainer: { textAlign: "right" },
    divider: { marginTop: "12px" },
    gridContainer: { marginTop: "10px" },
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

    marginTop: {
      marginTop: "-12px",
      paddingBottom: "6px",
    },
    "&$checked": {
      color: "#3d857e",
    },
    selectBox: {
      width: "100%",
      padding: "10px",
      height: "54px",
      background: "#FAFAFA",
      border: "1px solid #E2E2E2",
      borderRadius: "2px",

      "&:before": {
        borderBottom: "none !important",
      },
      "& .MuiSelect-select.MuiSelect-select": {
        paddingLeft: theme.spacing(1),
      },
      "& .MuiSelect-select": {
        background: "#FAFAFA !important",
      },
    },
    formLabel: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--secondary-black)",
      height: theme.spacing(2),
      fontWeight: 500,
    },
    error: {
      color: "#f44336",
      fontSize: "11px",
      fontFamily: "Work Sans",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    option: {
      // display: "none"
      minHeight: "50px !important",
      maxHeight: "50px !important",
      width: "100%",
      margin: "20px",
    },
    required: {
      color: "#f44336",
    },
    imgContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    },
    img: {
      height: "150px",
      width: "150px",
      borderRadius: "50%",
      // background: "lightgrey",
      objectFit: "cover",
    },
    noImage: {
      // background: "lightgrey",
      // border: "1px solid lightgrey",
      width: "150px",
      height: "150px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "50%",
      background: "#D6CD56",
      alignItems: "center",
      objectFit: "scale-down",
    },
    editContainer: {
      height: "155px",
      width: "155px",
      position: "relative",
    },
    editIcon: {
      position: "absolute",
      bottom: "3px",
      right: "11px",
      cursor: "pointer",
    },
    deleteIcon: {
      position: "absolute",
      bottom: "3px",
      left: "11px",
      height: "40px",
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
    headingContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    cursor: {
      cursor: "pointer",
    },
    link: {
      color: "#044236",
      // font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      lineHeight: "16px",
      cursor: "pointer",
      width: "25%",
      textAlign: "center",
      border: "none",
      borderLeft: "1px solid #E2E2E2",
      backgroundColor: "white",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      float: "right",
      [theme.breakpoints.down("xs")]: {
        width: "30%",
      },
    },
    disabled: {
      pointerEvents: "none",
      color: "grey",
    },
    container: {
      [theme.breakpoints.down("xs")]: {
        padding: "25px 20px",
      },
    },
    mobileBottom: {
      background: "white",
      position: "fixed",
      bottom: "0px",
      height: "80px",
      width: "100%",
      // display: "flex",
      // justifyContent: "center"
    },
    scroll: {
      [theme.breakpoints.down("xs")]: {
        height: "auto",
        paddingBottom: "60px",
      },
    },
    iconBtn: {
      // backgroundColor: theme.palette.primary.main,
      // "&:hover": {
      //   backgroundColor: theme.palette.primary.main,
      // },
      background: "#3d857e",
      color: "yellow",
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      padding: theme.spacing(0.8),
      // margin: theme.spacing(1.2, 1),
      "&:hover": {
        background: "#3d857e",
      },
      "& .MuiSvgIcon-fontSizeSmall": {
        fontSize: "25px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "24px",
        height: "24px",
        background: "#3d857e",
        "&:hover": {
          background: "#3d857e",
        },
      },
      left: "11px",
      bottom: "3px",
      cursor: "pointer",
      position: "absolute",
    },
    fullWidth: {
      width: "100%",
      height: "100%",
    },
    verified: {
      display: "flex",
      color: "#4EB75E",
      marginRight: 20,
      "& img": {
        marginRight: 2,
        marginTop: 0,
      },
    },
    messageDialog: {

      "& .MuiDialog-paperWidthSm": {
        // maxWidth: 438
        minWidth: 551,
        width: 551,
        [theme.breakpoints.down("xs")]: {
          minWidth: "90%",
        },
      },

    },
    verifyNowBtn: {
      [theme.breakpoints.down("xs")]:{
        fontSize: "12px",
    width: "28%",
      }
    }
  })
);
const Input = styled("input")({
  display: "none",
});

const EditProfile: React.FC<any> = (props: any) => {
  const data = useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) || {}
  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showVerifyEmail, setShowVerifyEmail] = useState(false)
  const [values, setValues] = useState<any>({})
  const [showContinuePopUp, setShowContinuePopUp] = useState(false)
  const [emailVerified, setEmailVerified] = useState(data?.isEmailVerified)
  const [email, setEmail] = useState(data?.email || '')
  const [selectedImage, setSelectedImage] = useState<any>({ url: data?.profilePicture || "" })
  const [url, setUrl] = useState<any>("")
  const [timer, setTimer] = useState(0);
  const [isMobile, setIsMobile] = useState<any>({});
  const [closeEditProfile, setCloseEditProfile] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: data?.fullName || "",
    mobileNo: data?.mobileNo || "",
    email: data?.email || "",
    dob: data.dob ? data.dob : null,
    gender: data.gender || "select",
    countryCode: data.countryCode || "select",
  });
  const resendOtpTime = useSelector(
    (state: ReducersModal) =>
      state.configReducer.generalConfigs?.resend_otp_time
  );
  const payload: any = {
    type: "profile",
    otpVia: "email",
    email,
  };

  useEffect(() => {
    setSelectedImage({ url: data?.profilePicture || "" })
    setUrl(data?.profilePicture || "")
  }, [])

  useEffect(() => {
    setEmailVerified(data?.isEmailVerified)
  }, [data?.isEmailVerified])


  useEffect(() => {
    setIsMobile(isDeviceMobile());
    setInitialValues({
      fullName: data?.fullName || "",
      mobileNo: data?.mobileNo || "",
      email: data?.email || "",
      dob: data.dob ? data.dob : null,
      gender: data.gender || "",
      countryCode: data.countryCode || "",
    });
    return () => {
      if (isMobile?.remove) isMobile.remove();
    };
  }, [data?.email]);

  const schema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Please enter name")
      .matches(Utils.regex.fullName, {
        message: "Please enter a valid Name",
      }),
    mobileNo: Yup.string()
      .required("Please enter mobile number")
      .matches(Utils.regex.onlyNumberRegex, {
        message: "Please enter valid mobile number",
      }),
    email: Yup.string()
      .trim()
      .required("Please enter email address")
      .matches(Utils.regex.emailRegex, { message: "Please enter valid email" }),
    // dob: Yup.string(),
    gender: Yup.string(),
  });

  const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }: any) => (
    <div>
      <CustomSelectBox
        required={false}
        value={values.gender}
        {...field}
        defaultValue={values.gender}
        {...props}
        name="gender"
        id="gender"
        label={"Gender"}
        option={[
          { key: "select", label: "Select" },
          { key: "male", label: "Male" },
          { key: "female", label: "Female" },
          { key: "other", label: "Other" },
        ]}
        placeholder="Select Gender"
      />

      {touched[field.name] && errors[field.name] && (
        <div className={classes.error}>{errors[field.name]}</div>
      )}
    </div>
  );

  const imageHandler = (e: any) => {
    if (e.target.files) {
      const fileArray: any = Array.from(e.target.files).map((file: any) => {
        return { file: file, url: URL.createObjectURL(file) };
      });
      if (fileArray?.[0]?.file?.name && fileArray?.[0]?.file) {
        dispatch(showLoader());
        uploadToS3(
          fileArray[0]?.file?.name,
          fileArray[0].file,
          "profileImage",
          (data: any) => {
            if (data) {
              setUrl(data.location);
            }
            dispatch(hideLoader());
          }
        );
      }
      setSelectedImage(fileArray?.[0] ?? {});
    }
    setEditModalVisibility(false);
  };

  const handleClick = (email: string) => {
    if (!emailVerified || email !== data.email) {
      setShowVerifyEmail(true);
      payload.email = email;
      setEmail(email);
      sendOtpOnClick();
      // dispatch(sendOtp(payload,()=>{
      //   setTimer(Date.now() + (configs?.generalConfigs?.resend_otp_time * 1000))
      // }))
    }
  };

  const verify = (otp: string | undefined) => {
    dispatch(showLoader());
    payload.OTP = otp;
    payload.email = email;
    dispatch(
      verifyOtp(payload, (data: any) => {
        if (data.httpCode === 201 || data.httpCode === 200) {
          window.scrollTo(0, 0);
          setEmailVerified(true);
          setShowVerifyEmail(false);
          setShowContinuePopUp(false);
          delete values.mobileNo;
          dispatch(
            updateUserInfo(values?.email ? values : { email }, () => {
              dispatch(hideLoader());
              dispatch(getUserProfile());
            })
          );
        }
        if (closeEditProfile)
          history.push({
            pathname: "/my-profile",
            state: { pageName: "My Account" },
          });

        // setEditProfileVisibility(false);
        dispatch(hideLoader());
      })
    );
  };

  const sendOtpOnClick = () => {
    dispatch(
      sendOtp(payload, () => {
        setTimer(Date.now() + resendOtpTime * 1000);
      })
    );
  };

  const onContinue = () => {
    const payloadData: any = values;
    payloadData.email = data.email;
    delete values.mobileNo;
    if (values.gender === "" || values.gender === "select")
      delete values.gender;

    dispatch(
      updateUserInfo(values, () => {
        history.push({
          pathname: "/my-profile",
          state: { pageName: "My Account" },
        });

        // setEditProfileVisibility(false);
        dispatch(hideLoader());
        dispatch(getUserProfile());
      })
    );
    setShowContinuePopUp(false);
  };

  const onEmailChange = (e: any) => {
    setEmail(e?.target?.value || "");
    if (e.target.value === data.email) setEmailVerified(true);
    else if (e?.target?.value !== data.email) {
      // if (
      //   // (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)
      //   )
      if (e?.target?.value?.match(Utils.regex.emailRegex)) {
        setTimeout(() => {
          if (e?.target?.value?.match(Utils.regex.emailRegex)) {
            dispatch(
              checkUser(e.target.value, (value: any) => {
                if (value) setEmailVerified(false);
                else setEmailVerified(null);
              })
            );
          }
        }, 1000);
      }

      // dispatch(sendOtp(payload,()=>{
      //   setTimer(Date.now() + (configs?.generalConfigs?.resend_otp_time * 1000))
      // }))
    }
  };

  const deleteImage = () => {
    // if (selectedImage?.url) {
    // dispatch(showLoader());
    // deleteFromS3(photo.url, () => {
    //   dispatch(hideLoader());
    setSelectedImage({});
    setUrl("");
    // const arr = urls?.filter(
    //   (img: any) => img.url !== s3UrlToDelete[0].s3Url
    // );
    // setUrls(arr);
    // });
    // } else {
    //   setUrl("")
    //   setSelectedImage({});

    // }
    setEditModalVisibility(false);
  };

  const img = selectedImage?.url
    ? selectedImage?.url
    : // : data.profilePicture
    //   ? data.profilePicture
    "";

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let yearMax = new Date(year - 13, month, day);

  return (
    <div className={classes.addressFormContainer}>
      <Hidden xsDown>
        <div className={classes.headingContainer}>
          <Typography variant="h3" className={classes.heading} color="primary">
            Edit Profile
          </Typography>
          <img
            src={Utils.images.CROSS}
            alt="cross"
            className={classes.cursor}
            onClick={
              () =>
                history.push({
                  pathname: "/my-profile",
                  state: { pageName: "My Account" },
                })
              // setEditProfileVisibility(false)
            }
          />
        </div>
      </Hidden>
      <div className={classes.container}>
        {/* <div className={classes.imgContainer}>
          <div className={classes.editContainer}>

            <img
              className={img ? classes.img : classes.noImage}
              src={img ? img : Utils.images.PROFILE_IMAGE_OUTLINE}
              alt="icon"
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={imageHandler}
              />
              <img
                className={classes.editIcon}
                src={Utils.images.EDIT_ICON_CIRCLE}
                alt="editIcon"
              />
            </label>
          </div>
        </div> */}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          validateOnChange
          onSubmit={(valuesFormik, { setSubmitting }) => {
            const payload: any = { ...valuesFormik };
            /**
             * event logger
             */
            profileUpdate({
              UserName: `${valuesFormik.fullName}`,
              PhoneNo: `${valuesFormik.mobileNo}`,
              DOB: Utils.CommonFunctions.unixToDate(
                valuesFormik.dob,
                "MMM DD, YYYY"
              ),
              EmailID: `${valuesFormik.email}`,
              Gender: `${valuesFormik.gender}`,
            });

            updateProfileAttributes({
              Name: `${valuesFormik.fullName}`,
              Phone: `${valuesFormik?.countryCode?.indexOf("+") > -1 ? "" : "+"}${valuesFormik?.countryCode ?? "91"}${valuesFormik?.mobileNo}`,
              DOB: new Date(valuesFormik.dob),
              Email: `${valuesFormik.email}`,
              Gender: valuesFormik.gender === 'male' ? 'M': valuesFormik.gender === 'female' ? 'F':'O' ,
            });

            delete payload.mobileNo;
            if (url) payload.profilePicture = url;
            else payload.profilePicture = "";
            if (!valuesFormik.dob) payload.dob = 0;
            if (valuesFormik.gender === "" || valuesFormik.gender === "select")
              delete payload.gender;
            setValues(payload);
            if (
              (emailVerified && data.email !== valuesFormik.email) ||
              (emailVerified && data.email === valuesFormik.email)
            ) {
              dispatch(
                updateUserInfo(payload, () => {
                  // setEditProfileVisibility(false);
                  history.push({
                    pathname: "/my-profile",
                    state: { pageName: "My Account" },
                  });
                  dispatch(
                    getUserProfile(() => {
                      dispatch(hideLoader());
                      // history.push({ pathname: "/my-profile", state: { pageName: "My Account" } })
                    })
                  );
                })
              );
            } else if (!emailVerified) setShowContinuePopUp(true);
          }}
        >
          {({ values, errors, touched }) => {
            return (
              <Form autoComplete="off">
                <div className={classes.scroll}>
                  <div className={classes.imgContainer}>
                    <div className={classes.editContainer}>
                      <img
                        className={img ? classes.img : classes.noImage}
                        src={img ? img : Utils.images.PROFILE_IMAGE_OUTLINE}
                        alt="icon"
                        onError={(evt: any) =>
                          (evt.target.src = Utils.images.PROFILE_IMAGE_OUTLINE)
                        }
                      />
                      {!img ? (
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={imageHandler}
                          />
                          <img
                            onClick={() => setEditModalVisibility(true)}
                            className={classes.editIcon}
                            src={Utils.images.EDIT_ICON_CIRCLE}
                            alt="editIcon"
                          />
                        </label>
                      ) : (
                        <img
                          onClick={() => setEditModalVisibility(true)}
                          className={classes.editIcon}
                          src={Utils.images.EDIT_ICON_CIRCLE}
                          alt="editIcon"
                        />
                      )}
                    </div>
                  </div>
                  <Grid container className={classes.gridContainer} spacing={2}>
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
                        alwaysShowLabel={true}
                        inputWidth={classes.inputWidth}
                        label={"Email Address "}
                        placeHolder={"Email Address"}
                        id="email"
                        name="email"
                        type="text"
                        touched={touched}
                        errors={errors}
                        value={values.email}
                        isRequired={true}
                        onChange={onEmailChange}
                        postfixContent={
                          <Typography
                            // className={
                            //   !values.email
                            //     ? clsx(classes.link, classes.disabled)
                            //     : classes.link
                            // }
                            className={classes.verifyNowBtn}
                            onClick={() =>
                              handleClick(
                                values.email ? values.email : data.email
                              )
                            }
                          >
                            {" "}
                            {emailVerified ? (
                              <>
                                <div className={classes.verified}>
                                  <Hidden xsDown>
                                    <Typography color="primary">
                                      Verified
                                    </Typography>
                                  </Hidden>
                                  <Hidden smUp>
                                    <img
                                      src={Utils.images.VERIFIED}
                                      alt="verified"
                                    />
                                    <Typography>Verified</Typography>
                                  </Hidden>
                                </div>
                              </>
                            ) : emailVerified === false ? (
                            
                              "Verify Now"
                             
                            ) : (
                              ""
                            )}
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputField
                        isDisabled={true}
                        alwaysShowLabel={true}
                        inputWidth={classes.inputWidth}
                        label={"Mobile Number"}
                        placeHolder={"Mobile Number"}
                        id="mobileNo"
                        name="mobileNo"
                        type="text"
                        pattern="\d*"
                        touched={touched}
                        errors={errors}
                        value={values.mobileNo || data?.mobileNo}
                        maxLength={10}
                        isRequired={true}
                        prefixContent={
                          <input
                            className={classes.prefixContent}
                            disabled
                            defaultValue={"+91"}
                          />
                        }
                        postfixContent={
                          <>
                            <div className={classes.verified}>
                              <Hidden xsDown>
                                <Typography color="primary">
                                  Verified
                                </Typography>
                              </Hidden>
                              <Hidden smUp>
                                <img
                                  src={Utils.images.VERIFIED}
                                  alt="verified"
                                />
                                <Typography>Verified</Typography>
                              </Hidden>
                            </div>
                          </>
                        }

                      // prefixContent={<input className={classes.prefixContent} disabled defaultValue={'+91'} />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomCalender
                        inputWidth={classes.inputWidth}
                        isRequired={false}
                        alwaysShowLabel={true}
                        maxDate={yearMax}
                        id={"dob"}
                        name={"dob"}
                        value={values.dob}
                        formLabel={"Date of Birth"}
                        placeholder={"Date of Birth"}
                        icon={
                          <img src={Utils.images.DATE_ICON} alt="dateICon" />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="gender"
                        id="gender"
                        className={classes.selectBox}
                        component={CustomInputComponent}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Hidden smUp>
                  <div className={classes.mobileBottom}>
                    <Button
                      className={clsx(classes.button, classes.rightButton)}
                      type="submit"
                      color="primary"
                      fullWidth={true}
                      variant="contained"
                    >
                      Update
                    </Button>
                  </div>
                </Hidden>
                <Hidden xsDown>
                  <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Button
                        className={clsx(classes.button, classes.rightButton)}
                        type="submit"
                        color="primary"
                        fullWidth={false}
                        variant="contained"
                        disabled={emailVerified === null}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Hidden>
              </Form>
            );
          }}
        </Formik>
      </div>
      {showVerifyEmail && (
        <VerifyEmail
          resendOtp={sendOtpOnClick}
          verifyOtp={verify}
          showVerifyEmail={showVerifyEmail}
          timer={timer}
          currentDate={Date.now()}
          email={email}
          onClose={() => {
            setTimer(0);
            setShowVerifyEmail(false);
            setShowContinuePopUp(false);
            // setInitialValues({...initialValues,mobileNo:data?.mobileNo||""})
          }}
        />
      )}
      {showContinuePopUp && (
        <MessageDialog
          className={classes.messageDialog}
          cancelText={"Verify Later"}
          okText={"Verify Now"}
          open={showContinuePopUp}
          handleClose={onContinue}
          onOk={() => {
            handleClick(email);
            // setShowContinuePopUp(false)
            setCloseEditProfile(true);
          }}
          message={
            "Your Email address is pending for verification. Verify now to receive exclusive communication about launches & offers from The Body Shop"
          }
          heading={"Verify Your Email"}
        />
      )}
      {editModalVisibility && img && (
        <EditOptionsModal
          setShowImageView={(value: boolean) => {
            setShowImage(value);
            setEditModalVisibility(false);
          }}
          deleteImage={deleteImage}
          imageHandler={imageHandler}
          handleClose={() => {
            setEditModalVisibility(false);
          }}
          open={editModalVisibility}
        />
      )}
      {showImage && (
        <ViewImage
          open={showImage}
          handleClose={() => {
            setShowImage(false);
          }}
          img={img}
        />
      )}
    </div>
  );
};
export default EditProfile;
