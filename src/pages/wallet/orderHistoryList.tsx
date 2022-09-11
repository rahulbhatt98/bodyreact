import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Hidden,
  Backdrop,
} from "@material-ui/core";
import Utils from "../../utils";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import MyOrdersSkeleton from "../../components/common/skeletonList/myOrderSkeleton";
import { useEffect, useState } from "react";
import format from "date-fns/format";
import { handleScrollHeight } from "../../utils/scroll";
import OrderNotFound from "../account/orders/orderNotFound";
import { showSkeleton } from "../home/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt Bold`,
      letterSpacing: "0.03em",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0, 0, 0),
        padding: theme.spacing(1),
        letterSpacing: "1.2px",
        font: `normal ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
      },
    },
    outerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: theme.spacing(2.5, 0),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "inherit",
        margin: theme.spacing(0.5, 0),
        padding: theme.spacing(1)
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
    },
    para: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "24px",
      color: "var(--light-gray)",
      flexBasis: "40%"
    },
    imgDiv: {
      background: "#DCEFE4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2.5),
      marginRight: theme.spacing(1),
    },
    innerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0.4, 0),
      },
    },
    text: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "24px",
      color: "#4CAF50",
      marginRight: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }
    },
    text2: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "24px",
      color: "#EF5350",
      marginRight: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }
    },
    rightimg: {
      background: "#F4E4DD",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2.5),
      marginRight: theme.spacing(1),
    },
    outerBox2: {
      width: "100%",
      padding: theme.spacing(4),
    },
    secondRoot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    secondPara: {
      flexBasis: "70%",
    },
    modeMethod: {
      color: "#4CAF50",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    secndTitle: {
      margin: theme.spacing(3.5, 1),
    },
    divider: {
      [theme.breakpoints.down("xs")]: {
        height: "2px",
        marginBottom: "10px"
      }
    },
    listContainer: {
      width: "100%",
      // maxWidth: 380,
      display: "flex",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    list: {
      margin: theme.spacing(1, 0, 0, 0),
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      lineHeight: "16px",
      [theme.breakpoints.down("xs")]: {
        width: "70%",
        color: "var(--light-gray)",
        letterSpacing: "1.4px"
      }

    },
    list2: {
      margin: theme.spacing(1, 0, 0, 0),
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      lineHeight: "16px",
      [theme.breakpoints.down("xs")]: {
        width: "70%",
        color: "var(--light-gray)",
        letterSpacing: "0.04em",
        lineHeight: "16px",
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }

    },
    flexInnerDiv: {
      flexBasis: "25%",
    },
    dividerClass: {
      marginTop: "20px",
      height: "2px",
      marginBottom: "10px"
    },
    paidFor: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "16px",
      margin: theme.spacing(1, 0, 0, 0),
      letterSpacing: "1px",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
      }
    },
    paidForContent: {
      font: `normal 600 ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "18px",
      margin: theme.spacing(1, 0, 0, 0),
      letterSpacing: "1.2px",
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      }
    },
    label: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "13px",
      margin: theme.spacing(1, 0, 0, 0),
      letterSpacing: "1.2px",
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
      }
    },
    rightContent: {
      paddingLeft: "5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexBasis: "75%",

    },
    skeleton: {
      marginTop: "20px !important"
    },
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: "#fff",
    },
    container: {
      height: "500px",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }
  })
);

const OrderHistoryList = ({
  getWalletData,
  walletData,
  walletTransactions,
}: any) => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [firstCall, setFirstCall] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const dispatch=useDispatch()
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const walletId: any = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo?.walletId
  );

  useEffect(() => {
    if (walletId&&firstCall) {
      dispatch(showSkeleton())
      getWalletData(false, 1, () => {
        setIsFetching(false);
        setFirstCall(false)
      });
    }
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [walletId]);

  // const handleScroll = (e: any) => {
  //   // console.log('isFetched',isFetched)
  //   // if (isFetched)
  //   handleScrollHeight(e, (value: boolean) => {
  //     setIsFetching(value);
  //    if(value){
  //     var freezeDiv = document.createElement("div");
  //     freezeDiv.id = "freezeDiv";
  //     freezeDiv.style.cssText = "position:absolute; top:0; right:0; width:" + window.screen.width + "px; height:" + window.screen.height + "px; background-color: #000000; opacity:0; filter:alpha(opacity=50)";    
  //     document.getElementsByTagName("body")[0].appendChild(freezeDiv );
  //    }

  //   });
  // };

  const handleScroll = (e: any) => {
    const bottom = Math.abs(Math.ceil(e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight) < 1;
    // console.log('bottom', bottom, page * limit, walletData?.totalNoOfTransactions)
    if (bottom && walletData?.nextPage !== -1 ) {
      setPage(page + 1);
      setIsFetching(true)
    }
  };
  useEffect(() => {
    if (isFetching&&!firstCall)
      getWalletData(true, null, () => {
        // setIsFetched(true)
        setIsFetching(false)
      });
  }, [isFetching]);

  // useEffect(() => {
  //   if (!isFetching) return;
  //   if (
  //     // !isFetched&&
  //     walletData.nextPage !== -1) {
  //     getWalletData(true, null, () => {
  //       // setIsFetched(true)
  //     });
  //   }
  // }, [isFetching]);

  return (
    <div
      onScroll={handleScroll}
      className={classes.container}
    >
      {skeletonLoader ? (
        <>
          <Skeleton height={20} width={130} className={classes.skeleton} />
          <MyOrdersSkeleton
            flag="wallet"
            hideCheckBox={true}
            sections={[1, 2, 3, 4]}
          />
        </>
      ) : walletData?.walletTransactions?.length > 0 ? (
        <>
          <Hidden xsDown>
            <Typography variant={"h1"} className={classes.heading}>
              Wallet History
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant={"h1"} className={classes.heading}>
              Wallet Transactions
            </Typography>
            <Divider light className={classes.divider} />

          </Hidden>

          {walletTransactions.map((item: any, index: any) => {
            // const tag = transactionType.filter((type: any) => type.transactionType === item.transactionType);
            // const title = item.transactionType === "ADD CARD TO WALLET" ? tag?.[0]?.text + item?.customerName : tag?.[0]?.text + item?.invoiceNumber
            return (
              <>
                <Hidden xsDown>
                  <Box key={index}>
                    <>
                      <div className={classes.outerBox} key={index}>
                        <div className={classes.innerBox}>
                          {/* <div
                      className={clsx(
                        tag?.[0]?.transactionType !== "WALLET REDEEM"
                          ? classes.imgDiv
                          : classes.rightimg
                      )}
                    >
                      <img src={tag?.[0]?.imgIcon || ""} alt="icons" />
                    </div> */}
                          <div>
                            <Typography variant="h5" className={classes.title}>
                              {item?.message || ""}
                            </Typography>
                            <div className={classes.secondRoot}>
                              <Typography variant="body1" className={classes.para}>
                                Txn ID:
                              </Typography>
                              <Typography
                                variant="body1"
                                className={clsx(classes.para, classes.secondPara)}
                              >
                                {item?.transactionId || ""}
                              </Typography>
                            </div>

                            {item?.invoiceNumber ?
                              <div className={classes.secondRoot}>
                                <Typography variant="body1" className={classes.para}>
                                  ORDER ID:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={clsx(classes.para, classes.secondPara)}
                                >
                                  {item?.invoiceNumber || ""}
                                </Typography>
                              </div> : ""
                            }

                            <Typography variant="body1" className={classes.para}>
                              <span className={classes.modeMethod}>
                                {item?.subMessage || ""}
                              </span>
                              {item?.transactionPostDate
                                ? " " +
                                format(
                                  new Date(item.transactionPostDate),
                                  "dd MMMM yyyy,"
                                ) +
                                " at " +
                                format(
                                  new Date(item.transactionPostDate),
                                  "hh:mm aaa"
                                )
                                : "-"}
                            </Typography>
                          </div>
                        </div>
                        <div className={classes.innerBox}>
                          <Typography
                            variant="body1"
                            className={clsx(
                              item?.isCredit ? classes.text : classes.text2
                            )}
                          >
                            {item?.isCredit ? "+ " : "- "}₹ {Utils.CommonFunctions.addCommaToAmount(item.amount)}
                          </Typography>
                          {item?.isCredit ? (
                            <img src={Utils.images.WALLETFIVE} alt="wallet" />
                          ) : (
                            <img src={Utils.images.WALLETFOUR} alt="wallet" />
                          )}
                        </div>
                      </div>
                      {item.length - 1 !== index && <Divider className={classes.divider} light />}
                    </>
                  </Box>
                </Hidden>
                <Hidden smUp>
                  <div className={classes.listContainer} key={index}>
                    <div className={classes.flexInnerDiv}>
                      <Typography variant="h5" className={classes.paidFor}>
                        PAID FOR:
                      </Typography>
                    </div>

                    <div className={classes.rightContent}>
                      <Typography
                        className={classes.paidForContent}
                      >
                        {item?.message || ""}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.listContainer} key={index}>
                    <div className={classes.flexInnerDiv}>
                      <Typography variant="h5" className={classes.label}>
                        TXN ID:
                      </Typography>
                    </div>

                    <div className={classes.rightContent}>
                      <Typography
                        className={classes.list}
                      >
                        {item?.transactionId || ""}
                      </Typography>
                    </div>
                  </div>
                  {item?.invoiceNumber ?
                    <div className={classes.listContainer} key={index}>
                      <div className={classes.flexInnerDiv}>
                        <Typography variant="h5" className={classes.label}>
                          ORDER ID:
                        </Typography>
                      </div>

                      <div className={classes.rightContent}>
                        <Typography
                          className={classes.list}
                        >
                          {item?.invoiceNumber || ""}
                        </Typography>
                      </div>
                    </div> : ""
                  }
                  <div className={classes.listContainer} key={index}>
                    <div className={classes.flexInnerDiv}>
                      <Typography variant="h5" className={classes.label}>
                        ON:
                      </Typography>
                    </div>

                    <div className={classes.rightContent}>
                      <Typography
                        className={classes.list2}
                      >
                        <span className={classes.modeMethod}>
                          {item?.subMessage || ""}
                        </span>
                        {item?.transactionPostDate
                          ? " " +
                          format(
                            new Date(item.transactionPostDate),
                            "dd MMMM, yyyy"
                          ) +
                          " | " +
                          format(
                            new Date(item.transactionPostDate),
                            "hh:mm a"
                          )
                          : "-"}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={clsx(
                          item?.isCredit ? classes.text : classes.text2
                        )}
                      >
                        ₹{Utils.CommonFunctions.decimalFlat(
                          item?.amount,
                          0
                        )}
                      </Typography>
                    </div>

                    {/* <div className={classes.innerBox}>
                          <Typography
                            variant="body1"
                            className={clsx(
                              item?.isCredit ? classes.text : classes.text2
                            )}
                          >
                            ₹ {item.amount}
                          </Typography>
                        </div> */}
                  </div>
                  <Divider className={classes.dividerClass} light />

                </Hidden>
              </>
            );
          })}
          {/* {isFetching && walletData.nextPage !== -1 && ( */}
          {isFetching && walletData.nextPage !== -1 && (
            <div className={classes.loader}>
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="primary" />
              </Backdrop>
            </div>
          )}
        </>
      ) : (
        <>
          <Hidden xsDown>
            <div></div>
          </Hidden>
          <Hidden smUp>
            <Box className={classes.secndTitle}>
              <Typography variant={"h1"} className={classes.heading}>
                Wallet History
              </Typography>
              <OrderNotFound
                message="No Data Found"
                noDataFoundIcon={true}
                hideButton={true}
              />
            </Box>
          </Hidden>
        </>
      )
      }
    </div >
  );
};

export default OrderHistoryList;
