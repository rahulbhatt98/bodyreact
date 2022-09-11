import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Input,
  Grid,
} from "@material-ui/core";
import clsx from "clsx";
import { sendOtpForCardNumber } from "../../../giftCard/action";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../home/actions";
import CustomButton from "../../../../components/common/button";
import { useState } from "react";
import ThankYouModal from "../../../giftCard/giftModals/thankYou";
import { redeemGvInterface } from "./index";
import { verifyGv } from "../action";
import Utils from "../../../../utils";

interface Props {
  open: boolean;
  handleClose: () => void;
  redeemGvData: redeemGvInterface;
  closeModal: Function;
  getRedeemData: Function;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    // height:'500px'

    [theme.breakpoints.down("xs")]: {
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    },
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(1),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "460px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      borderRadius: "12px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      borderRadius: "12px",
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.6
    )}px Work Sans SemiBold`,
    lineHeight: "28.8px",
    padding: "10px 0px 10px 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(1, 0, 0, 0),
  },

  imgIcon: {
    textAlign: "end",
    cursor: "pointer",
  },

  textHeading: {
    font: `normal ${theme.spacing(1.3)}px Work Sans`,
    fontWeight: 500,
    lineHeight: "15px",
    color: "#69BE5B",
    marginTop: "3px",

    // margin: theme.spacing(-2.0, 0, 0, 0),
  },
  InputTag: {
    height: "54px",
    width: "100%",
    // marginBottom: "15px",
    border: "1px solid #e2e2e2",
    padding: "0px 15px",
    background: "white",
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
    // "& .MuiInput-input": {
    //   textTransform: "uppercase"
    // }
  },
  InputTag2: {
    height: "54px",
    width: "100%",
    // marginBottom: "15px",
    marginBottom: "3px",

    border: "1px solid #e2e2e2",
    padding: "0px 15px",
    lineHeight: "19px",
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.5
    )}px Work Sans`,
    letterSpacing: "0.02em",
    color: "#0D0D0D",
    "&::-webkit-input-placeholder": {
      font: `normal  ${theme.spacing(1.5)}px Work Sans`,
      color: "var(--light-gray-text)",
      fontWeight: 500,
    },
  },

  error: {
    color: "red",
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )}px Work Sans`,
    marginTop: "3px",
  },
  noMargin: {
    marginBottom: "0px",
  },
  link: {
    color: "#044236",
    font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
    lineHeight: "16px",
    cursor: "pointer",
  },

  emptyDiv: {
    height: "15px",
  },
  btn: {
    width: "46%",
  },
  formContainer: {
    // width: '100%',
    // marginBottom: '10px',
    "& .MuiFormGroup-root": {
      "& .formLabel": {
        height: "0px",
      },
    },
    margin: theme.spacing(2.5, 2, 2, 2),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "20px 0px",
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },

  buttonContainer: {
    "& .MuiButton-root": {
      width: "100%",
      marginRight: "15px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  formContainer2: {
    width: "100%",
  },
  inputLabel: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "16.42px",
    color: "#333333",
    marginBottom: "8px",
  },
  inputValue: {},
  gridContainer: {
    width: "100%",
  },
  buttonGrid: {
    padding: "0px !important",
    paddingRight: "10px !important",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0px !important",
    },
  },
  btnSubmit: {
    width: "100%",
    // marginBottom: theme.spacing(2.0),
    // marginLeft: theme.spacing(2.0),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px",
      marginTop: "-20px",
    },
    marginTop: "21px",
  },
  para: {
    // width: '100%',
    marginLeft: "10px",
    // textAlign:"left",
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )}px Work Sans`,
    color: "var(--light-gray)",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 0),
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginLeft: "0px",
      width: "100%",
    },
  },
}));
const RedeemVoucher = (props: Props) => {
  const classes = useStyles();
  const { redeemGvData, closeModal, getRedeemData } = props;
  const dispatch = useDispatch();
  const [cardCode, setCardCode] = useState("");
  const [redeemError, setRedeemError] = useState("");
  // const [openRedeemBalanceModal, setOpenRedeemBalanceModal] = useState(false);
  const [openGetRedeemBalanceModal, setOpenGetRedeemBalanceModal] =
    useState(false);

  const onChangeCardCode = (e: any) => {
    setCardCode(e.target.value);
    setRedeemError("");
  };
  const handleGetRedeemBalanceClose = () => {
    setOpenGetRedeemBalanceModal(false);
    getRedeemData();
  };

  const onSendOtp = () => {
    setRedeemError("");
    setCardCode("");
    const payload = {
      cardNumber: redeemGvData?.voucherNumber || "",
      otpType: "egv",
    };
    dispatch(sendOtpForCardNumber(payload));
  };

  const onRedeemBalance = () => {
    const payload = {
      gvCode: redeemGvData?.voucherNumber || "",
      amount: redeemGvData?.amount || "",
      otp: cardCode,
      requestId: redeemGvData?.requestId || "",
    };
    dispatch(showLoader());
    dispatch(
      verifyGv(payload, (resp: any) => {
        setOpenGetRedeemBalanceModal(true);
        closeModal();
      })
    );
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Redeem Voucher
            </Typography>
            <div className={classes.formContainer}>
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h4" className={classes.inputLabel}>
                    Voucher Number
                  </Typography>
                  <Typography variant="h4" className={classes.inputValue}>
                    <Input
                      disabled={true}
                      value={redeemGvData?.voucherNumber || ""}
                      className={classes.InputTag}
                      renderSuffix={() => {
                        if (redeemGvData?.voucherNumber)
                          return (
                            <Typography
                              className={classes.link}
                              onClick={onSendOtp}
                            >
                              RESEND
                            </Typography>
                          );
                      }}
                    />
                  </Typography>
                </Grid>
                {redeemGvData?.voucherNumber ? (
                  <>
                    <Grid item xs={12} md={12}>
                      <div
                        className={clsx(
                          classes.formContainer2,
                          classes.noMargin
                        )}
                      >
                        <Typography variant="h4" className={classes.inputLabel}>
                          6 Digit OTP
                        </Typography>
                        <Typography variant="h4" className={classes.inputValue}>
                          <input
                            value={cardCode}
                            className={classes.InputTag2}
                            placeholder="Enter 6 Digit Number"
                            onChange={onChangeCardCode}
                            // type="number"
                            type="text"
                            pattern="\d*"
                            maxLength={6}
                          />
                        </Typography>
                      </div>
                      {cardCode && cardCode?.length !== 6 && (
                        <Typography className={classes.error}>
                          Please enter a 6 digit OTP
                        </Typography>
                      )}
                      {redeemError !== "" && (
                        <Typography className={classes.error}>
                          {redeemError}
                        </Typography>
                      )}
                    </Grid>
                  </>
                ) : (
                  <div className={classes.emptyDiv} />
                )}

                <Divider light className={classes.divider} />

                <div className={classes.buttonContainer}>
                  <div className={classes.btn}>
                    <CustomButton
                      type="submit"
                      text={"Cancel"}
                      fullWidth
                      onClick={props.handleClose}
                      variant="outlined"
                    />
                  </div>

                  <div className={classes.btn}>
                    <CustomButton
                      type="submit"
                      text={"Add to Wallet"}
                      fullWidth
                      onClick={onRedeemBalance}
                      variant="contained"
                      disabled={
                        redeemGvData?.voucherNumber === "" ||
                        cardCode === "" ||
                        (cardCode !== "" && cardCode?.length !== 6)
                      }
                    />
                  </div>
                </div>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
      <ThankYouModal
        message={`₹ ${Utils.CommonFunctions.addCommaToAmount(
          redeemGvData?.amount
        )} has been added to your wallet successfully !`}
        open={openGetRedeemBalanceModal}
        handleClose={handleGetRedeemBalanceClose}
      />
    </>
  );
};

export default RedeemVoucher;
