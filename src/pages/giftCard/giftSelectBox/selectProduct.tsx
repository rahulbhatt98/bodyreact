import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import Utils from "../../../utils";
import Rating from "@material-ui/lab/Rating";
import CustomButton from "../../../components/common/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    btnContainer: {
      float: "right",
    },
    button: {
      borderRadius:"4px",
      color: "var(--main-opacity)",
      border: "1px solid var(--main-opacity) ",
      margin: theme.spacing(1, 1.5, 0, 0),
      padding: theme.spacing(0.8, 2),
    },
    heading: {
      font: `normal  ${theme.spacing(1.6)}px Recoleta Alt`,
      fontWeight: "bold",
      lineHeight: "22px",
      letterSpacing: "0.02em",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "60px",
      },
    },
    externalContainer: {
      margin: theme.spacing(3, 0),
    },

    productDiv: {
      padding: theme.spacing(0, 1),
      margin: theme.spacing(2, 0),
    },

    imgDiv1: {
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      height: "250px",
      background: "var(--medium-creame-color)",
      "& img": {
        width: "100%",
        objectFit: "contain",
      },
    },
    contentDiv: {
      margin: theme.spacing(1, 0),
    },
    insideDiv: {},
    productName: {
      font: `normal  ${theme.spacing(2)}px Work Sans`,
      fontWeight: 600,
      color: "var(--secondary-black)",
      lineHeight: "24px",
    },
    starDiv: {
      margin: theme.spacing(0.5, 0),
      display: "flex",
      alignItems: "center",
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
    discription: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )}px Work Sans`,
      color: "var(--light-gray)",
      height: 10,
      [theme.breakpoints.down("sm")]: {
        height: 40,
      },
    },
    quantity: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: 1.6,
      height: "16px",
      margin: theme.spacing(0.5, 0, 0, 0),
      color: theme.palette.primary.main,
      textTransform: "lowercase",
    },
    imageDiv: {
      position: "relative",
    },
    price: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: 1.6,
      height: "16px",
      margin: theme.spacing(0.5, 0, 0, 0),
      color: theme.palette.primary.main,
      textTransform: "lowercase",
    },
    btn: {
      width: "60%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  })
);
const array = [
  { id: 1, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "899" ,count:457},
  { id: 2, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "899" ,count:457},
  { id: 3, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "100", price: "999" ,count:457},
  { id: 4, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "400" ,count:457},
  { id: 5, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "450", price: "500" ,count:457},
  { id: 6, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "600" ,count:457},
  { id: 7, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "900", price: "700" ,count:457},
];

const array2 = [
  { id: 1, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "899", count:500},
  { id: 2, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "899", count:500},
  { id: 3, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "100", price: "999", count:500},
  { id: 4, productName: "Satsuma Shower Gel", description: "To refresh & clean skin", quantity: "750", price: "400", count:500},
];

const SelectProduct: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const arr = props.flag === "bundled" ? array : array2;

  return (
    <div>
      <div className={classes.root}>
        <Typography className={classes.heading}>
          2 of 16 product selected
        </Typography>
        <div className={classes.btnContainer}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            startIcon={<img src={Utils.images.FILTER} alt="filtericon " />}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            endIcon={<img src={Utils.images.DOWNARROW} alt="filtericon" />}
          >
            Best Seller
          </Button>
        </div>
      </div>
      <div className={classes.externalContainer}>
        {
        // props.flag === "bundled" &&
          <Grid container>
            {array.map((item, index) => (
              <Grid item xs={6} md={3} key={item.id}>
                <div className={classes.productDiv}>
                  <div className={classes.imageDiv}>
                    <div className={classes.imgDiv1}>
                      <img src={Utils.images.PRODUCT1} alt="product1" />
                    </div>
                  </div>
                  <div className={classes.contentDiv}>
                    <Typography className={classes.productName}>
                      {item?.productName || ''}
                    </Typography>
                    <div className={classes.starDiv}>
                      <Rating
                        className={classes.rating}
                        name="read-only"
                        readOnly
                      />
                      <Typography className={classes.count}>({item?.count||0})</Typography>
                    </div>
                    <Typography className={classes.discription}>
                      {item?.description || ''}
                    </Typography>
                    <Typography className={classes.quantity}>{item?.quantity || 0} ml</Typography>
                    <Typography className={classes.price}>₹ {item?.price || 0}</Typography>
                  </div>
                  <div>
                    {index === 0 || index === 5 || index === 3 || index === 8 ? (
                      <div className={classes.btn}>
                        <CustomButton
                          type={"submit"}
                          color="primary"
                          variant="outlined"
                          fullWidth
                          text={"Remove"}
                        />
                      </div>
                    ) : (
                      <div className={classes.btn}>
                        <CustomButton
                          type={"submit"}
                          color="primary"
                          variant="contained"
                          fullWidth
                          text={"Select"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        }
        {/* {props.flag === "free" &&
          <Grid container>
            {array2.map((item, index) => (
              <Grid item xs={6} md={3} key={item?.id}>
                <div className={classes.productDiv}>
                  <div className={classes.imageDiv}>
                    <div className={classes.imgDiv1}>
                      <img src={Utils.images.PRODUCT1} alt="product1" />
                    </div>
                  </div>
                  <div className={classes.contentDiv}>
                    <Typography className={classes.productName}>
                      Satsuma Shower Gel
                    </Typography>
                    <div className={classes.starDiv}>
                      <Rating
                        className={classes.rating}
                        name="read-only"
                        readOnly
                      />
                      <Typography className={classes.count}>(457)</Typography>
                    </div>
                    <Typography className={classes.discription}>
                      To refresh & clean skin
                    </Typography>
                    <Typography className={classes.quantity}>750 ml</Typography>
                    <Typography className={classes.price}>₹899</Typography>
                  </div>
                  <div>
                    {index === 0 || index === 5 || index === 3 || index === 8 ? (
                      <div className={classes.btn}>
                        <CustomButton
                          type={"submit"}
                          color="primary"
                          variant="outlined"
                          fullWidth
                          text={"Remove"}
                        />
                      </div>
                    ) : (
                      <div className={classes.btn}>
                        <CustomButton
                          type={"submit"}
                          color="primary"
                          variant="contained"
                          fullWidth
                          text={"Select"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        } */}
      </div>
    </div>
  );
};

export default SelectProduct;
