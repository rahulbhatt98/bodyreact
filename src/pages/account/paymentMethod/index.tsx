import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageDialog from "../../../components/common/messageDialog";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";
import {
  hideLoader,
  hideSkeleton,
  showLoader,
  showSkeleton,
} from "../../home/actions";
import {
  getWalletBalance,
  revokePaytmWallet,
} from "../../payment/otherOptions/paytm/action";
import { deleteCard, getBankLogos, getCards } from "../../payment/razorpay";
import { getUserProfile } from "../profile/action";
import clsx from "clsx";
import PaymentMethodSkeleton from "../../../components/common/skeletonList/paymentMethodsSkeleton";
import OrderNotFound from "../orders/orderNotFound";
import { screenViewed } from "../../../utils/event/action";
import events from "../../../utils/event/constant"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentContainer: {
      [theme.breakpoints.down("xs")]: {
        padding: "20px",
      },
    },
    heading: {
      font: `normal 700 ${theme.spacing(3.6)}px Work Sans`,
      lineHeight: "42px",
      color: "#004236",
      [theme.breakpoints.down("xs")]: {
        font: `normal 700 ${theme.spacing(3)}px Work Sans`,
      },
    },
    outerDiv: {
      display: "flex",
      alignItems: "stretch",
      flexWrap: "wrap",
    },
    cardOuterDiv: {
      background: "var(--primary)",
      height: "100%",
      padding: theme.spacing(1.5, 1.5),
      borderRadius: "10px",
      flexBasis: "49%",
      margin: theme.spacing(2, 0.7, 0, 0),
      [theme.breakpoints.down("md")]: {
        flexBasis: "48%",
      },
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        margin: "20px 0px 0px 0px",

        // margin: theme.spacing(2, 0, 0, 0),
      },
    },
    seconndCardDiv: {
      background: "var(--primary)",
      height: "100%",
      padding: theme.spacing(1.5, 1.5),
      borderRadius: "10px",
      flexBasis: "49%",
      margin: theme.spacing(2, 0, 0, 0.7),
      [theme.breakpoints.down("md")]: {
        flexBasis: "48%",
      },
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        margin: "20px 0px 0px 0px",
      },
    },
    bankImgDiv: {
      width: "50px",
      height: "50px",
      border: "1px solid var(--white)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(0.5),
      background: "var(--white)",
    },
    walletDiv: {
      width: "50px",
      height: "50px",
      border: "1px solid var(--border-color)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(0.5),
      background: "var(--white)",
      marginRight: "10px",
    },
    cardInnerDiv: {},
    cardName: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    moreItemDiv: {
      background: "var(--black)",
      border: "1px solid var(--black)",
      borderRadius: "50%",
      opacity: "20%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      padding: theme.spacing(0.5),
    },
    userNameDiv: {
      marginTop: theme.spacing(4),
      textTransform: "capitalize",
    },
    userName: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--white)",
      margin: theme.spacing(0.5, 0),
    },
    userAccount: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(2)}px Druk`,
      lineHeight: "20px",
      color: "var(--white)",
      letterSpacing: "7px",
      margin: theme.spacing(1, 0),
      textTransform: "uppercase",
    },
    validityOuterDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    validityDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexBasis: "65%",
    },
    date: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "#B2CBE7",
      margin: theme.spacing(1, 0, 0, 0),
      textTransform: "uppercase",
    },
    dltImg: {
      width: "30px",
      height: "30px",
      objectFit: "contain",
      cursor: "pointer",
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans SemiBold`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0, 0),
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    divider: {
      margin: theme.spacing(2, 0),
      color: "#C4C4C4",
    },
    walletOuterDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1),
      border: "1px solid var(--border-color)",
      background: "var(--white)",
      margin: "20px 20px 0px 0px",
      flexBasis: "47%",
      borderRadius: "10px",
      [theme.breakpoints.down("md")]: {
        flexBasis: "45%",
      },
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        margin: theme.spacing(2, 0, 0, 0),
      },
    },
    walletInnerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    delinkBtn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      lineHeight: "21px",
      color: "#43BA64",
      cursor: "pointer",
      textTransform: "uppercase",
    },
    walletTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans SemiBold`,
      color: "#333333",
    },
    walletBalance: {
      color: "var(--light-gray-text)",
      font: `regular ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
    },
    balance: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      color: "#333333",
    },
    bankNetwork: {
      height: "40px",
      alignSelf: "flex-end",
      marginBottom: "3px",
    },
    cardTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans `,
      color: "#333333",
      margin: theme.spacing(2.2, 0, 0, 0),
      textTransform: "uppercase",
    },
    noData: {
      font: `normal ${500} ${theme.spacing(2)}px Work Sans`,
      width: "100%",
      padding: "20px",
      height: "480px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        height: "170px",
      },
    },
  })
);

const PaymentMethod: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [logos, setLogos] = useState<any>([]);
  const [paytmBalance, setPaytmBalance] = useState(0);
  const [delinkPopUp, setDelinkPopUp] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<any>({});
  const [deleteCardVisibility, setDeleteCardVisibility] = useState(false);
  const data =
    useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) ||
    {};

  const getPaymentMethods = () => {
    // dispatch(showLoader());
    getCards()
      .then((response) => {
        if (response) {
          const cardData = response?.data?.data || [];
          dispatch(hideLoader());
          dispatch(hideSkeleton());

          setCards(cardData);
          cardData.forEach((item: any) => {
            if (item?.card?.issuer)
              getBankLogos(item?.card?.issuer)
                .then((resp) => {
                  item.logo = resp;
                  const key = item?.card?.issuer || "";
                  logos.push({
                    key: key,
                    img: resp?.config?.url || "",
                  });
                  setLogos([...logos]);
                })
                .catch((error) => {});
            return item;
          });
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
      });
  };

  useEffect(() => {
    dispatch(showSkeleton());
    getPaymentMethods();
    screenViewed({
      ScreenName: events.SCREEN_MY_PAYMENT_METHOD,
      CTGenerated: "WEB"
    })

    if (data?.paytm?.mobileNo) {
      dispatch(showLoader());
      getWalletBalance({
        amount: "0",
      })
        .then((resp: any) => {
          dispatch(hideLoader());
          dispatch(hideSkeleton());

          let data = resp?.data?.data;
          let walletAmount = Utils.CommonFunctions.decimalFlat(
            data?.body?.payOptions?.[0]?.amount,
            2
          );
          setPaytmBalance(walletAmount);
        })
        .catch(() => {
          dispatch(hideSkeleton());
          dispatch(hideLoader());
        });
    }
  }, []);

  const onDelete = (item: any) => {
    setItemToBeDeleted(item);
    setDeleteCardVisibility(true);
  };

  const onDeleteCardConfirm = () => {
    if (data?.rzpCustomerId) {
      dispatch(showLoader());
      deleteCard(`/${data?.rzpCustomerId}/${itemToBeDeleted?.token}`)
        .then((resp: any) => {
          if (resp) {
            getPaymentMethods();
            setDeleteCardVisibility(false);
          }
        })
        .catch((error) => {
          dispatch(hideLoader());
          if (error?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "erroror",
                message: error.response.data.message,
              },
            });
        });
    }
  };
  const revokePaytm = () => {
    dispatch(showLoader());
    revokePaytmWallet()
      .then((resp: any) => {
        if (resp) {
          dispatch(hideLoader());
          setDelinkPopUp(false);
          dispatch(getUserProfile());
        }
      })
      .catch((error: any) => {
        // setDelinkPopUp(false);
        dispatch(hideLoader());
        dispatch({
          type: "show-alert",
          payload: {
            type: "error",
            message: error?.response?.data?.message,
          },
        });
      });
  };
  const getLogo = (key: string) => {
    const item = logos.find((cardItem: any) => cardItem?.key === key);
    return item?.img || null;
  };
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return skeletonLoader ? (
    <PaymentMethodSkeleton />
  ) : (
    <div className={classes.paymentContainer}>
      {" "}
      <>
        <Hidden xsDown>
          <Typography variant="h4" color="primary" className={classes.heading}>
            My Payment Methods
          </Typography>
        </Hidden>
        {cards.length > 0 ? (
          <Typography variant="body1" className={classes.cardTitle}>
            {cards.length === 1 ? "Saved Card" : "Saved Cards"}
          </Typography>
        ) : null}
      </>{" "}
      <div className={classes.outerDiv}>
        {cards.map((item: any, index: any) => {
          const img = getLogo(item?.card?.issuer);
          return (
            <div
              className={clsx(
                index % 2 === 0 ? classes.cardOuterDiv : classes.seconndCardDiv
              )}
            >
              <div className={classes.cardInnerDiv}>
                <div className={classes.cardName}>
                  <div className={classes.bankImgDiv}>
                    <img
                      className={classes.dltImg}
                      src={img ? img : Utils.images.PRODUCT_PLACEHOLDER}
                      alt="bankIcon"
                    />
                  </div>
                  <img
                    src={Utils.images.MORE}
                    alt="moreOptions"
                    className={classes.dltImg}
                    onClick={() => onDelete(item)}
                  />
                </div>
                <div className={classes.userNameDiv}>
                  <Typography variant="h3" className={classes.userName}>
                    {item?.card?.name || ""}
                  </Typography>
                  <Typography variant="h1" className={classes.userAccount}>
                    xxxx xxxx xxxx {item?.card?.last4 || "xxxx"}
                  </Typography>
                </div>
                <div className={classes.validityOuterDiv}>
                  <div className={classes.validityDiv}>
                    <Typography variant="h3" className={classes.date}>
                      {item?.card?.type || ""} Card
                    </Typography>
                    <Typography variant="h1" className={classes.date}>
                      Validity{" "}
                      {item?.card?.expiry_month +
                        "/" +
                        (item?.card?.expiry_year
                          ? String(item.card.expiry_year)?.slice(2)
                          : "")}
                    </Typography>
                  </div>
                  <img
                    className={classes.bankNetwork}
                    src={
                      item?.card?.network?.toLowerCase() === "visa"
                        ? Utils.images.VISA
                        : item?.card?.network?.toLowerCase() === "mastercard"
                        ? Utils.images.MASTERCARD
                        : item?.card?.network?.toLowerCase() === "rupay"
                        ? Utils.images.RUPAY
                        : Utils.images.AMERICAN_EXPRESS
                    }
                    alt="visa"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Hidden xsDown> */}
        <>
          {data?.paytm?.mobileNo && data?.paytm?.mobileNo !== 0 ? (
            <>
              {cards?.length === 1 ? (
                <Divider light className={classes.divider} />
              ) : null}
              <Typography variant="h1" className={classes.title}>
                Wallets
              </Typography>
              <div className={classes.outerDiv}>
                {/* {Array.of(1, 2, 3).map((item: any) => ( */}
                <div className={classes.walletOuterDiv}>
                  <div className={classes.walletInnerDiv}>
                    <div className={classes.walletDiv}>
                      <img src={Utils.images.PAYTM} alt="bankIcon" />
                    </div>
                    <div>
                      <Typography className={classes.walletTitle}>
                        Paytm
                      </Typography>
                      <Typography className={classes.walletBalance}>
                        Balance:{" "}
                        <span className={classes.balance}>
                          Rs. {paytmBalance}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Typography
                      className={classes.delinkBtn}
                      onClick={() => setDelinkPopUp(true)}
                    >
                      delink
                    </Typography>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </>
          ) : null}
          {
            cards.length === 0 && !data?.paytm?.mobileNo && (
              <OrderNotFound
                message="No Payment Methods Found"
                hideButton={true}
                noPaymentFound={true}
              />
            )
            // <Typography className={classes.noData}>
            //   No Payment Methods Available
            // </Typography>
          }
        </>
      {/* </Hidden> */}
      {/* <Hidden smUp>
        {
          cards.length === 0 && (
            <OrderNotFound
              message="No Payment Methods Found"
              hideButton={true}
            />
          )
          // <Typography className={classes.noData}>
          //   No Payment Methods Available
          // </Typography>
        }
      </Hidden> */}
      <MessageDialog
        heading={"Delink Paytm"}
        cancelText={"Cancel"}
        okText={"Delink"}
        open={delinkPopUp}
        onOk={revokePaytm}
        handleClose={() => setDelinkPopUp(false)}
        message={"Are you sure you want to delink paytm wallet?"}
      />
      {
        <MessageDialog
          heading={"Delete Card"}
          cancelText={"Cancel"}
          okText={"Delete"}
          open={deleteCardVisibility}
          onOk={onDeleteCardConfirm}
          handleClose={() => setDeleteCardVisibility(false)}
          message={"Are you sure you want to delete this card ?"}
        />
      }
    </div>
  );
};

export default PaymentMethod;
