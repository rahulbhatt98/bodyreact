import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import _ from "lodash";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    doubleCardRoot: {
      position: "relative",
      overflow: "hidden",
    },
    imgDiv: {
      position: "absolute",
      top: "-350px",
      [theme.breakpoints.down(1280)]: {
        top: "-170px",
        width: "40%",
      },
      [theme.breakpoints.down(800)]: {
        top: "-120px",
        width: "40%",
      },
      [theme.breakpoints.down(500)]: {
        top: "-120px",
        width: "80%",
      },
    },
    // removeIconTwo: {
    //   position: "absolute",
    //   background: `url(${Utils.images.ICON_TWO}) top left no-repeat`,
    //   top: "-50%",
    //   left: "-10%",
    //   width: "50%",
    //   height: "100%",
    //   transform: "rotate(45deg)",
    // },
    // removeIconTwo: {
    //   position: "absolute",
    //   background: `url(${Utils.images.ICON_TWO}) top left no-repeat`,
    //   top: "-10%",
    //   left: "-10%",
    //   width: "50%",
    //   height: "100%",
    //   transform: "rotate(45deg)",
    // },
    // [theme.breakpoints.down("lg")]: {
    //   top: "-30%",
    //   left: "-10%",
    //   width: "50%",
    //   height: "100%",
    //   position: "absolute",
    //   transform: "rotate(104deg)",
    //   background: "url(/assets/images/icon2.png) top left no-repeat",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   top: "-45%",
    //   left: "-7%",
    //   width: "50%",
    //   height: "100%",
    //   position: "absolute",
    //   transform: "rotate(45deg)",
    //   background: "url(/assets/images/icon2.png) top left no-repeat",
    // },

    maxWidthDiv: {
      // maxWidth: "1920px",
      padding: theme.spacing(1.2, 2),
      margin: theme.spacing(0, 10),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0, "auto"),
      },
    },
    reverse: {
      flexDirection: "row-reverse",
    },
    gridItem: {
      position: "relative",
      paddingBottom: "7%",
    },
    flowerImg: {
      position: "absolute",
      right: "-14%",
      top: "5%",
      // background: `url(${Utils.images.ICON_THREE}) center no-repeat`,
      width: "50%",
      height: "50%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    bigImg: {
      cursor: "pointer",
      width: "80%",
      height: "476px",
      border: "4px solid var(--white)",
      filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
    },
    floatRight: {
      float: "right",
      marginRight: "25%",
      [theme.breakpoints.down("md")]: {
        marginRight: "0%",
      },
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    smallImg: {
      cursor: "pointer",
      position: "absolute",
      right: "3%",
      bottom: "0px",
      width: "50%",
      border: "4px solid var(--white)",
      filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
      zIndex: 1,
      height: "300px",
    },
    floatLeft: {
      left: "-22%",
      [theme.breakpoints.down("md")]: {
        left: "0%",
      },
    },
    gridItemContent: {
      display: "flex",

      padding: theme.spacing(13, 3),
      position: "relative",
      [theme.breakpoints.down("md")]: {
        alignItems: "center",
        padding: theme.spacing(4, 0),
      },
    },
    flowerImgContent: {
      position: "absolute",
      left: "14%",
      bottom: "5%",
      // background: `url(${Utils.images.ICON_THREE}) center no-repeat`,
      width: "50%",
      height: "50%",
      transform: "rotate(90deg)",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    subheading: {
      font: `normal ${theme.spacing(
        2
      )}px Druk Bold`,
      letterSpacing: "1px",
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.6),
      },
      textTransform: "uppercase",
    },
    heading: {
      font: `normal ${theme.spacing(
        4
      )}px Druk Bold`,
      letterSpacing: "1px",
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(3),
      },
      textTransform: "uppercase",
    },
    paragraph: {
      font: `normal ${theme.spacing(
        1.6
      )}px Work Sans Regular`,
      color: theme.palette.primary.main,
      lineHeight: "19px",
      maxWidth: "400px",
      margin: theme.spacing(2, 0),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
        maxWidth: "none",
      },
    },
    btn: {
      font: `normal 600 ${theme.spacing(1.6)}px Work Sans`,
      borderRadius: 4,
      padding: theme.spacing(1.5, 3),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
      },
      // '& .MuiButton-label': {
      //   textTransform: 'capitalize',
      //   "&::after": {
      //     textTransform: 'capitalize',
      //   },
      //   "&::before": {
      //     textTransform: 'capitalize',
      //   }
      //   }
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "25px",
    },
    imgHide: {
      display: "none",
    },
  })
);

type AppProps = {
  rightImg?: boolean;
  data: any;
  navigateTo: Function;
};

function DoubleCard({ data, rightImg, navigateTo }: AppProps) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  return (
    <>
      
        <div className={clsx(classes.doubleCardRoot)}>
          <div className={clsx(rightImg && classes.imgHide)}>
            <img
              src={Utils.images.ICON_TWO}
              alt="icon"
              className={classes.imgDiv}
            />
          </div>

          {/* <div className={clsx(!rightImg && classes.removeIconTwo)}></div> */}
          <Grid
            container
            className={clsx(classes.maxWidthDiv, rightImg && classes.reverse)}
          >
            <Grid item xs={12} sm={6} className={classes.gridItem}>
              <div className={clsx(!rightImg && classes.flowerImg)}></div>
              <div
                className={clsx(
                  classes.smallImg,
                  rightImg && classes.floatLeft
                )}
                onClick={() => navigateTo(data)}
              >
                <img
                  src={
                    data?.web_img_path_first
                      ? `${IMAGE_URL}${data.web_img_path_first}`
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="small"
                  className={
                    data?.web_img_path_first
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              </div>
              <div
                className={clsx(classes.bigImg, rightImg && classes.floatRight)}
                onClick={() => navigateTo(data)}
              >
                <img
                  src={
                    data?.web_img_path_second
                      ? `${IMAGE_URL}${data.web_img_path_second}`
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="big img"
                  className={
                    data?.web_img_path_second
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.gridItemContent}>
              <div className={clsx(rightImg && classes.flowerImgContent)}></div>
              <div>
                <Typography className={classes.subheading}>
                  {data.tips_month || ""}
                </Typography>
                <Typography className={classes.heading}>
                  {data.title}
                </Typography>
                <Typography className={classes.paragraph}>
                  {data?.description
                    ? _.truncate(
                        Utils.CommonFunctions.replaceHtmlTag(data.description),
                        { length: 250 }
                      )
                    : ""}
                </Typography>
                {data?.button_text && (
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => navigateTo(data)}
                  >
                    {data.button_text}
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      
    </>
  );
}

export default DoubleCard;
