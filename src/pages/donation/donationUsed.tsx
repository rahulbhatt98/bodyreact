import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
// import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
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

function DonationUsed() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography align="center" color="primary" className={classes.heading}>
          How is my donation used ?
        </Typography>
        <div className={classes.innerDiv}>
          <Typography align="center" className={classes.subHeading}>
            Shared meals are helping us fight hunger today and invest in ending
            hunger for good.
          </Typography>
          <Typography align="center" className={classes.subHeading}>
            The largest share of donations goes directly towards feeding hungry
            families. Another portion is invested into growing our giving
            community so that the number of people we help grows too.
          </Typography>
        </div>
      </div>
    </>
  );
}

export default DonationUsed;
