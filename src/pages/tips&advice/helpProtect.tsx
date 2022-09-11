import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import React from "react";
import Utils from "../../utils";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ImgDiv: {
      background: `url(${Utils.images.TIP_PRODUCT}) `,
      height: theme.spacing(56),
      display: "flex",
      justifyContent: "end",
      alignItems: "end",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        height: theme.spacing(45),
      },
    },
    secndImgDiv: {
      background: `url(${Utils.images.TIP_P2}) `,
      height: theme.spacing(56),
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "end",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        height: theme.spacing(45),
      },
    },
    innerContainer: {
      background: "#FFFFFF",
      opacity: 0.8,
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      width: "475px",
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
    },
    innerContainerLeft: {
      background: "#FFFFFF",
      opacity: 0.8,
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      width: "475px",
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
    },
    cardHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4
      )}px  Druk`,
      lineHeight: "47px",
      margin: theme.spacing(0.8, 0),
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
    cardSubHeading: {
      font: `normal ${theme.spacing(1.6)}px  Work Sans`,
      lineHeight: "19px",
    },
    btn: {
      borderRadius:"4px",
      margin: theme.spacing(1.5, 0),
      padding: theme.spacing(1.5, 2.5),
      "& .MuiButton-label": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px  Work Sans`,
      },
    },
  })
);

function HelpProtect() {
  const classes = useStyles();
const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;


  return (
    <React.Fragment>
      {skeletonLoader ? <Skeleton variant="rectangular" height={400} /> :
      <Grid container>
        <Grid item md={6} className={classes.ImgDiv}>
          <div className={classes.innerContainer}>
            <Typography
              align="center"
              color="primary"
              variant="h3"
              className={classes.cardHeading}
            >
              HELP PROTECT YOUR SKIN EVERY DAY
            </Typography>

            <div>
              <Typography
                color="primary"
                variant="body1"
                className={classes.cardSubHeading}
              >
                Need a moisturiser with SPF for on the go? Or maybe you’re
                looking for makeup that also helps protect your skin from the
                sun? Look no further.
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Discover More
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item md={6} className={classes.secndImgDiv}>
          <div className={classes.innerContainerLeft}>
            <Typography
              color="primary"
              variant="h3"
              className={classes.cardHeading}
            >
              Best Face Toners
            </Typography>

            <div>
              <Typography
                color="primary"
                variant="body1"
                className={classes.cardSubHeading}
              >
                Whether you’re prone to breakouts or in need of an extra hit of
                hydration from your toner, check out our guide to discover the
                right one for your skin.
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Discover More
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
       }
    </React.Fragment>
  );
}

export default HelpProtect;
