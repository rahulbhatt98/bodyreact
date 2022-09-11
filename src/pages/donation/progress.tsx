import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
 
} from "@material-ui/core";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      height: "12px !important",
      background: "var(--border-color) !important",
      borderRadius: "10px",
      "& .css-5xe99f-MuiLinearProgress-bar1": {
        background: "var(--main-opacity) !important",
      },
    },
    linearDiv: {
      padding: theme.spacing(2, 20),
      [theme.breakpoints.down("md")]:{
        padding: theme.spacing(2,0),
      }
    },
    img: {
      textAlign: "center",
    },
    text: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )}px  Work Sans`,
      lineHeight: "23px",
      color: "var(--main-opacity)",
    },
    textDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    about: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px  Work Sans`,
      lineHeight: "16px",
      color: "var(--light-gray)",
      margin: theme.spacing(1,0,0,0)
    },
  })
);
function Progress(props: LinearProgressProps & { value: number }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.linearDiv}>
        <div className={classes.img}>
          <Typography variant="body2" className={classes.text}>{`${Math.round(
            props.value
          )}%`}</Typography>

          <img src={Utils.images.SELECTOR} alt="selectorImg" />
        </div>
        <LinearProgress
          variant="determinate"
          {...props}
          className={classes.progress}
        />
        <div className={classes.textDiv}>
          <div>
            <Typography variant="body2" align="center" className={classes.about}>
              Total Donation
            </Typography>
            <Typography variant="body2" align="center" className={classes.about}>
              ₹ 50,00,000
            </Typography>
          </div>
          <div>
            <Typography variant="body2" align="center" className={classes.about}>
            Total Support
            </Typography>
            <Typography variant="body2" align="center" className={classes.about}>
            ₹ 24,89,765
            </Typography>
          </div>
          <div>
            <Typography variant="body2" align="center" className={classes.about}>
            Campaign Time
            </Typography>
            <Typography variant="body2" align="center" className={classes.about}>
            90 Days
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;
