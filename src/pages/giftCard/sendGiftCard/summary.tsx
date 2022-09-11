import {
  createStyles,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckbox from "../../../components/common/customCheckbox";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summaryDiv: {
      background: "var(--white)",
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      padding: theme.spacing(2),
      margin: theme.spacing(3, 2),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
        margin: theme.spacing(3, 0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      letterSpacing: "0.08em",
    },
    innerContainer: {
      margin: theme.spacing(2, 0),
    },
    title: {
      font: `normal ${theme.spacing(1.6)}px Work Sans`,
      fontWeight: 500,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      margin: theme.spacing(0.8, 0),
    },
    subTitle: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "18px",
      color: "var(--secondary-black)",
      margin: theme.spacing(0.8, 0),
    },
    secondDiv: {
      margin: theme.spacing(1.5, 0),
    },
    subMessage: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      fontWeight: "normal",
      lineHeight: "18px",
      color: "var(--secondary-black)",
      margin: theme.spacing(0.8, 0),
    },
    divider: {
      border: "1px solid #F2F2F2",
      margin: theme.spacing(1.5, 0, 1.5, 0),
    },

    fundName: {
      font: `normal ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: "normal",
      lineHeight: "16px",
      color: "var(--light-gray)",
      margin: theme.spacing(0.8, 0),
    },
    btn: {
      width: "90%",
    },
    checkbox: {
      float: "right",
      verticalAlign: "center",
    },
    donateContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectedDiv: {
      display: "flex",
      alignItem: "center",
      justifyContent: "start",
    },
    selectedText: {
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    selectedImg:{
      width: theme.spacing(8),
      height: theme.spacing(8),
      objectFit: "fill",
      marginRight: theme.spacing(1)
    },
    subText:{
      font: `normal 700 ${theme.spacing(1.4)}px Work Sans`,
      color: "var(--black)",
    },
    selectedTitle:{
      font: `normal 700 ${theme.spacing(1.2)}px Work Sans`,
      color: "var(--main-opacity)",
      margin: theme.spacing(0.4, 0),
    }
  })
);
interface Props {
  details: any;
  deliveryDetails?: any;
  selectedDesign?: any;
  selectedAmount: any;
  setDonationAmount: Function;
  donationAmount: number;
}

const Summary: React.FC<Props> = ({
  details,
  deliveryDetails,
  selectedDesign,
  selectedAmount,
  setDonationAmount,
  donationAmount,
}) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  const dispatch = useDispatch();
  const configDonationAmount = useSelector(
    (state: ReducersModal) =>
      state.configReducer.generalConfigs?.donation_amount
  );
  const eCardSummary =
    useSelector((state: ReducersModal) => state.giftReducer).eCardSummary || {};
  const onChange = (e: any) => {
    let amount = configDonationAmount ? Number(configDonationAmount) : 0;
    if (e.target.checked) {
      setDonationAmount(amount ? Number(amount) : 0);
    } else {
      amount = 0;
      setDonationAmount(0);
    }
    dispatch({
      type: "eCardSummary",
      payload: {
        ...eCardSummary,
        donationDetails: {
          donation: {
            donationType: "checkout_section",
            donationAmount: amount,
          },
        },
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={classes.summaryDiv}>
        <Typography className={classes.heading}>Summary</Typography>
        <div className={classes.innerContainer}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title}>Recipient Name:</Typography>
              <Typography className={classes.subTitle}>
                {details?.receiversName || ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title}>
                Recipient Email:
              </Typography>
              <Typography className={classes.subTitle}>
                {details?.emailId || ""}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.secondDiv}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title}>
                Recipient Mobile:
              </Typography>
              <Typography className={classes.subTitle}>
                +91{details?.mobileNumber || ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title}>Customer Name:</Typography>
              <Typography className={classes.subTitle}>
                {details?.name || ""}
              </Typography>
            </Grid>
          </Grid>
          <Hidden smUp>
            <div className={classes.selectedDiv}>
              <img
                src={
                  selectedDesign?.image?.[0]?.file
                    ? `${IMAGE_URL}catalog/product${selectedDesign?.image[0].file}`
                    : Utils.images.PRODUCT_PLACEHOLDER
                }
                alt="selectedImage"
                className={classes.selectedImg}
              />
              <div className={classes.selectedText}>
                <Typography className={classes.subText}>
                  {selectedDesign?.name}
                </Typography>
                <Typography className={classes.selectedTitle}>
                  Selected Design
                </Typography>
              </div>
            </div>
          </Hidden>
          {details?.message && (
            <Grid container className={classes.secondDiv}>
              <Grid item xs={12} md={6}>
                <Typography className={classes.title}>Message:</Typography>
                <Typography className={classes.subMessage}>
                  {details.message}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid container className={classes.secondDiv}>
            <Grid item xs={12} md={12}>
              <Divider className={classes.divider} />
              <div className={classes.donateContainer}>
                <div>
                  <Typography className={classes.title}>
                    Donate ₹ {Utils.CommonFunctions.addCommaToAmount(configDonationAmount)}
                  </Typography>
                  <Typography className={classes.fundName}>
                    Feeding India Foundation
                  </Typography>
                </div>
                <CustomCheckbox
                  checked={donationAmount ? true : false}
                  onChange={onChange}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Summary;
