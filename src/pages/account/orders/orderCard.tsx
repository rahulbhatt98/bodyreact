import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  Divider,
  Typography,
  Hidden,
} from "@material-ui/core";
import Utils from "../../../utils";
import clsx from "clsx";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderCardRoot: {
      border: "2px solid var(--border-color)",
      borderRadius: 4,
      padding: theme.spacing(2, 1.5),
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down("xs")]: {
        border: "none",
        padding: theme.spacing(1,1.5,0, 1.5),

        // borderBottom:"2px solid var(--border-color)",
        // margin:"7px"
      },
    },
    orderBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.6)}px Work Sans`,
      color: "var(--white)",
      padding: theme.spacing(1, 1.5),
    },
    divider: {
      backgroundColor: "var(--border-color)",
      margin: theme.spacing(1.5, 0),
    },
    productCard: {
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
      "&:not(:last-child)": {
        marginBottom: theme.spacing(1.5),
      },
    },
    leftDiv: {},
    shipment: {
      font: `normal 600 ${theme.spacing(1.5)}px Work Sans`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
    },
    item: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--secondary-black)",
    },
    imgAndNameDiv: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(1),
    },
    imgDiv: {
      backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      height: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      objectFit: "cover",
    },
    noImgBackground: {
      padding: "10px",
    },
    img: {},
    detailsDiv: {
      marginLeft: theme.spacing(1),
    },
    productName: {
      font: `normal ${theme.spacing(
        1.7
      )}px Work Sans Bold`,
      color: "var(--secondary-black)",
      lineHeight: 1.5,
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      padding: "5px 0px"
    },
    rightDiv: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "column",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing(1),
      },
    },
    shippedBtn: {
      borderRadius: 4,
      font: `normal ${theme.spacing(1.2)}px Work Sans SemiBold`,
      color: theme.palette.primary.main,
      textTransform: "capitalize",
      letterSpacing: 0.5,
      padding: theme.spacing(0.7, 1.5),
    },
    errBtn: {
      borderRadius: "4px",
      backgroundColor: "#F44336",
      color: "#FFFFFF",
    },
    orderIdMobile: {
      font: `normal ${theme.spacing(1.7)}px Work Sans SemiBold`,
      lineHeight: "18.77px"

    },
    orderIdContainerMobile: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    outerDiv2: {
      width: "100%",
      padding: theme.spacing(3, 0),
    },
    capitalize: {
      textTransform: "capitalize"
    }
  })
);
interface Props {
  order: any;
}

const OrderCard = ({ order }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const dispatch = useDispatch();

  const redirectToOrderDetail = (order: any,item:any) => {
    dispatch({ type: "orderHistoryData", payload: {} });
    dispatch({ type: "orderHistoryList", payload: [] });
    dispatch({ type: "orderHistoryFlag", payload: true });
    const path = Utils.CommonFunctions.replaceUrlParams(
      Utils.routes.ORDER_DETAIL,
      { ":id": order._id, ":item_id": item?._id }
    )
    history.push({
      pathname: path,
      state: { pageName: "Order Detail" }
    });
    // history.push(path)
  }
  return (
    <div
      key={order?._id || Math.random()}
      className={classes.orderCardRoot}
    >


      {order?.items?.map((item: any, index: any) => {
        const unixTimestamp = order.createdAt;
        const dateObject = new Date(unixTimestamp);
        const options: any = {
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        const orderDate = dateObject.toLocaleDateString("en-US", options);
        // const orderStatusText = item?.orderStatus ? orderStatus[item.orderStatus]?.split('_').join(' ')?.toLowerCase() : ''
        // const orderStatusText = item?.orderStatus
        //   ? Utils.constants.filterOption.find(
        //     (filterItem: any) => filterItem.id === item.orderStatus
        //   )?.label
        //   : "";
        const orderStatusTag = item?.orderStatus
          ? Utils.constants.filterOption.find(
            (filterItem: any) => filterItem.id === item.orderStatus
          )?.tag
          : "";
        const paymentMethodSources = Utils.constants.PAYMENT_METHOD_SOURCE;
        const paymentMethod = paymentMethodSources.find((item: any) => item?.id === order?.paymentMethodSource)?.tag || ""
        const tag = orderStatusTag && (
          <Button
            color="secondary"
            variant="contained"
            className={
              item.orderStatus === 12 ||
                item.orderStatus === 3 ||
                item.orderStatus === 4
                ? clsx(classes.shippedBtn, classes.errBtn)
                : classes.shippedBtn
            }
          >
            {/* {orderStatusText.slice(6)} */}
            {orderStatusTag || ""}
          </Button>
        )

        return (
          <>
            <Hidden xsDown>
              <div>
                {
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.orderBtn}
                    onClick={() => redirectToOrderDetail(order,item)}

                  >
                    {order.orderId}
                  </Button>
                }
              </div>
              <Divider className={classes.divider} />
            </Hidden>
            <Hidden smUp>
              <div className={classes.orderIdContainerMobile}>
                <Typography className={classes.orderIdMobile}> {order.orderId}</Typography>
                <div>
                  {tag}
                </div>
              </div>
            </Hidden>
            <div className={classes.productCard} key={item?._id || Math.random()}
              onClick={() => redirectToOrderDetail(order,item)}
            >
              <div className={classes.leftDiv}>

                {order?.items?.length > 1 &&
                  <Typography className={classes.shipment}>Shipment {`${index + 1}/${order?.items?.length}`} - {item?.shipmentId}</Typography>
                }
                {/* <Typography className={classes.shipment}>
                  {orderStatusText || ""}
                </Typography> */}
                <Typography className={classes.item}>
                  {order?.items?.length > 1 ?
                    <>
                      {`${item?.itemCount ?? 0}${item?.itemCount > 1 ? " Items" : " Item"}`}
                    </> :
                    <>
                      {`${order?.totalQuantity ?? 0}${order?.totalQuantity > 1 ? " Items" : " Item"}`}
                    </>
                  }
                </Typography>
                <div className={classes.imgAndNameDiv}>
                  <div
                    className={
                      item?.image?.[0]?.file
                        ? classes.imgDiv
                        : clsx(classes.imgDiv, classes.noImgBackground)
                    }
                  >
                    {item?.image?.[0]?.file ? (
                      <img
                        src={`${IMAGE_URL}/catalog/product${item.image[0].file}`}
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
                    <Typography className={classes.productName}>
                      {item?.name || ""} {item?.itemCount > 1 ? ` + ${item?.itemCount - 1}` : ""}
                    </Typography>
                    {orderDate && !order?.orderCancelDate ?
                      <Typography className={classes.productWeight}>
                        Order Date :
                        {Utils.CommonFunctions.formatDate(orderDate, " D MMMM, Y")}
                      </Typography> : ""
                    }

                    {order?.orderCancelDate ?
                      <Typography className={classes.productWeight}>
                        Cancelled Date :
                        {Utils.CommonFunctions.formatDate(order.orderCancelDate, " D MMMM, Y")}
                      </Typography>
                      : null
                    }
                    <Typography className={clsx(classes.productWeight, classes.capitalize)}>
                      {`Paid Via : ${paymentMethod || ""}`}
                      {/* {paymentMethod || ""} */}
                    </Typography>

                  </div>

                </div>
              </div>
              <Hidden xsDown>
                <div className={classes.rightDiv}>
                  <div>
                    {tag}
                  </div>
                  {/* <Typography className={classes.productName}>
                  ₹{order?.grandTotal || 0}
                </Typography> */}
                </div>
              </Hidden>
            </div>
          </>
        );
      })}
      <Hidden smUp>
        <Divider className={classes.divider} />
      </Hidden>
    </div>
  );
};

export default OrderCard;
