import { makeStyles, createStyles, Theme, Typography, Button, Hidden } from "@material-ui/core";
import Utils from "../../../../utils";
import DeliverySummery from "./deliverySummery";
import OrderItem from "./orderItem";
import OrderStatus from "./orderStatus";
import PaymentSummary from "./paymentSummery";
import React, { useEffect, useState } from "react";
import { getOrderDetails } from "./action";
import { ReducersModal } from "../../../../models";
import { useSelector, useDispatch } from "react-redux";
import { hideSkeleton, showSkeleton } from "../../../home/actions";
import Skeleton from "@mui/material/Skeleton";
import { useHistory } from "react-router";
import { getOrderList } from "../../../help&Support/action";
import RatingModal from "../../../rating&review/rating";
import BreadCrumb from "../../../../components/breadCrumb";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderDetailsRoot: {
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2),

      }
      // padding: theme.spacing(2),

    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
      padding: theme.spacing(1, 0),
    },
    breadcrumb: {
      marginLeft: "-4px"
    },
    headingDiv: {
      display: "flex",
      flexDirection: "row",
      margin: theme.spacing(1, 0),
      justifyContent: "space-between"
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
      textTransform: "uppercase",
      lineHeight: "19px",
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(  --light-gray)",
      lineHeight: "15px",
    },
    product: {
      display: "flex",
      padding: theme.spacing(1.5, 0),
      borderBottom: "1px solid var(--text-color)",
      borderTop: "1px solid var(--text-color)",
      alignItems: "stretch",
      flexWrap: "wrap",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexWrap: "nowrap",
        alignItems: "start"
      }
    },
    leftDiv: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(1),
      }
    },
    imgDiv: {
      backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      height: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      '& img': {
        objectFit: "cover"
      }
    },
    detailsDiv: {
      marginLeft: theme.spacing(1),
    },
    productName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 1.5,
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
    },
    rightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down(500)]: {
        width: "100%",
        marginTop: theme.spacing(1),
        flexBasis: "10%"
      },
    },
    skeletonClass: {
      margin: theme.spacing(1, 0),
    },
    skeletonRightContent: {
      display: "flex"
    },
    btnHelp: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
      }
    },
    btnReturn: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      marginLeft: "10px"
    },
    buttonContainer: {
      display: "flex"
    }
  })
);

function OrderDetails(props: any) {
  const classes = useStyles();
  const id = props?.match?.params?.id || null;
  const itemId = props?.match?.params?.item_id || null;
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const [ratingModalVisibility, setRatingModalVisibility] = useState(false)
  let selectedItem = orderDetail?.items?.find((item: any) => item._id === itemId)
  // let selectedItem = orderDetail?.items?.[0]
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const dispatch = useDispatch();
  const history = useHistory()


  const getDetails = () => {
    dispatch(showSkeleton())
    getOrderDetails({ id, itemId }).then((resp: any) => {


      setOrderDetail(resp?.data?.data || {})
      dispatch({ type: "selectedOrder", payload: resp?.data?.data || {} })
      dispatch({ type: "selectedOrderForReturn", payload: {} })
      dispatch(hideSkeleton())
    }).catch((err) => {
      if (err?.response?.data?.message) {
        dispatch({
          type: "show-alert", payload: {
            type: "error",
            message: err.response.data.message === 'Try again later!' ? 'Something went wrong!': err.response.data.message
          }
        })
        history.push(Utils.routes.ORDER_HISTORY);
      }
      dispatch(hideSkeleton());

    })
  };

  // var result = []

  // React.useEffect(() => {
  //   // Return the end result
  //   result = orderDetail?.items?.length && orderDetail?.items?.reduce((result: Array<any>, currentValue: any, index: any) => {
  //     result[index] = currentValue
  //     // If an array already present for key, push it to the array. Else create an array and push the object
  //     // (result[currentValue[]] = result[currentValue[]] || []).push(
  //     //   currentValue
  //     // );
  //     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
  //     return result;
  //   }, {});

  // }, [orderDetail]);


  React.useEffect(() => {
    if (itemId) {
      getDetails();
    }
  }, [itemId]);

  React.useEffect(() => {
    window.scroll(0, 0)
    if (!itemId) {
      getDetails();
    }
    // return ()=>{
    //   localStorage.removeItem("isMembershipAdded")
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("isMembershipAdded", orderDetail?.isMembershipAdded?.toString());
  }, [orderDetail?.isMembershipAdded])

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  const handleClick = (item: any) => {
    // const filteredData = orderList.filter((item: any) => item._id === id);
    const id = item?.items?.[0]?._id || null
    dispatch(
      getOrderList(`?limit=1&page=1&itemId=${id}`, (resp: any) => {
        if (resp)
          history.push({ pathname: Utils.routes.NEED_HELP, state: { data: resp?.data?.[0] || {}, pageName: "Help & Support" } })

      })
    );
    // history.push({ pathname: Utils.routes.NEED_HELP, state: { data: item || [] } })

  }

  let amount = selectedItem?.price ?? orderDetail?.giftCard?.amount
  return (
    <div className={classes.orderDetailsRoot}>
      <div className={classes.maxWidthDiv}>
        <Hidden xsDown>
          <div className={classes.breadcrumb}>
            <BreadCrumb
              breadcrumb={[
                // { title: "My Account", action: Utils.routes.MY_PROILE },
                { title: "Order History", action: Utils.routes.ORDER_HISTORY },
                { title: "Order Details", action: "#" },
              ]}
            />
          </div>
        </Hidden>

        <div className={classes.headingDiv}>
          {skeletonLoader ?
            <>
              <Skeleton variant="rectangular" width={150} height={20} className={classes.skeletonClass} />
              <Skeleton variant="rectangular" width={180} height={10} className={classes.skeletonClass} />
            </>
            :
            <>
              <div>
                <Typography className={classes.heading}>
                  {orderDetail?.orderId}
                </Typography>
                <Typography className={classes.subHeading}>
                  Order Date : {Utils.CommonFunctions.formatDate(orderDetail?.createdAt, "D MMMM, Y")}
                </Typography>

              </div>
              <div className={classes.buttonContainer}>
                <Hidden xsDown>
                  {orderDetail?.orderType !== Utils.constants.CART_TYPE.BAG &&
                    <div>
                      <Button
                        className={classes.btnHelp}
                        variant="contained"
                        color="primary"
                        onClick={() => handleClick(orderDetail)}
                      >
                        Need Help
                      </Button>
                    </div>
                  }

                </Hidden>

                {orderDetail?.orderType !== Utils.constants.CART_TYPE.EGIFT &&
                  orderDetail?.finalOrderStatus === 9 && orderDetail?.items?.[0]?.isReviewAllowed &&
                  <div>
                    <Button
                      className={classes.btnHelp}
                      variant="outlined"
                      color="primary"
                      onClick={() => setRatingModalVisibility(true)}
                    >
                      Rate Product
                    </Button>
                  </div>
                }



                {orderDetail?.orderType !== Utils.constants.CART_TYPE.BAG && (orderDetail?.items?.[0]?.orderStatus === 12) &&
                  <>
                    <Button
                      className={classes.btnReturn}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history.push({
                          pathname: "/send-gift-card", search: "?activeStep=5",
                          state: {
                            flag: "retry",
                            mongoOrderId: orderDetail?._id || "",
                            paymentMethodId: orderDetail?.paymentMethodId || "",
                            itemId: orderDetail?.items?.[0]?._id
                          }
                        })
                      }}
                    >
                      Retry Payment
                    </Button>
                  </>
                }
              </div>

            </>
          }
        </div>
        {
          <>
            <div className={classes.product}>
              <div className={classes.leftDiv}>
                {
                  skeletonLoader ? <>
                    <Skeleton width={80} height={80} />
                  </> :
                    <div className={classes.imgDiv}>
                      {selectedItem?.image?.length ? (
                        <img
                          src={`${IMAGE_URL}catalog/product${selectedItem?.image?.[0]?.file}`}
                          alt="img one"
                        />
                      ) : (
                        <img src={Utils.images.PRODUCT_PLACEHOLDER} alt="img one" />
                      )}
                    </div>
                }
                <div className={classes.detailsDiv}>

                  {skeletonLoader ?
                    <> <Skeleton width={180} height={20} />
                      <Skeleton width={120} height={10} />
                    </>
                    :
                    <>
                      <Typography className={classes.productName}>
                        {selectedItem?.name}
                      </Typography>
                      <Typography className={classes.productWeight}>
                        {/* Order by {fullName} */}
                        Quantity : {selectedItem?.quantity || 0}
                      </Typography>
                    </>
                  }
                </div>
              </div>
              <div className={classes.rightDiv}>
                {skeletonLoader ?
                  <Skeleton width={60} height={20} />
                  : <Typography className={[classes.productName].join(" ")}>
                    {amount ? `₹${Utils.CommonFunctions.addCommaToAmount(amount)}` : null}
                  </Typography>
                }
              </div>
            </div>
          </>
        }
        <OrderStatus getDetails={getDetails} selectedItem={selectedItem} orderDetail={orderDetail} />
        <Hidden smUp>
          {orderDetail?.orderType !== Utils.constants.CART_TYPE.BAG &&
            <Button
              fullWidth
              className={classes.btnHelp}
              variant="contained"
              color="primary"
              onClick={() => handleClick(orderDetail)}
            >
              Need Help
            </Button>
          }

        </Hidden>
        <DeliverySummery orderDetail={orderDetail} />
        {orderDetail?.items?.length > 1 && (
          <OrderItem orderDetail={orderDetail} itemId={itemId} selectedItem={selectedItem} />
        )}
        <PaymentSummary orderDetail={orderDetail} />
      </div>
      {ratingModalVisibility && (
        <RatingModal
          callback={() => { getDetails() }}
          product={orderDetail?.items?.[0]}
          // sku={orderDetail?.items?.[0]?.sku ? orderDetail?.items?.[0]?.sku : null}
          open={ratingModalVisibility}
          handleClose={() => {
            setRatingModalVisibility(false);
          }}
        />
      )}
    </div>
  );
}

export default OrderDetails;
