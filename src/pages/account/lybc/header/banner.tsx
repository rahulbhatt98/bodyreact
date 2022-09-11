import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import format from "date-fns/format";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DashboardBannerSkeleton from "../../../../components/common/skeletonList/dashboardBannerSkeleton";
import { ReducersModal } from "../../../../models";
import Utils from "../../../../utils";
import { screenViewed, updateProfile } from "../../../../utils/event/action";
import events from "../../../../utils/event/constant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      [theme.breakpoints.down("xs")]: {
        fontWeight: 600,
        fontSize: "29px",
        padding: theme.spacing(1, 0),
      },
    },
    outerDiv: {
      background: "var(--green-color)",
      border: "1px solid var(--border-color)",
      boxSizing: "border-box",
      position: "relative",
      height: "100%",
      margin: theme.spacing(7, -2, 0, -2),
      [theme.breakpoints.down("xs")]: {
        margin: "0px",
        height: "auto",
        border: "none",
      },
    },
    design1: {
      top: 0,
      left: 0,
      position: "absolute",
    },
    design2: {
      top: "30px",
      right: 0,
      position: "absolute",
    },
    innerDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(1, 0, 3, 0),
      [theme.breakpoints.down("xs")]: {
        padding: "10px 0px 0px 0px",
      },
    },
    img: {
      textAlign: "center",
      marginTop: "-70px",
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      background: "#D6CD56",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: "0px",
        width: "100px",
        height: "100px",
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--white)",
      lineHeight: "28px",
      letterSpacing: "0.04em",

      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.8)}px Work Sans Bold`,
      },
    },
    price: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "47px",
      textTransform: "uppercase",
      margin: theme.spacing(1.2, 0, 5.5, 0),
    },
    tierTitle: {
      background: "#1B7967",
      padding: theme.spacing(1, 3),
      borderRadius: "30px",
      margin: theme.spacing(1, 0),
     
    },
    tierName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: "var(--white)",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.5
        )}px Work Sans Medium`,
      },
    },
    date: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--yellow-color)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Medium`,
      },
    },
    profileImg: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
    noImage: {
      height: "66px",
      width: "56px",
      [theme.breakpoints.down("xs")]: {
        height: "50px",
        width: "45px",
      },
      // padding:"1px"
    },
    imgContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",

      // alignItems: "center"
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "375px",
      flexDirection: "column",
      background: "var(--green-color)",
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        height: "280px",
      },
    },
  })
);
function Banner() {
  const classes = useStyles();
  const profilePicture = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo?.profilePicture
  );
  const params: any = useParams();
  const dashboardData =
    useSelector((state: ReducersModal) => state.userDetailReducer.dashboard) ||
    {};

  const tier = Utils.constants.tierType.find(
    (type: any) => type.id === dashboardData?.TierType
  );
  const startDate = dashboardData?.TierStartDate
    ? format(new Date(dashboardData.TierStartDate), "dd MMMM, yyyy")
    : "";
  const endDate = dashboardData?.TierEndDate
    ? format(new Date(dashboardData.TierEndDate), "dd MMMM, yyyy")
    : "";
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    screenViewed({
      ScreenName: events.SCREEN_DASHBOARD,
      CTGenerated: "WEB",
    });
  }, []);

  useEffect(() => {
    updateProfile('current_points_balance', dashboardData.AvailablePoints)
  }, [dashboardData]);
  return params.slug === "dashboard" && skeletonLoader ? (
    <DashboardBannerSkeleton label="banner" />
  ) : (
    <>
      <Hidden xsDown>
        <div className={classes.root}>
          <Typography variant="h2" color="primary" className={classes.heading}>
            My Dashboard
          </Typography>

          <div className={classes.outerDiv}>
            {/* <img
              src={Utils.images.GRAPHICCLUB}
              alt="design"
              className={classes.design1}
            />
            <img
              src={Utils.images.BG_DESIGN8}
              alt="design"
              className={classes.design2}
            /> */}
            <div className={classes.imgContainer}>
              <div className={classes.img}>
                <img
                  className={
                    profilePicture ? classes.profileImg : classes.noImage
                  }
                  src={
                    profilePicture
                      ? profilePicture
                      : Utils.images.PROFILE_IMAGE_OUTLINE
                  }
                  alt="icon"
                />
              </div>
            </div>
            <div className={classes.innerDiv}>
              <Typography variant="h6" className={classes.title}>
                {(dashboardData?.FirstName
                  ? dashboardData?.FirstName + " "
                  : "") + (dashboardData?.LastName || "")}
              </Typography>
              <div className={classes.tierTitle}>
                <Typography variant="body1" className={classes.tierName}>
                  {tier?.label || ""}
                </Typography>
              </div>
              <Typography variant="body1" className={classes.date}>
                {dashboardData?.TierType === 3
                  ? "Registered On " + startDate + "-" + endDate
                  : "Valid Till " + endDate}
              </Typography>
            </div>
          </div>
        </div>
      </Hidden>

      <Hidden smUp>
        <div className={classes.container}>
          <div className={classes.outerDiv}>
            {/* <img
              src={Utils.images.GRAPHICCLUB}
              alt="design"
              className={classes.design1}
            />
            <img
              src={Utils.images.BG_DESIGN8}
              alt="design"
              className={classes.design2}
            /> */}
            <div className={classes.imgContainer}>
              <div className={classes.img}>
                <img
                  className={
                    profilePicture ? classes.profileImg : classes.noImage
                  }
                  src={
                    profilePicture
                      ? profilePicture
                      : Utils.images.PROFILE_IMAGE_OUTLINE
                  }
                  alt="icon"
                />
              </div>
            </div>
            <div className={classes.innerDiv}>
              <Typography variant="h6" className={classes.title}>
                {(dashboardData?.FirstName
                  ? dashboardData?.FirstName + " "
                  : "") + (dashboardData?.LastName || "")}
              </Typography>
              <div className={classes.tierTitle}>
                <Typography variant="body1" className={classes.tierName}>
                  {tier?.label || ""}
                </Typography>
              </div>
              <Typography variant="body1" className={classes.date}>
                {dashboardData?.TierType === 3
                  ? "Registered On " + startDate + "-" + endDate
                  : "Valid Till " + endDate}
              </Typography>
            </div>
          </div>
        </div>
      </Hidden>
    </>
  );
}

export default Banner;
