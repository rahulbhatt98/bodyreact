import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Button,
  Typography,
  Hidden,
  Drawer,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ReducersModal } from "../../../../models";
import Utils from "../../../../utils";
import PaymentOptions from "../../../payment";
import PaymentDetailsSkeleton from "../../../../components/common/skeletonList/paymentDetailsSkeleton";
import { updateTier, getGatewayOrderId } from "../action";
import { addMoneyToWallet } from "../../../payment/otherOptions/paytm/action";
import {
  hideLoader,
  showLoader,
  showPaytmCallbackLoader,
  hidePaytmCallbackLoader,
} from "../../../home/actions";
import { makePayment } from "../../../payment/razorpay";
import format from "date-fns/format";
import SuccessModal from "../../../../components/common/successModal";
import ThankYouModal from "../../../shoppingBags/thankYouModal";
import { getUserProfile } from "../../profile/action";
import MessageDialog from "../../../../components/common/messageDialog";
import { updateProfile, updateTier as eventUpdateTier } from "../../../../utils/event/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentRoot: {
      // padding: theme.spacing(0, 2),
      [theme.breakpoints.down("xs")]: {
        // padding: theme.spacing(0, 0),
        padding: theme.spacing(0, 2),
      },
    },
    description: {
      font: `normal 500 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#333333",
      textAlign: "center",
      // display:"flex"
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
    maxWidthDiv: {
      maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
    },
    gridContainer: {
      margin: theme.spacing(2.5, 0),
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    secondContainer: {
      top: "25%",
      position: "sticky",
      [theme.breakpoints.down("sm")]: {
        position: "static",
        top: "auto",
      },
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
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(0),
      },
    },
    paymentHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      marginBottom: theme.spacing(2),
      fontWeight: 700,
      [theme.breakpoints.down("xs")]: {
        background: "#F8F8F8",
        color: "black",
        margin: theme.spacing(0.5, -1.5, 0, -1.5),
        padding: theme.spacing(1.2),
      },
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0),
      }
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        background: "#F8F8F8",
        color: "black",
        margin: theme.spacing(0.5, -1.5, 0, -1.5),
        padding: theme.spacing(1.2),
      },

    },
    grandTotalDiv2: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "baseline",
      }
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
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
        marginTop: theme.spacing(0),
      },
    },
    checkOutBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    saveBagBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    view: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "18px",
      color: "var(--secondary-black)",
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
    btnContainer: {
      [theme.breakpoints.down("xs")]: {
        position: "fixed",
        bottom: "0",
        width: "100%",
        padding: theme.spacing(2),
        background: "white",
        left: 0,
        right: 0,
      },
    },
    drawer: {
      "& .MuiDrawer-paperAnchorBottom": {
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
      },
    },
  })
);

const Payment: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();

  let query = Utils.CommonFunctions.useQuery();
  let status = query.get("status");
  const membership =
    location?.state?.selectedTier ??
    JSON.parse(sessionStorage.getItem("membership") ?? "{}");
  const [ratingFormVisibility, setRatingFormVisibility] = useState(false);
  const [formModalFormVisibility, setformModalFormVisibility] = useState(false);
  const [thankYouModalVisibility, setThankYouModalVisibility] = useState(false);
  const [paymentFailedVisibility, setPaymentFailedVisibility] = useState(false);
  const [paymentPendingVisibility, setPaymentPendingVisibility] =
    useState(false);
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const userInfo: any =
    useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) ||
    {};

  useEffect(() => {
    if (!membership && !status) {
      history.push({
        pathname: Utils.CommonFunctions.replaceUrlParams(Utils.routes.LYBC, {
          ":slug": "dashboard",
        }),
      });
    } else {
      sessionStorage.setItem("membership", JSON.stringify(membership));
    }

    dispatch(hideLoader());
    if (status) {
      dispatch(showPaytmCallbackLoader());
      let paymentDone = sessionStorage.getItem("paymentDone");
      if (
        paymentDone === null &&
        (status === Utils.constants.PAYTM_STATUS.SUCCESS ||
          status === Utils.constants.PAYTM_STATUS.PENDING)
      ) {
        sessionStorage.setItem("paymentDone", "true");
        const payload: any = JSON.parse(
          sessionStorage.getItem("payload") ?? "{}"
        );
        payload.gatewayOrderId = `PAYTM_${Date.now()}`;
        updateTierHandler(payload);
      }
    }
    return () => {
      dispatch({
        type: "updateCart",
        payload: {
          grandTotal: 0,
        },
      });
    }

    window.scrollTo(0, 0);
  }, []);

  const [paymentMethodId, setPaymentMethodId] = useState("0");
  const [paymentMode, setPaymentMode] = useState<any>("");
  const [proceedToPay, setProceedToPay] = useState(true);
  const [btnText, setBtnText] = useState("Proceed To Pay");
  const [vpa, setVpa] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>({});
  const [flag, setFlag] = useState(location?.state?.flag ?? "");
  const [bank, setBank] = useState<any>({});
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const paytm = useSelector((state: ReducersModal) => {
    return state.paymentReducer.paytm;
  });

  const handleRatingModalClose = (thankyouModalVisible: boolean) => {
    if (thankyouModalVisible) setThankYouModalVisibility(true);
    else {
      setThankYouModalVisibility(false);
      setRatingFormVisibility(false);
      setformModalFormVisibility(false);
      dispatch(getUserProfile());
      history.push("/");
    }
  };

  const handleChange = (event: any) => {
    setShowPaymentSummary(true);
  };
  const handleClose = (event: any) => {
    setShowPaymentSummary(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisibility(false);
    history.push({
      pathname: Utils.CommonFunctions.replaceUrlParams(Utils.routes.LYBC, {
        ":slug": "dashboard",
      }),
    });
  };

  const getOptions = (mode: string, resp: any, cardData?: any) => {
    const options: any = {
      amount: membership?.price * 100, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
      currency: "INR", // Default is INR. We support more than 90 currencies.
      order_id: resp.gatewayOrderId, // Replace with Order ID generated in Step 4
      contact: userInfo.mobileNo,
      email: userInfo.email,
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
    if (
      !resp.isRated &&
      (resp.orderCount === 1 || resp.orderCount === 3 || resp.orderCount === 5)
    )
      setRatingFormVisibility(true);
    else if (resp.orderCount % 2 === 0 && (!userInfo?.dob || !userInfo?.gender))
      setformModalFormVisibility(true);
    else {
      setSuccessModalVisibility(true);
    }
  };

  const onSubmit = (values?: any) => {
    dispatch(showLoader());
    const payload: any = {
      tierType: membership?.tierType,
      paymentMethodSource: 0,
      paymentMethodId: paymentMethodId,
      productId: membership?.productId,
      // "gatewayOrderId": `order_${Date.now()}`
    };

    if (paymentMode === "paytm") {
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.PAYTM;
      if (paytm?.amount < membership?.price) {
        sessionStorage.removeItem("paymentDone");
        sessionStorage.setItem("paytmPaytment", "normal");
        sessionStorage.setItem("payload", JSON.stringify(payload));

        addMoneyToWallet({
          amount: Utils.CommonFunctions.decimalFlat(
            membership?.price - paytm?.amount,
            2
          ).toString(),
          section: "membership",
        });
        return;
      } else {
        payload.gatewayOrderId = `PAYTM_${Date.now()}`;
      }
    } else if (paymentMode === "upi") {
      payload.paymentMethodId = "";
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.RAZORPAY_UPI;
    } else if (paymentMode === "netbanking") {
      payload.paymentMethodId = bank.bankCode;
      payload.paymentMethodSource =
        Utils.constants.PAYMENT_METHOD.RAZORPAY_NET_BANKING;

    } else if (paymentMode === "card") {
      // payload.paymentMethodId = values?.cardNumber ? values?.cardNumber : paymentMethodId //pass card id
      payload.paymentMethodId = paymentMethodId; //pass card id
      payload.paymentMethodSource = Utils.constants.PAYMENT_METHOD.CARD;
    }
    let gatewayPayload: any = {}
    if (paymentMode === "paytm") {
      gatewayPayload = {
        paymentMethodSource: payload.paymentMethodSource,
        gatewayOrderId: payload.gatewayOrderId,
        amount: membership.price,
      }
    } else {
      gatewayPayload = {
        paymentMethodSource: payload.paymentMethodSource,
        gatewayOrderId: payload.gatewayOrderId,
        amount: membership.price,
        tierType: membership?.tierType,
        productId: membership?.productId
      }
    }
    if (paymentMode !== "paytm") {

      getGatewayOrderId(gatewayPayload)
        .then((resp: any) => {
          dispatch(hideLoader());
          let data = resp.data.data;
          payload.gatewayOrderId = data.gatewayOrderId;
          if (
            paymentMode === "netbanking" ||
            paymentMode === "upi" ||
            paymentMode === "card"
          ) {
            const options = getOptions(paymentMode || "", data, values ?? {});
            makePayment(
              options,
              (razorpayResp: any) => {
                if (razorpayResp?.razorpay_payment_id) {
                  updateTierHandler(payload, razorpayResp);
                }
              },
              (error: any) => { }
            );
          }
          // else {
          //   updateTierHandler(payload);
          // }
        })
        .catch((err: any) => {
          dispatch(hideLoader());

          dispatch({
            type: "show-alert",
            payload: {
              type: "error",
              message: err.response.data.message,
            },
          });
        });
    } else {
      updateTierHandler(payload);

    }
  };

  const updateTierHandler = (payload: any, razorpayResp?: any) => {
    dispatch(showLoader());
    updateTier(payload)
      .then((resp: any) => {

        let eventPayload: any = {
          IsPurchased: true,
          UpdatedTierType: membership?.name
        }
        eventUpdateTier(eventPayload)
        updateProfile('is_loyalty_tier_purchased', eventPayload.IsPurchased);
        updateProfile('loyalty_tier_purchased', eventPayload.UpdatedTierType);

        dispatch(getUserProfile())
        dispatch(hideLoader());
        dispatch(hidePaytmCallbackLoader());
        let data = resp?.data?.data;
        setOrderId(data?.orderId || 0);
        showOrderSuccess(resp);
      })
      .catch((err: any) => {
        dispatch(hideLoader());
        dispatch(hidePaytmCallbackLoader());

        dispatch({
          type: "show-alert",
          payload: {
            type: "error",
            message: err.response.data.message,
          },
        });
      });
  };

  const reuseAmount = (heading: string, amount: string) => {
    return (
      <div className={classes.reuseDiv}>
        <Typography className={classes.reuseHeading}>{heading}</Typography>
        <Typography className={classes.reuseHeading}>{amount}</Typography>
      </div>
    );
  };

  return (
    <>
      <div className={classes.paymentRoot}>
        <div className={classes.maxWidthDiv}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={8}>
              <PaymentOptions
                setPaymentMethodId={setPaymentMethodId}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                setVpa={setVpa}
                vpa={vpa}
                setBank={setBank}
                flag={flag}
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
                setBtnText={setBtnText}
                section="membership"
                setProceedToPay={setProceedToPay}
                onSubmit={onSubmit}
                disablePaymentOptions={
                  membership?.price === 0 ||
                  flag === "retry" ||
                  flag === "convertToCod"
                }
              />
            </Grid>
            <Grid item xs={12} md={4} className={classes.secondContainer}>
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
                        {reuseAmount(
                          `Bag total (${1} item)`,
                          `₹ ${Utils.CommonFunctions.decimalFlat(
                            membership?.price
                          )}`
                        )}

                        <div className={classes.grandTotalDiv}>
                          <Typography className={classes.grandTotal}>
                            Grand total
                          </Typography>
                          <Typography className={classes.grandTotal}>
                            ₹{" "}
                            {Utils.CommonFunctions.decimalFlat(membership?.price)}
                          </Typography>
                        </div>
                      </div>
                    </Hidden>

                    <div className={classes.btnContainer}>
                      <div className={classes.btnDiv}>
                        <Hidden smUp>
                          <div className={classes.grandTotalDiv2}>
                            <Typography className={classes.view}>
                              ₹{" "}
                              {Utils.CommonFunctions.decimalFlat(
                                membership?.price
                              )}
                            </Typography>
                            <Typography
                              className={classes.grandHeading}
                              onClick={(e: any) => handleChange(e)}
                            >
                              View Details
                            </Typography>
                          </div>
                        </Hidden>
                        <Hidden xsDown>
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.saveBagBtn}
                            onClick={() => {
                              dispatch({
                                type: "updateCart",
                                payload: {
                                  grandTotal: 0,
                                },
                              });
                              history.push(Utils.routes.UPGRADE_MEMBERSHIP);
                            }}
                          >
                            Back
                          </Button>
                        </Hidden>

                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.checkOutBtn}
                          disabled={proceedToPay}
                          onClick={onSubmit}
                        >
                          {btnText}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <Hidden smUp>
        <>
          <div>
            <Drawer
              disableEnforceFocus
              anchor="bottom"
              open={showPaymentSummary}
              onClose={(e: any) => handleClose(e)}
              className={classes.drawer}
            >
              <div className={classes.paymentDetails}>
                <Typography className={classes.paymentHeading}>
                  Payment Details
                </Typography>
                {reuseAmount(
                  `Bag total (${1} item)`,
                  `₹ ${Utils.CommonFunctions.decimalFlat(membership?.price)}`
                )}

                <div className={classes.grandTotalDiv}>
                  <Typography className={classes.grandTotal}>
                    Grand total
                  </Typography>
                  <Typography className={classes.grandTotal}>
                    ₹ {Utils.CommonFunctions.decimalFlat(membership?.price)}
                  </Typography>
                </div>
              </div>
            </Drawer>
          </div>
        </>
      </Hidden>
      <SuccessModal
        displayDivider={true}
        title={`Order Successful!`}
        description={
          <Typography className={classes.description}>
            Your Order{" "}
            {orderId ? <span className={classes.bold}>{orderId}</span> : null}{" "}
            has been successfully placed with us
          </Typography>
        }
        buttonText="Shop More"
        open={successModalVisibility}
        handleClose={handleSuccessModalClose}
      />
      <SuccessModal
        displayDivider={false}
        title={`Thank You!!`}
        description={
          <Typography className={classes.description}>
            Lorem Ipsum is simply dummy text.
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
        orderFeedbackMissing={userInfo?.orderFeedback ? false : true}
        title={
          ratingFormVisibility
            ? `Thank You For Placing Your Order !!`
            : `Thank You!!`
        }
        description={
          ratingFormVisibility ? (
            <Typography className={classes.description}>
              Your Order{" "}
              {orderId ? <span className={classes.bold}>{orderId}</span> : ""}{" "}
              has been successfully placed with us
            </Typography>
          ) : (
            "We would love to know more about you!"
          )
        }
        buttonText="Submit"
        open={formModalFormVisibility || ratingFormVisibility}
        handleClose={(e: boolean) => handleRatingModalClose(e)}
      />
      <MessageDialog
        closePopUp={true}
        onClosePopUp={() => {
          history.push("/");
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem('checkoutAddressId')
          sessionStorage.removeItem('shipping')

        }}
        open={paymentFailedVisibility}
        icon={Utils.images.ORDER_FAILED}
        handleClose={() => {
          if (paymentFailedVisibility) {
            history.push({
              pathname: Utils.CommonFunctions.replaceUrlParams(
                Utils.routes.LYBC,
                { ":slug": "dashboard" }
              ),
            });
            setFlag("convertToCod");
            setPaymentFailedVisibility(false);
          }
        }}
        onOk={() => {
          if (paymentFailedVisibility) {
            setPaymentFailedVisibility(false);
            history.push({
              pathname: Utils.CommonFunctions.replaceUrlParams(
                Utils.routes.LYBC,
                { ":slug": "dashboard" }
              ),
            });
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
        modaltype={"payment"}
        cancelText={"Convert To COD"}
      />
      <MessageDialog
        closePopUp={true}
        onClosePopUp={() => {
          history.push("/");
          dispatch({ type: "clearCart" });
          sessionStorage.removeItem('checkoutAddressId')
          sessionStorage.removeItem('shipping')

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
    </>
  );
};

export default Payment;
