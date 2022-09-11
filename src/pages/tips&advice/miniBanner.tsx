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
    bannerRoot: {
      background: "var(--white)",
      position: "relative",
      top: "-10vh",
    },
    productContainer: {
      background: "var(--white)",
    },
    findContainer: {
      width: "85%",
      margin: "0 auto",
      maxWidth: "100%",
    },
    headerDiv: {
      padding: theme.spacing(2),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )}px  Recoleta`,
    },
    subheading: {
      font: `normal ${theme.spacing(1.6)}px  Work Sans`,
      lineHeight: "19px",
      padding: theme.spacing(1, 3),
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
      lineHeight: "19px",
    },
    btn: {
      borderRadius:"4px",
      textAlign: "center",
      margin: theme.spacing(1, 0),
    },
    skeleton:{
      margin: theme.spacing(0,10),
    }
  })
);

function MiniBanner(props: any) {
  const classes = useStyles();
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;


  return (
    <>
      {skeletonLoader ? (
        <Skeleton variant="rectangular" height={400} className={classes.skeleton} />
      ) : (
        <div className={classes.productContainer}>
          <div className={classes.findContainer}>
            <div className={classes.bannerRoot}>
              <div className={classes.headerDiv}>
                <Typography
                  align="center"
                  color="primary"
                  className={classes.heading}
                >
                  START YOUR SELF LOVE JOURNEY
                </Typography>
                <Typography
                  align="center"
                  color="primary"
                  className={classes.subheading}
                >
                  Any act of self-love is a direct act of rebellion against a
                  culture that wants us to feel self-doubt. Join our movement by
                  empowering yourself with the information you need to start
                  your journey.
                </Typography>
              </div>
              <div className={classes.innerContainer}>
                <Grid container>
                  {Array.of(1, 2, 3).map((item) => (
                    <Grid item md={4} key={item} className={classes.ImgDiv}>
                      <img
                        src={Utils.images.TIP1}
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
                          WHAT IS SELF LOVE?
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          align="center"
                          color="primary"
                          variant="body1"
                          className={classes.cardSubHeading}
                        >
                          We hosted activist Jameela Jamil and self-love expert
                          Sara Kuburic, aka ‘The Millenial Therapist’, in a live
                          discussion on all things self-love. Watch these
                          fiercely honest women debate what self-love means to
                          them.
                        </Typography>
                      </div>
                      <div className={classes.btn}>
                        <Button variant="contained" color="primary">
                          Watch Now
                        </Button>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MiniBanner;
