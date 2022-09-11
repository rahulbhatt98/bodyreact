import React, {  useState } from "react";
import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Input,
} from "@material-ui/core";
import GetBalance from "./getBalance";
import CustomButton from "../../../components/common/button";
import {
  checkEcardBalance,
  getCardType,
  sendOtpForCardNumber,
  validateCardNumber,
} from "../action";
import { useDispatch } from "react-redux";
import clsx from "clsx";


interface Props {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(2, 2, 2, 2),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      // width: "95%",
      borderRadius: "6px",
      margin: theme.spacing(0, 2),
    },
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    // justifyContent: "center",
    padding: theme.spacing(1, 0, 0, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}px Work Sans`,
    lineHeight: "28.8px",
    marginBottom: "20px",
  },
  formContainer: {
    width: "100%",
    marginBottom: "10px",
    "& .MuiFormGroup-root": {
      "& .formLabel": {
        height: "0px",
      },
    },
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
  divider: {
    margin: theme.spacing(2, 0),
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  label: {
    height: "auto !important",
  },
  InputTag: {
    height: "54px",
    width: "100%",
    marginBottom: "15px",
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
    // "& .MuiInput-input": {
    //   textTransform: "uppercase",
    // },
    
    // "& .MuiInput-input": {
    //   textTransform: "uppercase"
    // },
    "&::-webkit-input-placeholder": {
      font: `normal  ${theme.spacing(1.5)}px Work Sans`,
      color: "var(--light-gray-text)",
      fontWeight: 500,
      // textTransform:"none !important"
    },

  },
  InputTag2: {
    height: "54px",
    width: "100%",
    marginBottom: "15px",
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
      textTransform:"none !important"
    },
  },

  btn: {
    width: "46%",
  },
  error: {
    color: "red",
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )}px Work Sans`,
    marginTop: "-6px",
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
}));
// CARD_TYPE: { Qwikcilver: 1, VoucherGram: 2 },
// STATUS: {
//             CREATED: 1,
//             REDEEMED: 2,
//             EXPIRED: 3
//         },
const CheckBalance = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    openGetBalanceModal: false,
  });
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [cardValid, setCardValid] = useState(false);
  const [cardType, setCardType] = useState(0);
  const [expiryDate, setExpiryDate] = useState(null);
  const [cardNumberMissing, setCardNumberMissing] = useState(false);
  const [balanceError, setBalanceError] = useState("");

  const handleGetBalanceOpen = () => {
    if (cardCode && cardNumber) {
      const number: any = cardNumber;
      const payload = {
        cardNumber: number.toUpperCase(),
        cardCode: Number(cardCode),
      };
      dispatch(
        checkEcardBalance(payload, (response: any) => {
          if (response?.amount) {
            setAmount(response?.amount || 0);
            setExpiryDate(response?.cardExpiry || null);
            setStatus(response?.statusValue || 0);

            // props.handleClose()
            onClose();
            setState({ ...state, openGetBalanceModal: true });
          } else if (response?.errorMessage) {
            setBalanceError(response.errorMessage);
          } else {
            // props.handleClose()
            onClose();
          }
        })
      );
    }
  };
  const handleGetBalanceClose = () => {
    setState({ ...state, openGetBalanceModal: false });
  };

  const onChangeGiftCardNumber = (e: any) => {
    setCardNumberMissing(false);
    setBalanceError("");
    setCardCode("")
    setCardNumber(e?.target?.value?.toUpperCase());
    if ((e.target.value?.length === 5 && !cardType) || (e.target.value?.length >= 5 && !cardType) || (e.target.value && e.target.value.length === 5 && cardNumber && !e.target.value?.includes(cardNumber))) {
      getCardTypeInfo(e.target.value)
    }
    if (!e?.target?.value || e?.target?.value?.length < 5) {
      setCardValid(false);
      setCardType(0);
    }
    if (!e?.target?.value) {
      setCardNumberMissing(true);
    }
  };

  const onChangeCardCode = (e: any) => {
    setBalanceError("");
    setCardCode(e.target.value);
  };

  const onClose = () => {
    setCardCode("");
    setBalanceError("");
    setCardNumber("");
    setCardValid(false);
    setCardNumberMissing(false);
    setCardType(0);
    props.handleClose();
  };

  const validate = () => {
    const card: any = cardNumber;
    if (cardNumber)
      dispatch(
        validateCardNumber(card.toUpperCase(), (response: any) => {
          if (
            response?.data?.cardType &&
            response?.data?.statusValue?.toLowerCase() !== "consumed" && response?.data?.statusValue?.toLowerCase() !== 'invalid'
          ) {
            setCardValid(true);
            setCardType(response.data.cardType);
          } else {
            setCardValid(false);
          }
        })
      );
    else setCardNumberMissing(true);
  };

  const getCardTypeInfo = (card: any) => {
    if (card)
      dispatch(
        getCardType(card.toUpperCase(), (response: any) => {
          if (response?.data?.cardType) {
            setCardValid(response.data.cardType === 1 ? true : false);
            setCardType(response.data.cardType);
          } else {
            setCardValid(false);
            setCardType(0);
          }
        })
      );
    // else setCardNumberMissing(true)
  };

  const onSendOtp = () => {
    const payload = {
      cardNumber: cardNumber,
      otpType: "giftcard",
    };
    setCardCode("")
    dispatch(sendOtpForCardNumber(payload));
  };
  // const onPasteCardNumber = (e: any) => {
  //   setTimeout(() => {
  //     setCardNumberMissing(false);
  //     setBalanceError("");
  //     setCardNumber(e.target.value);
  //     if (e?.target?.value?.length >= 5) {
  //       getCardTypeInfo(e.target.value)
  //     } else if (!e?.target?.value || e?.target?.value?.length < 5) {
  //       setCardValid(false)
  //       setCardType(0);
  //       setCardCode("")
  //     }
  //   }, 1000)

  // }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        // open={state.openModal}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div>
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.heading}>
                  Check Balance
                </Typography>
              </div>
              <div className={classes.formContainer}>
                <Typography variant="h4" className={classes.inputLabel}>
                  Gift Card Number
                </Typography>
                <Typography variant="h4" className={classes.inputValue}>
                  <Input
                    disabled={
                      cardType === 2 && cardValid && cardNumber ? true : false
                    }
                    // inputProps={{onPaste:onPasteCardNumber}}
                    value={cardNumber || ""}
                    className={classes.InputTag}
                    placeholder="Gift card number here"
                    onChange={onChangeGiftCardNumber}
                    renderSuffix={() => {
                      if (cardType === 2 && cardValid && cardNumber)
                        return (
                          <Typography
                            className={classes.link}
                            onClick={onSendOtp}
                          >
                            RESEND
                          </Typography>
                        );
                      if (
                        cardType &&
                        cardType === 2 &&
                        cardNumber &&
                        !cardValid
                      )
                        return (
                          <Typography
                            className={classes.link}
                            onClick={validate}
                          >
                            VALIDATE
                          </Typography>
                        );
                    }}
                  />
                </Typography>
                {cardNumberMissing && (
                  <Typography className={classes.error}>
                    Please enter Card Number
                  </Typography>
                )}
              </div>

              {cardValid && cardNumber && cardType ? (
                // &&(cardNumber.length===11||cardNumber.length===16)
                <div className={clsx(classes.formContainer, classes.noMargin)}>
                  <Typography variant="h4" className={classes.inputLabel}>
                    {cardType === 2 ? "6 Digit OTP" : "6 Digit PIN"}
                  </Typography>
                  <Typography variant="h4" className={classes.inputValue}>
                    <input
                      value={cardCode}
                      className={classes.InputTag2}
                      placeholder="Enter 6 digit number"
                      onChange={onChangeCardCode}
                      type={cardType === 2 ?"text":"password"}
                      // type="text"
                      pattern="\d*"
                      maxLength={6}
                    />
                  </Typography>
                </div>
              ) : (
                <div className={classes.emptyDiv} />
              )}
              {cardCode && cardCode?.length !== 6 && (
                <Typography className={classes.error}>
                  {cardType === 2
                    ? "Please enter a 6 digit OTP"
                    : "Please enter a 6 digit PIN"}
                </Typography>
              )}
              {balanceError !== "" && (
                <Typography className={classes.error}>
                  {balanceError}
                </Typography>
              )}
              <Divider light className={classes.divider} />
              <div className={classes.buttonContainer}>
                <div className={classes.btn}>
                  <CustomButton
                    type="submit"
                    text={"Cancel"}
                    fullWidth
                    onClick={onClose}
                    variant="outlined"
                  />
                </div>

                <div className={classes.btn}>
                  <CustomButton
                    type="submit"
                    text={"Check Balance"}
                    fullWidth
                    onClick={handleGetBalanceOpen}
                    variant="contained"
                    disabled={
                      cardNumber === "" ||
                      cardCode === "" ||
                      (cardCode !== "" && cardCode?.length !== 6)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>

      <GetBalance
        status={status}
        expiryDate={expiryDate}
        amount={amount}
        open={state.openGetBalanceModal}
        handleClose={handleGetBalanceClose}
      />
    </>
  );
};

export default CheckBalance;
