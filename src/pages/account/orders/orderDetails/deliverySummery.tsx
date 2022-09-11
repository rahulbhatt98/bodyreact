import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../../../utils";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import OrderStatusSkeleton from "../../../../components/common/skeletonList/orderStatusSkeleton";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    delieverySummeryRoot: {
      padding: theme.spacing(1.5, 0),
      borderBottom: "1px solid var(--text-color)",
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
    mainDiv: {
      display: "flex",
      alignItems: "center",
      "&:not(:last-child)": {
        marginBottom: theme.spacing(1.5),
      },
    },
    headingIcon: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--black)",
      marginLeft: theme.spacing(1),
    },
    skeltonView: {
      padding: theme.spacing(10, 0),
    }
  })
);

interface Props {
  orderDetail: any
}

function DeliverySummery(props: Props) {
  const classes = useStyles();
  let { orderDetail } = props
  const iconAndHeading = (icon: string, heading: string) => {
    return (
      <div className={classes.mainDiv}>
        <img src={icon} alt={icon} />
        <Typography className={classes.headingIcon}>{heading}</Typography>
      </div>
    );
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });

  return (
    <div className={classes.delieverySummeryRoot}>
      <div className={classes.leftDiv}>
        {skeletonLoader ?
          <Skeleton width={130} height={20} /> :
          <Typography className={classes.heading}> Order Summary</Typography>
        }
      </div>
      <div className={classes.rightDiv}>
        {skeletonLoader ? (
          <OrderStatusSkeleton hideRightContent={true} />) : (
          <>
            {iconAndHeading(Utils.images.USER_ICON, orderDetail?.orderType === Utils.constants.CART_TYPE.BAG ? (orderDetail?.address?.name || "") : (orderDetail?.giftCard?.receiverName) ? (orderDetail?.giftCard?.receiverName||"") : (orderDetail?.name || ""))}
            {iconAndHeading(Utils.images.PHONE, orderDetail?.orderType === Utils.constants.CART_TYPE.BAG ? `${(orderDetail?.address?.countryCode || "")} ${(orderDetail?.address?.mobileNo || "")}` : (orderDetail?.giftCard?.receiverMobile) ? (orderDetail?.giftCard?.receiverMobile||"") : (orderDetail?.mobileNo || ""))}
            {orderDetail?.orderType === Utils.constants.CART_TYPE.BAG ? iconAndHeading(
              Utils.images.SEARCH_SUMMARY_ICON,
              `${orderDetail?.address?.address1 || ""} ${orderDetail?.address?.address2 || ""} ${orderDetail?.address?.city || ""} ${orderDetail?.address?.state || ""} ${orderDetail?.address?.pincode || ""} ${orderDetail?.address?.country || ""}`
            ) : iconAndHeading(Utils.images.EMAIL_ICON, `${orderDetail?.email || ""}`)

            }
            {/* {iconAndHeading(Utils.images.DATE_ICON, "31st July, 2021 at 03:35 PM")} */}
            {orderDetail?.createdAt?iconAndHeading(Utils.images.DATE_ICON, Utils.CommonFunctions.formatDate(orderDetail?.createdAt, "Do MMM, YYYY  LT")):""}
          </>
        )}
      </div>
    </div>
  );
}

export default DeliverySummery;
