import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      // padding: theme.spacing(4, 3),
      margin: theme.spacing(2, 0),
      position: "relative",
      backgroundColor: "var(--white)",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        padding: theme.spacing(0),
      },
      [theme.breakpoints.down(300)]: {
        height: "auto",
        padding: theme.spacing(0, 0, 0, 0),
      },
    },
    back1: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    back2: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    back3: {
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    back4: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },

    topContainer: {
      // background: `url(${Utils.images.HAVE_YOU_SEEN_BG}) no-repeat`,
      backgroundSize: "cover",
      padding: theme.spacing(5),
      // height: '466px',
      backgroundColor: "#044236",
      borderRadius: "8px",
      // margin: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        background: "linear-gradient(0deg, #004236, #004236)",
        padding: "15px 0px",
        borderRadius: "8px",
      },
    },
    headingContainer: {
      textAlign: "center",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        3.2
      )}px Druk`,
      color: "#D6CD56",
      lineHeight: "37px",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      margin: theme.spacing(0, "auto"),


    },
    descContainer: {
      margin: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: theme.spacing(2, "auto"),
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "15px",
      },
    },
    productcontainer: {
      margin: theme.spacing(2),
      width: "calc(20% - 40px)",

      [theme.breakpoints.down("sm")]: {
        margin: "10px",
        width: "calc(50% - 20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    },
    imageContainer: {},
    contentDiv: {},
    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "18.77px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      color: "var(--white)",
      paddingTop: "14.5px",
    },
    discription: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "22.4px",
      color: "var(--white)",
      letterSpacing: "-0.33 px",
      marginTop: "7px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "2px",
        letterSpacing: "-0.33 px",
      },
    },
    image: {
      height: "179px",
      width: "180px",
      maxWidth: "180px",
      borderRadius: "3px",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        width: "100%",
      },
    },
  })
);

function HaveYouSeen() {
  const classes = useStyles();
  const data = [
    {
      name: "Oily Skin",
      desc: "Lorem ipsum dolor sitfghh amet, consectetur asdddd adipiscing elit.",
      image: "/assets/images/gifts/dummy_product1.svg",
    },
    {
      name: "Dry Skin",
      desc: "Lorem ipsum dolor sitfghh amet, consectetur asdddd adipiscing elit.",
      image: "/assets/images/gifts/dummy_product.svg",
    },
    {
      name: "Oily Skin",
      desc: "Lorem ipsum dolor sitfghh amet, consectetur asdddd adipiscing elit.",
      image: "/assets/images/gifts/dummy_product1.svg",
    },
    {
      name: "Dry Skin",
      desc: "Lorem ipsum dolor sitfghh amet, consectetur asdddd adipiscing elit.",
      image: "/assets/images/gifts/dummy_product.svg",
    },
    {
      name: "Dry Skin",
      desc: "Lorem ipsum dolor sitfghh amet, consectetur asdddd adipiscing elit.",
      image: "/assets/images/gifts/dummy_product1.svg",
    },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.back1}>
        <img src={`${Utils.images.BACK_BG1}`} alt="desgin" />
      </div>
      <div className={classes.back2}>
        <img src={`${Utils.images.BACK_BG2}`} alt="desgin" />
      </div>
      <div className={classes.back3}>
        <img src={`${Utils.images.BACK_BG3}`} alt="desgin" />
      </div>
      <div className={classes.back4}>
        <img src={`${Utils.images.BACK_BG4}`} alt="desgin" />
      </div>
      <div className={classes.topContainer}>
        <div className={classes.headingContainer}>
          <Typography variant="h3" className={classes.heading}>
            Have you Seen
          </Typography>
        </div>

        <div className={classes.cardContainer}>
          {data.map((item: any, index: any) => (
            <div className={classes.productcontainer} key={index}>
              <div className={classes.imageContainer}>
                <img src={item.image} alt="img one" className={classes.image} />
              </div>
              <div className={classes.contentDiv}>
                <Typography className={classes.name}>{item.name}</Typography>
                <Typography className={classes.discription}>
                  {item.desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HaveYouSeen;
