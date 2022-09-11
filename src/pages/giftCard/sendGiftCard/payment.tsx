import {
    makeStyles,
    createStyles,
    Theme,
    Grid,
    Divider,
} from "@material-ui/core";
import { useEffect } from "react";
import { PaymentProps } from "../../../utils/types";
import PaymentOptions from "../../payment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paymentRoot: {
            // padding: theme.spacing(0, 2),
            [theme.breakpoints.down('xs')]: {
                // padding: theme.spacing(0, 0),
                margin: theme.spacing(-4,0)
            }
        },
        maxWidthDiv: {
            maxWidth: "var(--max-width)",
            margin: theme.spacing(0, "auto"),
        },
        gridContainer: {
            margin: theme.spacing(2.5, 0),
        },
    })
);
// interface Props {
//     paymentOption: any;
//     proceedToPay: boolean;
//     selectedAmount: any;
//     donationAmount: any;
//     handleBack: Function;
// }

const Payment: React.FC<any> = ({
    setProceedToPay,
    paymentMode,
    setPaymentMode,
    setBank,
    setVpa,
    setSelectedCard,
    vpa,
    flag,
    onSubmit,
    setSavedCardToken,
    disablePaymentOptions,
    selectedCard,
    setPaymentMethodId,
    setBtnText,
    section,
}: PaymentProps) => {
    const classes = useStyles();

    // const onModeChange = (id: number) => {
    //   setPaymentOption(id)
    //   if (id === 3) {
    //     const mobileNo = eCardSummary?.giftCard?.receiverMobile || null;
    //     const payload = {
    //       mobileNo: mobileNo ? String(mobileNo) : '',
    //       countryCode: '+91',
    //       otpVia: 'mobile',
    //       email: eCardSummary?.giftCard?.receiverEmail || '',
    //       type: "signup"
    //     }
    //     if (mobileNo && isAuthenticated())
    //       dispatch(sendOtp(payload))
    //   }
    // }

    // const verify = (otp: string) => {
    //   const mobileNo = eCardSummary?.giftCard?.receiverMobile || null;
    //   const payload = {
    //     mobileNo: mobileNo ? String(mobileNo) : '',
    //     countryCode: '+91',
    //     otpVia: 'mobile',
    //     email: eCardSummary?.giftCard?.receiverEmail || '',
    //     type: "signup",
    //     "OTP": otp,
    //   }
    //   dispatch(verifyOtp(payload, (data: any) => {
    //     if (data.httpCode === 201 || data.httpCode === 200) {
    //       setProceedToPay(true);
    //       window.scrollTo(0, 0)
    //     }
    //     else {
    //       setProceedToPay(false)
    //     }
    //   }))
    // }
    // useEffect(() => {
        // window.scrollTo(0, 0)
    // }, [])
    return (
        <div className={classes.paymentRoot}>
            <div className={classes.maxWidthDiv}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={12}>
                        <PaymentOptions
                            setPaymentMethodId={setPaymentMethodId}
                            selectedCard={selectedCard}
                            setBank={setBank}
                            setSelectedCard={setSelectedCard}
                            setVpa={setVpa}
                            vpa={vpa}
                            flag={flag}
                            disablePaymentOptions={disablePaymentOptions}
                            paymentMode={paymentMode}
                            setPaymentMode={setPaymentMode}
                            section={section}
                            setProceedToPay={setProceedToPay}
                            onSubmit={onSubmit}
                            setBtnText={setBtnText}
                        />
                    </Grid >
                  
                    {/* <Grid item xs={12} sm={12} md={4}>
                        <PaymentSummary paymentOption={paymentOption} proceedToPay={proceedToPay} />
                    </Grid> */}
                </Grid >
            </div >
        </div >
    );
}

export default Payment;


