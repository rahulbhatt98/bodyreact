import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  withStyles,
  Divider,
  Hidden,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import CustomModal from "../../components/common/customModal";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Address from "../address";
import Delivery from "../delivery";
import ShoppingBag from "./shoppingBag";
import BreadCrumb from "../../components/breadCrumb";
import { isAuthenticated } from "../../utils/session";
import { useHistory, useLocation } from "react-router";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CustomCheckbox from "../../components/common/customCheckbox";
import CustomButton from "../../components/common/button";
import {
  updateLocalCart,
  updateCartSummary,
  getOrderRetryDetails,
  postOrderRetry,
} from "./action";
import FreeSample from "./freeSample";
import Recommended from "./recommended";
import Utils from "../../utils";
import { Link } from "react-router-dom";
import PaymentOptions from "../payment";
import { getWalletBalance, placeOrder, rewardUnBlock } from "../payment/action";
import {
  getAddress,
  getShoppingBagList,
} from "../../components/common/addToCart/action";
import { checkPincode } from "../productDetail/action";
import {
  hideLoader,
  hidePaytmCallbackLoader,
  hideSkeleton,
  showLoader,
  showPaytmCallbackLoader,
  showSkeleton,
} from "../home/actions";
import { removeCoupon } from "../coupon/action";
import MessageDialogue from "../../components/common/product/messageDialogue";
import MessageDialog from "../../components/common/messageDialog";
import NotFound from "./notFound";
import SuccessModal from "../../components/common/successModal";
import Skeleton from "@mui/material/Skeleton";
import PaymentDetailsSkeleton from "../../components/common/skeletonList/paymentDetailsSkeleton";
import ThankYouModal from "./thankYouModal";
import { getUserProfile } from "../account/profile/action";
import format from "date-fns/format";
import clsx from "clsx";
import { makePayment } from "../payment/razorpay";
import { addMoneyToWallet } from "../payment/otherOptions/paytm/action";
import events from "../../utils/event/constant";
import { screenViewed, checkout, purchase, completeCheckout, updateProfile } from "../../utils/event/action";
import { StepIconProps } from "@material-ui/core/StepIcon";
// import { handleUpdateCartSummary } from "./common";
import {
  eventPaymentMethod,
  viewCart,
  selectAddress,
  selectDeliveryType,
} from "../../utils/event/action";
import { Helmet } from "react-helmet";
import _ from "lodash";
declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shoppingBagsRoot: {
      padding: theme.spacing(0.2, 2),
      backgroundColor: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        marginBottom: 50,
      },
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
    },
    shoppingDiv: {
      padding: theme.spacing(0, 0.5, 0, 0),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2.5, 0),
        [theme.breakpoints.down("xs")]: {
          // overflowX: "hidden"
          padding: "0",
        },
      },
    },
    stepperDiv: {
      borderTop: "1px solid var(--text-color)",
      borderBottom: "1px solid var(--text-color)",
      padding: theme.spacing(1.5, 0),
      [theme.breakpoints.down("xs")]: {
        paddingTop: "0px",
        // borderBottom: "5px solid #F8F8F8",
        border: "none",
        margin: theme.spacing(0, -2),
      },
    },
    stepper: {
      padding: 0,
      [theme.breakpoints.down("xs")]: {
        borderBottom: "5px solid #F8F8F8",
        paddingBottom: "10px",
        marginTop: theme.spacing(2),
      },
    },
    stepLabel: {
      textTransform: "uppercase",
      "&.MuiStepLabel-alternativeLabel": {
        flexDirection: "column-reverse",
      },
      "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        margin: 0,
      },
      "& .MuiStepLabel-label.MuiStepLabel-active": {
        fontWeight: 600,
      },
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: "6px",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
      },
    },

    amount: {
      textAlign: "right",
    },
    quantity: {
      margin: theme.spacing(0, 1),
    },
    secondContainer: {
      // top: "25%",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        position: "static",
        top: "auto",
      },
    },
    backArrow: {
      width: theme.spacing(2.5),
      height: "auto",
    },
    paymentDiv: {
      top: "35%",
      position: "sticky",
      padding: theme.spacing(0, 0, 2.5, 0),
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
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2, 0, 5, 0),
        borderTop: "1px solid var(--text-color)",
        borderBottom: "1px solid var(--text-color)",
        borderLeft: "none",
        borderRight: "none",
      },
    },
    mobilePaymentDetails: {
      borderTop: "1px solid var(--text-color)",
      borderBottom: "1px solid var(--text-color)",
    },
    paymentHeading: {
      font: `normal ${theme.spacing(1.8)}px Recoleta Alt Bold`,
      color: "var(--secondary-black)",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        background: "#F8F8F8",
        margin: theme.spacing(0, -2, 2, -2),
        padding: theme.spacing(1, 2),
        font: `normal ${theme.spacing(1.6)}px Recoleta Alt Bold`,
      },
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    reuseHeading: {
      font: `normal ${theme.spacing(1.5)}px Work Sans Medium`,
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
      cursor: "pointer",
    },
    apply: {
      font: `normal ${theme.spacing(1.4)}px Work Sans SemiBold`,
      color: "red",
      cursor: "pointer",
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        background: "#F8F8F8",
        margin: theme.spacing(0, -2, 2, -2),
        padding: theme.spacing(1, 2),
      },
    },
    grandTotal: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
    },
    btnDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        marginTop: "0px",
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
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.5, 6),
        flexBasis: "100%",
      },
    },
    breadcrumb: {
      font: `normal 500 ${theme.spacing(1.4)}px Work Sans`,
      marginTop: "25px",
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
    chooseLabel: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.3)}px Work Sans Medium`,
      },
    },
    chooseSubHeading: {
      paddingLeft: theme.spacing(1),
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
    },
    chooseBox: {
      display: "flex",

      alignItems: "center",
      "& .MuiCheckbox-root": {
        marginRight: 10,
      },
    },
    chooseBoxContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    chooseHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0.5, 1),
    },

    chooseContainer: {
      padding: theme.spacing(2, 0, 0, 1.5),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0),
        marginBottom: theme.spacing(8.5),
      },
    },
    removeCoupon: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "column",
      "& .MuiButtonBase-root": {
        padding: 0,
        color: theme.palette.error.main,
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
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
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.6)}px Work Sans`,
        // lineHeight: "24px",

        // padding: theme.spacing(0.5, 0.5),
      },
      // display:"flex"
    },
    skeleton: {
      margin: theme.spacing(1),
    },
    skeletonSpacing: {
      margin: theme.spacing(2, 0),
    },
    couponHeading: {
      font: `normal 600 ${theme.spacing(2.6)}px Work Sans`,
      lineHeight: "24px",
      color: "var(--black)",
      margin: theme.spacing(0, 0, 2, 0),
    },
    couponTitle: {
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans SemiBold`,
      color: "var(--main-opacity)",
      margin: theme.spacing(1, 0),
    },
    couponPara: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray-text)",
      lineHeight: "16px",
      textTransform: "uppercase",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.1
        )}px Work Sans`,
        lineHeight: "20px",
      },
    },
    couponDescription: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "20px",
      margin: theme.spacing(0.8, 0),
    },
    couponSaving: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--black)",
      lineHeight: "20px",
      margin: theme.spacing(0.8, 0),
    },
    divider: {
      margin: theme.spacing(1.2, 0),
    },
    strike: {
      textDecoration: "line-through",
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
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "35px",
    },
    mobileText: {
      textAlign: "center",
      width: "90%",
      diplay: "flex",
      font: `normal 700 ${theme.spacing(1.8)}px Work Sans`,
      lineHeight: "23.4px",
      letterSpacing: "0.8px",
    },

    secondStepper: {
      display: "none",
    },
    donateDiv: {
      [theme.breakpoints.down("xs")]: {
        borderTop: "1px dashed var(--border-color)",
        borderBottom: "1px dashed var(--border-color)",
        margin: theme.spacing(0, -2),
        padding: theme.spacing(1, 2),
      },
    },
    fixedBtnDiv: {
      [theme.breakpoints.down("xs")]: {
        position: "fixed",
        bottom: 0,
        background: "white",
        width: "100%",
        padding: theme.spacing(0, 1.5, 1.5),
        margin: theme.spacing(0, -2),
      },
    },
    divider2: {
      border: "1px dashed var(--border-color)",
      margin: theme.spacing(1, -2),
    },
    drawer: {
      "& .MuiDrawer-paperAnchorBottom": {
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        padding: "15px",
      },
    },
    proceedBtn: {
      borderTop: "1px solid var(--border-color)",
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(1.5, 1.5),
      left: "0",
      width: "100%",
      bottom: 0,
      zIndex: 9,
      position: "fixed",
      backgroundColor: "white",
    },
    secondDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid var(--border-color)",
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(1.5, 1.5),
      left: "0",
      width: "100%",
      bottom: 0,
      zIndex: 9,
      position: "fixed",
      backgroundColor: "white",
    },
    grandHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--green-color)",
      [theme.breakpoints.down("xs")]: {
        color: "var(--main-opacity)",
        fontSize: "12px",
      },
    },
    mobileGrandTotalDiv: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        alignItems: "baseLine",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    mobilePaymentHeading: {
      background: "#F8F8F8",
      margin: theme.spacing(0, -1.5, 2, -1.5),
      padding: theme.spacing(1, 1.5),
    },
    grandTotalDiv2: {
      margin: theme.spacing(0, -1.5),
      padding: theme.spacing(1, 1.5),
      background: "#F8F8F8",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mobileDonateDiv: {
      [theme.breakpoints.down("xs")]: {
        borderTop: "1px dashed var(--border-color)",
        borderBottom: "1px dashed var(--border-color)",
        margin: theme.spacing(0, -1.5),
        padding: theme.spacing(1, 2),
      },
    },
    whatsappImage: {
      float: "right",
    },
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
    borderTopWidth: 3,
    // borderRadius: 1,
  },
})(StepConnector);

const CustomStepper: React.FC<any> = () => {
  const location: any = useLocation();
  const locationState = location?.state || {};
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let query = Utils.CommonFunctions.useQuery();
  let activeStepId = query.get("activeStep");
  let paytmPaymentStatus = query.get("status");
  const userInfo: any =
    useSelector((state: ReducersModal) => state.userDetailReducer)?.userInfo ||
    {};

  const data: any = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const { addressReducer, paymentReducer } = useSelector(
    (state: ReducersModal) => state
  );
  const addressFlag = addressReducer.addressFlag;
  const configs = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  const menuDataId =
    useSelector((state: ReducersModal) => state.homeReducer.menuData?.[0]) ||
    null;

  const [checkoutAddressId, setCheckoutAddressId] = useState<string | null>(
    null
  );
  const [couponInfo, setCouponInfo] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(
    activeStepId ? parseInt(activeStepId) : 0
  );
  const [orderId, setOrderId] = useState(0);
  const [mongoOrderId, setMongoOrderId] = useState(
    locationState.mongoOrderId ?? 0
  );
  const [paymentMethodId, setPaymentMethodId] = useState(
    locationState.paymentMethodId ?? 0
  );
  const [flag, setFlag] = useState(locationState.flag ?? "");

  // const [savedCardToken, setSavedCardToken] = useState("");
  const [paymentMode, setPaymentMode] = useState<any>("");
  const [proceedToPay, setProceedToPay] = useState(false);
  const [btnText, setBtnText] = useState("Proceed To Pay");
  const [deliveryData, setDeliveryData] = useState<any>();
  const [nextBtnDisabled, setNextBtnDisabled] = useState(
    checkoutAddressId !== null ? false : true
  );
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);
  const [ratingFormVisibility, setRatingFormVisibility] = useState(false);
  const [formModalFormVisibility, setformModalFormVisibility] = useState(false);
  const [orderFeedbackVisibility, setOrderFeedbackVisibility] = useState(false);
  const [thankYouModalVisibility, setThankYouModalVisibility] = useState(false);
  const [paymentFailedVisibility, setPaymentFailedVisibility] = useState(false);
  const [paymentPendingVisibility, setPaymentPendingVisibility] =
    useState(false);
  const [invalidSample, setInvalidSample] = useState(0);
  const [itemNotInStock, setItemNotInStock] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [vpa, setVpa] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>({});
  const [bank, setBank] = useState<any>({});
  const [sampleInfo, setSampleInfo] = useState(false);
  const [coupon, setCoupon] = useState<any>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [loginAlert, showLoginAlert] = useState(false);
  var paymentDone = sessionStorage.getItem("paymentDone");
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  let { path, url } = useRouteMatch();
  const [transactionData, setTransactionData] = useState<any>({
    last_transaction_category: '',
    last_transaction_category_id: '',
    last_transaction_product_name: '',
    last_transaction_product_id: '',
    last_transaction_product_size: '',
    last_transaction_product_parent_id: '',
  });

  const handleChange = (event: any) => {
    setShowPaymentSummary(true);
  };
  const handleClose = (event: any) => {
    setShowPaymentSummary(false);
  };
  // var coupon: any;
  useEffect(() => {
    /**
     * Event logger
     */
    window.scrollTo(0, 0);
    screenViewed({
      ScreenName: events.SCREEN_MY_BAG,
      CTGenerated: "WEB",
    });
    if (
      // activeStep === 0
      url === "/shopping-bag" &&
      data?.isPointsBlocked
    ) {
      unBlockRewards();
    }
    if (url === "/shopping-bag/delivery" || url === "/shopping-bag/payment") {
      dispatch(getAddress());
    }
  }, []);

  useEffect(() => {
    const addressId = sessionStorage.getItem('checkoutAddressId');
    if (url === "/shopping-bag/delivery" && addressReducer?.address?.length && data?.totalWithoutWallet) {
      checkPin(addressId || "", false);
      // on delivery page refresh grand total turns to 0
      // setGrandTotal(data?.grandTotal)
    }

  }, [addressReducer?.address?.length, data?.totalWithoutWallet]);

  const checkPin = (addressId: String, redirect?: boolean) => {
    // if (url === "/shopping-bag/delivery") {
    if (addressId) {
      dispatch(showLoader());
      let address = addressReducer?.address?.find(
        (item: any) => item?._id === addressId
      );

      let eventPayload: any = {
        PhoneNo: `${address?.mobileNo}`,
        CartID: `${data._id}`,
        Google_Address: `${address?.address}`,
        AddressLine_1: `${address?.address1}`,
        AddressLine_2: `${address?.address2}`,
        Pincode: `${address?.pincode}`,
        City: `${address?.city}`,
        State: `${address?.state}`,
        AddressType: `${address?.addressType}`,
        CartType: `Cart`,
        is_default: `${address?.isDefault}`,
        Coordinates: `${JSON.stringify(address?.coordinates)}`,
      };
      selectAddress(eventPayload);

      checkPincode({
        pincode: Number(address?.pincode),
        grandTotal: data?.totalWithoutWallet
      })
        .then((resp) => {
          if (resp) {
            if (redirect) {
              handleCartSummary();
            } else {
              dispatch(hideLoader());
            }
            sessionStorage.setItem('deliveryData', resp?.data?.data ? JSON.stringify(resp.data.data) : "")
            setDeliveryData(resp?.data?.data);
            setNextBtnDisabled(false);
          } else {
            dispatch(hideLoader());
          }
          // setActiveStep((prevActiveStep) => prevActiveStep + 1)
        })
        .catch((err) => {
          dispatch(hideLoader());

          setNextBtnDisabled(true);
          // setActiveStep(1)
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: err.response.data.message,
              },
            });
        });
    }
    // }
  };

  useEffect(() => {
    const total = data.grandTotal
    setGrandTotal(total);
  }, [data.grandTotal]);

  // const getRewardData = () => {
  //   // setLoader(true)
  //   dispatch(showLoader());
  //   dispatch(hideLoader());
  //   dispatch(getRewardRate((resp: any) => {
  //     dispatch(hideLoader());

  //     // if (resp) {
  //     //   // dispatch(hideLoader())
  //     //   // setRewardData(resp);
  //     //   setRewardBalance(resp?.PointValue ? Number(resp.PointValue) : 0)
  //     // }
  //     // setLoader(false)

  //   }));

  // }

  const unBlockRewards = () => {
    dispatch(showLoader());
    // const pointDetails = data?.pointDetails || {}
    const payload = {
      billNumber: data?.pointDetails?.billNumber
        ? data?.pointDetails.billNumber
        : "",
      redemptionDate: data?.pointDetails?.redemptionDate
        ? data?.pointDetails.redemptionDate
        : "", // "30 Jan 2022"
    };
    dispatch(
      rewardUnBlock(payload, (resp: any) => {
        // dispatch(hideLoader())
        resetWalletAndRewards();
      })
    );
  };

  const resetWalletAndRewards = () => {
    dispatch(showLoader());
    let payload: any = {
      cartId: data._id,
      donation: data.donation,
      productDiscount: Math.abs(data.productDiscount),
      isWhatsAppConsent: data.isWhatsAppConsent,
      addressId: checkoutAddressId ?? "",
      isOrderWrapped: data.isOrderWrapped,
      walletAmount: 0,
      totalAvailablePoints: 0,
      pointRate: 0,
      isPaymentScreen: true,
    };
    const shippingData = sessionStorage.getItem("shipping")
      ? JSON.parse(sessionStorage.getItem("shipping") ?? "")
      : data?.shipping;

    if (shippingData?.shippingType) {
      payload.shipping = shippingData;
    }
    // if (data?.shipping?.shippingType) {
    //   payload.shipping = {...data?.shipping}||{}
    //   payload.shippingFee= data?.shipping?.shippingFee || 0;

    //   // payload.shippingType = data?.shipping?.shippingType || ""
    //   // payload.shippingFee = data?.shipping?.shippingFee || ""
    // }
    dispatch(
      updateCartSummary(payload, (resp: any) => {
        dispatch(hideLoader());
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (url === "/shopping-bag") setActiveStep(0);
    else if (url === "/shopping-bag/address") setActiveStep(1);
    else if (url === "/shopping-bag/delivery") {
      setActiveStep(2);
      // const addressId = sessionStorage.getItem('checkoutAddressId')
      // if (addressId)
      //   checkPin(addressId, false)
    } else if (url === "/shopping-bag/payment") setActiveStep(3);
    if (
      // activeStep !== 3 && activeStep != 0
      url !== "/shopping-bag/payment" &&
      url !== "/shopping-bag" &&
      data?.isPointsBlocked
    ) {
      unBlockRewards();
    }
    if (
      // activeStep !== 2
      url !== "/shopping-bag/delivery"
    ) {
      if (!flag) {
        dispatch(showSkeleton());
        dispatch(
          getShoppingBagList(
            {
              isPaymentScreen:
                //  activeStep === 3
                url === "/shopping-bag/payment" ? true : false,
            },
            (resp: any) => {
              setGrandTotal(resp?.data?.data?.grandTotal)
              dispatch(hideSkeleton());
            }
          )
        );
      }
    }
    if (
      url !== "/shopping-bag/payment"
      // activeStep !== 3
    ) {
      return setPaymentMode("");
    }
  }, [url]);

  useEffect(() => {
    if (flag === "retry" || flag === "convertToCod") {
      dispatch(showLoader());
      onRetry();
    }
  }, [flag]);

  useEffect(() => {
    if (paytmPaymentStatus === Utils.constants.PAYTM_STATUS.FAILED) {
      setProceedToPay(true);
    }
  }, [paytmPaymentStatus]);

  useEffect(() => {
    handleTransaction();
    let ProductsArray =
      data &&
      data.filteredItems &&
      data.filteredItems.reduce((i: any, j: any) => {
        i.push({
          name: j.name,
          qty: j.quantity,
        });
        return i;
      }, []);

    // let eventPayload = {
    //   UserName: `${localStorage.getItem("fullName")}`,
    //   PhoneNo: `${localStorage.getItem("mobileNo")}`,
    //   CartValue: `${data?.grandTotal}`,
    //   TotalItems: `${data?.totalItems}`,
    //   Products: ProductsArray,

    //   CartID: `${data?._id}`,
    //   Quantity: `${totalItems}`,
    //   SubTotal: `${data?.cartTotal}`,
    //   CouponDiscount: `${data?.couponDiscount}`,
    //   Donation: `${data?.donation?.donationAmount}`,
    //   GrandTotal: `${data?.grandTotal}`,
    //   CouponCode: `${coupon?.couponCode}`,
    //   CartType: `Cart`,
    // };

    // viewCart(eventPayload);

    if (!checkoutAddressId) {
      setCheckoutAddressId(data?.address?._id);
    }
    if (
      paymentDone === null &&
      (paytmPaymentStatus === Utils.constants.PAYTM_STATUS.SUCCESS ||
        paytmPaymentStatus === Utils.constants.PAYTM_STATUS.PENDING) &&
      data?.address?._id
    ) {
      dispatch(showPaytmCallbackLoader());

      sessionStorage.setItem("paymentDone", "true");
      if (sessionStorage.getItem("paytmPaytment") === "normal") {
        let payload = {
          cartType: 1,
          amount: data.grandTotal,
          // "addressId": data.addressId,
          addressId: data?.address?._id,
          couponArray: [],
          paymentMethodId: "",
          paymentMethodSource: Utils.constants.PAYMENT_METHOD.PAYTM,
          isDefaulSourceMethod: false,
          gatewayOrderId: `PAYTM_${Date.now()}`,
          cartId: data?._id,
        };
        placeOrderOnClick(payload);
      } else if (sessionStorage.getItem("paytmPaytment") === "retry") {
        retryOrderHandler();
      }
    }
    let freeSamples = data?.items?.filter(
      (item: any) => item.type === "sample"
    ).length;

    let invalidSample =
      freeSamples > data?.freeSampleCount
        ? freeSamples - data?.freeSampleCount
        : 0;

    setSampleInfo(invalidSample ? true : false);
    setInvalidSample(invalidSample);

    let couponData = data?.coupons?.find(
      (item: any) => item.belongsTo !== Utils.constants.couponType.AUTO_TYPE
    );
    setCoupon(couponData);
    let eventPayload = {
      UserName: `${localStorage.getItem("fullName")}`,
      PhoneNo: `${localStorage.getItem("mobileNo")}`,
      CartValue: `${data?.grandTotal}`,
      TotalItems: `${data?.totalItems}`,
      Products: JSON.stringify(ProductsArray),
      CartID: `${data?._id}`,
      Quantity: `${totalItems}`,
      SubTotal: `${data?.cartTotal}`,
      CouponDiscount: `${data?.couponDiscount}`,
      Donation: `${data?.donation?.donationAmount}`,
      GrandTotal: `${data?.grandTotal}`,
      CouponCode: couponData?.couponCode ? `${couponData?.couponCode}` : `${coupon?.couponCode}`,
      CartType: `Cart`,
    };

    viewCart(eventPayload);
    const itemIsNotInStock = data?.items?.some((item: any) => !item?.isInStock);
    setItemNotInStock(itemIsNotInStock);
  }, [data]);

  const handleNext = () => {
    if (isAuthenticated()) {
      if (activeStep === 0) {
        if (data.grandTotal < Number(configs?.min_order_value)) {
          setAlertText(
            `Minimum order value should be Rs. ${configs?.min_order_value}`
          );
          setShowAlert(true);
        } else if (data.grandTotal > Number(configs?.max_order_value)) {
          setAlertText(
            `Maximum order value should be Rs ${configs?.max_order_value}`
          );
          setShowAlert(true);
        } else {
          let ProductsArray = data?.items.reduce((i: any, j: any) => {
            i.push({
              name: j.name,
              qty: j.quantity,
            });
            return i;
          }, []);
          checkout({
            "User Name": `${localStorage.getItem("fullName")}`,
            PhoneNo: `${localStorage.getItem("mobileNo")}`,
            // DeliveryType: `${data?.shippingType}`,
            // ProductName: `${data?.items?.reduce((productName: string, item: any) => {
            //   return productName + item.name + " | ";
            // }, "")}`,
            CartID: `${data?._id}`,
            Quantity: `${totalItems}`,
            SubTotal: `${data?.cartTotal}`,
            CouponDiscount: `${data?.couponDiscount}`,
            Donation: `${data?.donation?.donationAmount}`,
            GrandTotal: `${data?.grandTotal}`,
            CouponCode: `${coupon?.couponCode}`,
            CartType: `Cart`,
            Products: JSON.stringify(ProductsArray),
          });
          if (typeof window && window.gtag !== 'undefined') {
            window.gtag('event', 'begin_checkout_bag', {
              "items": [
                {
                  "CartID": `${data?._id}`,
                  Products: ProductsArray,
                  "brand": "The Body Shop",
                  "quantity": `${totalItems}`,
                  "SubTotal": `${data?.cartTotal}`,
                }
              ],
              "coupon": `${data?.couponDiscount}`,
            });
          }
          handleCartSummary();
        }
      } else if (activeStep === 1) {
        sessionStorage.setItem(
          "checkoutAddressId",
          checkoutAddressId ? String(checkoutAddressId) : ""
        );
        if (checkoutAddressId) {
          dispatch(showLoader());
          let address = addressReducer.address.find(
            (item: any) => item._id === addressReducer.checkoutAddressId
          );

          let eventPayload: any = {
            UserName: `${localStorage.getItem("fullName")}`,
            PhoneNo: `${address.mobileNo}`,
            CartID: `${data._id}`,
            Google_Address: `${address.address}`,
            AddressLine_1: `${address.address1}`,
            AddressLine_2: `${address.address2}`,
            Pincode: `${address.pincode}`,
            City: `${address.city}`,
            State: `${address.state}`,
            AddressType: `${address.addressType}`,
            CartType: `Cart`,
            is_default: `${address.isDefault}`,
            Coordinates: `${JSON.stringify(address.coordinates)}`,
          };
          selectAddress(eventPayload);
          checkPin(checkoutAddressId ?? "", true);
          if (typeof window && window.gtag !== 'undefined') {
            window.gtag('event', 'checkout_progress_address', {
              "items": [
                {
                  "CartID": `${data?._id}`,
                  "Google_Address": `${address.address}`,
                  "AddressLine_1": `${address.address1}`,
                  "AddressLine_2": `${address.address2}`,
                  "Pincode": `${address.pincode}`,
                  "City": `${address.city}`,
                  "State": `${address.state}`,
                  "AddressType": `${address.addressType}`,
                  "CartType": `Cart`,
                  "is_default": `${address.isDefault}`,
                  "Coordinates": `${JSON.stringify(address.coordinates)}`,
                }
              ],
            });
          }

          // checkPincode({
          //   pincode: Number(address?.pincode),
          //   grandTotal: data?.grandTotal,
          // })
          //   .then((resp) => {
          //     if (resp) {
          //       handleCartSummary();
          //       setDeliveryData(resp?.data?.data);
          //       setNextBtnDisabled(false);
          //     } else {
          //       dispatch(hideLoader());
          //     }
          //     // setActiveStep((prevActiveStep) => prevActiveStep + 1)
          //   })
          //   .catch((err) => {
          //     dispatch(hideLoader());

          //     setNextBtnDisabled(true);
          //     // setActiveStep(1)
          //     if (err?.response?.data?.message)
          //       dispatch({
          //         type: "show-alert",
          //         payload: {
          //           type: "error",
          //           message: err.response.data.message,
          //         },
          //       });
          //   });
        }
      } else if (activeStep === 2) {
        // setNextBtnDisabled(true);

        setProceedToPay(true);
        handleCartSummary();
        if (typeof window && window.gtag !== 'undefined') {
          window.gtag('event', 'checkout_progress_DeliveryType', {
            "items": [
              {
                "CartID": `${data?._id}`,
                "PhoneNo": `${localStorage.getItem("mobileNo")}`,
                "DeliveryType": `${data?.shipping?.shippingType}`,
              }
            ],
          });
        }
      } else {
        let eventPayload: any = {
          "User Name": `${localStorage.getItem("fullName")}`,
          PhoneNo: `${localStorage.getItem("mobileNo")}`,
          CartID: `${data._id}`,
          DeliveryType: `${data?.shipping?.shippingType}`,
          CartType: `Cart`,
        };
        selectDeliveryType(eventPayload);

        handleCartSummary();
      }
    } else {
      showLoginAlert(true);
    }
  };

  const goBack = () => {
    if (url === "/shopping-bag/address")
      history.push({ pathname: '/shopping-bag', state: { pageName: "My Bag" } });
    else if (url === "/shopping-bag/delivery")
      history.push({ pathname: '/shopping-bag/address', state: { pageName: "Address Book" } });
    else if (url === "/shopping-bag/payment") {
      // const addressId = sessionStorage.getItem('checkoutAddressId');
      // checkPin(addressId || "", false)
      history.push({ pathname: '/shopping-bag/delivery', state: { pageName: "Choose Delivery Option" } });

    }
  }
  const handleBack = () => {
    if (
      (flag === "retry" || flag === "convertToCod") &&
      location?.state?.itemId &&
      data._id
    ) {
      const path = Utils.CommonFunctions.replaceUrlParams(
        Utils.routes.ORDER_DETAIL,
        { ":id": data._id, ":item_id": location?.state?.itemId }
      );
      history.push({
        pathname: path,
        state: { pageName: "Order Detail" },
      });

      dispatch(getShoppingBagList());
    } else if (
      (flag === "retry" || flag === "convertToCod") &&
      (!location?.state?.itemId || !data?._id)
    ) {
      dispatch(getShoppingBagList());
      history.push("/");
    } else {
      if (
        activeStep == 3 &&
        (data?.offerId || data?.offerId !== "" || data?.walletAmount)
      ) {
        handleUpdateCartSummary(
          data,
          checkoutAddressId,
          configs,
          3,
          null,
          0,
          0,
          0,
          "",
          (res: any) => {
            setGrandTotal(res?.grandTotal)
            // setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
            goBack()
            dispatch(hideLoader());
          }
        );
      } if (
        activeStep == 2) {
        const newData: any = { ...data };
        newData.shipping = {
          shippingType: "flatrate", shippingFee: 0
        }
        handleUpdateCartSummary(
          newData,
          checkoutAddressId,
          configs,
          2,
          null,
          0,
          0,
          0,
          "",
          () => {
            // setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
            goBack();
            dispatch(hideLoader());
          }
        );
      }
      else {
        goBack()
        //  setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
      }
    }
    // if (data?.isPointsBlocked) {
    //   const pointDetails = data?.pointDetails || {}
    //   const payload = {
    //     "billNumber": pointDetails?.billNumber ? pointDetails.billNumber : 0,
    //     "redemptionDate": pointDetails?.redemptionDate ? pointDetails.redemptionDate : ""  // "30 Jan 2022"
    //   }
    //   dispatch(rewardUnBlock(payload, (resp: any) => {
    //     // dispatch(hideLoader())
    //     // handleCartSummary()
    //   }))
    // }
  };

  const reuseAmount = (heading: string, amount: string) => {
    return (
      <div className={classes.reuseDiv}>
        <Typography className={classes.reuseHeading}>{heading}</Typography>
        <Typography className={classes.reuseHeading}>{amount}</Typography>
      </div>
    );
  };

  const setCheckoutData = (id: string | null) => {
    setCheckoutAddressId(id);
    if (id) {
      setNextBtnDisabled(false);
    } else {
      setNextBtnDisabled(true);
    }
    dispatch({ type: "checkoutAddressId", payload: id }); //use in payment page to send the delivery address
  };

  const getStepContent = (step: number) => {
    const path = "/shopping-bag";
    return <Switch>
      <Route exact path={path}>
        <ShoppingBag />
      </Route>
      <Route path={`${path}/address`}>
        <Address
          section="mybag"
          radioButton={true}
          checkoutAddressId={checkoutAddressId ? checkoutAddressId : data?.address?._id ? data?.address?._id : null}
          setCheckoutAddressId={setCheckoutData}
        />
      </Route>
      <Route path={`${path}/delivery`}>
        <Delivery
          grandTotal={grandTotal}
          handleCartSummary={handleDeliveryCartSummary}
          deliveryData={deliveryData}
          setGrandTotal={setGrandTotal}
        />
      </Route>
      <Route path={`${path}/payment`}>
        <PaymentOptions
          onRetry={onRetry}
          setPaymentMethodId={setPaymentMethodId}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          setVpa={setVpa}
          vpa={vpa}
          onSubmit={onSubmit}
          setBank={setBank}
          flag={flag}
          disablePaymentOptions={
            (data && data.grandTotal === 0) ||
            flag === "retry" ||
            flag === "convertToCod"
          }
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          section="mybag"
          setProceedToPay={setProceedToPay}
          setBtnText={setBtnText}
        />
      </Route>
    </Switch>
    // switch (step) {
    //   case 0:
    //     return <ShoppingBag />;
    //   case 1:
    //     return (
    //       <Address
    //         section="mybag"
    //         radioButton={true}
    //         checkoutAddressId={checkoutAddressId ? checkoutAddressId : null}
    //         setCheckoutAddressId={setCheckoutData}
    //       />
    //     );
    //   case 2:
    //     return (
    // <Delivery
    //   handleCartSummary={handleDeliveryCartSummary}
    //   deliveryData={deliveryData}
    //   setGrandTotal={setGrandTotal}
    // />
    //     );
    //   case 3:
    //     return (
    // <PaymentOptions
    //   onRetry={onRetry}
    //   setPaymentMethodId={setPaymentMethodId}
    //   selectedCard={selectedCard}
    //   setSelectedCard={setSelectedCard}
    //   setVpa={setVpa}
    //   vpa={vpa}
    //   onSubmit={onSubmit}
    //   setBank={setBank}
    //   flag={flag}
    //   disablePaymentOptions={
    //     (data && data.grandTotal === 0) ||
    //     flag === "retry" ||
    //     flag === "convertToCod"
    //   }
    //   paymentMode={paymentMode}
    //   setPaymentMode={setPaymentMode}
    //   section="mybag"
    //   setProceedToPay={setProceedToPay}
    //   setBtnText={setBtnText}
    // />
    //     );
    //   default:
    //     return <ShoppingBag />;
    // }
  };

  const getPageName = () => {
    // if (activeStep === 0) return "Shopping Bag";
    // else if (activeStep === 1) return "Address";
    // else if (activeStep === 2) return "Delivery";
    // else if (activeStep === 3) return "Payment";
    const path = "/shopping-bag";
    if (url === path) return "Shopping Bag";
    else if (url === `${path}/address`) return "Address";
    else if (url === `${path}/delivery`) return "Delivery";
    else if (url === `${path}/payment`) return "Payment";
  };

  const handleDonationChange = (e: any) => {
    let grandTotal = e.target.checked
      ? data.grandTotal + parseFloat(configs?.donation_amount)
      : data.grandTotal - parseFloat(configs?.donation_amount);
    let params: any = {
      cartId: data._id,
      grandTotal,
      donation: {
        donationType: "checkout_section",
        donationAmount: 0,
      },
    };

    if (e.target.checked) {
      params.donation = {
        donationType: "checkout_section",
        donationAmount: configs?.donation_amount,
      };
    }
    dispatch(updateLocalCart(params));
  };

  const handleConsentChange = (e: any) => {
    let params = {
      cartId: data._id,
      isWhatsAppConsent: e.target.checked,
    };
    dispatch(updateLocalCart(params));
  };

  const makeRazorpayPayment = (options: any, resp: any) => {
    console.log("isMembershipAdded", data?.isMembershipAdded)

    makePayment(
      options,
      (razorpayResp: any) => {
        if (razorpayResp?.razorpay_payment_id) {
          //  dispatch(getShoppingBagList({ isPaymentScreen: false }))
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem("checkoutAddressId");
          sessionStorage.removeItem("shipping");
          sessionStorage.removeItem("deliveryData");
          showOrderSuccess(resp);
          dispatch(getWalletBalance());
          dispatch(getUserProfile());
        }
      },
      (error: any) => {
        console.log("error?.error?.reason", error?.error, error?.error?.reason);

        if (
          error?.error?.reason === "payment_failed" ||
          error?.error?.reason === "payment_declined_due_to_high_traffic" ||
          error?.error?.reason === "request_timed_out"
        ) {
          setPaymentFailedVisibility(true);
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem("checkoutAddressId");
          sessionStorage.removeItem("shipping");
          sessionStorage.removeItem("deliveryData");

        } else if (
          error?.error?.reason === "payment_cancelled" ||
          error?.error?.reason === "payment_pending" ||
          error?.error?.reason === "verification_failed" ||
          (error?.error?.reason === "" && paymentMode === "upi") ||
          (error?.error?.reason === "" && paymentMode === "card")
        ) {
          setPaymentPendingVisibility(true);
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem("checkoutAddressId");
          sessionStorage.removeItem("shipping");
          sessionStorage.removeItem("deliveryData");

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

  const handleTransaction = useCallback(() => {

    let transaction_category: any = [];
    let transaction_category_id: any = [];
    let transaction_product_name: any = [];
    let transaction_product_id: any = [];
    let transaction_product_size: any = [];
    let transaction_product_parent_id: any = [];

    data?.items && data?.items.forEach((item: any) => {
      item?.category?.name && transaction_category.push(item?.category?.name)
      item?.category?.magentoId && transaction_category_id.push(item?.category?.magentoId)
      item?.name && transaction_product_name.push(item?.name)
      item?.productId && transaction_product_id.push(item?.productId)
      transaction_product_size.push(_.find(item.customAttributes, { attribute_code: "size", })?.label?.[0]?.label || '')
      item?.sku && transaction_product_parent_id.push(item?.sku)

    })
    setTransactionData({
      last_transaction_category: transaction_category.toString(),
      last_transaction_category_id: transaction_category_id.toString(),
      last_transaction_product_name: transaction_product_name.toString(),
      last_transaction_product_id: transaction_product_id.toString(),
      last_transaction_product_size: transaction_product_size.toString(),
      last_transaction_product_parent_id: transaction_product_parent_id.toString(),
    })

  }, [data?.items, transactionData])

  const onSubmit = (values?: any) => {
    let payload = {
      IsLoyaltyUsed: data.isPointsBlocked,
      LoyaltyPointsUsed: data?.pointDetails?.redeemedPointsValue ?? 0,
      IsWalletUsed: data.walletAmount ? true : false,
      WalletBalanceUsed: data.walletAmount,
      GrandTotal: data.grandTotal,
      PaymentMethod: paymentMode,
    };
    eventPaymentMethod(payload);
    let ProductsArray = data?.items.reduce((i: any, j: any) => {
      i.push({
        name: j.name,
        qty: j.quantity,
      });
      return i;
    }, []);

    let completeCheckoutPayload = {
      "User Name": `${localStorage.getItem("fullName")}`,
      PhoneNo: `${localStorage.getItem("mobileNo")}`,
      CartID: `${data?._id}`,
      Quantity: `${totalItems}`,
      SubTotal: `${data?.cartTotal}`,
      CouponDiscount: `${data?.couponDiscount}`,
      Donation: `${data?.donation?.donationAmount}`,
      GrandTotal: `${data?.grandTotal}`,
      CouponCode: `${coupon?.couponCode}`,
      CartType: `Cart`,
      Products: JSON.stringify(ProductsArray),
      DeliveryType: `${data.shipping?.shippingType}`,
      ShippingFee: `${data.shippingFee}`,
      AddressType: `${data.address?.addressType}`,
      Address: `${data?.address?.address}`,
      IsLoyaltyUsed: `${data.isPointsBlocked}`,
      LoyaltyPointsUsed: `${data?.pointDetails?.redeemedPointsValue ?? 0}`,
      IsWalletUsed: data.walletAmount ? true : false,
      WalletBalanceUsed: `${data.walletAmount}`,
      PaymentMethod: paymentMode,

    };

    completeCheckout(completeCheckoutPayload)


    let eventPayload: any = {
      "User Name": `${localStorage.getItem("fullName")}`,
      PhoneNo: `${localStorage.getItem("mobileNo")}`,
      CartID: `${data._id}`,
      DeliveryType: `${data.shipping?.shippingType}`,
      CartType: `Cart`,
    };
    selectDeliveryType(eventPayload);

    updateProfile('last_transaction_category', transactionData?.last_transaction_category)
    updateProfile('last_transaction_category_id', transactionData?.last_transaction_category_id)
    updateProfile('last_transaction_product_name', transactionData?.last_transaction_product_name)
    updateProfile('last_transaction_product_id', transactionData?.last_transaction_product_id)
    updateProfile('last_transaction_product_size', transactionData?.last_transaction_product_size)
    updateProfile('last_transaction_product_parent_id', transactionData?.last_transaction_product_parent_id)

    if (flag === "retry" || flag === "convertToCod") {
      retryOrderHandler(values);
    } else {
      placeOrderHandler(values);
    }
  };

  const placeOrderHandler = (values?: any) => {
    dispatch(showLoader());
    const payload: any = {
      cartType: 1,
      amount: data.grandTotal,
      addressId: checkoutAddressId,
      couponArray: [],
      paymentMethodId: "",
      paymentMethodSource: 0,
      isDefaulSourceMethod: false,
      cartId: data?._id,
    };
    if (data?.offerId) payload.bankOfferId = data?.offerId || null;

    /**
     * event logger
     */
    // checkout({
    //   "User Name": `${localStorage.getItem("fullName")}`,
    //   PhoneNo: `${localStorage.getItem("mobileNo")}`,
    //   // DeliveryType: `${data?.shippingType}`,
    //   ProductName: `${data?.items?.reduce((productName: string, item: any) => {
    //     return productName + item.name + " | ";
    //   }, "")}`,
    //   CartID: `${data?._id}`,
    //   Quantity: `${totalItems}`,
    //   SubTotal: `${data?.cartTotal}`,
    //   CouponDiscount: `${data?.couponDiscount}`,
    //   // ShippingFee: `${data?.shippingFee}`,
    //   Donation: `${data?.donation?.donationAmount}`,
    //   GrandTotal: `${data?.grandTotal}`,
    //   // AddressType: `${data?.address?.addressType}`,
    //   // Address: `${data?.address?.address}`,
    //   // PaymentMethod: `${paymentMode}`,
    //   CouponCode: `${coupon?.couponCode}`,
    //   // UserId: `${localStorage.getItem("userId")}`,
    //   // CreatedAt: `${Date()}`,
    //   CartType: `Cart`,
    //   Products:[
    //     {
    //       name: "Tea Tree Purifying & Balancing Shampoo",
    //       qty: "1"
    //     },
    //     {
    //       name: "abc",
    //       qty: "2"
    //     }
    //   ],
    // });

    if (paymentMode === "paytm") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.PAYTM;
      // if (paymentReducer.paytm?.amount < data?.grandTotal) {

      if (
        !paymentReducer?.paytm?.fundSufficient &&
        paymentReducer?.paytm?.addMoneyAllowed
      ) {
        sessionStorage.removeItem("paymentDone");
        sessionStorage.setItem("paytmPaytment", "normal");

        addMoneyToWallet({
          amount: Utils.CommonFunctions.decimalFlat(
            data?.grandTotal - paymentReducer.paytm?.amount,
            2
          ).toString(),
        });
      } else {
        payload.gatewayOrderId = `PAYTM_${Date.now()}`;
        placeOrderOnClick(payload);
      }
    } else if (paymentMode === "cod") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.COD;
      placeOrderOnClick(payload);
    } else if (paymentMode === "wallet") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.WALLET;
      placeOrderOnClick(payload);
    } else if (paymentMode === "reward") {
      payload.paymentMethodSource =
        Utils.constants.PAYMENT_METHOD.REWARD_POINTS;
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
      if (values?.cardNumber)
        payload.cardSixDigit = values?.cardNumber
          ? Number(String(values?.cardNumber).slice(0, 6))
          : null;
      payload.paymentMethodId = values?.cardNumber
        ? values?.cardNumber
        : paymentMethodId; //pass card id

      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.CARD;
      placeOrderOnClick(payload, values ? values : null);
    }
  };
  const retryOrderHandler = (values?: any) => {
    dispatch(showLoader());
    const payload: any = {
      orderId: mongoOrderId,
      type: flag === "convertToCod" ? 2 : 1,
    };
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
      if (values?.cardNumber)
        payload.cardSixDigit = values?.cardNumber
          ? Number(String(values?.cardNumber).slice(0, 6))
          : null;
      if (data?.offerId) payload.bankOfferId = data?.offerId || null;
    } else if (
      paymentMode === "paytm" ||
      sessionStorage.getItem("paytmPaytment") === "retry"
    ) {
      payload.paymentMethodId = "";
      payload.orderId =
        mongoOrderId !== 0 ? mongoOrderId : sessionStorage.getItem("orderId");
      payload.gatewayOrderId = `PAYTM_${Date.now()}`;

      if (
        paymentReducer.paytm?.amount < data?.grandTotal &&
        sessionStorage.getItem("paymentDone") !== "true"
      ) {
        sessionStorage.setItem("paytmPaytment", "retry");
        sessionStorage.setItem("orderId", mongoOrderId);

        addMoneyToWallet({
          amount: Utils.CommonFunctions.decimalFlat(
            data?.grandTotal - paymentReducer.paytm?.amount,
            2
          ).toString(),
        });
        return;
      }
    }

    dispatch(
      postOrderRetry(payload, (resp: any) => {
        // dispatch({ type: "clearCart" });
        // showOrderSuccess(resp);
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
          makeRazorpayPayment(options, resp);
        } else {
          sessionStorage.removeItem("paytmPaytment");
          sessionStorage.removeItem("paymentDone");
          // dispatch(getShoppingBagList({ isPaymentScreen: false }))
          showOrderSuccess(resp);
        }
      })
    );
  };

  const getOptions = (mode: string, resp: any, cardData?: any) => {
    const options: any = {
      amount: resp.grandTotal ? resp.grandTotal * 100 : data.grandTotal * 100, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
      currency: "INR", // Default is INR. We support more than 90 currencies.
      email: userInfo.email,
      contact: userInfo.mobileNo,
      notes: {
        address: data?.address?.address || "",
      },
      order_id: resp.gatewayOrderId, // Replace with Order ID generated in Step 4
      // customer_id: userInfo.customerId|,
      // save: 1
    };
    if (mode === "netbanking") {
      options.method = "netbanking";
      if (resp.offerId) options.offer_id = resp.offerId;
      options.bank = bank?.bankCode ? bank.bankCode : paymentMethodId;
      return options;
    } else if (mode === "upi") {
      options.method = "upi";
      if (resp.offerId) options.offer_id = resp.offerId;
      options.upi = {
        vpa: vpa,
        flow: "collect",
      };
      // options.vpa = vpa;
      return options;
    } else if (mode === "card") {
      options.method = "card";
      options.customer_id = userInfo.rzpCustomerId || "";
      if (resp.offerId) options.offer_id = resp.offerId;
      if (cardData?.cardNumber) {
        if (cardData.save) options.save = cardData.save ? 1 : 0;
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

  const showOrderSuccess = (resp: any) => {
    localStorage.removeItem("isMembershipAdded");

    if (
      !resp.isRated &&
      (resp.orderCount === 1 || resp.orderCount === 3 || resp.orderCount === 5)
    )
      setRatingFormVisibility(true);
    else if (resp.orderCount % 2 === 0 && (!userInfo?.dob || !userInfo?.gender))
      setformModalFormVisibility(true);
    else if (!userInfo.orderFeedback) setOrderFeedbackVisibility(true);
    else {
      setSuccessModalVisibility(true);
    }
    dispatch({ type: "clearCart" });
    sessionStorage.removeItem("checkoutAddressId");
    sessionStorage.removeItem("shipping");
    sessionStorage.removeItem("deliveryData");
    history.push(`${Utils.routes.SHOPPING_BAG}?status=success`);
  };

  const placeOrderOnClick = (payload: any, cardData?: any) => {

    let ProductsArray = data?.items.reduce((i: any, j: any) => {
      i.push({
        id: j.magentoId,
        cartItemId: j.cartItemId,
        name: j.name,
        category: j?.category?.name,
        qty: j.quantity,
        price: j.price,
      });
      return i;
    }, []);

    dispatch(showLoader());
    dispatch(
      placeOrder(payload, (resp: any) => {
        dispatch(hideLoader());

        /**
         * event logger
         */
        if (typeof window && window.gtag !== 'undefined') {
          window.gtag('event', 'Checkout_Successfull', {
            "cartId": payload.cartId,
            "transaction_id": resp.mongoOrderId,
            "quantity": data.totalItems,
            "value": resp.grandTotal,
            "orderCount": resp.orderCount,
            "OrderID": `${resp?.orderId}`,
            "OrderStatus": `${resp?.orderStatus}`,
            "PaymentMethod": `${paymentMode}`,
            'shipping': `${data?.shippingFee}`,
            "CouponCode": coupon?.couponCode ?
              `${coupon?.couponCode}` :
              data.coupons &&
                data.coupons[0] &&
                data.coupons[0].couponCode ?
                data.coupons[0].couponCode : '',
            "IsWalletUsed": data?.walletAmount ? true : false,
            "WalletBalanceUsed": data?.walletAmount,
            "items": ProductsArray,
          });
        }
        
        dispatch(hidePaytmCallbackLoader());
        setOrderId(resp?.orderId || 0);
        setMongoOrderId(resp?.mongoOrderId || 0);
        setPaymentMethodId(resp?.paymentMethodId || 0);
        // dispatch(getUserProfile());
        if (
          resp?.gatewayOrderId &&
          (paymentMode === "netbanking" ||
            paymentMode === "upi" ||
            paymentMode === "card")
        ) {
          const options = getOptions(paymentMode || "", resp, cardData);
          makeRazorpayPayment(options, resp);
        } else {
          sessionStorage.removeItem("paymentDone");
          showOrderSuccess(resp);

          // dispatch(getShoppingBagList({ isPaymentScreen: false }))
        }
      })
    );
  };
  const handleSuccessModalClose = () => {
    dispatch(showLoader());
    dispatch(
      getUserProfile(() => {
        dispatch(hideLoader());
      })
    );
    setSuccessModalVisibility(false);
    // history.push(`/product-listing?categoryId=${menuDataId}`);
    let pathname = Utils.CommonFunctions.seoUrl(menuDataId, "others");
    history.push(pathname);
  };

  const handleRatingModalClose = (thankyouModalVisible: boolean) => {
    if (thankyouModalVisible) setThankYouModalVisibility(true);
    else {
      setThankYouModalVisibility(false);
      setRatingFormVisibility(false);
      setformModalFormVisibility(false);
      setOrderFeedbackVisibility(false);
      dispatch(getUserProfile());
      history.push("/");
    }
  };

  const handleCartSummary = () => {
    // dispatch(showLoader());
    // let payload: any = {
    //   cartId: data._id,
    //   donation: data.donation,
    //   productDiscount: Math.abs(data.productDiscount),
    //   isWhatsAppConsent: data.isWhatsAppConsent,
    //   addressId: checkoutAddressId ?? "",
    //   isOrderWrapped: data.isOrderWrapped,
    //   isPaymentScreen: activeStep === 2 ? true : false,
    // };
    // if (data?.grandTotal >= bankOffer?.minimumOrderAmount)
    //   payload.offerId = bankOffer?._id
    // if (data?.shipping?.shippingType) {
    //   payload.shipping = data?.shipping || {};
    //   payload.shipping.shippingFee =
    //     data?.shipping?.shippingType ===
    //       Utils.constants.shippingType.STANDARD &&
    //       configs?.free_shipping_amount <= data?.grandTotal
    //       ? 0
    //       : parseInt(data?.shipping?.shippingFee ?? 0);
    // }

    // dispatch(
    //   updateCartSummary(payload, () => {
    //     if (activeStep != 3)
    //       setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    //     dispatch(hideLoader());
    //   })
    // );
    const func = () => {
      // if (activeStep != 3)
      //   setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      if (url === "/shopping-bag")
        history.push({
          pathname: "/shopping-bag/address",
          state: {
            pageName: !addressFlag
              ? "Address Book"
              : addressFlag
                ? addressFlag
                : "",
          },
        });
      else if (url === "/shopping-bag/address")
        history.push({
          pathname: "/shopping-bag/delivery",
          state: { pageName: "Choose Delivery Option" },
        });
      else if (url === "/shopping-bag/delivery")
        history.push({
          pathname: "/shopping-bag/payment",
          state: {
            pageName:
              flag !== "retry" && flag !== "convertToCod"
                ? "Select Payment Mode"
                : flag === "retry" || flag === "convertToCod"
                  ? "Retry Payment"
                  : "",
          },
        });
      dispatch(hideLoader());
    };
    handleUpdateCartSummary(
      data,
      checkoutAddressId,
      configs,
      activeStep,
      null,
      0,
      0,
      0,
      "",
      func
    );
  };

  const handleDeliveryCartSummary = (shippingData: any) => {
    // dispatch(showLoader());
    // let payload: any = {
    //   cartId: data._id,
    //   donation: data.donation,
    //   productDiscount: Math.abs(data.productDiscount),
    //   isWhatsAppConsent: data.isWhatsAppConsent,
    //   addressId: checkoutAddressId ?? "",
    //   isOrderWrapped: data.isOrderWrapped,
    //   isPaymentScreen: activeStep === 2 ? true : false,
    // };
    // if (data?.grandTotal >= bankOffer?.minimumOrderAmount)
    //   payload.offerId = bankOffer?._id
    // if (data?.shipping?.shippingType) {
    //   payload.shipping = data?.shipping || {};
    //   payload.shipping.shippingFee =
    //     data?.shipping?.shippingType ===
    //       Utils.constants.shippingType.STANDARD &&
    //       configs?.free_shipping_amount <= data?.grandTotal
    //       ? 0
    //       : parseInt(data?.shipping?.shippingFee ?? 0);
    // }

    // dispatch(
    //   updateCartSummary(payload, () => {
    //     if (activeStep != 3)
    //       setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    //     dispatch(hideLoader());
    //   })
    // );
    const func = () => {
      // if (activeStep != 3)
      //   setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      dispatch(hideLoader());
    };
    data.shipping = shippingData;
    handleUpdateCartSummary(
      data,
      checkoutAddressId,
      configs,
      activeStep,
      null,
      0,
      0,
      0,
      "",
      func
    );
  };
  const handleUpdateCartSummary = (
    data: any,
    checkoutAddressId: any,
    configs: any,
    activeStep: number,
    cardOffer: any,
    walletAmount: any,
    totalAvailablePoints: number,
    pointRate: number,
    flag: string,
    callback?: any
  ) => {
    dispatch(showLoader());
    let payload: any = {
      cartId: data._id,
      donation: data.donation,
      productDiscount: Math.abs(data.productDiscount),
      isWhatsAppConsent: data.isWhatsAppConsent,
      addressId: checkoutAddressId ?? "",
      isOrderWrapped: data.isOrderWrapped,
      isPaymentScreen: activeStep >= 2 ? true : false,
      walletAmount,
      totalAvailablePoints,
      pointRate,
    };
    if (cardOffer && data?.grandTotal >= cardOffer?.minimumOrderAmount) {
      payload.offerId = cardOffer?._id;
    }
    if (data?.shipping?.shippingType && data?.shipping?.shippingFee !== null) {
      payload.shipping = { ...data.shipping } || {};
      // payload.shipping.shippingFee =
      //   data?.shipping?.shippingType ===
      //     Utils.constants.shippingType.STANDARD &&
      //     configs?.free_shipping_amount <= data?.grandTotal
      //     ? 0
      //     : parseInt(data?.shipping?.shippingFee ?? 0);
      // payload.shippingFee =
      //   data?.shipping?.shippingType ===
      //     Utils.constants.shippingType.STANDARD &&
      //     configs?.free_shipping_amount <= data?.grandTotal
      //     ? 0
      //     : parseInt(data?.shipping?.shippingFee ?? 0);
      // payload.shippingType=data?.shipping?.shippingType === Utils.constants.shippingType.STANDARD
      //   ? Utils.constants.shippingType.STANDARD
      //   : Utils.constants.shippingType.EXPRESS
    }

    dispatch(
      updateCartSummary(payload, (resp: any) => {
        console.log("cardData", resp);
        const memberShipAdded = resp?.isMembershipAdded ? 'true' : 'false'
        // localStorage.setItem("isMembershipAdded", 'memberShipAdded')
        if (callback && flag == "paytm") callback(resp?.grandTotal);
        else if (callback) callback(resp);
        else dispatch(hideLoader());
      })
    );
  };
  const handleRemoveCoupon = (couponId: any) => {
    dispatch(removeCoupon({ couponId, cartId: data._id }));
  };

  const onRetry = (bankOfferId?: string) => {
    setPaymentFailedVisibility(false);
    const retryOrCod = flag === "retry" ? 1 : 2;
    let query = `?orderId=${mongoOrderId}&type=${retryOrCod}`;
    if (bankOfferId) query += `&offerId=${bankOfferId}`;
    if (mongoOrderId)
      dispatch(
        getOrderRetryDetails(query, (resp: any) => {
          dispatch({
            type: "getShoppingBagList",
            payload: { ...resp?.data?.data },
          });
          setPaymentMethodId(resp?.data?.data?.paymentMethodId || "");
          if (flag === "retry") {
            const obj = Utils.constants.PAYMENT_METHOD_SOURCE.find(
              (source: any) =>
                source.id === resp?.data?.data?.paymentMethodSource
            );
            setPaymentMode(obj?.type || "");
          } else {
            setPaymentMode("cod");
          }
          dispatch(hideLoader());
        })
      );
  };

  // let grandTotal =
  //   parseInt(data?.cartTotal ?? 0) +
  //   parseInt(data?.giftWrapAmount ?? 0) +
  //   (configs?.free_shipping_amount <= data?.cartTotal && data?.shipping?.shippingType === Utils.constants.shippingType.STANDARD ? 0 : parseInt(data?.shipping?.shippingFee ?? 0)) +
  //   parseInt(data?.donation?.donationAmount ?? 0) -
  //   parseInt(data?.productDiscount ?? 0) -
  //   parseInt(data?.couponDiscount ?? 0) -
  //   parseInt(data?.walletAmount ?? 0)

  // grandTotal = data?.isPointsBlocked ? grandTotal - parseInt(data?.pointDetails?.redeemedPointsValue ?? 0) : grandTotal;

  var totalItems = 0;
  data?.items?.map((item: any) =>
    item.visibility !== 1 ? (totalItems += item.quantity) : totalItems
  );
  totalItems = flag === "retry" || flag === "convertToCod" ? data?.totalItems : data?.isMembershipAdded ? totalItems + 1 : totalItems;

  const handleMobileBack = () => {
    if (addressFlag) dispatch({ type: "addressFlag", payload: null });
    else if (activeStep === 0) {
      history.push("/");
    } else handleBack();
  };

  const deliveryFee = data?.shipping?.shippingFee == "0" ||
    data?.shipping?.shippingFee == 0 ||
    !data?.shipping?.shippingFee
    ? Utils.CommonFunctions.addCommaToAmount(
      deliveryData?.normalShippingCharge
    ) || 0
    : Utils.CommonFunctions.addCommaToAmount(
      data?.shipping?.shippingFee
    ) || 0;
  const DeliveryFee = <>
    {data?.shipping?.shippingType && (activeStep === 3 || activeStep === 2) ? (
      deliveryFee ?
        <div className={classes.reuseDiv}>
          <Typography className={classes.reuseHeading}>
            Delivery Fee
          </Typography>
          <Typography
            className={clsx({
              [classes.reuseHeading]: true,
              [classes.strike]:
                data?.shipping?.shippingFee == "0" ||
                data?.shipping?.shippingFee == 0 ||
                !data?.shipping?.shippingFee,
            })}
          >{`₹ ${deliveryFee}`}</Typography>
        </div> : ""
    ) : (
      ""
    )}</>

  const DonateFeedingFoundation = <>
    {activeStep === 0 ? (
      <div
        className={clsx(
          classes.reuseDiv,
          classes.donateDiv
        )}
      >
        <>
          <div>
            <Typography
              className={classes.reuseHeading}
            >
              Donate ₹{" "}
              {Utils.CommonFunctions.addCommaToAmount(
                configs?.donation_amount
              ) ?? "0"}
            </Typography>
            <Typography
              className={classes.productWeight}
            >
              Feeding India Foundation
            </Typography>
          </div>
          <CustomCheckbox
            checked={
              data?.donation?.donationAmount
                ? true
                : false
            }
            onChange={(e: any) =>
              handleDonationChange(e)
            }
          />
        </>
      </div>
    ) : data?.donation?.donationAmount ? (
      <div
        className={clsx(
          classes.reuseDiv,
          classes.donateDiv
        )}
      >
        <div>
          <Typography
            className={classes.reuseHeading}
          >
            Donate
          </Typography>
          <Typography
            className={classes.productWeight}
          >
            Feeding India Foundation
          </Typography>
        </div>

        <Typography
          className={classes.reuseHeading}
        >
          ₹{" "}
          {Utils.CommonFunctions.addCommaToAmount(
            data?.donation?.donationAmount
          ) ?? "0"}
        </Typography>
      </div>
    ) : null}
  </>

  const WhatsappConsent = <>
    {activeStep === 0 && isAuthenticated() && (
      <div className={classes.chooseContainer}>
        {/* {activeStep === 0 && ( */}
        <div className={classes.chooseBox}>
          <CustomCheckbox
            checked={data?.isWhatsAppConsent}
            onChange={(e: any) =>
              handleConsentChange(e)
            }
          />
          <Typography
            variant="body1"
            className={classes.chooseLabel}
          >
            I would like to receive order update
            on Whatsapp
          </Typography>
          <img src={Utils.images.WHATSAPP} />
        </div>
      </div>
    )}
  </>

  const GiftWrap = <>
    {data?.isOrderWrapped &&
      reuseAmount(
        "Gift Wrap",
        Number(data?.giftWrapAmount)
          ? `₹ ${Utils.CommonFunctions.addCommaToAmount(
            data?.giftWrapAmount
          )}`
          : "Free"
      )}</>


  const Coupon = <>

    {coupon ? (
      <div className={classes.reuseDiv}>
        <div>
          <Typography
            className={classes.reuseHeading}
          >
            Coupon Discount
            <ErrorOutlineOutlinedIcon
              fontSize="small"
              className={classes.discountIcon}
              onClick={() => {
                setCouponInfo(true);
              }}
            />
          </Typography>
          <Typography color="primary">
            {coupon?.couponCode}
          </Typography>
        </div>
        <div className={classes.removeCoupon}>
          <Typography
            className={classes.view}
          >
            {/* - ₹ {data.coupons?.[0]?.discount} */}
            - ₹{" "}
            {Utils.CommonFunctions.addCommaToAmount(
              data?.couponDiscount
            ) || 0}
          </Typography>
          {activeStep === 0 && (
            <Button
              onClick={() =>
                handleRemoveCoupon(
                  coupon?.couponId
                )
              }
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    ) : (
      <>
        {activeStep === 0 && (
          <div className={classes.reuseDiv}>
            <Typography
              className={classes.reuseHeading}
            >
              Coupon Discount
            </Typography>
            <Link
              to={`${Utils.routes.COUPON_LISTING}?couponIds=${data?.availableCoupons}`}
            >
              <Typography
                className={classes.apply}
              >
                APPLY
              </Typography>
            </Link>
          </div>
        )}
      </>
    )}</>
  return (
    <>
      <Helmet>
        <title>Shopping Bag| The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {
        <MessageDialogue
          cancelText={"Cancel"}
          okText={"Okay"}
          open={loginAlert}
          handleClose={() => showLoginAlert(!loginAlert)}
          onOk={() => {
            history.push(
              `${Utils.routes.LOGIN_OTP}?redirectTo=${Utils.routes.SHOPPING_BAG}`
            );
          }}
          message={"Please login to proceed"}
          heading={"The Body Shop"}
          headingClass={classes.messageHeading}
        />
      }
      <Hidden smUp>
        <div className={classes.mobileRoot}>
          <div className={classes.mobileHeaderContainer}>
            <span
              onClick={() => {
                handleMobileBack();
              }}
            >
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
            {activeStep === 0 && (
              <Typography className={classes.mobileText}> My Bag</Typography>
            )}

            {activeStep === 1 && !addressFlag && (
              <Typography className={classes.mobileText}>
                {" "}
                Address Book
              </Typography>
            )}

            {activeStep === 1 && addressFlag && (
              <Typography className={classes.mobileText}>
                {" "}
                {addressFlag}
              </Typography>
            )}
            {activeStep === 2 && (
              <Typography className={classes.mobileText}>
                {" "}
                Choose Delivery Option
              </Typography>
            )}
            {activeStep === 3 && flag !== "retry" && flag !== "convertToCod" ? (
              <Typography className={classes.mobileText}>
                {" "}
                Select Payment Mode
              </Typography>
            ) : (flag === "retry" || flag === "convertToCod") &&
              activeStep === 3 ? (
              <Typography className={classes.mobileText}>
                {" "}
                Retry Payment
              </Typography>
            ) : null}
          </div>
        </div>
      </Hidden>
      <div className={classes.shoppingBagsRoot}>
        <div className={classes.maxWidthDiv}>
          {data ? (
            <>
              {data?.items?.length >= 0 ? (
                <Grid container spacing={isSmall ? 0 : 3}>
                  <Hidden xsDown>
                    <Grid item xs={12} md={12}>
                      {/* <Typography className={classes.breadcrumb}>{`Home / ${getPageName()}`}</Typography> */}
                      <div className={classes.breadcrumb}>
                        <BreadCrumb
                          breadcrumb={[
                            { title: "Home", action: "/" },
                            { title: getPageName(), action: "/shopping-bag" },
                          ]}
                        />
                      </div>
                    </Grid>
                  </Hidden>
                  <Grid container spacing={isSmall ? 0 : 3}>
                    <Grid item xs={12} md={8}>
                      <div className={classes.shoppingDiv}>
                        <div className={classes.stepperDiv}>
                          {skeletonLoader ? (
                            <Skeleton height={30} />
                          ) : (
                            <>
                              <Hidden xsDown>
                                <Stepper
                                  activeStep={activeStep}
                                  alternativeLabel
                                  className={classes.stepper}
                                  connector={<Connector />}
                                >
                                  {[
                                    "Bag",
                                    "Address",
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
                              </Hidden>
                              <Hidden smUp>
                                <Stepper
                                  activeStep={activeStep}
                                  alternativeLabel
                                  className={clsx(
                                    activeStep !== 0 && !addressFlag
                                      ? classes.stepper
                                      : classes.secondStepper
                                  )}
                                  connector={<Connector />}
                                >
                                  {[
                                    "Bag",
                                    "Address",
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
                              </Hidden>
                            </>
                          )}
                        </div>

                        <div>{getStepContent(activeStep)}</div>
                      </div>
                      {activeStep === 0 && (
                        <>
                          <FreeSample />
                          <Hidden smUp>
                            <Recommended />
                          </Hidden>
                        </>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      className={classes.secondContainer}
                    >
                      <div className={classes.paymentDiv}>
                        {skeletonLoader ? (
                          <PaymentDetailsSkeleton />
                        ) : (
                          <>
                            <Hidden xsDown>
                              <div className={classes.paymentDetails}>
                                <Typography className={classes.paymentHeading}>
                                  Payment Details
                                </Typography>
                                <>
                                  {reuseAmount(
                                    `Bag total (${totalItems} ${totalItems === 1 ? "item" : "items"
                                    })`,
                                    `₹ ${Utils.CommonFunctions.addCommaToAmount(
                                      data?.cartTotal
                                    ) || 0
                                    }`
                                  )}
                                  {data?.productDiscount
                                    ? reuseAmount(
                                      "Product discount",
                                      `- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                        data?.productDiscount
                                      ) ?? 0
                                      }`
                                    )
                                    : null}

                                  {Coupon}

                                  {data?.cardDiscount ? (
                                    <div className={classes.reuseDiv}>
                                      <Typography
                                        className={classes.reuseHeading}
                                      >
                                        Bank Discount
                                      </Typography>
                                      <Typography
                                        className={classes.reuseHeading}
                                      >
                                        {`- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                          data?.cardDiscount
                                        )}`}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {DeliveryFee}

                                  {DonateFeedingFoundation}
                                </>
                                {/* {reuseAmount("Sub total", `₹ ${data.grandTotal}`)} */}
                                {GiftWrap}
                                {data?.walletAmount ? (
                                  <div className={classes.reuseDiv}>
                                    <Typography
                                      className={classes.reuseHeading}
                                    >
                                      Wallet
                                    </Typography>
                                    <Typography
                                      className={classes.reuseHeading}
                                    >
                                      ₹{" "}
                                      {Utils.CommonFunctions.addCommaToAmount(
                                        data?.walletAmount
                                      )}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {data?.isPointsBlocked &&
                                  data?.pointDetails?.redeemedPointsValue ? (
                                  <div className={classes.reuseDiv}>
                                    <Typography
                                      className={classes.reuseHeading}
                                    >
                                      Rewards
                                    </Typography>
                                    <Typography
                                      className={classes.reuseHeading}
                                    >
                                      ₹{" "}
                                      {Utils.CommonFunctions.addCommaToAmount(
                                        data?.pointDetails?.redeemedPointsValue
                                      )}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className={classes.grandTotalDiv}>
                                  <Typography className={classes.grandTotal}>
                                    Grand total
                                  </Typography>
                                  <Typography className={classes.grandTotal}>
                                    ₹{" "}
                                    {data?.cardDiscount
                                      ? Utils.CommonFunctions.addCommaToAmount(
                                        grandTotal - Number(data.cardDiscount)
                                      )
                                      : Utils.CommonFunctions.addCommaToAmount(
                                        grandTotal
                                      )}
                                  </Typography>
                                </div>
                                <Hidden smUp>
                                  {WhatsappConsent}
                                </Hidden>
                              </div>

                              {WhatsappConsent}
                            </Hidden>

                            <Hidden xsDown>
                              {activeStep === 0 ? (
                                <>
                                  <div>
                                    <CustomButton
                                      fullWidth
                                      type="submit"
                                      text={
                                        // data?.isMembershipAdded ||
                                        //   userInfo?.tierType === 1 ?
                                        `Pay ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                          data?.grandTotal
                                        )}`
                                        // : `No, I will Pay ₹ ${Utils.CommonFunctions.addCommaToAmount(data?.grandTotal)} `
                                      }
                                      variant="contained"
                                      onClick={handleNext}
                                      disabled={
                                        invalidSample || itemNotInStock
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                  <div className={classes.fixedBtnDiv}>
                                    {!data?.isMembershipAdded &&
                                      userInfo.tierType === 2 ? (
                                      <div>
                                        <CustomButton
                                          fullWidth
                                          type="button"
                                          text={"Upgrade to Platinum Member"}
                                          onClick={() => {
                                            if (isAuthenticated())
                                              history.push({
                                                pathname:
                                                  Utils.routes.CHOOSE_PLAN,
                                                state: {
                                                  pageName: "Choose Plan",
                                                },
                                              });
                                            else showLoginAlert(true);
                                          }}
                                          variant="outlined"
                                        />
                                      </div>
                                    ) : !data?.isMembershipAdded &&
                                      userInfo.tierType !== 1 ? (
                                      <div>
                                        <CustomButton
                                          fullWidth
                                          type="button"
                                          // text={userInfo.tierType===2?"Upgrade to Platinum Member":"Become a Member and Pay"}
                                          text={
                                            "Become a Member and Earn Extra"
                                          }
                                          onClick={() => {
                                            if (isAuthenticated())
                                              history.push({
                                                pathname:
                                                  Utils.routes.CHOOSE_PLAN,
                                                state: {
                                                  pageName: "Choose Plan",
                                                },
                                              });
                                            else showLoginAlert(true);
                                          }}
                                          variant="outlined"
                                        />
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                  </div>
                                </>
                              ) : (
                                <div className={classes.btnDiv}>
                                  <Button
                                    color="primary"
                                    variant="outlined"
                                    className={classes.saveBagBtn}
                                    onClick={handleBack}
                                  >
                                    Back
                                  </Button>
                                  {activeStep === 3 ? (
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      className={classes.checkOutBtn}
                                      onClick={onSubmit}
                                      disabled={
                                        grandTotal === 0 ? false : proceedToPay
                                        //  flag === "retry" && paymentMode !== "cod" ? false : proceedToPay
                                      }
                                    >
                                      {paymentMode !== "cod"
                                        ? btnText
                                        : "Place Order"}
                                    </Button>
                                  ) : (
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      className={classes.checkOutBtn}
                                      onClick={handleNext}
                                      disabled={nextBtnDisabled}
                                    >
                                      Next
                                    </Button>
                                  )}
                                </div>
                              )}
                            </Hidden>
                            <Hidden smUp>
                              {activeStep === 0 && (
                                <>
                                  <div className={classes.paymentDetails}>
                                    <Typography
                                      className={classes.paymentHeading}
                                    >
                                      Payment Details
                                    </Typography>
                                    <>
                                      {reuseAmount(
                                        `Bag total (${totalItems} ${totalItems === 1 ? "item" : "items"
                                        })`,
                                        `₹ ${Utils.CommonFunctions.addCommaToAmount(
                                          data?.cartTotal
                                        ) || 0
                                        }`
                                      )}
                                      {data?.productDiscount
                                        ? reuseAmount(
                                          "Product discount",
                                          `- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                            data?.productDiscount
                                          ) ?? 0
                                          }`
                                        )
                                        : null}
                                      {Coupon}

                                      {data?.cardDiscount ? (
                                        <div className={classes.reuseDiv}>
                                          <Typography
                                            className={classes.reuseHeading}
                                          >
                                            Bank Discount
                                          </Typography>
                                          <Typography
                                            className={classes.reuseHeading}
                                          >
                                            {`- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                              data?.cardDiscount
                                            )}`}
                                          </Typography>
                                        </div>
                                      ) : (
                                        ""
                                      )}

                                      {DeliveryFee}
                                      {DonateFeedingFoundation}
                                    </>
                                    {/* {reuseAmount("Sub total", `₹ ${data.grandTotal}`)} */}
                                    {GiftWrap}

                                    {data?.walletAmount ? (
                                      <div className={classes.reuseDiv}>
                                        <Typography
                                          className={classes.reuseHeading}
                                        >
                                          Wallet
                                        </Typography>
                                        <Typography
                                          className={classes.reuseHeading}
                                        >
                                          ₹{" "}
                                          {Utils.CommonFunctions.addCommaToAmount(
                                            data?.walletAmount
                                          )}
                                        </Typography>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {data?.isPointsBlocked &&
                                      data?.pointDetails?.redeemedPointsValue ? (
                                      <div className={classes.reuseDiv}>
                                        <Typography
                                          className={classes.reuseHeading}
                                        >
                                          Rewards
                                        </Typography>
                                        <Typography
                                          className={classes.reuseHeading}
                                        >
                                          ₹{" "}
                                          {Utils.CommonFunctions.addCommaToAmount(
                                            data?.pointDetails
                                              ?.redeemedPointsValue
                                          )}
                                        </Typography>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <div className={classes.grandTotalDiv}>
                                      <Typography
                                        className={classes.grandTotal}
                                      >
                                        Grand total
                                      </Typography>
                                      <Typography
                                        className={classes.grandTotal}
                                      >
                                        ₹{" "}
                                        {data?.cardDiscount
                                          ? Utils.CommonFunctions.addCommaToAmount(
                                            grandTotal -
                                            Number(data.cardDiscount)
                                          )
                                          : Utils.CommonFunctions.addCommaToAmount(
                                            grandTotal
                                          )}
                                      </Typography>
                                    </div>
                                    <Hidden smUp>
                                      {activeStep === 0 && isAuthenticated() && (
                                        <div
                                          className={classes.chooseContainer}
                                        >
                                          <div
                                            className={classes.chooseBoxContent}
                                          >
                                            <div className={classes.chooseBox}>
                                              <CustomCheckbox
                                                checked={
                                                  data?.isWhatsAppConsent
                                                }
                                                onChange={(e: any) =>
                                                  handleConsentChange(e)
                                                }
                                              />
                                              <Typography
                                                variant="body1"
                                                className={classes.chooseLabel}
                                              >
                                                I would like to receive order
                                                update on Whatsapp
                                              </Typography>
                                            </div>
                                            <img
                                              className={classes.whatsappImage}
                                              src={Utils.images.WHATSAPP}
                                            />
                                          </div>

                                          {/* <Typography
                                variant="h4"
                                className={classes.chooseHeading}
                               >
                                Lorem Ipsum Twik
                               </Typography>
                               <Typography
                                variant="body2"
                                className={classes.chooseSubHeading}
                               >
                                Loren IPsum Loren IPsum Loren IPsum Loren IPsum
                                vLoren IPsum Loren IPsum{" "}
                               </Typography> */}
                                        </div>
                                      )}
                                    </Hidden>
                                  </div>
                                  <div className={classes.fixedBtnDiv}>
                                    <div>
                                      <CustomButton
                                        fullWidth
                                        type="submit"
                                        text={
                                          // data?.isMembershipAdded ||
                                          //   userInfo?.tierType === 1 ?
                                          `Pay ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                            data?.grandTotal
                                          )}`
                                          // : `No, I will Pay ₹ ${Utils.CommonFunctions.addCommaToAmount(data?.grandTotal)} `
                                        }
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={
                                          invalidSample || itemNotInStock
                                            ? true
                                            : false
                                        }
                                      />
                                    </div>
                                    {!data?.isMembershipAdded &&
                                      userInfo.tierType === 2 ? (
                                      <div>
                                        <CustomButton
                                          fullWidth
                                          type="button"
                                          // text={userInfo.tierType===2?"Upgrade to Platinum Member":"Become a Member and Pay"}
                                          text={"Upgrade to Platinum Member"}
                                          onClick={() => {
                                            if (isAuthenticated())
                                              history.push({
                                                pathname:
                                                  Utils.routes.CHOOSE_PLAN,
                                                state: {
                                                  pageName: "Choose Plan",
                                                },
                                              });
                                            else showLoginAlert(true);
                                          }}
                                          variant="outlined"
                                        />
                                      </div>
                                    ) : !data?.isMembershipAdded &&
                                      userInfo.tierType !== 1 ? (
                                      <div>
                                        <CustomButton
                                          fullWidth
                                          type="button"
                                          text={
                                            "Become a Member and Earn Extra"
                                          }
                                          onClick={() => {
                                            if (isAuthenticated())
                                              history.push({
                                                pathname:
                                                  Utils.routes.CHOOSE_PLAN,
                                                state: {
                                                  pageName: "Choose Plan",
                                                },
                                              });
                                            else showLoginAlert(true);
                                          }}
                                          variant="outlined"
                                        />
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </>
                              )}
                              {activeStep !== 0 && !addressFlag && (
                                <div
                                  className={clsx(
                                    activeStep !== 2
                                      ? classes.secondDiv
                                      : classes.proceedBtn
                                  )}
                                >
                                  {(activeStep === 1 || activeStep === 3) && (
                                    <div
                                      className={classes.mobileGrandTotalDiv}
                                    >
                                      <Typography
                                        className={classes.grandTotal}
                                      >
                                        ₹{" "}
                                        {data?.cardDiscount
                                          ? Utils.CommonFunctions.addCommaToAmount(
                                            grandTotal -
                                            Number(data.cardDiscount)
                                          )
                                          : Utils.CommonFunctions.addCommaToAmount(
                                            grandTotal
                                          )}
                                      </Typography>
                                      <Typography
                                        className={classes.grandHeading}
                                        onClick={(e: any) => handleChange(e)}
                                      >
                                        View Details
                                      </Typography>
                                    </div>
                                  )}
                                  {/* Mobile pwa */}

                                  <div className={classes.btnDiv}>
                                    {activeStep === 3 ? (
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        className={classes.checkOutBtn}
                                        onClick={onSubmit}
                                        disabled={
                                          grandTotal === 0
                                            ? false
                                            : proceedToPay
                                          //  flag === "retry" && paymentMode !== "cod" ? false : proceedToPay
                                        }
                                      >
                                        {paymentMode !== "cod"
                                          ? btnText
                                          : "Place Order"}
                                      </Button>
                                    ) : (
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        className={classes.checkOutBtn}
                                        onClick={handleNext}
                                        disabled={nextBtnDisabled}
                                      >
                                        Next
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Hidden>
                          </>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <Drawer
                      disableEnforceFocus
                      anchor="bottom"
                      open={showPaymentSummary}
                      onClose={(e: any) => handleClose(e)}
                      className={classes.drawer}
                    >
                      <div className={classes.mobilePaymentDetails}>
                        <Typography className={classes.mobilePaymentHeading}>
                          Payment Details
                        </Typography>
                        <>
                          {reuseAmount(
                            `Bag total (${totalItems} ${totalItems === 1 ? "item" : "items"
                            })`,
                            `₹ ${Utils.CommonFunctions.addCommaToAmount(
                              data?.cartTotal
                            ) || 0
                            }`
                          )}
                          {data?.productDiscount
                            ? reuseAmount(
                              "Product discount",
                              `- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                data?.productDiscount
                              ) ?? 0
                              }`
                            )
                            : null}

                          {Coupon}

                          {data?.cardDiscount ? (
                            <div className={classes.reuseDiv}>
                              <Typography className={classes.reuseHeading}>
                                Bank Discount
                              </Typography>
                              <Typography className={classes.reuseHeading}>
                                {`- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                                  data?.cardDiscount
                                )}`}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}



                          {DeliveryFee}
                          {DonateFeedingFoundation}
                        </>
                        {/* {reuseAmount("Sub total", `₹ ${data.grandTotal}`)} */}
                        {GiftWrap}

                        {data?.walletAmount ? (
                          <div className={classes.reuseDiv}>
                            <Typography className={classes.reuseHeading}>
                              Wallet
                            </Typography>
                            <Typography className={classes.reuseHeading}>
                              ₹{" "}
                              {Utils.CommonFunctions.addCommaToAmount(
                                data?.walletAmount
                              )}
                            </Typography>
                          </div>
                        ) : (
                          ""
                        )}
                        {data?.isPointsBlocked &&
                          data?.pointDetails?.redeemedPointsValue ? (
                          <div className={classes.reuseDiv}>
                            <Typography className={classes.reuseHeading}>
                              Rewards
                            </Typography>
                            <Typography className={classes.reuseHeading}>
                              ₹{" "}
                              {Utils.CommonFunctions.addCommaToAmount(
                                data?.pointDetails?.redeemedPointsValue
                              )}
                            </Typography>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className={classes.grandTotalDiv2}>
                          <Typography className={classes.grandTotal}>
                            Grand total
                          </Typography>
                          <Typography className={classes.grandTotal}>
                            ₹{" "}
                            {data?.cardDiscount
                              ? Utils.CommonFunctions.addCommaToAmount(
                                grandTotal - Number(data.cardDiscount)
                              )
                              : Utils.CommonFunctions.addCommaToAmount(
                                grandTotal
                              )}
                          </Typography>
                        </div>
                        <Hidden smUp>
                          {WhatsappConsent}
                        </Hidden>
                      </div>
                    </Drawer>
                  </div>
                  <Hidden xsDown>
                    {activeStep === 0 && (
                      <Grid item xs={12}>
                        <Recommended />
                      </Grid>
                    )}
                  </Hidden>
                </Grid>
              ) : !flag ? (
                <>
                  <NotFound message={"Dasdadas"} type="shoppingBag" />
                  {/* <div className={classes.noItemContent}>
                  <Typography className={clsx(classes.heading)}>
                    Shopping Bag
                  </Typography>
                  <Typography className={classes.subHeading}>(O Items)</Typography>
                </div>
                <Paper className={classes.noItemsCard}>
                  <Typography> No Items in Cart </Typography>
                </Paper> */}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" width={500} height={118} />
            </>
          )}

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
          <SuccessModal
            displayDivider={false}
            title={`Thank You for Rating Us`}
            description={
              <Typography className={classes.description}>
                We appreciate your feedback
              </Typography>
            }
            buttonText="OK"
            open={thankYouModalVisibility}
            handleClose={() => {
              setThankYouModalVisibility(false);
              dispatch(getUserProfile());
              history.push("/");
            }}
          />
          <ThankYouModal
            formSectionVisibility={formModalFormVisibility}
            ratingSectionVisibility={ratingFormVisibility}
            dobMissing={userInfo?.dob ? false : true}
            genderMissing={userInfo?.gender ? false : true}
            // orderFeedbackMissing={userInfo?.orderFeedback ? false : true}
            orderFeedbackMissing={orderFeedbackVisibility}
            title={
              ratingFormVisibility
                ? `Thank You For Placing Your Order !!`
                : `Thank You!!`
            }
            description={
              ratingFormVisibility ? (
                <Typography className={classes.description}>
                  Your Order{" "}
                  {orderId ? (
                    <span className={classes.bold}>{orderId}</span>
                  ) : (
                    ""
                  )}{" "}
                  has been successfully placed with us
                </Typography>
              ) : (
                "We would love to know more about you!"
              )
            }
            buttonText="Submit"
            open={
              formModalFormVisibility ||
              ratingFormVisibility ||
              orderFeedbackVisibility
            }
            handleClose={(e: boolean) => handleRatingModalClose(e)}
          />
        </div>
        <MessageDialog
          open={sampleInfo}
          handleClose={() => setSampleInfo(false)}
          onOk={() => {
            setSampleInfo(false);
          }}
          okText="Ok"
          message={`Kindly remove ${invalidSample} free sample(s) from the cart to proceed ahead.`}
          cancelText={""}
        />
        <MessageDialog
          open={showAlert}
          handleClose={() => setShowAlert(false)}
          onOk={() => {
            setShowAlert(false);
          }}
          okText="Ok"
          message={alertText}
          cancelText={""}
        />

        <MessageDialog
          closePopUp={true}
          onClosePopUp={() => {
            history.push("/");
            dispatch({ type: "clearCart" });
            sessionStorage.removeItem("checkoutAddressId");
            sessionStorage.removeItem("shipping");
            sessionStorage.removeItem("deliveryData");
            localStorage.removeItem("isMembershipAdded");

          }}
          open={paymentFailedVisibility}
          icon={Utils.images.ORDER_FAILED}
          handleClose={() => {
            if (paymentFailedVisibility) {
              history.push({
                pathname: "/shopping-bag/payment",
                search: "?activeStep=3",
                state: { flag: "convertToCod", mongoOrderId, paymentMethodId },
              });
              // setActiveStep(3);
              setFlag("convertToCod");
              setPaymentFailedVisibility(false);
            }
            

          }}
          onOk={() => {
            if (paymentFailedVisibility) {
              setPaymentFailedVisibility(false);
              history.push({
                pathname: "/shopping-bag/payment",
                search: "?activeStep=3",
                state: { flag: "retry", mongoOrderId, paymentMethodId },
              });
              // setActiveStep(3);
              setFlag("retry");
            }

          }}
          okText="Retry"
          headingClass={classes.messageHeading}
          heading={"Payment Failed"}
          message={
            <Typography className={classes.description}>
              Uh-oh! we were unable to process your payment{" "}
              {orderId ? <span className={classes.bold}>{orderId}</span> : null}
            </Typography>
          }
          cancelText={"Convert To COD"}
        />
        <MessageDialog
          closePopUp={true}
          onClosePopUp={() => {
            history.push("/");
            dispatch({ type: "clearCart" });
            sessionStorage.removeItem("checkoutAddressId");
            sessionStorage.removeItem("shipping");
            sessionStorage.removeItem("deliveryData");
          }}
          open={paymentPendingVisibility}
          icon={Utils.images.ORDER_PENDING}
          handleClose={() => {
            history.push("/");
          }}
          onOk={() => {
            setPaymentPendingVisibility(false);
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
        <CustomModal
          open={couponInfo}
          handleClose={() => {
            setCouponInfo(false);
          }}
        >
          <Typography variant="h3" className={classes.couponHeading}>
            Coupon Discount
          </Typography>
          <Typography variant="body1" className={classes.couponTitle}>
            {coupon?.couponCode}
          </Typography>
          {/* <Typography variant="h6" className={classes.couponSaving}>
          {" "}
          Save ₹1299
        </Typography> */}
          <Typography variant="body2" className={classes.couponDescription}>
            {coupon?.shortDesc}
          </Typography>
          <Typography variant="h6" className={classes.couponPara}>
            Expires On:
            {coupon?.expiryDate !== ""
              ? Utils.CommonFunctions.formatDate(
                parseInt(coupon?.expiryDate),
                "DD MMMM YYYY"
              )
              : "-"}
          </Typography>
          <Divider light className={classes.divider} />
        </CustomModal>
      </div>
    </>
  );
};

export default CustomStepper;
