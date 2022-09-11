import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  withStyles,
  Typography,
  Hidden,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet';
import EnterValue from "./enterValue";
import Delivery from "./delivery";
import EnterDetails from "./enterDetais";
import BreadCrumb from "../../../components/breadCrumb";
import SelectDesign from "./selectDesign";
import Summary from "./summary";
import { useDispatch, useSelector } from "react-redux";
import { addGiftCard } from "../action";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";
// import { useHistory } from "react-router";
// import Payment from "../../payment";
import Payment from "./payment";
import RightContent from "./rightContent";
import Skeleton from "@mui/material/Skeleton";
import PaymentSummary from "./paymentSummary";
import {
  hideLoader,
  showLoader,
  showPaytmCallbackLoader,
  hidePaytmCallbackLoader,
} from "../../home/actions";
import { useHistory, useLocation } from "react-router";
import { placeOrder } from "../../payment/action";
import { makePayment } from "../../payment/razorpay";
import {
  getOrderRetryDetails,
  postOrderRetry,
} from "../../shoppingBags/action";
import { format } from "date-fns";
import MessageDialog from "../../../components/common/messageDialog";
import { addMoneyToWallet } from "../../payment/otherOptions/paytm/action";
import { getShoppingBagList } from "../../../components/common/addToCart/action";
import { StepIconProps } from "@material-ui/core/StepIcon";
import clsx from "clsx";
import SuccessModal from "../../../components/common/successModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shoppingBagsRoot: {
      padding: theme.spacing(0, 2),
      backgroundColor: "var(--white)",
      marginTop: "10px",
      marginBlockEnd: 40,
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginBlockEnd: 0,
      },
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
    },
    shoppingDiv: {
      padding: theme.spacing(3, 1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0, 1, 0),
      },
    },
    stepperDiv: {
      borderTop: "1px solid var(--text-color)",
      borderBottom: "1px solid var(--text-color)",
      padding: theme.spacing(1.5, 0),
      [theme.breakpoints.down("sm")]: {
        border: "none",
      },
    },
    stepper: {
      padding: 0,
      [theme.breakpoints.down("sm")]: {
        "& .MuiTypography-body2": {
          fontSize: "14px",
          height: "30px",
        },
        "& .MuiStepConnector-line": {
          marginTop: "10px",
        },
      },
    },
    stepLabel: {
      "&.MuiStepLabel-alternativeLabel": {
        flexDirection: "column-reverse",
      },
      "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        margin: 0,
      },
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: "6px",
    },

    amount: {
      textAlign: "right",
    },
    quantity: {
      margin: theme.spacing(0, 1),
    },
    paymentDiv: {
      padding: theme.spacing(2.5, 0),
      marginLeft: theme.spacing(1.5),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(0),
      },
    },
    paymentDetails: {
      backgroundColor: "var(--white)",
      border: "1px solid var(--text-color)",
      borderRadius: 4,
      padding: theme.spacing(1.5),
    },
    paymentHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      marginBottom: theme.spacing(2),
      fontWeight: 700,
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
    },
    discountIcon: {
      color: "var(--main-opacity)",
      marginLeft: 0.5,
    },
    view: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--main-opacity)",
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    grandTotal: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
    },
    btnDiv: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "space-between",
      // marginTop: theme.spacing(2),
      width: "48%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    saveBagBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    checkOutBtn: {
      borderRadius: 2,
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      textTransform: "capitalize",
      // padding: theme.spacing(1.5, 0),
      // marginTop: theme.spacing(1.5),
      width: "57%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        "& .MuiButton-containedPrimary": {
          background: "var(--white)",
          color: "var(--primary)",
          boxShadow: "none",
          border: "1px solid var(--primary)",
        },
      },
    },
    backButton: {
      width: "40%",
    },
    breadcrumb: {
      font: `normal 500 ${theme.spacing(1.4)}px Work Sans`,
      marginTop: "25px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    noItemsCard: {
      textAlign: "center",
      padding: "30px",
      marginBottom: "15px",
    },
    noItemContent: {
      display: "flex",
      alignItems: "center",
      marginTop: "20px",
      marginBottom: "15px",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "18px",
      letterSpacing: "0.02em",
      color: "var(--black)",
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginLeft: theme.spacing(1),
    },
    btnContainer: {
      margin: "5px 0px",
      display: "flex",
      justifyContent: "space-between",
    },
    imgDiv: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "15px",
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
    amountDiv: {
      position: "absolute",
      left: "35%",
      top: "45%",
    },
    giftBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      // height: "80%",
      [theme.breakpoints.down("sm")]: {
        // height: "200px",
      },
      [theme.breakpoints.down("xs")]: {
        // height: "180px",
      },
    },
    imgBox: {
      position: "relative",
      width: "377px",
      height: "212px",
      [theme.breakpoints.down(1500)]: {
        // width: "27%",
      },
      [theme.breakpoints.down("sm")]: {
        // width: "40%",
      },
      [theme.breakpoints.down("xs")]: {
        // width: "85%",
      },
    },
    range: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.2
      )}px Work Sans`,
      lineHeight: "38px",
      color: "var(--white)",
      // position: "absolute",
    },
    rangeAmount: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--white)",
      // position: "relative"
    },
    skeltonView: {
      marginTop: "-30px",
      // padding: theme.spacing(20),
    },
    skeltonView2: {
      padding: theme.spacing(3),
    },
    paymentSecondDiv: {
      position: "sticky",
      height: "300px",
      flexBasis: "40%",
      top: "30%",
      padding: theme.spacing(1),
      [theme.breakpoints.down("md")]: {
        top: "15%",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0)
      }
    },
    paymentThirdDiv: {
      position: "sticky",
      height: "500px",
      flexBasis: "40%",
      top: "25%",
      [theme.breakpoints.down("md")]: {
        top: "10%",
        height: "auto",
      },
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    bold: {
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#333333",
      textAlign: "center",
      marginTop: "19px",
      marginBottom: "40px",
      // padding: theme.spacing(0, 4)
    },
    description: {
      font: `normal 500 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#333333",
      textAlign: "center",
      // display:"flex"
    },
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "35px",
    },
    stepperMobileRoot: {
      display: "none"
    },
    mobileText: {
      textAlign: "center",
      width: "90%",
      diplay: "flex",
      font: `normal 700 ${theme.spacing(2)}px Work Sans`,
      lineHeight: "23.4px",
      letterSpacing: "0.8px",
    },
    selectedTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0),
    },
    mobileRoot: {
      padding: theme.spacing(1, 1.6),
      backgroundColor: "var(--white)",
      // margin: theme.spacing(1, "auto"),
      maxWidth: "var(--max-width)",
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
      boxShadow: "0px 1px #f2f2f2",
    },
    backArrow: {
      width: theme.spacing(2.5),
      height: "auto"
    }
  })
);

const useStylesStepIcon = makeStyles((theme: Theme) =>
  createStyles({
    stepIcon: {
      // width: 8,
      // height: 8,
      display: "flex",
      placeItems: "center",
      padding: "4px",
      borderRadius: "50%",
      backgroundColor: "var(--stepper-color)",
      zIndex: 20,
    },
    secondStep: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "#d6ce4b",
      marginTop: theme.spacing(0.1),
    },
    activeRoot: {
      backgroundColor: "#d6ce4b",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
    },
  })
);

function StepIcon(props: StepIconProps) {
  const classes = useStylesStepIcon();
  const { active, completed } = props;
  return (
    <>
      {completed || active ? (
        <div className={classes.stepIcon}>
          <div className={classes.activeRoot} />
        </div>
      ) : (
        <div className={classes.secondStep}></div>
      )}
    </>
  );
}
const Connector = withStyles({
  alternativeLabel: {
    top: 26,
    left: "calc(-47%)",
    right: "calc(52%)",
  },
  active: {
    "& $line": {
      borderColor: "var(--stepper-color)",
    },
  },
  completed: {
    "& $line": {
      borderColor: "var(--stepper-color)",
    },
  },
  line: {
    borderColor: "var(--light-green)",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const SendGiftCard: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const formRef: any = useRef();
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  let query = Utils.CommonFunctions.useQuery();
  let activeStepId = query.get("activeStep");
  let paytmPaymentStatus = query.get("status");
  const [bankOffer, setBankOffer] = useState(null);
  const [activeStep, setActiveStep] = React.useState<any>(
    activeStepId ? parseInt(activeStepId) : 0
  );
  const [selectedGiftImage, setSelectedGiftImage] = useState<any>();
  const [selectedAmount, setSelectedAmount] = useState(0);
  // pass this in payload
  const [selectedDesign, setSelectedDesign] = useState<any>({});
  const [donationAmount, setDonationAmount] = useState<any>(0);
  const [details, setDetails] = useState<any>({});
  const [deliveryDetails, setDeliveryDetails] = useState<any>({});
  const [error, setError] = useState("");
  const [proceedToPay, setProceedToPay] = useState(true);
  const [paymentMode, setPaymentMode] = useState<any>("");
  const [btnText, setBtnText] = useState("Place Order");
  const [vpa, setVpa] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>({});
  const [bank, setBank] = useState<any>({});
  const [orderId, setOrderId] = useState(0);
  const [flag, setFlag] = useState(location?.state?.flag ?? "");
  const [mongoOrderId, setMongoOrderId] = useState(
    location?.state?.mongoOrderId ?? 0
  );
  const [paymentMethodId, setPaymentMethodId] = useState(
    location?.state?.paymentMethodId ?? 0
  );
  const [paymentFailedVisibility, setPaymentFailedVisibility] = useState(false);
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);

  const [paymentPendingVisibility, setPaymentPendingVisibility] =
    useState(false);
  const paytm: any = useSelector(
    (state: ReducersModal) => state.paymentReducer.paytm
  );
  // const egift: any = useSelector((state: ReducersModal) => state.giftReducer)
  // const [invalidSample, setInvalidSample] = useState(0)
  // const [paymentMode, setPaymentMode] = useState<any>("card");
  // const donationAmount = eCardSummary?.donationDetails?.donationAmount || 0
  // const totalAmount = eCardSummary?.giftCard?.amount ? Number(eCardSummary.giftCard.amount) + Number(donationAmount) : 0
  const totalAmount = selectedAmount + donationAmount;

  const userInfo: any =
    useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) ||
    {};

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  const handleNext = () => {
    if (activeStep < 4 && activeStep !== 2 && activeStep !== 3)
      setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    else if (activeStep === 2 || activeStep === 3) {
      if (formRef?.current?.handleSubmit) {
        formRef.current.handleSubmit();
      }
    }
  };

  const handleBack = () => {
    // if (activeStep === 5) {
    //   setProceedToPay(false);
    // }
    if (activeStep === 0) {
      // history.push(Utils.routes.GIFT_CARD);
      history.push({
        pathname: Utils.routes.GIFT_CARD,
        state: { pageName: "Gift Card" },
      })
    }
    if (flag === "retry" && location?.state?.itemId && mongoOrderId) {
      history.push(
        Utils.CommonFunctions.replaceUrlParams(Utils.routes.ORDER_DETAIL, {
          ":id": mongoOrderId,
          ":item_id": location?.state?.itemId ?? "",
        })
      );
      dispatch(getShoppingBagList());
    } else if (
      flag === "retry" &&
      (!location?.state?.itemId || !mongoOrderId)
    ) {
      dispatch(getShoppingBagList());
      history.push({ pathname: "/gift-card", state: { pageName: "Gift Card" } });
    } else {
      // if(activeStep==3&&(data?.offerId||data?.offerId!==''||data?.walletAmount)){
      //   handleUpdateCartSummary(data, checkoutAddressId, configs, 2, null,0,0,0,'',()=>{
      //     setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
      //     dispatch(hideLoader())
      //   })

      // }else
      setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
    }
  };

  // useEffect(() => {
  // window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    // window.scrollTo(0, 0);
    if (flag === "retry") {
      onRetry();
    }
  }, [flag]);

  const getStepContent = (step: number) => {
    // window.scrollTo(0, 0);
    switch (step) {
      case 0:
        return (
          <SelectDesign
            setDonationAmount={setDonationAmount}
            setSelectedAmount={setSelectedAmount}
            selectedDesign={selectedDesign}
            setSelectedDesign={setSelectedDesign}
            setImage={setSelectedGiftImage}
          />
        );
      case 1:
        return (
          <EnterValue
            setDonationAmount={setDonationAmount}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            selectedDesign={selectedDesign}
          />
        );
      case 2:
        return (
          <EnterDetails
            details={details}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setDetails={setDetails}
            formRef={formRef}
          />
        );
      case 3:
        return (
          <Delivery
            setError={setError}
            error={error}
            details={details}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            deliveryDetails={deliveryDetails}
            setDeliveryDetails={setDeliveryDetails}
            formRef={formRef}
          />
        );
      case 4:
        return (
          <Summary
            details={details}
            deliveryDetails={deliveryDetails}
            selectedDesign={selectedDesign}
            setDonationAmount={setDonationAmount}
            selectedAmount={selectedAmount}
            donationAmount={donationAmount}
          />
        );
      case 5:
        return (
          <Payment
            setBankOffer={setBankOffer}
            section="egift"
            setPaymentMethodId={setPaymentMethodId}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            setVpa={setVpa}
            vpa={vpa}
            onSubmit={onSubmit}
            setBank={setBank}
            flag={flag}
            disablePaymentOptions={flag === "retry"}
            setProceedToPay={setProceedToPay}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            setBtnText={setBtnText}
          />
        );
      default:
        return (
          <SelectDesign
            setDonationAmount={setDonationAmount}
            setSelectedAmount={setSelectedAmount}
            selectedDesign={selectedDesign}
            setSelectedDesign={setSelectedDesign}
            setImage={setSelectedGiftImage}
          />
        );
    }
  };

  const getPageName = () => {
    if (activeStep === 0) return "SelectDesign";
    else if (activeStep === 1) return "EnterValue";
    else if (activeStep === 2) return "EnterDetails";
    else if (activeStep === 3) return "Delivery";
    else if (activeStep === 4) return "Summary";
    else if (activeStep === 5) return "Payment";
  };

  const handleCheckout = () => {
    const time = deliveryDetails?.time || null;
    const payload: any = {
      productId: selectedDesign?.magentoId || null,
      amount: selectedAmount ? Number(selectedAmount) : 0,
      senderName: details?.name || "",
      receiverName: details?.receiversName || "",
      countryCode: "+91",
      receiverMobile: details?.mobileNumber
        ? String(details?.mobileNumber)
        : "",
      receiverEmail: details?.emailId || "",
      message: details?.message || "",
      // "deliverVia": deliveryDetails?.emailId ? "email" : "mobile",
      isDeliveryNow: deliveryDetails?.time ? false : true,
      deliveryTime: time
        ? String(time.getTime())
        : String(new Date().getTime()),
      donation:
        donationAmount !== 0
          ? {
            donationType: "checkout_section",
            donationAmount: donationAmount,
          }
          : {},
    };
    dispatch(
      addGiftCard(payload, () => {
        // history.push(Utils.routes.PAYMENT)
        setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
      })
    );
  };

  // const onSubmit = (values?: any) => {
  //   dispatch(showLoader());
  //   if (flag === "retry" && (paymentMode === "upi" || paymentMode === "netbanking" || paymentMode === "card")) {
  //     const payload: any = { orderId: mongoOrderId, type: 1 }
  //     if (paymentMode === "upi") {
  //       payload.paymentMethodId = ""
  //     } else if (paymentMode === "netbanking") {
  //       payload.paymentMethodId = bank?.bankCode ? bank.bankCode : paymentMethodId;
  //     }
  //     else if (paymentMode === "card") {
  //       payload.paymentMethodId = values?.cardNumber ? String(values.cardNumber) : paymentMethodId ? String(paymentMethodId) : ""//pass card id
  //     }

  //     dispatch(postOrderRetry(payload, (resp: any) => {
  //       if (resp?.data?.data?.gatewayOrderId && (paymentMode === "netbanking" || paymentMode === "upi" || paymentMode === "card")) {
  //         const options = getOptions(paymentMode || "", resp?.data?.data, values ? values : null);
  //         makeRazorpayPayment(options)
  //       }
  //     }))
  //   } else if (flag === "retry" && paymentMode === "paytm") {
  //     const payload: any = { orderId: mongoOrderId, type: 1 }
  //     payload.paymentMethodId = ""//pass card id
  //     dispatch(postOrderRetry(payload, (resp: any) => {
  //       // add your paytm code here
  //     }))
  //   } else {
  //     const payload: any = {
  //       cartType: Utils.constants.CART_TYPE.EGIFT,
  //       amount: totalAmount,
  //       addressId: "",
  //       couponArray: [],
  //       paymentMethodId: "",
  //       paymentMethodSource: 0,
  //       isDefaulSourceMethod: false,
  //     };

  //     if (paymentMode === "paytm") {
  //       payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.PAYTM;
  //       if (paytm?.amount < egift?.eCardSummary?.grandTotal) {
  //         addMoneyToWallet({
  //           amount: Utils.CommonFunctions.decimalFlat(egift?.eCardSummary?.grandTotal - paytm?.amount, 2).toString(),
  //           // amount: "10.00",
  //           // orderId: "dsadajdgajhdg"
  //         })
  //       } else {
  //         payload.gatewayOrderId = Date.now().toString()

  //         placeOrderOnClick(payload)
  //       }

  //     } else if (paymentMode === "cod") {
  //       payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.COD;
  //       placeOrderOnClick(payload)
  //     }
  //     else if (paymentMode === "upi") {
  //       payload.paymentMethodId = ""
  //       payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.RAZORPAY_UPI;
  //       placeOrderOnClick(payload)

  //     } else if (paymentMode === "netbanking") {
  //       payload.paymentMethodId = bank.bankCode
  //       payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.RAZORPAY_NET_BANKING;
  //       placeOrderOnClick(payload)
  //     }
  //     else if (paymentMode === "card") {
  //       payload.paymentMethodId = values?.cardNumber ? values?.cardNumber : paymentMethodId //pass card id
  //       payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.CARD
  //       placeOrderOnClick(payload, values ? values : null)
  //     }
  //   }
  // };

  const onSubmit = (values?: any) => {
    if (flag === "retry" || flag === "convertToCod") {
      retryOrderHandler(values);
    } else {
      placeOrderHandler(values);
    }
  };

  const placeOrderHandler = (values?: any) => {
    dispatch(showLoader());

    const payload: any = {
      cartType: Utils.constants.CART_TYPE.EGIFT,
      amount: totalAmount,
      addressId: "",
      couponArray: [],
      paymentMethodId: "",
      paymentMethodSource: 0,
      isDefaulSourceMethod: false,
    };

    if (paymentMode === "paytm") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.PAYTM;
      if (paytm?.amount < totalAmount) {
        sessionStorage.removeItem("paymentDone");
        sessionStorage.setItem("paytmPaytment", "normal");
        sessionStorage.setItem("totalAmount", totalAmount);

        addMoneyToWallet(
          {
            amount: Utils.CommonFunctions.decimalFlat(
              totalAmount - paytm?.amount,
              2
            ).toString(),
            section: "egift",
          },
          (err: any) => {
            dispatch(hideLoader());
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: err?.response?.data?.message,
              },
            });
          }
        );
      } else {
        payload.gatewayOrderId = Date.now().toString();
        placeOrderOnClick(payload);
      }
    } else if (paymentMode === "cod") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.COD;
      placeOrderOnClick(payload);
    } else if (paymentMode === "upi") {
      payload.paymentMethodId = "";
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.RAZORPAY_UPI;
      placeOrderOnClick(payload);
    } else if (paymentMode === "netbanking") {
      payload.paymentMethodId = bank.bankCode;
      payload.paymentMethodSource =
        Utils.constants.PAYMENT_METHOD.RAZORPAY_NET_BANKING;
      placeOrderOnClick(payload);
    } else if (paymentMode === "card") {
      // payload.cardSixDigit = values?.cardNumber? values?.cardNumber.slice(0,6):"";
      payload.paymentMethodId = values?.cardNumber
        ? values?.cardNumber
        : paymentMethodId; //pass card id
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.CARD;
      placeOrderOnClick(payload, values ? values : null);
    }
  };

  const retryOrderHandler = (values?: any) => {
    dispatch(showLoader());
    const payload: any = { orderId: mongoOrderId, type: 1 };
    if (paymentMode === "upi") {
      payload.paymentMethodId = "";
    } else if (paymentMode === "netbanking") {
      payload.paymentMethodId = bank?.bankCode
        ? bank.bankCode
        : paymentMethodId;
    } else if (paymentMode === "card") {
      payload.paymentMethodId = values?.cardNumber
        ? String(values.cardNumber)
        : paymentMethodId
          ? String(paymentMethodId)
          : ""; //pass card id
    } else if (
      paymentMode === "paytm" ||
      sessionStorage.getItem("paytmPaytment") === "retry"
    ) {
      payload.paymentMethodId = "";
      payload.orderId =
        mongoOrderId !== 0 ? mongoOrderId : sessionStorage.getItem("orderId");
      payload.gatewayOrderId = `PAYTM_${Date.now()}`;

      if (
        paytm?.amount < totalAmount &&
        sessionStorage.getItem("paymentDone") !== "true"
      ) {
        sessionStorage.setItem("paytmPaytment", "retry");
        sessionStorage.setItem("totalAmount", totalAmount);
        addMoneyToWallet({
          amount: Utils.CommonFunctions.decimalFlat(
            totalAmount - paytm?.amount,
            2
          ).toString(),
          section: "egift",
        });
        return;
      }
    }

    dispatch(
      postOrderRetry(payload, (resp: any) => {
        if (
          resp?.data?.data?.gatewayOrderId &&
          (paymentMode === "netbanking" ||
            paymentMode === "upi" ||
            paymentMode === "card")
        ) {
          const options = getOptions(
            paymentMode || "",
            resp?.data?.data,
            values ? values : null
          );
          makeRazorpayPayment(options);
        } else {
          showOrderSuccess();
        }
      })
    );
  };

  const placeOrderOnClick = (payload: any, cardData?: any) => {
    dispatch(
      placeOrder(payload, (resp: any) => {
        dispatch(hideLoader());
        dispatch(hidePaytmCallbackLoader());
        setOrderId(resp?.orderId || 0);
        setMongoOrderId(resp?.mongoOrderId || 0);
        setPaymentMethodId(resp?.paymentMethodId || 0);
        if (
          resp.gatewayOrderId &&
          (paymentMode === "netbanking" ||
            paymentMode === "upi" ||
            paymentMode === "card")
        ) {
          const options = getOptions(paymentMode || "", resp, cardData);
          makeRazorpayPayment(options);
        } else {
          sessionStorage.removeItem("paymentDone");
          sessionStorage.removeItem("totalAmount");
          showOrderSuccess();
        }
      })
    );
  };

  const onRetry = () => {
    setPaymentFailedVisibility(false);
    if (mongoOrderId)
      dispatch(
        getOrderRetryDetails(`?orderId=${mongoOrderId}&type=1`, (resp: any) => {
          const data = resp?.data?.data;
          setSelectedAmount(data?.giftCard?.amount || 0);
          setDonationAmount(data?.donation?.donationAmount || 0);
          setOrderId(data?.orderId || 0);
          setPaymentMethodId(resp?.data?.data?.paymentMethodId || "");
          if (flag === "retry") {
            const obj = Utils.constants.PAYMENT_METHOD_SOURCE.find(
              (source: any) =>
                source.id === resp?.data?.data?.paymentMethodSource
            );
            setPaymentMode(obj?.type || "");
          }
        })
      );
  };

  const makeRazorpayPayment = (options: any) => {
    makePayment(
      options,
      (razorpayResp: any) => {
        if (razorpayResp?.razorpay_payment_id) {
          showOrderSuccess();
        }
      },
      (error: any) => {
        if (
          error?.error?.reason === "payment_failed" ||
          error?.error?.reason === "payment_declined_due_to_high_traffic" ||
          error?.error?.reason === "request_timed_out"
        ) {
          setPaymentFailedVisibility(true);
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem('checkoutAddressId')
          sessionStorage.removeItem('shipping')
        } else if (
          error?.error?.reason === "payment_cancelled" ||
          error?.error?.reason === "payment_pending" ||
          error?.error?.reason === "verification_failed" ||
          (error?.error?.reason === "" && paymentMode === "upi") ||
          (error?.error?.reason === "" && paymentMode === "card")
        ) {
          setPaymentPendingVisibility(true);
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem('checkoutAddressId')
          sessionStorage.removeItem('shipping')
        } else
          dispatch({
            type: "show-alert",
            payload: {
              type: "error",
              message: error?.error?.description,
            },
          });
      }
    );
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    if (
      paytmPaymentStatus === Utils.constants.PAYTM_STATUS.SUCCESS ||
      paytmPaymentStatus === Utils.constants.PAYTM_STATUS.PENDING
    ) {
      dispatch(showPaytmCallbackLoader());
      let totalAmount = sessionStorage.getItem("totalAmount");
      if (sessionStorage.getItem("paytmPaytment") === "normal") {
        const payload: any = {
          cartType: Utils.constants.CART_TYPE.EGIFT,
          amount: totalAmount,
          addressId: "",
          couponArray: [],
          paymentMethodId: "",
          paymentMethodSource: Utils.constants.PAYMENT_METHOD.PAYTM,
          isDefaulSourceMethod: false,
          gatewayOrderId: `PAYTM_${Date.now()}`,
        };
        placeOrderOnClick(payload);
      } else if (sessionStorage.getItem("paytmPaytment") === "retry") {
        retryOrderHandler();
      }
    } else if (paytmPaymentStatus === Utils.constants.PAYTM_STATUS.FAILED) {
      setProceedToPay(true);
    }
  }, [paytmPaymentStatus]);

  const getOptions = (mode: string, resp: any, cardData?: any) => {
    const options: any = {
      amount: resp.grandTotal ? resp.grandTotal * 100 : totalAmount * 100, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
      currency: "INR", // Default is INR. We support more than 90 currencies.
      email: userInfo.email,
      contact: userInfo.mobileNo,
      // notes: {
      //   address: data?.address?.address || "",
      // },
      order_id: resp.gatewayOrderId, // Replace with Order ID generated in Step 4
      // customer_id: userInfo.customerId|,
      // save: 1
    };

    if (mode === "netbanking") {
      options.method = "netbanking";
      options.bank = bank?.bankCode ? bank.bankCode : paymentMethodId;
      return options;
    } else if (mode === "upi") {
      options.method = "upi";
      options.upi = {
        vpa: vpa,
        flow: "collect",
      };
      // options.vpa = vpa;
      return options;
    } else if (mode === "card") {
      options.method = "card";
      options.customer_id = userInfo.rzpCustomerId || "";
      if (cardData?.cardNumber) {
        if (cardData.save) options.save = cardData.save;
        options.card = {
          number: cardData?.cardNumber || "",
          expiry_month: cardData?.cardExpiryDate
            ? format(cardData.cardExpiryDate, "MM")
            : "",
          expiry_year: cardData?.cardExpiryDate
            ? format(cardData.cardExpiryDate, "yy")
            : "",
          cvv: cardData?.cvv || "",
          name: cardData?.nameOnCard || "",
        };
      } else if (selectedCard?.token) {
        options.token = selectedCard.token || "";
        options.card = selectedCard?.card || {};
      }
      return options;
    }
  };

  const showOrderSuccess = () => {
    // dispatch({
    //   type: "show-alert",
    //   payload: {
    //     type: "success",
    //     message: "Order has been placed successfully",
    //   },
    // });
    setSuccessModalVisibility(true);
    // history.push(Utils.routes.GIFT_CARD);
  };


  const handleSuccessModalClose = () => {
    // dispatch(showLoader());
    // dispatch(
    //   getUserProfile(() => {
    //     dispatch(hideLoader());
    //   })
    // );
    setSuccessModalVisibility(false);
    history.push({ pathname: Utils.routes.GIFT_CARD, state: { pageName: "Gift Card" } });

  };
  return (
    <>
      <Helmet>
        <title>Send E-Gift Card | The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Hidden smUp>
        <div className={classes.mobileRoot}>
          <div className={classes.mobileHeaderContainer}>
            <span onClick={handleBack}>
              <img
                src={
                  location.pathname === "/my-profile"
                    ? Utils.images.WHITE_ARROW
                    : Utils.images.BACK_ARROW
                }
                alt="backarrow"
                className={classes.backArrow}
              />
            </span>
            {activeStep === 5 ? (
              <Typography className={classes.mobileText}>
                {" "}
                Select Payment Mode
              </Typography>
            ) : (
              <Typography className={classes.mobileText}>
                {" "}
                Send E-Gift Card
              </Typography>
            )}
          </div>
        </div>
      </Hidden>
      <div className={classes.shoppingBagsRoot}>
        <div className={classes.maxWidthDiv}>
          <Grid container spacing={isSmall ? 2 : 3}>
            <Grid item xs={12} md={12}>
              <div className={classes.breadcrumb}>
                <BreadCrumb
                  breadcrumb={[
                    { title: "Home", action: "/" },
                    { title: getPageName(), action: "/shopping-bag" },
                  ]}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={8} md={8}>
              <div className={classes.shoppingDiv}>

                {skeletonLoader ? (
                  <Skeleton height={50} />
                ) : (
                  <>
                    <Hidden smUp>

                      <div className={clsx(activeStep === 5 ? classes.stepperMobileRoot : null)}>
                        <Stepper
                          activeStep={activeStep}
                          alternativeLabel
                          className={classes.stepper}
                          connector={<Connector />}
                        >
                          {[
                            "Design",
                            "Value",
                            "Message",
                            "Delivery",
                            "Payment",
                          ].map((item, index) => (
                            <Step key={index}>
                              <StepLabel
                                StepIconComponent={StepIcon}
                                className={classes.stepLabel}
                              >
                                {item}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </div>

                    </Hidden>
                    <Hidden xsDown>
                      <div className={classes.stepperDiv}>
                        <Stepper
                          activeStep={activeStep}
                          alternativeLabel
                          className={classes.stepper}
                          connector={<Connector />}
                        >
                          {[
                            "Select Design",
                            "Enter Value",
                            "Details",
                            "Delivery",
                            "Summary",
                            "Payment",
                          ].map((item, index) => (
                            <Step key={index}>
                              <StepLabel
                                StepIconComponent={StepIcon}
                                className={classes.stepLabel}
                              >
                                {item}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </div>
                    </Hidden>
                  </>
                )}
              </div>
              <Hidden smUp>
                {activeStep === 0 && (
                  <Typography className={classes.selectedTitle}>
                    Select E-Gift Card Design
                  </Typography>
                )}
                {(activeStep === 0 || activeStep === 4) && (
                  <div className={classes.giftBox}>
                    <div className={classes.imgBox}>
                      <img
                        src={
                          selectedGiftImage
                            ? `${selectedGiftImage}`
                            : Utils.images.PRODUCT_PLACEHOLDER
                        }
                        alt="product"
                        className={
                          selectedGiftImage
                            ? classes.imgDiv
                            : classes.noImgBackground
                        }
                      />
                    </div>
                  </div>
                )}

                <div>{getStepContent(activeStep)}</div>
              </Hidden>
              <Hidden xsDown>
                <div>{getStepContent(activeStep)}</div>
              </Hidden>

            </Grid>

            {activeStep !== 5 ? (
              <Grid item xs={12} sm={4} md={4}>
                {skeletonLoader ? (
                  <>
                    <Skeleton height={250} />
                    <Skeleton className={classes.skeltonView} height={40} />
                  </>
                ) : (
                  <div className={classes.paymentSecondDiv}>
                    <>
                      <Hidden xsDown>
                        <div className={classes.giftBox}>
                          <div className={classes.imgBox}>
                            <img
                              src={
                                selectedGiftImage
                                  ? `${selectedGiftImage}`
                                  : Utils.images.PRODUCT_PLACEHOLDER
                              }
                              alt="product"
                              className={
                                selectedGiftImage
                                  ? classes.imgDiv
                                  : classes.noImgBackground
                              }
                            />
                            {/* {(selectedAmount + Number(donationAmount)) !== 0 && <div className={classes.amountDiv}>
                     <Typography className={classes.range}>
                       {(selectedAmount || donationAmount) && "₹"} {(selectedAmount + Number(donationAmount)) === 0 ? '' : (selectedAmount + Number(donationAmount))}
                     </Typography>
                     <Typography className={classes.rangeAmount} align="center">  {(selectedAmount || donationAmount) && "Total amount"} </Typography>
                   </div>
                   } */}
                          </div>
                        </div>
                      </Hidden>

                      {/* <div className={classes.btnContainer}>
                 {activeStep !== 4 ? (
                   <>
                     {activeStep == 0 ?
                       <div className={classes.btnDiv}>
                         <CustomButton
                           type="button"
                           color="primary"
                           fullWidth
                           variant="outlined"
                           text={"Cancel"}
                           onClick={() => history.push('/gift-card')}
                         />
                       </div>
                       : <div className={classes.btnDiv}>
                         <CustomButton
                           type="button"
                           color="primary"
                           fullWidth
                           variant="outlined"
                           text={"Back"}
                           onClick={handleBack}
                         />
                       </div>
                     }
                     <div className={classes.btnDiv}>
                       <CustomButton
                         disabled={error ? true : false}
                         type="button"
                         color="primary"
                         fullWidth
                         variant="contained"
                         text={"Next"}
                         onClick={handleNext}
                       />
                     </div>
                   </>
                 ) : (
                   <>
                     <div className={classes.backButton}>
                       <CustomButton
                         type="button"
                         color="primary"
                         fullWidth
                         variant="outlined"
                         text={"Back"}
                         onClick={handleBack}
                       />
                     </div>
                     <div className={classes.checkOutBtn}>
                       <CustomButton
                         type="button"
                         color="primary"
                         fullWidth
                         variant="contained"
                         text={`Continue & Pay ₹ ${selectedAmount ? selectedAmount + donationAmount : 0}`}
                         onClick={handleCheckout}
                       />
                     </div>
                   </>
                 )
                 }
               </div> */}
                      <RightContent
                        activeStep={activeStep}
                        classes={classes}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        error={error}
                        selectedAmount={selectedAmount}
                        donationAmount={donationAmount}
                        handleCheckout={handleCheckout}
                      />
                    </>
                    {/* )} */}
                  </div>
                )}
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4}>
                <div className={classes.paymentThirdDiv}>
                  <PaymentSummary
                    totalAmount={selectedAmount + donationAmount}
                    setPaymentMode={setPaymentMode}
                    paymentMode={paymentMode}
                    proceedToPay={proceedToPay}
                    selectedAmount={selectedAmount}
                    donationAmount={donationAmount}
                    handleBack={handleBack}
                    btnText={btnText}
                    onSubmit={onSubmit}
                  />
                  {/* )} */}
                </div>

              </Grid>
            )}
          </Grid>
        </div>
        <SuccessModal
          displayDivider={true}
          title={`Order Successful!`}
          description={
            <Typography className={classes.description}>
              Your Order{" "}
              {orderId ? (
                <span className={classes.bold}>{orderId}</span>
              ) : null}{" "}
              has been successfully placed with us
            </Typography>
          }
          buttonText="Shop More"
          open={successModalVisibility}
          handleClose={handleSuccessModalClose}
        />

        <MessageDialog
          closePopUp={true}
          onClosePopUp={() => {
            history.push("/gift-card");
          }}
          open={paymentFailedVisibility}
          icon={Utils.images.ORDER_FAILED}
          handleClose={() => { }}
          onOk={() => {
            if (paymentFailedVisibility) {
              history.push({
                pathname: "/send-gift-card",
                search: "?activeStep=5",
                state: { flag: "retry", mongoOrderId, paymentMethodId },
              });
              setActiveStep(5);
              setFlag("retry");
              setPaymentFailedVisibility(false);
            }
          }}
          okText="Retry"
          headingClass={classes.messageHeading}
          heading={"Payment Failed"}
          message={
            <Typography className={classes.description}>
              Uh-oh! We were unable to process your payment{" "}
              {orderId ? (
                <span className={classes.bold}>{orderId}</span>
              ) : null}
            </Typography>
          }
          cancelText={""}
        // alignOkButton={true}
        />

        <MessageDialog
          closePopUp={true}
          onClosePopUp={() => {
            history.push("/");
          }}
          open={paymentPendingVisibility}
          icon={Utils.images.ORDER_PENDING}
          handleClose={() => {
            history.push("/");
          }}
          onOk={() => {
            history.push("/order/list");
          }}
          okText="Go To My Order"
          headingClass={classes.messageHeading}
          heading={"Payment Pending"}
          message={
            <Typography className={classes.description}>
              Uh-oh! We were waiting to process your payment{" "}
              {orderId ? <span className={classes.bold}>{orderId}</span> : null}
            </Typography>
          }
          cancelText={"Cancel"}
        />
      </div>
    </>
  );
};

export default SendGiftCard;
