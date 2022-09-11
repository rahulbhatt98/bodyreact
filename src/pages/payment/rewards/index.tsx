
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Utils from "../../../utils";
import CustomCheckbox from "../../../components/common/customCheckbox";
import { ReducersModal } from "../../../models";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    walletBalanceDiv: {
      display: "flex",
      justifyContent: "space-between",
      border: "1px solid var(--border-color)",
      padding: theme.spacing(1.5),
      alignItems: "center",
      marginBottom: theme.spacing(1.5),
    },
    contentDiv: {
      display: "flex",
      alignItems: "center",
    },
    walletAndAvailableBalanceDiv: {
      marginLeft: theme.spacing(1),
    },
    walletBalance: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: theme.palette.primary.main,
      textTransform: "uppercase",
      [theme.breakpoints.down('xs')]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
        letterSpacing:"0.06em"

      }
    },
    availableBalance: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: theme.palette.primary.main,
      lineHeight: "24px",
      [theme.breakpoints.down('xs')]:{
        font: `normal ${theme.spacing(
          1.1
        )}px Work Sans Medium`,
        letterSpacing:"0.02em"
      }
    },
  })
);
interface Props {
  rewardData: any;
  setRewardChecked: Function;
  rewardChecked: any;
  walletChecked: boolean;
  walletBalance: any;
  setPaymentMode: Function;
  paymentMode?: "cod" | "netbanking" | "paytm" | "upi" | "wallet" | "reward" | undefined
  disablePaymentOptions: boolean
  rewardVisibility: boolean
}

const Rewards: React.FC<Props> = ({ rewardData, setRewardChecked, rewardChecked,
  walletBalance, walletChecked, setPaymentMode, disablePaymentOptions, rewardVisibility }) => {
  const classes = useStyles();
  const data: any = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  useEffect(() => {
    if(!rewardVisibility)
    setPaymentMode("reward")
  }, []);

  const onChange = (e: any) => {
    if ((e?.target?.checked &&
      // walletBalance < data?.grandTotal
      data?.grandTotal
      && walletChecked) || (e?.target?.checked && !walletChecked)) {
      setPaymentMode(walletChecked ? "wallet" : "reward"); //reward and wallet = wallet;
      setRewardChecked(true);
    }
    else {
      setRewardChecked(false);
      setPaymentMode(!walletChecked ? undefined : "wallet");
    }
  }

  return (!rewardVisibility ?
    <div className={classes.walletBalanceDiv}>
      <div className={classes.contentDiv}>
        <img src={Utils.images.REWARD_ICON} alt="reward" />
        <div className={classes.walletAndAvailableBalanceDiv}>
          <Typography className={classes.walletBalance}>Rewards</Typography>
          <Typography className={classes.availableBalance}>
            {/* Available Rewards Points: {rewardData.AvailablePoints} {`(₹${Utils.CommonFunctions.decimalFlat(rewardData?.PointValue ? Number(rewardData.PointValue) : 0)})`} */}
            Available Rewards Points: {rewardData.AvailablePoints} {`(₹${Utils.CommonFunctions.addCommaToAmount(rewardData.PointValue)})`}
          </Typography>
        </div>
      </div>
      {/* <div className={classes.checkboxDiv}>
        <img src={Utils.images.ARROW_ICON} alt="arrow" />
      </div> */}
      <div >
        <CustomCheckbox
          disabled={disablePaymentOptions && !rewardChecked}
          checked={rewardChecked}
          onChange={onChange}
          color="primary" />
      </div>
    </div>
    : null
  );
}

export default Rewards;
