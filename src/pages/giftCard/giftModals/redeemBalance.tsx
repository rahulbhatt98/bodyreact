import React, { useState } from 'react'
import {
    makeStyles, Modal, Fade,
    Backdrop, Typography, Divider, Input
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCardType, redeemBalance, sendOtpForCardNumber, validateCardNumber } from '../action';
import clsx from 'clsx';
import CustomButton from '../../../components/common/button';
import ThankYouModal from './thankYou';
import Utils from '../../../utils';

interface Props {
    open: boolean;
    handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: "blur(5px)",

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        padding: theme.spacing(2, 2, 2, 2),
        display: "block",
        alignItems: "center",
        borderRadius: '3px',
        width: '400px',
        [theme.breakpoints.down("sm")]: {
            width: '95%',
            borderRadius: '12px',
        }
    },
    innerContainer: {
        display: "flex",
        width: '100%',
        alignItems:"center",
        padding: theme.spacing(1, 0, 0, 0),
                marginBottom: '20px',

    },
    heading: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(2.4)}px Work Sans`,
        lineHeight: "28.8px",
        marginLeft:"10px"
    },
    formContainer: {
        width: '100%',
        marginBottom: '10px',
        "& .MuiFormGroup-root": {
            "& .formLabel": {
                height: '0px',
            }
        }
    },
    inputLabel: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(1.4)}px Work Sans`,
        lineHeight: "16.42px",
        color: '#333333',
        marginBottom: '8px'
    },
    inputValue: {
    },
    divider: {
        margin: theme.spacing(2, 0)
    },

    buttonContainer: {
        "& .MuiButton-root": {
            width: '100%',
            marginRight: '15px',
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    label: {
        height: 'auto !important',
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

    },
    InputTag2: {
        height: "54px",
        width: "100%",
        marginBottom: "15px",
        border: "1px solid #e2e2e2",
        padding: "0px 15px",
        lineHeight: "19px",
        textTransform: "uppercase",
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
            1.5
        )}px Work Sans`,
        letterSpacing: "0.02em",
        color: "#0D0D0D",
        "&::-webkit-input-placeholder": {
            font: `normal  ${theme.spacing(1.5)}px Work Sans`,
            color: "var(--light-gray-text)",
            fontWeight: 500,
            textTransform: "none !important",
        },

    },

    error: {
        color: 'red',
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(1.2)}px Work Sans`,
        marginTop: '-6px'

    },
    noMargin: {
        marginBottom: '0px'
    },
    link: {
        color: '#044236',
        font: `normal 600 ${theme.spacing(
            1.4
        )}px Work Sans`,
        lineHeight: "16px",
        cursor: "pointer"
    },

    emptyDiv: {
        height: '15px'
    },
    btn: {
        width: "46%",
    },
}))
const RedeemBalance = (props: Props) => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        openGetRedeemBalanceModal: false,
    });
    const [amount, setAmount] = useState(0)
    const [cardNumber, setCardNumber] = useState('')
    const [cardCode, setCardCode] = useState('');
    const [cardValid, setCardValid] = useState(false);
    const [cardType, setCardType] = useState(0);
    const [redeemError, setRedeemError] = useState('');
    const [cardNumberMissing, setCardNumberMissing] = useState(false)
    const dispatch = useDispatch()


    const onRedeemBalance = () => {
        if (cardCode && cardNumber) {
            const number: any = cardNumber
            const payload = {
                "cardNumber": number.toUpperCase(),
                "cardCode": Number(cardCode)
            }
            dispatch(redeemBalance(payload, (response: any) => {
                if (response?.amount) {
                    setAmount(response?.amount || 0)
                    onClose()
                    setState({ ...state, openGetRedeemBalanceModal: true });
                } else if (response?.errorMessage) {
                    setRedeemError(response.errorMessage)
                }
                else {
                    onClose()
                }
            }))
        }

    };

    const onChangeGiftCardNumber = (e: any) => {
        setCardNumberMissing(false);
        setRedeemError("");
        setCardCode("")
        setCardNumber(e?.target?.value?.toUpperCase());
        if ((e.target.value?.length === 5 && !cardType) || (e.target.value?.length >= 5 && !cardType) || (e.target.value && e.target.value.length === 5 && cardNumber && !e.target.value?.includes(cardNumber))) {
            getCardTypeInfo(e.target.value)
        }
        if (!e?.target?.value || e?.target?.value?.length < 5) {
            setCardValid(false)
            setCardType(0)
        }
        if (!e?.target?.value) {
            setCardNumberMissing(true)
        }
    }

    // const onPasteCardNumber = (e: any) => {
    //     setTimeout(() => {
    //         // setCardNumberMissing(false);
    //         // setRedeemError("")
    //         // setCardNumber(e.target.value);
    //         if (e.target.value?.length >= 5) {

    //             getCardTypeInfo(e.target.value)
    //         }
    //         if (!e?.target?.value || e?.target?.value?.length < 5) {
    //             setCardValid(false)
    //             setCardType(0);
    //             setCardCode("")
    //         }
    //     }, 1000)
    // }

    const onChangeCardCode = (e: any) => {
        setCardCode(e.target.value);
        setRedeemError('')
    }

    const handleGetRedeemBalanceClose = () => {
        setState({ ...state, openGetRedeemBalanceModal: false });
    };

    const validate = () => {
        const card: any = cardNumber;
        if (cardNumber)
            dispatch(validateCardNumber(card.toUpperCase(), (response: any) => {
                if (response?.data?.cardType && response?.data?.statusValue?.toLowerCase() !== "consumed" && response?.data?.statusValue?.toLowerCase() !== 'invalid') {
                    setCardValid(true);
                    setCardType(response.data.cardType)

                } else {
                    setCardValid(false)
                }
            }))
        else setCardNumberMissing(true)
    }

    const getCardTypeInfo = (card: any) => {
        if (card) {
            dispatch(getCardType(card.toUpperCase(), (response: any) => {
                if (response?.data?.cardType) {
                    setCardValid(response.data.cardType === 1 ? true : false)
                    setCardType(response.data.cardType)
                } else {
                    setCardValid(false)
                    setCardType(0)
                }
            }))
        }

    }

    const onClose = () => {
        setCardCode("");
        setRedeemError('')
        setCardNumber('');
        setCardValid(false);
        setCardNumberMissing(false)
        setCardType(0)
        props.handleClose();
    };

    const onSendOtp = () => {
        const payload = {
            cardNumber: cardNumber,
            otpType: 'giftcard'
        }
        setCardCode("")
        dispatch(sendOtpForCardNumber(payload))
    }

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
                                <img src={Utils.images.GIFT_IMAGE_ICON} alt="gift image"/>
                                <Typography variant="h4" className={classes.heading}>
                                    Gift Card
                                </Typography>
                            </div>
                            <div className={classes.formContainer}>
                                <Typography variant="h4" className={classes.inputLabel}>
                                    Gift Card Number
                                </Typography>
                                <Typography variant="h4" className={classes.inputValue}>
                                    <Input
                                        // inputProps={{onPaste:onPasteCardNumber}} 
                                        disabled={cardType === 2 && cardValid && cardNumber ? true : false}
                                        value={cardNumber || ''}
                                        className={classes.InputTag}
                                        placeholder="Gift card number here"
                                        onChange={onChangeGiftCardNumber}
                                        renderSuffix={() => {
                                            if (cardType === 2 && cardValid && cardNumber)
                                                return <Typography className={classes.link} onClick={onSendOtp}>RESEND</Typography >
                                            if (cardType && cardType === 2 && cardNumber &&
                                                !cardValid
                                            )
                                                return <Typography className={classes.link} onClick={validate}>VALIDATE</Typography >
                                        }
                                        }
                                    />
                                </Typography>
                                {cardNumberMissing && <Typography className={classes.error}>Please enter Card Number</Typography>}
                            </div>
                            {cardValid && cardNumber ?
                                <div className={clsx(classes.formContainer, classes.noMargin)}>
                                    <Typography variant="h4" className={classes.inputLabel}>
                                        {cardType === 2 ? '6 Digit OTP' : '6 Digit PIN'}
                                    </Typography>
                                    <Typography variant="h4" className={classes.inputValue}>
                                        <input
                                            value={cardCode}
                                            className={classes.InputTag2}
                                            placeholder="Enter 6 digit number"
                                            onChange={onChangeCardCode}
                                            type={cardType === 2 ? "text" : "password"}
                                            // type="text"
                                            pattern="\d*"
                                            maxLength={6}
                                        />
                                    </Typography>
                                </div>
                                : <div className={classes.emptyDiv} />
                            }
                            {cardCode && cardCode?.length !== 6 && <Typography className={classes.error}>
                                {cardType === 2 ? 'Please enter a 6 digit OTP' : 'Please enter a 6 digit PIN'}
                            </Typography>
                            }
                            {redeemError !== '' && <Typography className={classes.error}>
                                {redeemError}
                            </Typography>
                            }
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
                                        text={"Add to Wallet"}
                                        fullWidth
                                        onClick={onRedeemBalance}
                                        variant="contained"
                                        disabled={
                                            cardNumber === "" ||
                                            cardCode === "" ||
                                            (cardCode !== '' && cardCode?.length !== 6)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade >
            </Modal >
            <ThankYouModal
                message={`₹ ${Utils.CommonFunctions.addCommaToAmount(amount)} has been added to your wallet successfully!`}
                open={state.openGetRedeemBalanceModal}
                handleClose={handleGetRedeemBalanceClose}
            />
            {/* <GetRedeem
                amount={amount}
                open={state.openGetRedeemBalanceModal}
                handleClose={handleGetRedeemBalanceClose}
            /> */}
        </>
    )
}

export default RedeemBalance

