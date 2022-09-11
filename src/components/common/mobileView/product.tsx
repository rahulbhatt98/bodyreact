import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  CardMedia,
  Card,
  Avatar,
} from "@material-ui/core";
import Utils from "../../../utils";
import Rating from "@material-ui/lab/Rating";
import CustomButton from "../button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "auto",
    },
    productDiv: {
      position: "relative",
    },
    imgDiv: {},
    productImg: {
      width: theme.spacing(16.5),
      height: theme.spacing(20),
      border: "1px solid white",
      borderRadius: "12px",
      "&.MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
    productImg2: {
      width: "100%",
      height: "100%",
    },
    heartImg: {
      position: "absolute",
      top: "8px",
      right: "8px",
    },
    outerDiv: {
      display: "flex",
      gap: "20px",
      overflowX: "auto",
      marginTop: theme.spacing(2),
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    textDiv: {},
    mainProduct: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      font: `normal 700 ${theme.spacing(1.5)}px  Recoleta Alt`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      letterSpacing: "0.04em",
      marginTop: theme.spacing(1),
    },
    rating: {
      color: theme.palette.secondary.light,
    },
    count: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: theme.spacing(0.3),
    },
    rateDiv: {
      display: "flex",
    },
    avatarImg: {
      width: "40px",
      height: "40px",
    },
    userName: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )}px Work Sans`,
      color: "var(--secondary-black)",
      marginLeft: theme.spacing(1),
    },
    userDiv: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: theme.spacing(0.5, 0),
    },
    description: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )}px Work Sans`,
      color: "var(--light-gray)",
      margin: theme.spacing(0.8, 0),
    },
    btnDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      marginTop: "8px",
    },
    viewBtn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--primary)",
      marginRight: theme.spacing(0.5),
    },
    amountDiv: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0.5, 0),
    },
    amount: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      marginRight: theme.spacing(0.5),
    },
    amount1: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: theme.palette.primary.main,
      lineHeight: 2,
      [theme.breakpoints.down("xs")]: {
        fontSize: "15px",
      },
    },
    mrp: {
      margin: theme.spacing(0, 1),
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--light-gray)",
      textDecorationLine: "line-through",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  })
);

interface Props {
  data: any;
}

export default function Product(props: Props) {
  const classes = useStyles();
  const data = props?.data
  return (
    <>
      <div className={classes.container}>
        <div className={classes.outerDiv}>
          {data.map((item: any) => (
            <div className={classes.mainProduct}>
              <div className={classes.productDiv}>
                <Card className={classes.productImg}>
                  <CardMedia
                    image={data[0].img}
                    className={classes.productImg2}
                  />
                </Card>
                <img
                  src={Utils.images.HEART}
                  alt="wishlist"
                  className={classes.heartImg}
                />
              </div>
              <div className={classes.textDiv}>
                <Typography variant="h5" className={classes.title}>
                  British Rose Plumping Mask
                </Typography>
                <div className={classes.rateDiv}>
                  <Rating
                    className={classes.rating}
                    name="read-only"
                    value={50}
                    readOnly
                  />
                  <Typography className={classes.count}>(50)</Typography>
                </div>

                <Typography variant="h6" className={classes.description}>
                  To refresh & clean skin
                </Typography>
                <Typography variant="h6" className={classes.description}>
                  750ml
                </Typography>
                <div className={classes.amountDiv}>
                  <Typography className={classes.mrp}>₹500</Typography>
                  <Typography className={classes.amount1}>₹400</Typography>
                </div>
                <div className={classes.btnDiv}>
                  <CustomButton
                    type="submit"
                    fullWidth
                    text="Add to Bag"
                    variant="contained"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
