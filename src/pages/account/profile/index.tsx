import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Grid,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { ReducersModal } from "../../../models";
import EditProfile from "./editProfile";
import format from "date-fns/format";
import clsx from "clsx";
import MobileMyAccount from "../mobileView/mobileMyAccount";
import events from "../../../utils/event/constant";
import { screenViewed } from "../../../utils/event/action";
import { getDashboardData } from "../lybc/action";
import { hideSkeleton, showSkeleton } from "../../home/actions";
import Utils from "../../../utils";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      background: "var(--white)",
      // boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      // padding: theme.spacing(1.2),
      [theme.breakpoints.down("xs")]: {
        background: "var(--white)",
        boxShadow: "none",
        padding: theme.spacing(0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
    },
    profileBox: {
      background: "var(--white)",
      border: "1px solid #E2E2E2",
      boxSizing: "border-box",
      margin: theme.spacing(1.4, 0),
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: "var(--text-green)",
      lineHeight: "21px",
      textTransform: "uppercase",
    },
    profileInnerBox: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1.5),
    },
    edit: {
      font: `normal ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: 600,
      textTransform: "uppercase",
      cursor: "pointer",
    },
    signedBox: {
      padding: theme.spacing(1),
      margin: theme.spacing(0.8),
      backgroundColor: "var(--creame-color)",
    },

    signHeading: {
      font: `normal ${theme.spacing(1.6)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      color: "var(--text-green)",
    },

    name: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      fontWeight: 500,
      margin: theme.spacing(1, 0),
      lineHeight: "18px",
      color: "#000000",
    },
    bold: {
      fontWeight: 600,
    },
    root: {
      flexGrow: 1,
    },
    pointBox: {
      background: "var(--white)",
      border: "2px solid #3A857E",
      boxSizing: "border-box",
      width: theme.spacing(22),
      height: theme.spacing(22),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
    },
    leftPointBox: {
      marginLeft: "31px",
    },
    pointInner: {
      background: "#3A857E",
      width: "195px",
      height: "195px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    rewardDiv: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(3.9),
    },
    centerAlign: {
      padding: "10px 20px",
    },
    point: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3
      )}px Work Sans`,
      lineHeight: "35px",
      // textTransform: "uppercase",
      color: "var(--white)",
      textAlign: "center",
    },
    pointName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "25px",
    },
    text: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--text-green)",
      marginBottom: theme.spacing(1.5),
    },
  })
);

const AccountBox = (props: any) => {
  const location: any = useLocation();
  const classes = useStyles();
  const [editProfileVisibility, setEditProfileVisibility] = useState(
    location?.state?.accountVisibile || false
  );
  const dispatch = useDispatch()
  const dashboardData =
    useSelector((state: ReducersModal) => state.userDetailReducer.dashboard) ||
    {};
  const data =
    useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) ||
    {};
  const history = useHistory();
  useEffect(() => {
    setEditProfileVisibility(location?.state?.accountVisibile);
    screenViewed({
      ScreenName: events.SCREEN_ACCOUNT,
      CTGenerated: "WEB"
    });
    dispatch(showSkeleton());
    dispatch(
      getDashboardData(() => {
        dispatch(hideSkeleton());
        // setLoader(false);
        // if (dashboardData?.TierType) {
        //   getTierData()
        // }
      }));

  }, []);

  const date = data?.tierDetails?.enrollDate || null;

  const memberData = [
    {
      title: `${data?.tierDetails?.currentTier ?? "N/A"} Member`,
      subTitle: `Tier Start Date  ${date ? format(new Date(date), "dd/MM/yyyy") : ""
        }`,
    },
    {
      title: Utils.CommonFunctions.decimalFlat(dashboardData?.TotalEarnedPoints, 0) || 0,
      subTitle: "Total Points Earned",
    },
  ];

  return (
    <>
      {/* // !editProfileVisibility ? */}
      <Hidden xsDown>
        <>
          {/* <Loader show={loader} /> */}
          <div className={classes.outerDiv}>
            <Typography
              variant="h3"
              className={classes.heading}
              color="primary"
            >
              My Account
            </Typography>
            <div className={classes.profileBox}>
              <div className={classes.profileInnerBox}>
                <Typography variant="h4" className={classes.subHeading}>
                  PROFILE DETAILS
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.edit}
                  onClick={
                    // () => setEditProfileVisibility(!editProfileVisibility)
                    () => history.push({ pathname: "/edit-profile" })
                  }
                >
                  Edit Profile
                </Typography>
              </div>
              <Divider />
              <div className={classes.signedBox}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.signHeading}>
                      Signed-in as:
                    </Typography>
                    <Typography className={clsx(classes.name, classes.bold)}>
                      {data.fullName}
                    </Typography>
                    <Typography className={classes.name}>
                      {data.email}
                    </Typography>
                    <Typography className={classes.name}>
                      {data.mobileNo}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <Typography className={classes.signHeading}>
                      Member Since:
                    </Typography>
                    <Typography className={classes.name}>
                      {data?.createdAt
                        ? format(new Date(data.createdAt), "MMMM dd, yyyy")
                        : "-"}
                    </Typography>
                  </Grid> */}
                </Grid>
              </div>
            </div>
            <div className={classes.root}>
              <Grid container className={classes.rewardDiv} spacing={2}>
                {memberData.map((item: any, index: number) => (
                  <div
                    className={clsx(
                      classes.pointBox,
                      index === 1 ? classes.leftPointBox : ""
                    )}
                    key={index}
                  >
                    <div className={classes.pointInner}>
                      <div className={classes.centerAlign}>
                        <Typography className={classes.point}>
                          {item?.title}
                        </Typography>
                      </div>
                      <div className={classes.centerAlign}>
                        <Typography className={classes.pointName}>
                          {item.subTitle}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        </>
      </Hidden>
      <Hidden smUp>
        <MobileMyAccount />
      </Hidden>
    </>
    // :
    // <EditProfile setEditProfileVisibility={setEditProfileVisibility} />
  );
};

export default AccountBox;
