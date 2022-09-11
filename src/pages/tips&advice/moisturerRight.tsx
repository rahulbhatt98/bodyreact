import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productContainer: {
      background: "var(--light-creame-color)",
    },
    skeleton: {
      margin: theme.spacing(2, 0),
    },
    findContainer: {
      width: "85%",
      margin: "20px auto",
      maxWidth: "100%",
      padding: theme.spacing(2.5, 1),
    },
    headerDiv: {
      padding: theme.spacing(2),
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
      lineHeight: "19px",
      fontWeight: 400,
    },
    btn: {
      borderRadius:"4px",
      textAlign: "center",
      margin: theme.spacing(1, 0),
    },
  })
);

function MoisturerRight(props: any) {
  const classes = useStyles();
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  return (
    <>
      {skeletonLoader ? (
        <Skeleton
          variant="rectangular"
          height={300}
          className={classes.skeleton}
        />
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
                      src={Utils.images.TIP_P4}
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
                        TRIPLE PROTECTION
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        align="center"
                        color="primary"
                        variant="body1"
                        className={classes.cardSubHeading}
                      >
                        Our Skin Defence Multi-Protection Lotion SPF 50+ PA++++
                        is a triple threat: it can sing, it can dance, it can
                        act… Not really, but it can provide 24-hour
                        moisturisation.
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

export default MoisturerRight;
