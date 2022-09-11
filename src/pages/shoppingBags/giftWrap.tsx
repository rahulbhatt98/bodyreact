import { createStyles, Hidden, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import Utils from "../../utils";
// import _ from "lodash";
import CustomCheckbox from "../../components/common/customCheckbox";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import { updateLocalCart } from "./action";
import { useDispatch } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import ShoppingListSkeleton from "../../components/common/skeletonList/shoppingListSkeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
    },

    productDiv: {},
    product: {
      display: "flex",
      padding: theme.spacing(1.5, 0),
      borderBottom: "1px solid var(--text-color)",
      alignItems: "stretch",
      // flexWrap: "wrap",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        // flexWrap: "wrap",
        padding: theme.spacing(1, 0),

      },
    },
    wishlistDiv: {
      display: "flex",
      cursor: "pointer",
      padding: theme.spacing(2, 0),
      // borderBottom: "1px solid var(--text-color)",
      alignItems: "stretch",
      // flexWrap: "wrap",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.4, 0),
        borderBottom: "1px solid var(--text-color)",

      }
    },
    leftDiv: {
      display: "flex",
      alignItems: "stretch",
      width: "82%",
    },
    imgDiv: {
      backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      padding: theme.spacing(2),
      width: "80px",
      height: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        width: "25px",
        height: "25px",
        padding: 0,
        backgroundColor: "transparent"
      }
    },
    img: {},
    wishDiv: {
      alignSelf: "center",
    },
    detailsDiv: {
      marginLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    },
    productName: {
      font: `normal ${theme.spacing(
        1.5
      )}px Work Sans SemiBold`,
      color: "var(--secondary-black)",
      lineHeight: 1.5,
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.5
        )}px Work Sans SemiBold`,
      }
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: "6px",
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]: {
        // fontSize: "10px",
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
      }
    },
    rightDiv: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
      [theme.breakpoints.down(769)]: {
        // flexDirection: "row-reverse",
        // justifyContent: "space-between",
        // width: "100%",
        // alignItems: "center",
        // marginTop: theme.spacing(1),
      },
    },
    wishRightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },

    amount: {
      textAlign: "right",
    },
    skeleton: {
      marginLeft: theme.spacing(1),
    },
    skeletonContainer: {
      display: "flex",
    },
    prodImage: {
      // width: "80px",
      // height: "80px",
    },
  })
);

const GiftWrap: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const shoppingBagReducer: any = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );

  const handleChange = (e: any) => {
    let params = {
      cartId: shoppingBagReducer._id,
      isOrderWrapped: e.target.checked,
      giftWrapAmount: giftWrapAmount,
      grandTotal: e.target.checked
        ? shoppingBagReducer.grandTotal + parseFloat(giftWrapAmount)
        : shoppingBagReducer.grandTotal - parseFloat(giftWrapAmount),
    };
    dispatch(updateLocalCart(params));
  };

  let giftFree =
    configs?.free_on_total > shoppingBagReducer.cartTotal
      ? configs?.free_on_total - shoppingBagReducer.cartTotal
      : 0;
  let giftWrapAmount = giftFree === 0 ? "0" : configs?.giftwrap_amount;

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <>
      <div className={classes.productDiv}>
        <Hidden smUp>
          {skeletonLoader ? (
            <div className={classes.skeletonContainer}>
              <Skeleton width={20} height={30} />
              <Skeleton className={classes.skeleton} width={100} height={30} />
            </div>
          ) : (
            <Link to={Utils.routes.WISHLIST}>
              <div className={classes.wishlistDiv}>
                <div className={classes.leftDiv}>
                  <div className={classes.wishDiv}>
                    <img src={Utils.images.HEART} alt="heart" />
                  </div>
                  <div className={classes.detailsDiv}>
                    <Typography className={classes.productName}>
                      Add from wishlist
                    </Typography>
                  </div>
                </div>
                <div className={classes.wishRightDiv}>
                  <img src={Utils.images.ARROW_ICON} alt="arrow" />
                </div>
              </div>
            </Link>
          )}
        </Hidden>
        {skeletonLoader ? (
          <ShoppingListSkeleton sections={[1]} />
        ) : (
          configs?.giftWrapStatus === 1 &&

          <div className={classes.product}>
            <div className={classes.leftDiv}>
              <div className={classes.imgDiv}>
                <Hidden xsDown>
                  <img
                    src={Utils.images.GIFT}
                    className={classes.prodImage}
                    alt="product"
                  />
                </Hidden>

                <Hidden smUp>
                  <img
                    src={Utils.images.GIFTICON}
                    alt="gift"
                    className={classes.prodImage}
                  />
                </Hidden>
              </div>
              <div className={classes.detailsDiv}>
                <Typography className={classes.productName}>
                  Add a gift wrap for{" "}
                  {giftWrapAmount && Number(giftWrapAmount) !== 0 ? `₹${Utils.CommonFunctions.addCommaToAmount(giftWrapAmount)}` : `free`}
                </Typography>
                {giftWrapAmount !== "0" ? (
                  <Typography className={classes.productWeight}>
                    Spend ₹{Utils.CommonFunctions.addCommaToAmount(giftFree)} more to get FREE GIFT WRAP
                  </Typography>
                ) : null}
              </div>
            </div>
            <div className={classes.rightDiv}>
              <Typography
                className={[classes.productName, classes.amount].join(" ")}
              >
                {giftWrapAmount !== "0" ? `₹ ${Utils.CommonFunctions.addCommaToAmount(giftWrapAmount)}` : null}
              </Typography>
              <CustomCheckbox
                checked={shoppingBagReducer.isOrderWrapped}
                onChange={(e: any) => handleChange(e)}
              />
            </div>
          </div>
        )}



        <Hidden xsDown>
          {skeletonLoader ? (
            <div className={classes.skeletonContainer}>
              <Skeleton width={20} height={30} />
              <Skeleton className={classes.skeleton} width={100} height={30} />
            </div>
          ) : (
            <Link to={Utils.routes.WISHLIST}>
              <div className={classes.wishlistDiv}>
                <div className={classes.leftDiv}>
                  <div className={classes.wishDiv}>
                    <img src={Utils.images.HEART} alt="heart" />
                  </div>
                  <div className={classes.detailsDiv}>
                    <Typography className={classes.productName}>
                      Add from wishlist
                    </Typography>
                  </div>
                </div>
                <div className={classes.wishRightDiv}>
                  <img src={Utils.images.ARROW_ICON} alt="arrow" />
                </div>
              </div>
            </Link>
          )}
        </Hidden>

      </div>
    </>
  );
};
export default GiftWrap;
