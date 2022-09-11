import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerRoot: {
      background: `linear-gradient(rgba(51, 51, 51, 0.1), rgba(51, 51, 51, 0.1)), url(${Utils.images.DONATION_BG}) center center  no-repeat`,
      backgroundSize: "cover",
      maxWidth: "100%",
      height: "72vh",
      display: "flex",
      backdropFilter: "blur(2px)",
      flexDirection: "column",
      filter: "drop-shadow(0px 0px 30px rgba(146, 146, 146, 0.1))",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        6
      )}px Druk`,
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "70px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(3),
      },
    },
    routeName: {
      padding: theme.spacing(2, 0, 0, 1.5),
      font: `normal ${theme.spacing(1.3)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "15px",

      color: "#FFFFFF",
    },
    subHeading: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      width: "678px",
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "19px",
      margin: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
        width: "auto",
      },
    },
    btn: {
      "&.MuiButton-root": {
        borderRadius: 2,
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(2, 4),
        color: "var(--white)",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },

    findContainer: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    innerFindContainer: {
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.4)",
      opacity: "0.8",
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      padding: theme.spacing(3),
      width: "55%",
    },
  })
);


function Banner() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.bannerRoot}>
        <Typography variant="body1" className={classes.routeName}>
          "Home  /  Donations"
        </Typography>
        <div className={classes.findContainer}>
          <div className={classes.innerFindContainer}>
            <Typography variant="h2" className={classes.heading}>
              Donations
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
