import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import images from "../../../utils/images";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createGiftRoot: {
      background: "var(--primary)",
      position: "relative",
      marginBottom: theme.spacing(-0.1),
    },
    mainContainer: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: theme.spacing(4, 2.5, 8, 2.5),
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
    },
    imageContainer2: {
      position: "relative",
      flexBasis: "50%",
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 21px 0 0",
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
      bottom: "40px",
      right: "0",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    back1: {
      position: "absolute",
      top: "0px",
      left: "0px",
      [theme.breakpoints.down("sm")]:{
        display: "none",
      }
    },
    back6:{
        position: "absolute",
        top: "0px",
        left: "0px",
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
      padding: theme.spacing(0, 0, 0, 16),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 0, 0, 2),
      },
    },
    textContainer2: {
      color: theme.palette.primary.main,
      //   display: "flex",
      flexBasis: "50%",
      padding: "0 0 0 70px",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 2, 0, 2),
      },
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(3.2)}px Druk`,
      letterSpacing: "0.04em",
      lineHeight: "37px",
      color: "#D6CD56",
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      margin: "10px 0 0 0",
      color: "var(--white)",
    },
    discoverButton: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,

      color: "var(--white)",
      padding: theme.spacing(1, 3.5),
      margin: theme.spacing(3, 0),
      border: "1px solid #FFFFFF",
      boxSizing: "border-box",
      borderRadius: "4px",
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
    back2: {
        position: "absolute",
        top: theme.spacing(10),
        right: 0,
    },
    back3: {
        position: 'absolute',
        bottom: theme.spacing(6),
        left: 0,
    },
    back4:{
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    back5:{
        position: "absolute",
        bottom: 0,
        right: 0,
    }
  })
);

function CreateGiftCard(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.createGiftRoot}>
      {/* {props.isReverse ? (
        <img src={images.GIFT_BG6} alt="design" className={classes.back1} />
      ) : (
        <img src={images.BACK_BG1} alt="design" className={classes.back6} />
      )} */}
      <div
        className={
          props.isReverse ? classes.mainContainer2 : classes.mainContainer
        }
      >
        {/* {props.isReverse ? (
          <img
            src={images.GIFT_BG9}
            alt="design"
            className={classes.raiseUpBg1}
          />
        ) : (
          <img
            src={images.GIFT_BG2}
            alt="design"
            className={classes.refillBg1}
          />
        )} */}

        <div
          className={
            props.isReverse ? classes.imageContainer2 : classes.imageContainer
          }
        >
          {props.isReverse ? (
            <img
              src={images.RAISEUP1}
              alt="raiseUp"
              className={classes.mainImage}
            />
          ) : (
            <img
              src={images.REFILL1}
              alt="refill"
              className={classes.mainImage}
            />
          )}

          {props.isReverse ? (
            <img
              src={images.RAISEUP2}
              alt="raiseUp"
              className={classes.raiseUp}
            />
          ) : (
            <img src={images.REFILL2} alt="refill" className={classes.refill} />
          )} 
        </div>
        {/* {props.isReverse ? (
          <img
            src={images.RAISEUP_BG2}
            alt="design"
            className={classes.raiseUpBg2}
          />
        ) : (
          <img
            src={images.REFILL_BG2}
            alt="design"
            className={classes.refillBg2}
          />
        )} */}

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
            <Button
              variant="outlined"
              disableElevation
              className={classes.discoverButton}
            >
              {props.buttonText}
            </Button>
          </div>
        </div>
      
      </div>
      {props.isReverse ? (
            <img
              src={images.BACK_BG4}
              alt="raiseUp"
              className={classes.back4}
            />
          ) : (
            <img
              src={images.GIFT_BG11}
              alt="refill"
              className={classes.back5}
            />
          )}
      {/* {props.isReverse ? (
        <img src={images.GIFT_BG8} alt="refill" className={classes.back3} />
      ) : (
        <img src={images.BACK_BG2} alt="raiseUp" className={classes.back2} />
      )} */}
    </div>
  );
}

export default CreateGiftCard;
