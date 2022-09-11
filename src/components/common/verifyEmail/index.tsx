import React, { useEffect } from "react";
import {
  Dialog,
  Link,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { OtpModal, ReducersModal } from "../../../models";
import { useTranslation } from "react-i18next";
//@ts-ignore
import Countdown, { zeroPad } from "react-countdown";
import CustomButton from "../button";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:first-child": {
        paddingTop: 0,
      },
    },
    otpDialog: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: theme.spacing(5, 13.7),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(5, 10),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(5),
      },
    },
    otpField: {
      height: 50,
      fontSize: 20,
      width: "50px !important",
      border: "1px solid var(--border-color)",
      fontFamily: "Druk",
      borderRadius: theme.spacing(0.2),
    },
    timer: {
      color: "#4CB162",
      position: "relative",
      marginTop: 30,
      fontSize: 15,
      cursor: "pointer",
      "& img": {
        position: "absolute",
        top: "20%",
        left: "39%",
      },
      [theme.breakpoints.down("xs")]: {
        "& img": {

          left: "32%",
        },
      }
    },
    otpFieldContainer: {
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
    },
    para: {
      lineHeight: "18.77px",
      "& span": {
        fontWeight: 600,
      },
      marginTop: "10px",
    },
    heading: {
      fontFamily: "Work Sans",
      fontSize: "26px",
      lineHeight: "30px",
      color: "var(--black)",
    },
    link: {
      textDecoration: "underline",
      color: "var(--black)",
      cursor: "pointer",
    },
    resendBtn: {
      font: `normal ${theme.spacing(1.6)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      textTransform: "uppercase",
    },
    timerIcon: {
      width: '12px',
      height: '12px'
    }
  })
);

interface Props {
  verifyOtp: Function;
  onClose?: Function;
  headingText?: string;
  showVerifyEmail: boolean;
  email: string
  currentDate: any;
  resendOtp: Function;
  removeEdit?: boolean
  timer?: any
}

const VerifyEmail = ({ verifyOtp, onClose, showVerifyEmail, email, currentDate, resendOtp, removeEdit, timer }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState("");

  useEffect(() => {
    setOtp("");
  }, [])

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <div
          onClick={() => {
            setOtp('')
            resendOtp()
          }}
        >
          <Typography color="primary" className={classes.resendBtn}>
            Resend Otp
          </Typography>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div >
          <img className={classes.timerIcon} src={Utils.images.TIMER} alt="timer" />
          <span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        </div>
      );
    }
  };

  const resendOtpTime = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs?.resend_otp_time
  );

  const handleClose = () => {
    setOtp("");
    dispatch({ type: "hide-otp", payload: new OtpModal() });
    if (onClose) {
      onClose();
    }
  };
  const handleChange = (otp: any) => {
    setOtp(otp);
    if (otp.length === 4) {
      dispatch({ type: "set-otp", payload: { OTP: otp } });
    }
  };

  return (
    <React.Fragment>
      <Dialog
        // fullScreen={fullScreen}
        open={showVerifyEmail}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={classes.root}
      >
        <div className={classes.otpDialog}>
          <Typography variant="h3" className={classes.heading}>Verify Email Address</Typography>
          <Typography variant="h5" className={classes.para}>
            Kindly enter the 4 digit verification code
            sent to {" "}
            <span>
              {email}
            </span>
            &nbsp;
            {!removeEdit && <Link
              onClick={() => {
                handleClose();
              }}
              className={classes.link}
            >
              Edit
            </Link>
            }
          </Typography>
          <OtpInput
            value={otp ? otp : ""}
            onChange={(e: any) => handleChange(e)}
            numInputs={4}
            separator={<span></span>}
            inputStyle={classes.otpField}
            isInputNum={true}
            containerStyle={classes.otpFieldContainer}
          />

          <div className={classes.timer}>
            <Countdown
              key={currentDate}
              date={timer ? timer : currentDate + (resendOtpTime * 1000)}
              renderer={renderer}
            />
          </div>

          <CustomButton
            type="button"
            color="primary"
            fullWidth
            variant="contained"
            text={t("verify")}
            disabled={otp.length !== 4}
            onClick={() => verifyOtp(otp)}
          />

        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default VerifyEmail;
