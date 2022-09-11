import { Grid, Input, Typography, makeStyles, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import CustomButton from "../../components/common/button";
import { removeSession } from "../../utils/session";
import Utils from "../../utils";
import { hideLoader } from "../home/actions";

import {
  changePassword,
  getUserProfile,
  setFirstTimePassword,
} from "../account/profile/action";

const useStyles = makeStyles((theme: any) => ({
  innerContainer: {
    marginTop: "31px",
    height: "150px",
    "& .MuiGrid-grid-md-6": {
      maxWidth: "48%",
      flexBasis: "48%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      padding: "0px 20px",
      "& .MuiGrid-grid-md-6": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
  },
  innerChild1: {
    marginRight: "5px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
    },
  },
  innerChild2: {
    marginLeft: "5px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginTop: "20px",
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.6
    )}px Work Sans`,
    lineHeight: "42px",
    color: "#004236",
  },
  label: {
    font: `normal 500 ${theme.spacing(1.4)}px Work Sans`,
    color: "#333333",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0em",
    textAlign: "left",
    marginBottom: "5px",
  },
  InputTag: {
    height: "54px",
    width: "100%",
    marginBottom: "5px",
    border: "1px solid #e2e2e2",
    padding: "0px 15px",
    lineHeight: "19px",
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "&::before": {
      display: "none",
    },
    "&::after": {
      display: "none",
    },
    "&::-webkit-input-placeholder": {
      font: `normal  ${theme.spacing(1.5)}px Work Sans`,
      color: "var(--light-gray-text)",
      fontWeight: 500,
      // textTransform:"none !important"
    },
  },
  btn: {
    borderRadius: "4px",
    padding: "15px !important",
  },

  // error: {
  //     color: "red",
  //     font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
  //         1.2
  //     )}px Work Sans`,
  //     marginTop: "-6px",
  // },
  subHeading: {
    marginTop: "17px",
    font: `normal 500 ${theme.spacing(1.2)}px Work Sans`,
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "19px",
    letterSpacing: "0em",
    color: "#000000",
  },
  link: {
    color: "#044236",
    font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
    lineHeight: "16px",
    cursor: "pointer",
  },
  error: {
    color: "#f44336",
    fontSize: "12px",
    fontFamily: "Work Sans",
    fontWeight: 400,
    lineHeight: 1.66,
  },
  btnMobile: {
    position: "fixed",
    bottom: "1px",
    width: "89%",
    margin: "0px 20px",
    borderRadius: "4px",
    [theme.breakpoints.down("xs")]:{
      marginBottom: "15px"
    }
    // left:"20px",
    // right:"20px !important",
    // marginRight:"20px !important"
  },
}));

const ChangePassword: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const showSetPassword = location?.state?.setPassword || false;
  const [showPassword, setShowPassword] = useState(false);
  const [setPassword, setSetPasswordVisibility] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setSetPasswordVisibility(showSetPassword);
  }, []);

  const onSubmit = () => {
    if (!oldPassword) {
      setOldPasswordError("Please enter Old Password");
    }
    if (!newPassword) {
      setNewPasswordError("Please enter New Password");
    }
    if (newPassword && !newPassword.match(Utils.regex.passwordRegex)) {
      setNewPasswordError("Password should be a minimum of 8 characters & a combination of alphabets & numbers");
    }
    if (oldPassword && !oldPassword.match(Utils.regex.passwordRegex)) {
      setOldPasswordError("Password should be a minimum of 8 characters & a combination of alphabets & numbers");
    }
    if (oldPassword && newPassword&&oldPassword.match(Utils.regex.passwordRegex)&&newPassword.match(Utils.regex.passwordRegex)) {
      dispatch(
        changePassword({ oldPassword, newPassword }, (resp: any) => {
          setOldPassword("");
          setNewPassword("");
          removeSession();
          dispatch(hideLoader());
          dispatch({ type: "RESET_STORE" });
        })
      );
    }
  };

  const setPasswordOnSubmit = (values: any) => {
    if (!oldPassword) {
      setOldPasswordError("Please enter Password");
    } else if (!newPassword) {
      setNewPasswordError("Please confirm Password");
    } else if (oldPassword && !oldPassword.match(Utils.regex.passwordRegex)) {
      setOldPasswordError("Password should be a minimum of 8 characters & a combination of alphabets & numbers");
    } else if (newPassword && !newPassword.match(Utils.regex.passwordRegex)) {
      setNewPasswordError("Password should be a minimum of 8 characters & a combination of alphabets & numbers");
    } else if (
      oldPassword &&
      newPassword &&
      newPassword.match(Utils.regex.passwordRegex) &&
      oldPassword.match(Utils.regex.passwordRegex) &&
      oldPassword !== newPassword
    ) {
      setNewPasswordError("Passwords do not match");
    } else if (oldPassword && newPassword && oldPassword === newPassword) {
      dispatch(
        setFirstTimePassword({ password: oldPassword }, (resp: any) => {
          setOldPassword("");
          setNewPassword("");
          dispatch(getUserProfile());
          history.push({
            pathname: Utils.routes.CHANGE_PASSWORD,
            state: { setPassword: false, pageName: "Change Password" },
          });
          setSetPasswordVisibility(false);
        })
      );
    }
  };
  return (
    <div>
      <Hidden xsDown>
        <Typography className={classes.heading}>
          {setPassword ? "Set Password" : "Change Password"}
        </Typography>
        <Typography className={classes.subHeading}>
          {setPassword
            ? "Please set your password"
            : "Please enter your current password to confirm your identity"}
          .
        </Typography>
      </Hidden>
      <Grid container className={classes.innerContainer}>
        <Grid item className={classes.innerChild1} xs={12} sm={6} md={6}>
          <Typography variant="h4" className={classes.label}>
            {setPassword ? "Password" : "Old Password"}
            <span className={classes.error}>*</span>
          </Typography>
          <Input
            value={oldPassword || ""}
            className={classes.InputTag}
            placeholder={setPassword ? "Password" : "Old Password"}
            onChange={(e: any) => {
              setOldPasswordError("");
              setOldPassword(e?.target?.value);
            }}
            renderSuffix={() => {
              return !showPassword ? (
                // <Typography
                //   className={classes.link}
                //   onClick={() => setShowPassword(!showPassword)}
                // >
                //   SHOW
                // </Typography>
                <img
                  src={Utils.images.HIDE}
                  alt="hideIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                // <Typography
                //   className={classes.link}
                //   onClick={() => setShowPassword(!showPassword)}
                // >
                //   HIDE
                // </Typography>
                <img
                  src={Utils.images.SHOW}
                  alt="hideIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              );
            }}
            type={!showPassword ? "password" : "text"}
          />
          {oldPasswordError && (
            <Typography className={classes.error}>
              {oldPasswordError}
            </Typography>
          )}
        </Grid>
        <Grid className={classes.innerChild2} item xs={12} sm={6} md={6}>
          <Typography variant="h4" className={classes.label}>
            {setPassword ? "Confirm Password" : "New Password"}
            <span className={classes.error}>*</span>
          </Typography>
          <Input
            onChange={(e: any) => {
              setNewPasswordError("");
              setNewPassword(e?.target?.value);
            }}
            value={newPassword || ""}
            className={classes.InputTag}
            placeholder={setPassword ? "Confirm Password" : "New Password"}
            type={!showConfirmPassword ? "password" : "text"}
            renderSuffix={() => {
              return !showConfirmPassword ? (
                // <Typography
                //   className={classes.link}
                //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                // >
                //   SHOW
                // </Typography>
                <img
                  src={Utils.images.HIDE}
                  alt="hideIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                // <Typography
                //   className={classes.link}
                //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                // >
                //   HIDE
                // </Typography>
                <img
                  src={Utils.images.SHOW}
                  alt="hideIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              );
            }}
          />

          {newPasswordError && (
            <Typography className={classes.error}>
              {newPasswordError}
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* <div> */}
      <Hidden xsDown>
        <CustomButton
          className={classes.btn}
          type="submit"
          text={setPassword ? "Set Password" : "Change Password"}
          fullWidth={false}
          onClick={setPassword ? setPasswordOnSubmit : onSubmit}
          variant="contained"
        />
      </Hidden>
      <Hidden smUp>
        <CustomButton
          className={classes.btnMobile}
          type="submit"
          text={setPassword ? "Set Password" : "Update Password"}
          fullWidth={true}
          onClick={setPassword ? setPasswordOnSubmit : onSubmit}
          variant="contained"
        />
      </Hidden>
      {/* </div> */}
    </div>
  );
};

export default ChangePassword;
