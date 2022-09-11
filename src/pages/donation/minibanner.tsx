import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
 
  Box,
} from "@material-ui/core";
import Utils from "../../utils";
import CustomButton from "../../components/common/button";
import { Link } from "react-router-dom";
import Progress from "./progress";

const data = [
  { id: 1, title: "Total Donations:", price: "₹ 78,49,53,676" },
  {
    id: 2,
    title: "Total Supporters:",
    price: "784953676",
  },
];

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
      [theme.breakpoints.down("xs")]:{
        width: "90%"
      }
    },
    headerDiv: {
      padding: theme.spacing(2),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px  Work Sans`,
      lineHeight: "42px",
      letterSpacing: "0.01em",
      textTransform: "uppercase",
    },
    subheading: {
      font: `normal ${theme.spacing(1.6)}px  Work Sans`,
      lineHeight: "19px",
      padding: theme.spacing(1, 3),
    },
    innerContainer: {
      display: "flex",
      margin: theme.spacing(3, 0, 0, 0),
      [theme.breakpoints.down("xs")]:{
        flexDirection: "column"
      }
    },
    btnWidth: {
      textAlign: "center",
      "& .MuiButton-fullWidth": {
        width: "200px",
      },
    },
    leftInnerDiv: {
      padding: theme.spacing(2),
    },
    leftContainer: {
      flexBasis: "50%",
      position: "relative",
    },
    rightContainer: {
      flexBasis: "50%",
    },
    rightInnerDiv: {},
    leftDivText: {
      font: `normal 600 ${theme.spacing(3.6)}px  Work Sans`,
      letterSpacing: "0.02em",
    },
    leftDiv: {
      margin: theme.spacing(3, -4, 3, 0),
      background: "var(--creame-color)",
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(0),
      }
    },
    leftText: {
      font: `normal 500 ${theme.spacing(2)}px  Work Sans`,
      lineHeight: "23px",
      letterSpacing: "0.02em",
      color: "var(--black)",
    },
    rightText: {
      font: `normal 700 ${theme.spacing(2)}px  Work Sans`,
      lineHeight: "23px",
      letterSpacing: "0.02em",
      color: "var(--black)",
    },
    innerLeftContainer: {
      flexBasis: "40%",
    },
    secondBtn: {
      margin: theme.spacing(1.8, 0),
      "& .MuiButton-fullWidth": {
        width: "200px",
      },
    },
    img: {
      height: "350px",
      width: "100%",
      objectFit: "cover",
    },
  })
);

function MiniBanner(props: any) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.productContainer}>
        <div className={classes.findContainer}>
          <div className={classes.bannerRoot}>
            <div className={classes.headerDiv}>
              <Typography
                align="center"
                color="primary"
                className={classes.heading}
              >
                Feed the children around the word
              </Typography>
              <Typography
                align="center"
                color="primary"
                className={classes.subheading}
              >
                In the face of the COVID-19 pandemic, shared meals are helping
                provide critical assistance in new and safe ways to some of the
                most vulnerable families.
              </Typography>
              <div>
                <div className={classes.btnWidth}>
                  <Link to={Utils.routes.DONATION_FORM}>
                    <CustomButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      text="Donate Now"
                    />
                  </Link>
                </div>
              </div>
              
              <Progress value={49}/>
            </div>
            
            <div className={classes.innerContainer}>
              <div className={classes.leftContainer}>
                <div className={classes.leftDiv}>
                  <div className={classes.leftInnerDiv}>
                    <Typography color="primary" className={classes.leftDivText}>
                      Every Penny Counts
                    </Typography>
                    {data.map((item: any) => (
                      <Box className={classes.innerContainer} key={item.id}>
                        <div className={classes.innerLeftContainer}>
                          <Typography
                            color="primary"
                            className={classes.leftText}
                          >
                            {item.title}
                          </Typography>
                        </div>
                        <div className={classes.rightContainer}>
                          <Typography
                            color="primary"
                            className={classes.rightText}
                          >
                            {item.price}
                          </Typography>
                        </div>
                      </Box>
                    ))}

                    <div className={classes.secondBtn}>
                      <CustomButton
                        text="Share"
                        fullWidth
                        type="submit"
                        variant="contained"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.rightContainer}>
                <div className={classes.rightInnerDiv}>
                  <img
                    src={Utils.images.DONATION_IMG}
                    alt="donationImg"
                    className={classes.img}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MiniBanner;
