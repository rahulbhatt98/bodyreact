import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
  Input,
} from "@material-ui/core";
import Utils from "../../../utils";
import React from "react";
import CheckBalance from "../giftModals/checkBalance";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../../../components/common/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      margin: theme.spacing(2, 8.5),

    },


    descContainer: {
      margin: theme.spacing(2, 0),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      lineHeight: "33px",
      letterSpacing: "0.02em",
      color: "var(--secondary-black)",
    },
    description: {
      color: "var(--light-gray)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1, 0),
    },
    buyDescription: {
      color: "var(--white)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1),
    },
    button: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        margin: 0,
        width: "95%",
      },
    },
    cardContainer: {
      alignItems: "stretch",
      display: "flex",
    },
    searchContainer: {
      background: `url(${Utils.images.SEARCH_BACKGROUND}) top left no-repeat`,
      padding: theme.spacing(2, 4),
      objectFit: "cover",
      backgroundColor: "#044236",
      borderRadius: 5,
      margin: theme.spacing(3, 0),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
      alignItems: "center",
      backgroundSize: "cover"
    },
    searchHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Druk`,
      color: "#D6CD56",
      lineHeight: "27.96px",
      textTransform: "uppercase",
      letterSpacing: "2px !important",
      padding: theme.spacing(0, 1),
    },
    searchButton: {
      border: "1px solid white",
      borderradius: "4px",
      color: "white",
      padding: "20px !important",
      font: `normal 600 ${theme.spacing(
        1.6
      )}px Work Sans !important`,
      lineHeight: "18px",
      textTransform: "none",
      '&:hover': {
        border: "1px solid white",
      }
    },
    searchInput: {
      backgroundColor: "var(--white)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "44px",
      width: "350px",
      margin: 0,
      paddingLeft: "45px",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        textOverflow: "ellipse",
        padding: theme.spacing(0.5, 2, 0.5, 1),
        paddingLeft: "40px",
      },
      "&:before": {
        border: 0,
      },
    },
    searchDiv: {
      position: "relative",
      textAlign: "end"

    },
    searchIcon: {
      position: "absolute",
      top: "10px",
      left: "12px",
      zIndex: 9,
    },
    img: {
      width: "100%",
      height: "auto",
    },
  })
);

function SendGift() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    openCheckBalanceModal: false,
  });

  const handleBalanceOpen = () => {
    setState({ ...state, openCheckBalanceModal: true });
  };

  const handleBalanceClose = () => {
    setState({ ...state, openCheckBalanceModal: false });
  };
  const history = useHistory();

  return (
    <div className={classes.mainContainer}>
      <Grid container>
        <Grid item xs={12} md={8} lg={8} xl={9}>
          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.heading}>
              Create a Gift Box
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Dreaming of a summer escape? Slip into the shower for a taste of
              the tropics with this fruity fresh shower gel. It’s enriched with
              mango extract from soft and squidgy mangoes and cleanses your skin
              with its silky sudsy layers.
            </Typography>
            <Link to={Utils.routes.GIFT_SELECT_BOX}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Create a Gift Box
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={3}>
          <div className={classes.cardContainer}>
            <img src={Utils.images.REDEEM_GIFT} className={classes.img} alt="gift" />
          </div>
        </Grid>
      </Grid>

      <Grid container className={classes.searchContainer}>
        <Grid item xs={12} md={8} lg={8}>
          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.searchHeading}>
              Buy a Gift Card in Store
            </Typography>
            <Typography variant="h3" className={classes.buyDescription}>
              Visit us in store for a free consultation lorem ipsum dolor sit
              ametabore et magna aliqua quis nostrud exercitation, Visit us in
              store for a free consultation lorem ipsum dolor sit ametabore et
              magna aliqua quis.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div className={classes.searchDiv}>
            {/* <img
              src={`${Utils.images.GIFT_SEARCH}`}
              className={classes.searchIcon}
              alt="search"
            />

            <Input
              className={classes.searchInput}
              placeholder="Search town or postcode"
            /> */}
            <CustomButton
              onClick={() => history.push('/stores')}
              fullWidth={false}
              text={"Find My Nearest Store"}
              type={"button"}
              variant="outlined"
              className={classes.searchButton}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SendGift;
