import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linearBar: {
        "& .MuiLinearProgress-barColorPrimary":{
            backgroundColor: "var(--main-opacity)",
        }
    },
    label: {
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
        color:"black"
      }
    },
  })
);

function LinearProgressReviews(props: any) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          className={classes.linearBar}
          value={props.value}
        />
      </Box>
      <Box minWidth={35}>
        {props.isPerc ? (
          <Typography variant="body2" color="textSecondary" className={classes.label}>{`${Math.round(
            props.value
          )}%`}</Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default LinearProgressReviews;
