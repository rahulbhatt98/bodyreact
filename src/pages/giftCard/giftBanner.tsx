import {
  makeStyles,
  createStyles,
  Theme,
  Typography
} from "@material-ui/core";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      height: "280px",
      backgroundColor: '#044236',
      backgroundSize: '100% 100%',
      color: "var(--white)",
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        padding: theme.spacing(2),
        background: "linear-gradient(0deg, #004236, #004236)",
      },
      [theme.breakpoints.down(300)]: {
        height: "auto",
        padding: theme.spacing(2, 0, 0, 0)
      }
    },
    back1: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    back2: {
      position: 'absolute',
      top: 0,
      right: 0,

    },
    back3: {
      position: 'absolute',
      bottom: 0,
      left: 0,

    },
    back4: {
      position: 'absolute',
      bottom: 0,
      right: 0,

    },
    innerContainer: {
      textAlign: "center"
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(4)}px Druk`,
      letterSpacing: "0.08em",
      lineHeight: "47px",
      color: '#D6CD56',
      margin: theme.spacing(4, 0, 0, 0),
      padding: theme.spacing(0.3)
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(1.4)}px Roboto`,
      letterSpacing: "0.333333px",
      lineHeight: "24px",
      margin: theme.spacing('2%', '10%', '2%', '10%')
    },
  })
);

function GiftBanner() {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.back1}><img src={`${Utils.images.BACK_BG1}`} alt="design" /></div>
      <div className={classes.back2}><img src={`${Utils.images.BACK_BG2}`} alt="design" /></div>
      <div className={classes.back3}><img src={`${Utils.images.BACK_BG3}`} alt="design" /></div>
      <div className={classes.back4}><img src={`${Utils.images.BACK_BG4}`} alt="design" /></div>
      <div className={classes.innerContainer}>
        <Typography variant="h3" className={classes.heading}>
          Lorem ipsum dolor
        </Typography>
        <Typography className={classes.subHeading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut
          labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut
          labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut
          labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut
          labore et magna aliquaad, quis nostrud exercitation ullamco laboris
        </Typography>
      </div>


    </div>

  );
}

export default GiftBanner;
