import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../../../utils";
import { ReducersModal } from "../../../../models";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
// import { useHistory } from "react-router";
// import de from "date-fns/esm/locale/de/index.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderItemRoot: {
      borderBottom: "1px solid var(--text-color)",
      // borderTop: "1px solid var(--text-color)",
      padding: theme.spacing(1.5, 0),
      display: "flex",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    leftDiv: {
      flexBasis: "25%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
    },
    rightDiv: {
      flexBasis: "75%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        marginTop: theme.spacing(1),
      },
    },
    product: {
      display: "flex",
      alignItems: "stretch",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "&:not(:last-child)": {
        marginBottom: theme.spacing(1),
      },
      [theme.breakpoints.down("xs")]: {
        flexWrap: "inherit",
      },
    },
    innerleftDiv: {
      display: "flex",
      alignItems: "center",
    },
    imgDiv: {
      // backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      maxWidth: "100%",
    },
    img: {},
    detailsDiv: {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("xs")]:{
        flexBasis: "80%"
      }
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
    innerrightDiv: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        // width: "100%",
        // marginTop: theme.spacing(1),
        // flexBasis: "0%",
        marginLeft: theme.spacing(1),
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "center",
      },
      justifyContent: "center",
    },
    skeletonClass: {
      margin: theme.spacing(1, 0),
    },
    img2: {
      // width: "90px",
      // height: "90px",
      // objectFit: "cover",
      width: "100%",
      height: "100%",
      aspectRatio: "2/2",
    },
  })
);

interface Props {
  orderDetail: any;
  itemId?: any;
  selectedItem: any;
}

function OrderItem(props: Props) {
  const classes = useStyles();
  // const itemId = props?.itemId
  // const selectedItem = props?.selectedItem
  // const history = useHistory();
  let { orderDetail, itemId } = props;
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const fullName =
    useSelector(
      (state: ReducersModal) => state.userDetailReducer.userInfo?.fullName
    ) || "";

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  // const handleClick = (itemId: any) => {
  //   history.push(
  //     Utils.CommonFunctions.replaceUrlParams(
  //       Utils.routes.ORDER_DETAIL,
  //       { ":id": orderDetail._id, ":item_id": orderDetail?.items?.length > 1 ? itemId : "" }
  //     )
  //   );
  // }

  let shipmentData = orderDetail?.items?.reduce((obj: any, v: any) => {
    obj[v.shipmentId] = (obj[v.shipmentId] || 0) + 1;
    return obj;
  }, {});

  shipmentData = Object.keys(shipmentData);
  let totalShipment = shipmentData.length;
  return (
    <div key={itemId + Math.random()} className={classes.orderItemRoot}>
      <div className={classes.leftDiv}>
        {skeletonLoader ? (
          <Skeleton width={130} height={20} />
        ) : (
          <Typography className={classes.heading}>
            Other Items in this Order
          </Typography>
        )}
      </div>
      <div className={classes.rightDiv}>
        {orderDetail?.items?.map((item: any, index: any) => {
          let shipment = shipmentData.indexOf(item?.shipmentId);
          shipment = shipment > -1 ? ++shipment : 0;
          return (
            index > 0 && (
              // <div className={classes.product} key={index} onClick={() => handleClick(item?._id)}>
              <div className={classes.product} key={item?._id || Math.random()}>
                <div className={classes.innerleftDiv}>
                  {skeletonLoader ? (
                    <Skeleton width={80} height={80} />
                  ) : (
                    <div className={classes.imgDiv}>
                      {item?.image?.length ? (
                        <img
                          src={`${IMAGE_URL}catalog/product${item?.image?.[0]?.file}`}
                          alt="img one"
                          className={classes.img2}
                        />
                      ) : (
                        <img
                          src={Utils.images.PRODUCT_PLACEHOLDER}
                          alt="img one"
                          className={classes.img2}
                        />
                      )}
                    </div>
                  )}
                  <div className={classes.detailsDiv}>
                    {skeletonLoader ? (
                      <>
                        <Skeleton
                          variant="rectangular"
                          width={180}
                          height={10}
                          className={classes.skeletonClass}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={20}
                          className={classes.skeletonClass}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={180}
                          height={10}
                          className={classes.skeletonClass}
                        />
                      </>
                    ) : (
                      <>
                        {item?.shippingData?.length ? (
                          <Typography className={classes.productWeight}>
                            Shipment{" "}
                            {`${shipment}/${totalShipment} - ${item?.shipmentId}`}
                          </Typography>
                        ) : null}
                        <Typography className={classes.productName}>
                          {item.name}
                        </Typography>
                        <Typography className={classes.productWeight}>
                          {/* Order by {fullName} */}
                          Quantity : {item?.quantity || 0}
                        </Typography>
                      </>
                    )}
                  </div>
                </div>
                <div className={classes.innerrightDiv}>
                  {skeletonLoader ? (
                    <Skeleton width={60} height={20} />
                  ) : (
                    <Typography className={[classes.productName].join(" ")}>
                      ₹{Utils.CommonFunctions.addCommaToAmount(item.price)}
                    </Typography>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default OrderItem;
