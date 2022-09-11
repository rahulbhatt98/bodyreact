import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Utils from "../../utils";
import { getHomeData, hideSkeleton, showSkeleton } from "../home/actions";
import clsx from "clsx";
import { ReducersModal } from "../../models";
import SkeletonProductView from "../../components/common/skeletonList/skeletonProductView";
import Slider from "react-slick";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      backgroundColor: "#044236",
      color: "var(--white)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      position: "relative",
    },
    back1: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    back2: {
      position: "absolute",
      top: "20px",
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
      margin: theme.spacing(6, 4),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(7, 0),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0),
      },
    },
    headingContainer: {
      textAlign: "center",
    },
    heading: {
      font: `normal ${theme.spacing(
        2.4
      )}px Druk Bold`,
      color: "#D6CD56",
      lineHeight: "28px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      margin: theme.spacing(0.5, "auto"),
    },
    descContainer: {
      margin: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    cardContainer: {
      width: "90vw",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
      // display: "flex",
      // flexWrap: "wrap",
      // justifyContent: "center",
      // padding: theme.spacing(2, "auto"),
      // [theme.breakpoints.down("sm")]: {
      //   display: "flex",
      //   flexWrap: "wrap",
      //   marginTop: "15px",
      // },
    },
    productcontainer: {
      padding: theme.spacing(2),
      // width: "calc(20% - 40px)",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        // padding: "10px",
        // // width: "calc(50% - 20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        width: "100%",
        height: "auto",
        padding: theme.spacing(0.5),
      },
    },
    imageContainer: {},
    contentDiv: {},
    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "18.77px",
      // textOverflow: "ellipsis",
      // overflow: "hidden",
      // whiteSpace: "nowrap",
      color: "var(--white)",
      paddingTop: "14.5px",

      [theme.breakpoints.down(480)]: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "165px",
        font: `normal ${theme.spacing(
          1.5
        )}px Work Sans Medium`,
        textAlign: "initial",
      },
      [theme.breakpoints.down(325)]: {
        width: "auto",
      },
    },
    description: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "22.4px",
      color: "var(--white)",
      letterSpacing: "-0.33 px",
      marginTop: "7px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "2px",
        letterSpacing: "0.02em",
        textAlign: "initial",
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
      },
    },
    image: {
      height: "180px",
      borderRadius: "3%",
      width: "100%",
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "25px",
    },
    skeltonView: {
      padding: theme.spacing(22),
      margin: theme.spacing(3, 0),
    },
    slider: {
      "& .slick-prev, .slick-next": {
        display: "block",
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: "white",
        height: 40,
        width: 40,
        color: "#fafafa",
        outline: "#fafafa",
        borderRadius: "50%",
        position: "absolute",
        "&::before": {
          //  background: `url(${Utils.images.RECOMMENDED_ARROW}) center no-repeat`,
          width: "100%",
          height: "100%",
          color: "white",
        },
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
        "& .react-multi-carousel-list": {
          position: "unset",
          width: "98%",
        },
      },
      "& .slick-prev": {
        left: "-50px",
        [theme.breakpoints.down("sm")]: {
          // left: "-25px",
          left: "-35px",
          zIndex: 1,
        },
      },

      "& .slick-next:before": {
        content: `url(${Utils.images.ARROW_RIGHT})`,
        opacity: 1,
        // display: 'none',
      },
      "& .slick-next": {
        right: "-50px",
        [theme.breakpoints.down("sm")]: {
          right: "-35px",
          zIndex: 1,
        },
      },
      "& .slick-prev:before": {
        content: `url(${Utils.images.ARROW_LEFT})`,
        opacity: 1,
      },
      "& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus":
        {
          color: "white",
          background: "white",
          outline: "white",
        },
    },
    innerContainer: {
      display: "flex",
      width: "100vw",
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    innerDiv: {
      margin: theme.spacing(0, 0, 1, 1),
      width: "50%",
      height: "auto",
      cursor: "pointer",
    },
   
  })
);

const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
const HaveYouSeen: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [homeData, setHomeData] = useState([]);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    dispatch(showSkeleton());
    dispatch(
      getHomeData((resp: any) => {
        const haveYouSeenData =
          resp?.find((data: any) => data?.block_key === "have_seen") || [];
        setHomeData(haveYouSeenData?.content || []);
        dispatch(hideSkeleton());
      })
    );
  }, []);

  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === "product") {
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          "others"
        ).replace("/c/", "/p/");
        history.push(pathname);
        // history.push(
        //   Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL, {
        //     ":id": item?.entity_id,
        //   })
        // );
      } else {
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          "others"
        );
        history.push(pathname);
        // history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${item.entity_id}`);
      }
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // rtl: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {skeletonLoader ? (
        <div className={classes.mainContainer}>
          <SkeletonProductView flag={"have_you_seen"} md={2} />
        </div>
      ) : homeData && Array.isArray(homeData) && homeData?.length > 0 ? (
        <div className={classes.mainContainer}>
          <div className={classes.topContainer}>
            <div className={classes.headingContainer}>
              <Typography variant="h3" className={classes.heading}>
                Have you Seen
              </Typography>
            </div>

            <Hidden xsDown>
              <div className={classes.cardContainer}>
                {homeData?.length > 0 && (
                  <Slider {...settings} className={classes.slider}>
                    {homeData.map((item: any, index: any) => (
                      <div
                        className={classes.productcontainer}
                        key={item.key}
                        onClick={() => navigateTo(item)}
                      >
                        <div className={classes.imageContainer}>
                          <img
                            src={
                              item?.web_img_path
                                ? `${IMAGE_URL}${item.web_img_path}`
                                : Utils.images.PRODUCT_PLACEHOLDER
                            }
                            alt="img one"
                            className={
                              item?.web_img_path
                                ? classes.image
                                : clsx(classes.image, classes.noImgBackground)
                            }
                          />
                        </div>
                        <div className={classes.contentDiv}>
                          <Typography className={classes.name}>
                            {item?.title || ""}
                            {/* {item?.title ? _.truncate(Utils.CommonFunctions.replaceHtmlTag(item.title), { length: 20 }) : ''} */}
                          </Typography>
                          <Typography className={classes.description}>
                            {item?.description
                              ? _.truncate(
                                  Utils.CommonFunctions.replaceHtmlTag(
                                    item.description
                                  ),
                                  { length: 70 }
                                )
                              : ""}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </Hidden>
            <Hidden smUp>
            {homeData?.length > 0 && (
              <div className={classes.innerContainer}>
                {homeData.map((item: any, index: any) => (
                  <div className={classes.innerDiv} key={item._id}>
                    <div
                      className={classes.productcontainer}
                      key={item.key}
                      onClick={() => navigateTo(item)}
                    >
                      <div className={classes.imageContainer}>
                        <img
                          src={
                            item?.web_img_path
                              ? `${IMAGE_URL}${item.web_img_path}`
                              : Utils.images.PRODUCT_PLACEHOLDER
                          }
                          alt="img one"
                          className={
                            item?.web_img_path
                              ? classes.image
                              : clsx(classes.image, classes.noImgBackground)
                          }
                        />
                      </div>
                      <div className={classes.contentDiv}>
                        <Typography className={classes.name}>
                          {item?.title || ""}
                          {/* {item?.title ? _.truncate(Utils.CommonFunctions.replaceHtmlTag(item.title), { length: 20 }) : ''} */}
                        </Typography>
                        <Typography className={classes.description}>
                          {item?.description
                            ? _.truncate(
                                Utils.CommonFunctions.replaceHtmlTag(
                                  item.description
                                ),
                                { length: 70 }
                              )
                            : ""}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
               )}
            </Hidden>
           
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HaveYouSeen;
