import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Input,
  Grid,
  Hidden,
} from "@material-ui/core";
import Utils from "../../utils";
import React, { useEffect, useState } from "react";
import CheckBalance from "./giftModals/checkBalance";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../utils/session";
import clsx from "clsx";
import MessageDialogue from "../../components/common/product/messageDialogue";
import CustomButton from "../../components/common/button";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {},

    detailsContainer2: {
      margin: theme.spacing(2, 2.5),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 0),
      },
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
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
        letterSpacing: "0.04em"
      },
    },
    description: {
      color: "var(--light-gray)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        lineHeight: "22px",
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Regular`,
        letterSpacing: "0.02em"
      },
    },
    buyDescription: {
      color: "var(--white)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
        lineHeight: "22.4px",
        letterSpacing: "0.02em",
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Regular`,
      },
    },
    button: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "none",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        margin: 0,
        width: "95%",
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      },
    },
    cardContainer: {
      alignItems: "stretch",
      display: "flex",
      height: "222px",
      objectFit: "cover",
    },
    searchContainer: {
      padding: theme.spacing(2, 3),
      background: `url(${Utils.images.SEARCH_BACKGROUND}) top left no-repeat`,
      backgroundColor: "#044236",
      borderRadius: 5,
      backgroundSize: "cover",
      margin: theme.spacing(3, 0),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
        width: "112%",
        margin: theme.spacing(3, -2),
      },
      alignItems: "center",
    },
    searchHeading: {
      font: `normal ${theme.spacing(
        2.4
      )}px Druk Bold`,
      color: "#D6CD56",
      lineHeight: "27.96px",
      textTransform: "uppercase",
      letterSpacing: "2px !important",
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },
    searchInput: {
      backgroundColor: "var(--white)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "44px",
      width: "-webkit-fill-available",
      margin: 0,
      paddingLeft: "45px",

      "&:before": {
        border: 0,
      },
    },
    searchDiv: {
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 10px"

      }
    },
    searchIcon: {
      position: "absolute",
      top: "10px",
      left: "12px",
      zIndex: 9,
    },
    img: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      [theme.breakpoints.down("xs")]: {
        borderRadius: "0px",
      }
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "25px",
    },
    skeltonView: {
      padding: theme.spacing(11),
      margin: theme.spacing(3, 0),
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    searchButton: {

      border: "1px solid white",
      "&.MuiButton-root": {
        borderRadius: "4px",
        textTransform: "none"
      },
      [theme.breakpoints.down("xs")]:{
        "& .MuiButton-label":{
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans Medium`,
        }
      }

    }
  })
);
interface Props {
  data: any;
  buyfGiftCardData: any;
  balanceCheckData: any;
}

function SendMeEGift({ data, buyfGiftCardData, balanceCheckData }: Props) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const [loginAlert, showLoginAlert] = useState({ open: false, flag: "" });
  const [state, setState] = React.useState({
    openCheckBalanceModal: false,
  });
  const history = useHistory();
  const handleBalanceOpen = () => {
    if (isAuthenticated()) setState({ ...state, openCheckBalanceModal: true });
    else {
      showLoginAlert({ open: true, flag: "check-balance" });
    }
  };
  const handleBalanceClose = () => {
    setState({ ...state, openCheckBalanceModal: false });
  };

  const sendCard = () => {
    window.scrollTo(0, 0);

    if (isAuthenticated())
      history.push({
        pathname: Utils.routes.SENT_GIFT_CARD,
        state: { pageName: "E-Gift Card" },
      });
    else showLoginAlert({ open: true, flag: "send-card" });
  };
  const redirectToStore = () => {
    history.push({
      pathname: Utils.routes.STORE,
      state: { pageName: "Find Stores" }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.mainContainer}>
      {
        <MessageDialogue
          cancelText={"Cancel"}
          okText={"Okay"}
          open={loginAlert.open}
          handleClose={() =>
            showLoginAlert({ open: !loginAlert.open, flag: "" })
          }
          onOk={() => {
            if (loginAlert.flag === "send-card")
              history.push(
                `${Utils.routes.LOGIN_OTP}?redirectTo=${Utils.routes.SENT_GIFT_CARD}`
              );
            else
              history.push(
                `${Utils.routes.LOGIN_OTP}?redirectTo=${Utils.routes.GIFT_CARD}`
              );
          }}
          message={"Please login to proceed"}
          heading={"The Body Shop"}
          headingClass={classes.messageHeading}
        />
      }
      <Grid container>
        <Hidden smUp>
          <Grid item xs={12} md={4} lg={4} >
            <div className={classes.cardContainer}>
              <img
                src={
                  data?.web_img_path
                    ? `${IMAGE_URL}${data.web_img_path}`
                    : Utils.images.PRODUCT_PLACEHOLDER
                }
                className={
                  data?.web_img_path
                    ? classes.img
                    : clsx(classes.img, classes.noImgBackground)
                }
                alt="gift"
              />
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={8} >
          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.heading}>
              {data?.title || ""}
            </Typography>
            {data?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
                className={classes.description}
              />
            )}

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={sendCard}
            >
              Send an E-Gift card
            </Button>
          </div>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={12} md={4} lg={4} >
            <div className={classes.cardContainer}>
              <img
                src={
                  data?.web_img_path
                    ? `${IMAGE_URL}${data.web_img_path}`
                    : Utils.images.PRODUCT_PLACEHOLDER
                }
                className={
                  data?.web_img_path
                    ? classes.img
                    : clsx(classes.img, classes.noImgBackground)
                }
                alt="gift"
              />
            </div>
          </Grid>
        </Hidden>
      </Grid>
      {buyfGiftCardData?.title||buyfGiftCardData?.description ?
      <Grid container className={classes.searchContainer}>
        <Grid item xs={12} md={8} lg={8}>
          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.searchHeading}>
              {buyfGiftCardData?.title || ""}
            </Typography>
            {buyfGiftCardData?.description && (
              <div
                className={classes.buyDescription}
                dangerouslySetInnerHTML={{
                  __html: buyfGiftCardData?.description || "",
                }}
              ></div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div className={classes.searchDiv}>
            <CustomButton
              type="button"
              text={"Find My Nearest Store"}
              fullWidth
              onClick={redirectToStore}
              variant="contained"
              className={classes.searchButton}

            />
            {/* <img
              src={`${Utils.images.GIFT_SEARCH}`}
              className={classes.searchIcon}
              alt="search"
            /> */}

            {/* <Input
              onFocus={redirectToStore}
              className={classes.searchInput}
              placeholder="Search town or postcode"
            /> */}
          </div>
        </Grid>
      </Grid>:null
      }
      <Grid container>
        <Grid item xs={12} md={4} lg={4} >
          <div className={classes.cardContainer}>
            <img
              src={
                balanceCheckData?.web_img_path
                  ? `${IMAGE_URL}${balanceCheckData.web_img_path}`
                  : Utils.images.PRODUCT_PLACEHOLDER
              }
              className={
                balanceCheckData?.web_img_path
                  ? classes.img
                  : clsx(classes.img, classes.noImgBackground)
              }
              alt="envelop"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={8} >
          <div className={classes.detailsContainer2}>
            <Typography variant="h3" className={classes.heading}>
              {balanceCheckData?.title || ""}
            </Typography>
            {balanceCheckData?.description && (
              <div
                className={classes.description}
                dangerouslySetInnerHTML={{
                  __html: balanceCheckData?.description || "",
                }}
              ></div>
            )}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleBalanceOpen}
            >
              Check Balance
            </Button>

            <CheckBalance
              open={state.openCheckBalanceModal}
              handleClose={handleBalanceClose}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SendMeEGift;
