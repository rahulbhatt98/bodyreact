import { makeStyles, Typography, Grid, Hidden } from "@material-ui/core";
import Utils from "../../utils";
import { useEffect, useState } from "react";
import OrderHistoryList from "./orderHistoryList";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import { getWalletBalance, getWalletHistory } from "../payment/action";
import RedeemForm from "../../components/common/redeem/redeemForm";
import { redeemBalance } from "../giftCard/action";
import { hideSkeleton, showSkeleton } from "../home/actions";
import clsx from "clsx";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant"


const useStyles = makeStyles((theme) => ({
  walletRoot: {
    // padding: theme.spacing(3, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 1),
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.6
    )}px Work Sans`,
    color: "#004236",
    lineHeight: "42px",
  },
  outerDiv: {
    background: "var(--creame-color)",
    border: "1px solid var(--border-color)",
    boxSizing: "border-box",
    position: "relative",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 0),
    },
  },
  outerDiv2: {
    background: "var(--creame-color)",
    border: "1px solid var(--border-color)",
    boxSizing: "border-box",
    position: "relative",
    height: "120px",
    padding: theme.spacing(5),
    margin: theme.spacing(3.5, 0),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(6, 0, 1, 0),
    },
  },
  innerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5, 0, 0, 0),
      height: "auto",
    },
  },
  img: {
    textAlign: "center",
    marginTop: "-50px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
      marginTop: "0px",
    },
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}px Work Sans`,
    color: "var(--green-color)",
    lineHeight: "28px",
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
      color: "black",
      letterSpacing:"0.06em"
    },
  },
  price: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      4
    )}px Work Sans`,
    color: "var(--secondary-black)",
    lineHeight: "47px",
    textTransform: "uppercase",
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.spacing(
        3
      )}px Work Sans Bold`,
      margin: theme.spacing(.5, 0),

    },
  },
  design1: {
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  design2: {
    top: 0,
    right: 0,
    position: "absolute",
  },
  formContainer: {
    background: "var(--medium-creame-color)",
    border: "1px solid var(--text-color)",
    boxSizing: "border-box",
    borderRadius: "4px",
    padding: theme.spacing(0, 2, 2, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 2, 0.5, 2),

    }
  },

  inputWidth: {
    width: "100%",
    height: "50px",
    [theme.breakpoints.down("xs")]: {
      "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
        padding: theme.spacing(0),
      },
    },
  },

  btn: {
    marginTop: theme.spacing(1.2),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(-2),
    },
  },
  innerBox: {
    width: "100%",
    // marginTop: theme.spacing(-3.5),
    [theme.breakpoints.down("xs")]: {
      width: "98%",
      "& .formContainer": {
        marginLeft: "0px !important",
      },
      // "& p":{
      //   [theme.breakpoints.down("xs")]:{
      //     font: `normal ${theme.spacing(
      //       1.3
      //     )}px Work Sans Regular`,
      //   }
      // }
    },
  },
  gridContainer: {
    marginTop: "10px",
  },
  titleRoot: {
    margin: theme.spacing(6, 0),
    "& .MuiGrid-grid-md-6": {
      maxWidth: "47%",
      flexBasis: "47%",
    },
    [theme.breakpoints.down("xs")]: {
      "& .MuiGrid-grid-md-6": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
      margin: theme.spacing(0),
    },
  },
  thirdRoot: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 0, 0, 0),
    },
  },
  secondRoot: {
    marginRight: theme.spacing(1),

    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 0, 1, 0),
    },
  },
  innerDiv2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "170px",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 0, 0, 0),
      height: "auto",
    },
  },
}));

const Wallet: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState<any>([]);
  const [page, setPage] = useState<any>(0);
  const [walletData, setWalletData] = useState<any>({});
  const [giftCard, setGiftCard] = useState(false);
  // const [isFetching, setIsFetching] = useState<boolean>(false);
  const walletId: any = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo?.walletId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(showSkeleton());
    getBalance();

    screenViewed({
      ScreenName: events.SCREEN_MY_WALLET,
      CTGenerated: "WEB"
    })

  }, []);

  const getBalance = () => {
    dispatch(
      getWalletBalance((resp: any) => {
        if (resp) {
          setWalletBalance(resp?.totalAmount || 0);
        }
        dispatch(hideSkeleton());
      })
    );
  };
  // const initialValues = {
  //   couponCode: "",
  // };

  // const codeSchema = Yup.object().shape({
  //   couponCode: Yup.string().required("Please enter code number"),
  // });

  const getWalletData = (hasMore?: boolean, callWithCurrentPage?: number,callback?:Function) => {
    const pageNum = hasMore ? page + 1 : callWithCurrentPage ? 1 : page;
    setPage(pageNum);
    // dispatch(showSkeleton());
    if (walletId) {
      const payload = {
        walletId: walletId,
        page: pageNum,
      };
      dispatch(
        getWalletHistory(payload, (resp: any) => {
          // const arr = resp?.walletTransactions ? [...walletTransactions, ...resp?.walletTransactions] : [...walletTransactions]
          const arr = callWithCurrentPage
            ? [...resp?.walletTransactions]
            : [...walletTransactions, ...resp?.walletTransactions];
          setWalletTransactions(arr || []);
          setWalletData(resp || {});
          dispatch(hideSkeleton());
          if(callback)
          callback()
        })
      );
    }
  };

  const onRedeemBalance = (payload: any, callback: Function) => {
    dispatch(redeemBalance(payload, callback));
  };
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <>
      <div className={skeletonLoader ? classes.walletRoot : ""}>
        {skeletonLoader ? (
          <Skeleton width={160} height={30} />
        ) : (
          <Hidden xsDown>
            <Typography variant="h3" className={classes.heading}>
              My Wallet
            </Typography>
          </Hidden>
        )}
        <Grid container className={classes.titleRoot}>
          <Grid item xs={12} md={6} className={classes.secondRoot}>
            <div className={classes.outerDiv}>
              {skeletonLoader ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    className={classes.outerDiv2}
                  />
                </>
              ) : (
                <>
                  {/* <img
                    src={Utils.images.DESIGN_TWO}
                    alt="design"
                    className={classes.design1}
                  />
                  <img
                    src={Utils.images.BG_DESIGN8}
                    alt="design"
                    className={classes.design2}
                  /> */}
                  {/* <Hidden xsDown> */}
                  <div className={classes.img}>
                    <img src={Utils.images.WALLETDOCS} alt="icon" />
                  </div>
                  {/* </Hidden> */}
                  <div
                    className={
                      giftCard ? clsx(classes.innerDiv) : classes.innerDiv2
                    }
                  >
                    <Typography variant="h6" className={classes.title}>
                      {skeletonLoader ? <Skeleton /> : "Wallet Balance"}
                    </Typography>

                    <Typography variant="body1" className={classes.price}>
                      {skeletonLoader ? <Skeleton /> : `₹${Utils.CommonFunctions.addCommaToAmount(walletBalance)}`}
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.thirdRoot}>
            <div className={classes.outerDiv}>
              {skeletonLoader ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    className={classes.outerDiv2}
                  />
                </>
              ) : (
                <>
                  {/* <img
                    src={Utils.images.DESIGN_TWO}
                    alt="design"
                    className={classes.design1}
                  />
                  <img
                    src={Utils.images.BG_DESIGN8}
                    alt="design"
                    className={classes.design2}
                  /> */}
                  {/* <Hidden xsDown> */}
                  <div className={classes.img}>
                    <img src={Utils.images.WALLETFILTER} alt="icon" />
                  </div>
                  {/* </Hidden> */}
                  <div className={classes.innerDiv}>
                    <Typography variant="h6" className={classes.title}>
                      Gift Card
                    </Typography>
                    <div className={classes.innerBox}>
                      <RedeemForm
                        getWalletData={getWalletData}
                        setGiftCard={setGiftCard}
                        textInfo={
                          "Redeem Voucher to add money to your Wallet"
                        }
                        getBalance={getBalance}
                        onRedeemBalance={onRedeemBalance}
                      />

                      {/* <Formik
                        initialValues={initialValues}
                        validationSchema={codeSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(true);
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          isSubmitting,
                          validateForm,
                        }) => {
                          return (
                            <Form autoComplete="off">
                              <div>
                                <Grid
                                  container
                                  className={classes.gridContainer}
                                  spacing={1}
                                >
                                  <Grid item xs={12} sm={8}>
                                    <InputField
                                      label={""}
                                      placeHolder={"Enter gift card number"}
                                      id="couponCode"
                                      inputWidth={classes.inputWidth}
                                      name="couponCode"
                                      type="text"
                                      touched={touched}
                                      errors={errors}
                                      value={values.couponCode}
                                      isRequired={true}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} className={classes.btn}>
                                    <CustomButton
                                      fullWidth
                                      text={"Add to Wallet"}
                                      type={"submit"}
                                      variant="contained"
                                      disabled={errors?.couponCode ? true : false}
                                    />
                                  </Grid>
                                </Grid>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik> */}
                      {/* <Typography
                          variant="body1"
                          align="center"
                          className={classes.para}
                        >
                          Redeem voucher to add your value to your wallet
                        </Typography> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <OrderHistoryList
          walletData={walletData}
          getWalletData={getWalletData}
          walletTransactions={walletTransactions}
        />
      </div>
    </>
  );
};
export default Wallet;
