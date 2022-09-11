import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      position: "absolute",
      left: 0,
      top: "-80px",
    },
    root: {
      position: "relative",
      paddingBottom: theme.spacing(2),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4.4
      )}px  Druk`,
      lineHeight: "42px",
      textTransform: "uppercase",
      margin: theme.spacing(1.5, 0),
      letterSpacing: "0.05em",
    },
    innerDiv: {
      margin: theme.spacing(3, 15),
      textAlign: "center",
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(2),

      }
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px  Work Sans`,
      lineHeight: "19px",
      margin: theme.spacing(1.5, 0),
      letterSpacing: "0.04em",
      color: "var(--green-color)",
    },
  })
);

function Overview() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <img
          src={Utils.images.DONATION_GRAPHIC}
          alt="graphic"
          className={classes.img}
        />

        <Typography align="center" color="primary" className={classes.heading}>
          Overview
        </Typography>
        <div className={classes.innerDiv}>
          <Typography align="center" className={classes.subHeading}>
            Shared meals will help some of WFP's most critical operations around
            the world.
          </Typography>
          <Typography align="center" className={classes.subHeading}>
            Around the world, 690 million people don't have enough food to lead
            an active and healthy life. As countries face a record number of
            emergencies, many fueled by conflict and the effects of climate
            change, more people are being pushed further into hunger.
          </Typography>
          <Typography align="center" className={classes.subHeading}>
            To ensure the most vulnerable people get lifesaving aid, WFP is on
            the ground providing food and other assistance to almost 100 million
            people in 83 countries worldwide. Each day, WFP has 5,600 trucks, 30
            ships and nearly 100 planes on the move delivering support to those
            who need it most.
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Overview;
