import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Banner from "../header/banner";
import Level from "../header/level";
import clsx from "clsx";
import CustomButton from "../../../../components/common/button";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getDashboardData, getTierDetails } from "../action";
import { useDispatch } from "react-redux";
import Utils from "../../../../utils";
import { ReducersModal, UserDetailModal } from "../../../../models";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { showLoader } from "../../../home/actions";
import events from "../../../../utils/event/constant"
import { screenViewed } from "../../../../utils/event/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    maxWidthDiv1: {
      height: 510,
      width: "75%",
      padding: theme.spacing(0, 4),
      margin: theme.spacing(1.5, "auto"),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(1.5, "auto", 0),
        padding: theme.spacing(0, 4),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, "auto", 0),
        padding: theme.spacing(0, 0),
        width: "52%",
        height: "420px",
        touchAction: "manipulation"

      },

      "& .MuiCardContent-root": {
        overflowY: "auto",
        height: "250px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        [theme.breakpoints.down("xs")]: {
          height: "300px",
        },
      },

      "& .css-doq0dk": {
        "& .css-1fzpoyk": {
          opacity: [1, "!important"],
          filter: "blur(2px)",
          top: "200px"
        },
        "& :nth-child(2)": {
          filter: "none",
        },
      },
    },

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans SemiBold`,
      color: "var(--black)",
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.5)}px Work Sans SemiBold`,
        lineHeight: "18px",
        letterSpacing: "inherit",
      },
    },
    innerContainer: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1, 0, 0, 0),
      // flexBasis: "70%",
    },
    imgDiv: {
      background: "var(--main-opacity)",
      borderRadius: "50%",
      padding: theme.spacing(0.7),
      height: 40,
      width: 40,
    },
    img: {
      // margin: "10%",
      width: "100%",
      height: "auto",
      // objectFit: "cover",
      // width: theme.spacing(3.4),
      // height: theme.spacing(2.6),
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--black300)",
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.4)}px Work Sans SemiBold`,
      },
    },
    subTitle: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "20px",
      color: "#464748",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Regular`,
      },
    },
    innerRoot: {
      margin: theme.spacing(0, 1),
    },
    carouselRoot: {
      maxWidth: 370,
      width: 370,
      margin: "auto",
      boxShadow: "0px 5px 20px rgba(35, 30, 30, 0.06)",
      // boxShadow: "none",
      borderRadius: 20,
      border: `1px solid ${theme.palette.secondary.main}`,
      padding: theme.spacing(1.6, 1.8),
      [theme.breakpoints.down("xs")]: {
        width: "273px",
        padding: theme.spacing(1),
      },
    },
    container: {
      padding: 0,
    },
    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      color: "var(--black)",
      margin: theme.spacing(1, 0, 1, 0),
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.8)}px Recoleta Alt SemiBold`,
      },
    },

    subHeading: {
      font: `normal ${theme.spacing(1.6)}px Work Sans Medium`,
      lineHeight: "18px",
      color: "rgba(102, 102, 102, 0.99)",
      margin: theme.spacing(1, 0, 2, 0),
      letterSpacing: "0.01em",
      "& a": {
        textDecoration: "underline",
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        marginBottom: 0,
      },
    },
    question: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans SemiBold`,
      lineHeight: "18px",
      color: "var(--black)",
      margin: theme.spacing(3, 0, 2, 0),
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.5)}px Work Sans SemiBold`,
        margin: theme.spacing(3, 0, 0, 0),
      },
    },

    faqQuestion: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      lineHeight: "18px",
      color: "var(--green-color-100)",
      letterSpacing: "0.04em",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Bold`,
        textTransform: "uppercase",
        letterSpacing: "0.001em",
        lineHeight: "21px",
      },
    },
    btnWidth: {
      textAlign: "center",
      "& .MuiButton-fullWidth": {
        width: "50%",
        [theme.breakpoints.down("xs")]: {
          width: "90%",
          fontSize: "14px",
          "& .MuiButton-label": {
            font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
              1.4
            )}px Work Sans SemiBold`,
          },
        },
      },
    },
    headingDiv: {
      [theme.breakpoints.down("xs")]: {
        boxShadow: "0px 4px 5px 0px rgb(0 0 0 / 14%)",
        padding: theme.spacing(1),
      },
    },
    outerCarouselRoot: {
      [theme.breakpoints.down("xs")]: {
        position: "absolute",
        borderLeft: "15px solid #D6CE4B",
        borderRight: "15px solid #D6CE4B",
        borderRadius: "12%",
      },
    },
  })
);

const PlanInfo = ({ content }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.outerCarouselRoot} >
      <Card className={clsx(classes.carouselRoot)}>
        <Typography className={classes.name}>{content?.name}</Typography>
        <CardContent className={classes.container}>
          {content?.contentData?.map((item: any, index: any) => (
            <div className={classes.innerContainer} key={index}>
              {item?.webIcon !== "" ? (
                <div>
                  <div className={classes.imgDiv}>
                    <img
                      src={`${process.env.REACT_APP_MEDIA_URL}${item.webIcon}`}
                      alt="icons"
                      className={classes.img}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className={classes.imgDiv}>
                    <img
                      src={`${Utils.images.LOGO}`}
                      alt="icons"
                      className={classes.img}
                    />
                  </div>
                </div>
              )}
              <div className={classes.innerRoot}>
                <Typography className={classes.title}>{item?.title}</Typography>
                <Typography className={classes.subTitle}>
                  {item?.description}
                </Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const UpgradeClub = () => {
  const classes = useStyles();
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();

  const [goToSlide, setGoToSlide] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<any>({});
  const [tierData, setTierData] = useState<any>([]);

  const userInfoTierType = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo?.tierType
  );

  const getDashboardInfo = () => {
    dispatch(showLoader());
    dispatch(getDashboardData());
  };

  const tierType = location?.state?.type || null;

  useEffect(() => {
    if (tierType) {
      getDashboardInfo();
    }
    getTierInfo();
  }, []);

  useEffect(() => {
    if (tierType) {
      const index = tierData?.findIndex(
        (item: any) => item?.tierType === tierType
      );
      setGoToSlide(index);
      const type = tierData?.find((item: any) => item?.tierType === tierType);
      setSelectedTier(type);
    }
    screenViewed({
      ScreenName: events.SCREEN_MEMBERSHIP,
      CTGenerated: "WEB",
    });
  }, [tierData]);

  const getTierInfo = () => {
    let payload: { type: number } = { type: 2 };
    dispatch(
      getTierDetails(payload, (data: any) => {
        dispatch({
          type: Utils.ActionName.MENU_DATA,
          payload: { memberShipData: data },
        });
        setTierData(data);
        setSelectedTier(data?.[0]);
      })
    );
  };

  let slides = tierData?.map((item: any, index: any) => {
    return {
      key: `${uuidv4()}_${index}`,
      data: item,
      content: <PlanInfo content={item} />,
    };
  });

  const cards = slides?.map((element: any, index: any) => {
    return {
      ...element,
      onClick: () => {
        setSelectedTier(element?.data);
        setGoToSlide(element?.key);
        setGoToSlide(index);
      },
    };
  });


  let xDown: any = null;
  let yDown: any = null;
  const getTouches = (evt: any) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };
  const handleTouchStart = (evt: any) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    console.log('start', firstTouch, xDown, yDown)
  };

  const handleTouchMove = (evt: any) => {
    if (!xDown || !yDown) {
      return;
    }
    let xUp: any = evt.touches[0].clientX;
    let yUp: any = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      console.log('move', Math.abs(xDiff), Math.abs(yDiff))
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        setGoToSlide(goToSlide + 1);
      } else {
        /* right swipe */
        setGoToSlide(goToSlide - 1);
      }
    }
    // else {
    //   if (yDiff > 0) {
    //     /* up swipe */
    //   } else {
    //     /* down swipe */
    //   }
    // }
    /* reset values */
    xDown = null;
    yDown = null;
  };





  return (
    <>
      <Banner />
      <Level />
      <div>
        {userInfoTierType > selectedTier?.tierType ? (
          <div className={classes.headingDiv}>
            <Typography variant="h2" align="center" className={classes.heading}>
              {`How to upgrade to ${selectedTier?.name} Tier ?`}
            </Typography>
            <Typography align="center" className={classes.subHeading}>
              {`Spend INR ${selectedTier?.spendLimit || 0
                } or you can purchase ${selectedTier?.name || ""
                } Membership by paying INR ${selectedTier?.price
                  ? Utils.CommonFunctions.decimalFlat(
                    Number(selectedTier.price)
                  )
                  : 0
                }.`}
            </Typography>
          </div>
        ) : null}
        <div className={classes.maxWidthDiv1} id="three-dCarousel">
          {cards.length > 0 ? (
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <Carousel
                key="3DCarousel"
                slides={cards}
                showNavigation={false}
                goToSlide={goToSlide}
                offsetRadius={1}
                animationConfig={config.gentle}
              />
            </div>
          ) : null}
        </div>
        <div>
          <Typography align="center" className={classes.question}>
            Have Any Questions?
          </Typography>
          <Typography align="center" className={classes.subHeading}>
            Check out our{" "}
            <Link
              to={{
                pathname: Utils.routes.TERMS_CONDITION,
                state: { pageName: "Terms and Conditions" },
              }}
            >
              Terms & Conditions
            </Link>{" "}
            of LYBC. Also take a look at
          </Typography>
          <Typography
            align="center"
            variant="body1"
            color="primary"
            className={classes.faqQuestion}
            onClick={() => history.push(Utils.routes.FAQ)}
          >
            Frequently Asked Questions
          </Typography>
          {userInfoTierType > selectedTier?.tierType ? (
            <div className={classes.btnWidth}>
              <CustomButton
                fullWidth
                type={"button"}
                text={`PAY INR ${Utils.CommonFunctions.decimalFlat(
                  selectedTier?.price
                )} & BECOME A MEMBER`}
                variant="contained"
                onClick={() => {
                  dispatch({
                    type: "updateCart",
                    payload: {
                      grandTotal: selectedTier?.price,
                    },
                  });

                  history.push({
                    pathname: Utils.routes.PURCHASE_MEMBERSHIP,
                    state: {
                      selectedTier,
                      pageName: "Select Payment Mode",
                    },
                  });
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UpgradeClub;
