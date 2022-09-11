import images from "../../utils/images";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: theme.spacing(1, 2.5, 8, 1),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        alignItems: "flex-start",
      },
    },
    mainContainer2: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      position: "relative",
      padding: theme.spacing(1, 0, 17.8, 2.5),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        padding: theme.spacing(1, 0, 17.8, 1),
        alignItems: "flex-end",
      },
    },
    imageContainer: {
      position: "relative",
      flexBasis: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
    },
    imageContainer2: {
      position: "relative",
      flexBasis: "50%",
      // display: "flex",
      // justifyContent: "flex-end",
    //   padding: "0 21px 0 0",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
    },
    refill: {
      position: "absolute",
      left: "295px",
      bottom: "-74px",
      zIndex: 1,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    raiseUp: {
      position: "absolute",
      zIndex: 1,
      bottom: "-82px",
      left: "-25px",
      [theme.breakpoints.down("sm")]: {
        left: "-75px",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    refillBg1: {
      position: "absolute",
      zIndex: 0,
      left: "0",
      bottom: "-38px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    raiseUpBg1: {
      position: "absolute",
      zIndex: 0,
      bottom: "139px",
      right: "0",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    refillBg2: {
      position: "absolute",
      left: "514px",
      top: "146px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    raiseUpBg2: {
      position: "absolute",
      right: "537px",
      top: "125px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    textContainer: {
      color: theme.palette.primary.main,
      display: "flex",
      flexBasis: "50%",
      padding: theme.spacing(0, 0, 0, 9),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 0, 0, 2),
      },
    },
    textContainer2: {
      color: theme.palette.primary.main,
      display: "flex",
      flexBasis: "50%",
      //   padding: "0 0 0 90px",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 2, 0, 2),
      },
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(4)}px Druk`,
      letterSpacing: "0.04em",
      lineHeight: "47px",
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      margin: "10px 0 0 0",
    },
    discoverButton: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      borderRadius: "0",
      color: theme.palette.primary.main,
      padding: theme.spacing(1, 3.5),
      margin: theme.spacing(3, 0),
    },
    innerTextContainer: {
      width: "380px",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    mainImage: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    skelton: {
      margin: theme.spacing(2),
    },
  })
);

const RefillScheme = (props: any) => {
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  return (
    <>
      {skeletonLoader ? (
        <Skeleton
          variant="rectangular"
          height={400}
          className={classes.skelton}
        />
      ) : (
        <div
          className={
            props.isReverse ? classes.mainContainer2 : classes.mainContainer
          }
        >
          {/* {props.isReverse ? <img src={images.RAISEUP_BG1}
                        alt="design" className={classes.raiseUpBg1} /> : <img
                        src={images.REFILL_BG1} alt="design"
                        className={classes.refillBg1} />} */}

          <div
            className={
              props.isReverse ? classes.imageContainer2 : classes.imageContainer
            }
          >
            {props.isReverse ? (
              <img
                src={IMAGE_URL + props.image}
                alt="raiseUp"
                className={classes.mainImage}
              />
            ) : (
              <img
                src={IMAGE_URL + props.image}
                alt="refill"
                className={classes.mainImage}
              />
            )}

            {/* {props.isReverse ? <img src={images.RAISEUP2}
                            alt="raiseUp" className={classes.raiseUp} /> : <img src={images.REFILL2}
                                alt="refill" className={classes.refill} />} */}
          </div>
          {/* {props.isReverse ? <img src={images.RAISEUP_BG2}
                        alt="design" className={classes.raiseUpBg2} /> : <img src={images.REFILL_BG2}
                            alt="design" className={classes.refillBg2} />} */}

          <div
            className={
              props.isReverse ? classes.textContainer2 : classes.textContainer
            }
          >
            <div className={classes.innerTextContainer}>
              <Typography variant="h3" className={classes.heading}>
                {props.heading}
              </Typography>
              <Typography variant="body1" className={classes.subHeading}>
                {props.subHeading}
              </Typography>
              {/* <Button
                        color="primary"
                        variant="outlined"
                        disableElevation
                        className={classes.discoverButton}
                    >
                        {props.buttonText}
                    </Button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefillScheme;
