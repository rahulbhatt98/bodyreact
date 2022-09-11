import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import {  useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "var(--green-color)",
      opacity: "80%",
      cursor: "pointer",
    },
    mainContainer: {
      color: "var(--white)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      backgroundSize: "cover",
      background: `url(${Utils.images.FAQIMG}) center center  no-repeat`,
    },
    back1: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    back2: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    back3: {
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    back4: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    innerContainer: {
      margin: "90px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(10, 1),
      },
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(5.6)}px Druk`,
      letterSpacing: "0.08em",
      lineHeight: "47px",
      color: "var(--white)",
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(
        1.8
      )}px Roboto`,
      letterSpacing: "-0.333333px",
      lineHeight: "24px",
      margin: theme.spacing(2),
      width: "800px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    back5: {
      position: "absolute",
      left: "15%",
      top: "100px",
    },
    back6: {
      position: "absolute",
      right: "15%",
      top: "100px",
    },
    outerDiv2: {
      padding: theme.spacing(12),
    },
    innerImg: {
      background: `${Utils.images.FAQIMG}`,
      position: "absolute",
    },
  })
);

const Banner = () => {
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
 

  return (
    <>
      {skeletonLoader ? (
        <>
          <Skeleton variant="rectangular" className={classes.outerDiv2} />
        </>
      ) : (
        <div className={classes.mainContainer}>
          <div className={classes.overlay}>
            {/* <div className={classes.back1}>
              <img src={`${Utils.images.BACK_BG1}`} alt="design" />
            </div>
            <div className={classes.back2}>
              <img src={`${Utils.images.BACK_BG2}`} alt="design" />
            </div>
            <div className={classes.back3}>
              <img src={`${Utils.images.BACK_BG3}`} alt="design" />
            </div>
            <div className={classes.back4}>
              <img src={`${Utils.images.BACK_BG4}`} alt="design" />
            </div>

            <div className={classes.back5}>
              <img src={`${Utils.images.BACK_BG5}`} alt="design" />
            </div>
            <div className={classes.back6}>
              <img src={`${Utils.images.BACK_BG6}`} alt="design" />
            </div> */}

            <div className={classes.innerContainer}>
              <Typography variant="h3" className={classes.heading}>
                FAQ’s
              </Typography>
              <Typography variant="h3" className={classes.subHeading}>
                Scrub up your body & scrub up the world at The Body Shop's
                Stores.
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
