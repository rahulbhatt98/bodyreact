import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import Utils from "../../../utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../models";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import MyOrdersSkeleton from "../../../components/common/skeletonList/myOrderSkeleton";
import format from "date-fns/format";
import clsx from "clsx";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 1),
    },
    errBtn: {
      borderRadius:"4px",
      backgroundColor: "#F44336 !important",
      color: "#FFFFFF !important",
    },
    heading: {
      font: `normal ${theme.spacing(
        1.8
      )}px Recoleta Alt Bold`,
      letterSpacing: "0.08em",
      lineHeight: "24px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
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

      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
    leftDiv: {
      display: "flex",
      alignItems: "stretch",
      // justifyContent:"space-between"

    },
    imgDiv: {
      // backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
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
      // [theme.breakpoints.down("xs")]:{
      //   marginRight: theme.spacing(1),
      // }
    },
    productName: {
      font: `normal ${theme.spacing(
        1.5
      )}px Work Sans Bold`,
      color: "var(--secondary-black)",
      lineHeight: 2.5,
      
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
      font: `normal ${theme.spacing(1.3)}px Work Sans regular`,
      lineHeight: "15px",
      color: "var(--light-gray)",
      marginTop: "6px",
      textTransform: "capitalize",
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
      font: `normal ${theme.spacing(1.2)}px Work Sans SemiBold`,
      color: theme.palette.primary.main,
      textTransform: "capitalize",
      letterSpacing: 0.5,
      padding: theme.spacing(0.7, 1.5),
    },
  })
);

const Products = () => {
  const classes = useStyles();
  const [orderList, setOrderList] = useState<any>([]);
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const location: any = useLocation();
  const data = location?.state?.data ? [location.state.data] : [];
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  // const { listData } = useSelector((state: ReducersModal) => {
  //   return state.orderListReducer;
  // });

  // const dispatch = useDispatch();
  useEffect(() => {
    setOrderList(data);
  }, []);

  return (
    <div className={classes.root}>
     
      {skeletonLoader ? (
        <Skeleton variant="rectangular" />
      ) : (
        orderList &&
        orderList?.length > 0 ?
        <Typography variant="h1" className={classes.heading}>
          Need help with recent purchase ?
        </Typography>
        :null
      )}
      {skeletonLoader ? (
        <MyOrdersSkeleton flag ="need_help" sections={[1]} hideCheckBox={true} />
      ) : (
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
                  <div className={classes.product} key={item._id}>
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
                        <Typography className={classes.productName}>
                          {item.items.name}
                        </Typography>

                        <Typography className={classes.productPrice}>
                          ₹{Utils.CommonFunctions.addCommaToAmount(item?.items?.totalPrice)}
                        </Typography>
                        <Typography className={classes.productDate}>
                          Order Date :{" "}
                          {item.createdAt
                            ? format(new Date(item.createdAt), "dd MMMM yyyy")
                            : "-"}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.rightDiv}>
                      <div className={classes.priceContainer}>
                        {orderStatusTag && (
                          <Button
                            color="secondary"
                            variant="contained"
                            className={
                              item.items.orderStatus === 12 ||
                                item.items.orderStatus === 3 ||
                                item.items.orderStatus === 4
                                ? clsx(classes.shippedBtn, classes.errBtn)
                                : classes.shippedBtn
                            }

                          // className={
                          //   item.items.orderStatus === 3 ||
                          //   item.items.orderStatus === 4
                          //     ? clsx(classes.shippedBtn, classes.errBtn)
                          //     : classes.shippedBtn
                          // }
                          >
                            {orderStatusTag || ""}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Products;
