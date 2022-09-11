import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
} from "@material-ui/core";
import Utils from "../../../utils";
import { useState } from "react";
import MoreBankOffer from "../../shoppingBags/MoreBankOffers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    yourCardRoot: {
      marginBottom: theme.spacing(1.5),
      border: "1px solid var(--border-color)",
    },
    yourCardDiv: {
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    yourCard: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      textTransform: "uppercase",
      color: "var(--green-color)",
      marginLeft: theme.spacing(1),
    },
    addNewCard: {
      font: `normal ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "16px",
      textTransform: "uppercase",
      color: "var(--black)",
    },
    divider: {
      border: "1px dashed rgba(178, 178, 178, 0.5)",
    },

    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    outerDiv: {
      padding: theme.spacing(0, 2),
    },
    bankDiv: {
      background: "linear-gradient(90deg, #00AAFF 0%, #0047A5 100%)",
      borderRadius: "3px",
      margin: theme.spacing(2, 0.5, 2, 0.5),
      padding: theme.spacing(2),
    },
  
    bankNameDiv: {
      display: "flex",
      alignItems: "center",
    },
    offerName: {
      font: `normal ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "16px",
      textTransform: "uppercase",
      color: "var(--white)",
      marginLeft: theme.spacing(1),
    },
    offerDesc: {
      font: `normal ${theme.spacing(1.2)}px Work Sans`,
      color: "var(--white)",
      lineHeight: "18px",
      padding: theme.spacing(1, 0, 0, 0),
    },
  })
);

function BankOffer() {
  const classes = useStyles();
  const [state, setState] = useState({
    openBankModal: false,
  });

  const handleBankOfferOpen = () => {
    setState({ ...state, openBankModal: true });
  };

  const handleBankOfferClose = () => {
    setState({ ...state, openBankModal: false });
  };

  return (
    <div className={classes.yourCardRoot}>
      <div className={classes.yourCardDiv}>
        <div className={classes.bankNameDiv}>
          <img src={Utils.images.BankIcon} alt="icon" />
          <Typography className={classes.yourCard}>Bank Offer</Typography>
        </div>

        {/* <Link to={Utils.routes.BANKOFFER}> */}
        <Typography
          className={classes.addNewCard}
          onClick={handleBankOfferOpen}
        >
          VIEW ALL
        </Typography>
        {/* </Link> */}
        {state.openBankModal && (
          <MoreBankOffer
            open={state.openBankModal}
            handleClose={handleBankOfferClose}
          />
        )}
        {/* </Link> */}
      </div>
      <Grid container className={classes.outerDiv}>
        {Array.of(1, 2).map((item,index) => (
          <Grid item xs={12} md={6} key={index}>
            <div className={classes.bankDiv}>
              <div className={classes.bankNameDiv}>
                <img src={Utils.images.OFFER_ICON} alt="icon" />

                <Typography className={classes.offerName}>
                  5% OFF | CITI Bank Crda
                </Typography>
              </div>
              <Typography className={classes.offerDesc}>
                5% Unlimited Cashback on City Bank Credit Card. TCA
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BankOffer;
