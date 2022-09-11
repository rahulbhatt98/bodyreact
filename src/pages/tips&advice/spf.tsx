import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Utils from "../../utils";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productContainer: {
      background: "var(--white)",
    },
    findContainer: {
      width: "85%",
      margin: "20px auto",
      maxWidth: "100%",
    },
    headerDiv: {
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )}px  Recoleta`,
      lineHeight: "38px",
      letterSpacing: "0.02em",
    },

    innerContainer: {
      display: "flex",
      justifyContent: "space-around",
    },
    ImgDiv: {
      padding: theme.spacing(1),
    },
    img: {
      width: "100%",
    },
    cardHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4
      )}px  Druk`,
      lineHeight: "47px",
      margin: theme.spacing(0.8, 0),
    },
    cardSubHeading: {
      font: `normal ${theme.spacing(1.6)}px  Work Sans`,
      lineHeight: "18.77px",
      fontWeight: 400,
    },
    btn: {
      borderRadius:"4px",
      textAlign: "center",
      margin: theme.spacing(1, 0),
    },
    skeleton:{
      margin:theme.spacing(1,0),
    }
  })
);

function Spf(props: any) {
  const classes = useStyles();

 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;


  return (
    <>
      {skeletonLoader ? (
        <Skeleton variant="rectangular" height={450} className={classes.skeleton} />
      ) : (
        <div className={classes.productContainer}>
          <div className={classes.findContainer}>
            <div className={classes.headerDiv}>
              <Typography
                align="center"
                color="primary"
                className={classes.heading}
              >
                WHICH MOISTURISER WITH SPF IS BEST FOR MY SKIN TYPE?
              </Typography>
            </div>
            <div className={classes.innerContainer}>
              <Grid container>
                {Array.of(1, 2, 3).map((item) => (
                  <Grid item md={4} key={item} className={classes.ImgDiv}>
                    <img
                      src={Utils.images.TIP_P3}
                      alt="one"
                      className={classes.img}
                    />
                    <div>
                      <Typography
                        align="center"
                        color="primary"
                        variant="h3"
                        className={classes.cardHeading}
                      >
                        FOR OILY SKIN
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        align="center"
                        color="primary"
                        variant="body1"
                        className={classes.cardSubHeading}
                      >
                        This lightweight dream cream hails from our cult classic
                        Vitamin E range and provides your skin with up to 24
                        hours of hydration. Not only that, but it carries an SPF
                        30, meaning you can feel that bit more protected.
                      </Typography>
                    </div>
                    <div className={classes.btn}>
                      <Button variant="contained" color="primary">
                        Shop Now
                      </Button>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Spf;
