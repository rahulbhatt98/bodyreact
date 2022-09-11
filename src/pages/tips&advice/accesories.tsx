import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Utils from "../../utils";
import Product from "../../components/common/product";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recommendedRoot: {
      padding: theme.spacing(0, 2),
    },
    skeleton:{
      margin: theme.spacing(1,0)
    },
    maxWidthDiv: {
      width: "80%",
      maxWidth: "var(--max-width)",
      margin: theme.spacing(1.5, "auto"),
      [theme.breakpoints.down("md")]: {
        width: "auto",
        margin: theme.spacing(1.5, "auto", 7),
      },
    },

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )}px  Recoleta`,
      lineHeight: "38px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      padding: theme.spacing(2, 0),
    },

    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 1.5,
    },

    innerDiv: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
  })
);

function Accesories() {
  const classes = useStyles();
const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;


  return (
    <>
    {skeletonLoader ? <Skeleton variant="rectangular" height={400} className={classes.skeleton} /> :
    <div className={classes.recommendedRoot}>
      <div className={classes.maxWidthDiv}>
        <Typography align="center" color="primary" className={classes.heading}>
          Best Exfoliating Accessories
        </Typography>
        <div className={classes.innerDiv}>
          {Array.of(1, 2, 3, 4).map((i) => (
            <Product
              attr={""}
              section="tips"
              key={i}
              // heading={"Satsuma Shower Gel"}
              detail={"To refresh & clean skin 750 ml"}
              rate={"₹899"}
              img={Utils.images.PRODUCT_ONE}
            />
            //   <Product
            //   key={item?._id}
            //   detail={_.truncate(desc?.value, { length: 25 })}
            //   // rate={discPrice?.value ?? item.price}
            //   rate={item.price}
            //   discPrice={discPrice?.value}
            //   img={`${process.env.REACT_APP_MEDIA_URL}/product${image}`}
            //   attr={item}
            //   isWishlist={item.isWishlisted}

            // />
          ))}
        </div>
      </div>
    </div>
     }
    </>
  );
}

export default Accesories;
