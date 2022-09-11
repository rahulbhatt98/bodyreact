import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      backgroundColor: "#044236",
      color: "var(--white)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
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
      margin: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(10, 1),
      },
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(2,1)
      }
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(4)}px Druk`,
      letterSpacing: "0.08em",
      lineHeight: "47px",
      color: "#D6CD56",
      [theme.breakpoints.down("xs")]:{
        font: `${theme.spacing(2.4)}px Druk Bold`,
        textTransform: "uppercase",
        letterSpacing: "0.10em"
      }
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Roboto`,
      letterSpacing: "0.333333px",
      lineHeight: "24px",
      margin: theme.spacing(2),
      width: "800px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        width: "auto",
        margin: theme.spacing(1,0),
        font: ` ${theme.spacing(
          1.4
        )}px Work Sans Regular`,
        lineHeight: "22.4px",
        letterSpacing: "0.02em",
      },
    },
    back5: {
      position: "absolute",
      left: "10%",
    },
    back6: {
      position: "absolute",
      right: "10%",
    },
    outerDiv2: {
      padding: theme.spacing(12),
    },
  })
);
interface Props {
  data: any;
}

const GiftBanner: React.FC<Props> = ({ data }: Props) => {
  const classes = useStyles();
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;


  return (
     
        <div className={classes.mainContainer}>
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
              {data?.title || ""}
            </Typography>
            {data?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: data?.description ||""}}
                className={classes.subHeading}
              />
            )}
          </div>
        </div>
  );
};

export default GiftBanner;
