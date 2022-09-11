import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import Utils from "../../utils";
import { useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../models";
import { Box } from "@mui/system";
import MyOrdersSkeleton from "../../components/common/skeletonList/myOrderSkeleton";
import { useEffect, useState } from "react";
import { getOrderList } from "./action";
import format from "date-fns/format";
import clsx from "clsx";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errBtn: {
      borderRadius:"4px",
      backgroundColor: "#F44336 !important",
      color: "#FFFFFF !important",
    },
    root: {
      margin: theme.spacing(3, 1),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt Bold`,
      letterSpacing: "0.08em",
      lineHeight: "24px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
        lineHeight: "24px",
      }
    },
    innerContainer: {},

    product: {
      display: "flex",
      padding: theme.spacing(2, 0),
      borderBottom: "1px solid var(--text-color)",
      alignItems: "stretch",
      // flexWrap: "wrap",
      justifyContent: "space-between",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      [theme.breakpoints.down("xs")]: {
        display:"block"
      }
    },
    skeleton: {
      margin: theme.spacing(1.2, 0),
    },
    leftDiv: {
      display: "flex",
      alignItems: "stretch",
      

    },
    imgDiv: {
      // backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        width:"25%"
      }
    },
    img: {
      width: "80px",
      height: "80px",
      objectFit: "cover",

    },
    detailsDiv: {
      marginLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        width:"75%",

      }
    },
    mobileContent:{
      display:"flex",
      alignItems:"baseline",
      justifyContent:"space-between",
      [theme.breakpoints.down("xs")]: {
        width:"100%",
        justifyContent: "space-between",

      }
    },
    mobileBtn:{
      marginRight: theme.spacing(1),
      width: "160px"
    },
    productName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 2.5,
      [theme.breakpoints.down("xs")]: {
        lineHeight: 1.6,
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Bold`,
      }
    },
    productPrice: {
      font: `normal ${theme.spacing(
        1.5
      )}px Work Sans Bold`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      lineHeight: "18px",
     
    },
    rightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.down(769)]: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginTop: theme.spacing(1),
      },
    },
    deleteDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    priceContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-end",
      },
    },

    amount: {
      textAlign: "right",
    },

    prodImage: {
      width: "80px",
      height: "80px",
    },
    productDate: {
      font: `normal ${theme.spacing(1.3)}px Work Sans`,
      lineHeight: "15px",
      fontWeight: 400,
      color: "var(--light-gray)",
      marginTop: "6px",
      textTransform: "uppercase",
    },

    discount: {
      background: `url(${Utils.images.PRICE})  no-repeat`,
      padding: theme.spacing(0.5, 1.2),
      font: `normal ${theme.spacing(1.2)}px Work Sans`,
      lineHeight: "14px",
      fontWeight: 600,
      color: "var(--green-color)",
      textTransform: "uppercase",
    },
    discountPrice: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      lineHeight: "24px",
      fontWeight: 500,
      padding: theme.spacing(0, 1),
      color: "var(--light-gray)",
      textTransform: "uppercase",
      textDecorationLine: "line-through",
    },
    shippedBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.2)}px Work Sans SemiBold`,
      color: theme.palette.primary.main,
      textTransform: "capitalize",
      letterSpacing: 0.5,
      padding: theme.spacing(0.7, 1.5),
    },
    show: {
      font: `normal ${theme.spacing(1.4)}px Work Sans`,
      lineHeight: "16px",
      fontWeight: 500,
      color: "var(--green-color)",
      margin: theme.spacing(1, 0),
      cursor: "pointer"
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    date: {
      textTransform: "capitalize",
      font: `normal ${theme.spacing(1.3)}px Work Sans Regular`,
      lineHeight: "15px",
      color: "var(--light-gray)",
      marginTop: theme.spacing(0.6),

    }
  })
);

const RecentPurchase = () => {
  const classes = useStyles();
  const [orderList, setOrderList] = useState<any>([]);
  const [orderData, setOrderData] = useState<any>({});
  const history = useHistory();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const limit = 4;
  const [page, setPage] = useState(1);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  const dispatch = useDispatch();
  useEffect(() => {
    if (orderData?.nextPage === -1) {
      dispatch(
        getOrderList(`?limit=${limit}&page=${page}`, (resp: any) => {
          setOrderList(resp?.data);
          setOrderData(resp);
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      getOrderList(`?limit=${limit}&page=${page}`, (resp: any) => {
        if (page === 1) {
          setOrderList(resp?.data)
        } else {
          const arr = [...orderList, ...resp?.data];
          setOrderList(arr);
        }
        setOrderData(resp);

      })
    );
  }, [page]);

  const handleShowMore = () => {
    if (orderData?.nextPage !== -1) setPage(page + 1);
  };

  const handleShowLess = () => {
    setPage(1);
  };
  const handleClick = (item: any) => {
    // const filteredData = orderList.filter((item: any) => item._id === id);
    history.push({ pathname: Utils.routes.NEED_HELP, state: { data: item || [], pageName: "Help & Support" } })
  }

  return (
    <div className={classes.root}>
      {skeletonLoader ? (
        <Skeleton width={250} height={20} variant="rectangular" />
      ) : (
        orderList &&
          orderList?.length > 0 ? <Typography variant="h1" className={classes.heading}>
          Need help with recent purchase ?
        </Typography>
          : null
      )}
      <div className={classes.innerContainer}>
        {orderList &&
          orderList.length > 0 &&
          orderList.map((item: any, index: any) => {
            const orderStatusTag = item?.items?.orderStatus
              ? Utils.constants.filterOption.find(
                (filterItem: any) =>
                  filterItem.id === item?.items?.orderStatus
              )?.tag
              : "";

            return (
              <Box key={index}>
                {skeletonLoader ? (
                  <MyOrdersSkeleton flag="recent_purchase" hideCheckBox={true} />
                ) : (

                  <div className={classes.product} key={item._id} onClick={() => handleClick(item)}>
                    <div className={classes.leftDiv}>
                      <div className={classes.imgDiv}>
                        {item?.items?.image?.[0]?.file ? (
                          <img
                            src={`${IMAGE_URL}/catalog/product${item.items.image?.[0]?.file}`}
                            alt="product"
                            className={classes.img}
                          />
                        ) : (
                          <img
                            src={Utils.images.PRODUCT_PLACEHOLDER}
                            alt="product"
                            className={classes.img}
                          />
                        )}
                      </div>

                      <div className={classes.detailsDiv}>
                        <Hidden xsDown>
                          <>
                            <Typography className={classes.productName}>
                              {item?.items?.name}
                            </Typography>

                            <Typography className={classes.productPrice}>
                              ₹{Utils.CommonFunctions.addCommaToAmount(item?.items?.totalPrice)}
                            </Typography>
                          </>
                        </Hidden>
                        <Hidden smUp>
                          <div className={classes.mobileContent}>
                            <div className={classes.mobileBtn}>
                              <Typography className={classes.productName}>
                                {item?.items?.name}
                              </Typography>
                            </div>
                            <div className={classes.priceContainer}>
                              {orderStatusTag && (
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={
                                    item?.items?.orderStatus === 3 || item?.items?.orderStatus === 4 || item?.items?.orderStatus === 12
                                      ? clsx(classes.shippedBtn, classes.errBtn)
                                      : classes.shippedBtn
                                  }
                                >
                                  {orderStatusTag || ""}
                                </Button>
                              )}
                            </div>
                           
                          </div>
                          <Typography className={classes.productPrice}>
                                ₹{Utils.CommonFunctions.addCommaToAmount(item?.items?.totalPrice)}
                              </Typography>
                        </Hidden>
                        <Typography className={classes.date}>
                          Order Date :{" "}
                          {item.createdAt
                            ? format(new Date(item.createdAt), "dd MMMM yyyy")
                            : "-"}
                        </Typography>
                      </div>
                    </div>
                    <Hidden xsDown>
                      <div className={classes.rightDiv}>
                        <div className={classes.priceContainer}>
                          {orderStatusTag && (
                            <Button
                              color="secondary"
                              variant="contained"
                              className={
                                item?.items?.orderStatus === 3 || item?.items?.orderStatus === 4 || item?.items?.orderStatus === 12
                                  ? clsx(classes.shippedBtn, classes.errBtn)
                                  : classes.shippedBtn
                              }
                            >
                              {orderStatusTag || ""}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Hidden>
                  </div>

                )}
              </Box>
            );
          })}
        <div className={classes.center}>
          {skeletonLoader ? (
            <Skeleton variant="rectangular" width={100} height={20} />
          ) : orderData?.nextPage !== -1 ? (
            <Typography
              variant="body1"
              align="center"
              onClick={handleShowMore}
              className={classes.show}
            >
              Show more
            </Typography>
          ) : orderData?.totalCount > limit ? (
            <Typography
              variant="body1"
              align="center"
              onClick={handleShowLess}
              className={classes.show}
            >
              Show Less
            </Typography>
          ) : ""}
        </div>
      </div>
    </div>
  );
};

export default RecentPurchase;
