import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Utils from "../../utils";
import React, { useState } from "react";
import RedeemBalance from "./giftModals/redeemBalance";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../utils/session";
import clsx from 'clsx'
import MessageDialogue from "../../components/common/product/messageDialogue";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {

    },
    detailsContainer2: {
      margin: theme.spacing(2, 0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 0),
      },
    },
    descContainer: {
      margin: theme.spacing(2, 1, 2, 0),
    },

    heading: {
      color: "var(--black)",
      fontFamily: "Recoleta Alt",
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "25px",
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]: {
      
        font: "normal 18px Recoleta Alt Bold",
      },
      margin: theme.spacing(1, 0),
    },
    description: {
      color: "var(--light-gray)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]:{
      lineHeight: "22.4px",
      font: "normal 14px Work Sans Regular",
      letterSpacing: "0.02em"
      }
    },
    cardContainer: {
      // margin: theme.spacing(0, 3),
      height: '210px',
      objectFit: "cover",
      // width: '343px',

    },
    cardContainer2: {
      // margin: theme.spacing(0, 3),
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
        height: '212px',
        objectFit: "cover",
      },

    },
    cardContainer3: {
      // margin: theme.spacing(0, 3),
      display: "block",
      height: '210px',
      objectFit: "cover",
      // width: '343px',
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
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
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      },
    },
    img: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      [theme.breakpoints.down("xs")]:{
        borderRadius: "0px",
      }
    },
    noImgBackground: {
      backgroundColor: '#F8F3E9',
      padding: '25px',
    },
    detailContainer: {
      margin: theme.spacing(2, 2.5),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0),
      }
    },
    skeltonView: {
      padding: theme.spacing(11),
      margin: theme.spacing(3, 0)
    },
    skeleton: {
      margin: "10px 0px"
    },
    skeletonContainer: {
      display: "flex",
      flexDirection: "column"
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(
        2.0
      )}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px"

      // margin: theme.spacing(0.8, 0),
    },
  })
);
// interface Props {
//   redeemGiftData: any;
//   corporateGiftData: any
// }

const RedeemCard: React.FC<any> = ({ redeemGiftData, corporateGiftData }, Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const [loginAlert, showLoginAlert] = useState(false)
  const [state, setState] = React.useState({
    openRedeemBalanceModal: false,
  });
  const history = useHistory();


  const handleRedeemBalanceOpen = () => {
    if (isAuthenticated())
      setState({ ...state, openRedeemBalanceModal: true });
    else {
      showLoginAlert(true)
    }
  };

  const handleRedeemBalanceClose = () => {
    setState({ ...state, openRedeemBalanceModal: false });
  };

  const onCorporateGifting = () => {
    if (isAuthenticated())
      history.push('/corporate-form')
    else
      showLoginAlert(true)
  }

  return (
    <div className={classes.mainContainer}>
      {
        <MessageDialogue
          cancelText={'Cancel'}
          okText={'Okay'}
          open={loginAlert}
          handleClose={() => showLoginAlert(!loginAlert)}
          onOk={() => {
            history.push(
              `${Utils.routes.LOGIN_OTP}?redirectTo=${Utils.routes.GIFT_CARD}`
            );
          }}
          message={'Please login to proceed'}
          heading={'The Body Shop'}
          headingClass={classes.messageHeading}

        />
      }
      <Grid container className={classes.detailsContainer2}>
        <Grid item xs={12} md={8} lg={8} >
          <div className={classes.cardContainer2}>
            <img
              src={redeemGiftData?.web_img_path ? `${IMAGE_URL}${redeemGiftData.web_img_path}` : Utils.images.PRODUCT_PLACEHOLDER}
              className={redeemGiftData?.web_img_path ? classes.img : clsx(classes.img, classes.noImgBackground)}
              alt="gift"
            />
          </div>

          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.heading}>
              {redeemGiftData?.title || ''}
            </Typography>
            {redeemGiftData?.description && <div className={classes.description} dangerouslySetInnerHTML={{ __html: redeemGiftData?.description || "" }}></div>}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleRedeemBalanceOpen}
            >
              Add Gift Card to Wallet
            </Button>
          </div>


        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div className={classes.cardContainer3}>
            <img
              src={redeemGiftData?.web_img_path ? `${IMAGE_URL}${redeemGiftData.web_img_path}` : Utils.images.PRODUCT_PLACEHOLDER}
              className={redeemGiftData?.web_img_path ? classes.img : clsx(classes.img, classes.noImgBackground)}
              alt="gift"
            />
          </div>
        </Grid>
      </Grid>

      <Grid container className={classes.detailsContainer2}>
        <Grid item xs={12} md={4} lg={4}>
          <div className={classes.cardContainer}>
            <img
              src={corporateGiftData?.web_img_path ? `${IMAGE_URL}${corporateGiftData.web_img_path}` : Utils.images.PRODUCT_PLACEHOLDER}
              className={corporateGiftData?.web_img_path ? classes.img : clsx(classes.img, classes.noImgBackground)}
              alt="gift"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={8} >

          <div className={classes.detailContainer}>
            <Typography variant="h3" className={classes.heading}>
              {corporateGiftData?.title || ''}
            </Typography>
            {corporateGiftData?.description && <div className={classes.description} dangerouslySetInnerHTML={{ __html: corporateGiftData?.description || "" }}></div>}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={onCorporateGifting}
            >
              Corporate Gifting
            </Button>
            <RedeemBalance
              open={state.openRedeemBalanceModal}
              handleClose={handleRedeemBalanceClose}
            />
          </div>

        </Grid>
      </Grid>

    </div>
  );
}

export default RedeemCard;
