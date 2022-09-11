import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Hidden,
  // CircularProgress,
  // Backdrop,
  // Button
} from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";
import Utils from "../../../../utils";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ReducersModal } from "../../../../models";
import { useHistory } from "react-router-dom";
// import { hideLoader, showLoader } from "../../../home/actions";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "var(--white)",
      padding: theme.spacing(2),
      border: "1px solid var(--border-color)",

      [theme.breakpoints.down("xs")]: {
        fontWeight: 600,
        fontSize: "29px",
        padding: theme.spacing(0),
        margin: theme.spacing(0.5, 0),
        borderTop: "7px solid rgba(35, 30, 30, 0.06)",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      letterSpacing: "0.04em",
    },

    pointBox: {
      background: "var(--white)",
      border: "2px solid #3A857E",
      boxSizing: "border-box",
      width: theme.spacing(19),
      height: theme.spacing(19),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        width: "100px",
        height: "100px",
        padding: theme.spacing(0.6),
        margin: theme.spacing(1, 0.4),
      },
    },
    pointInner: {
      background: "#3A857E",
      width: "164.67px",
      height: "164.67px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        width: "85px",
        height: "85px",
      },
    },
    rewardDiv: {
      display: "flex",
      padding: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        // flexWrap: "wrap",
        alignItems: "center",
        padding: theme.spacing(2, 0),
        overflowX: "auto",
        flexDirection: "row",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
    rewardOuterDiv: {
      width: "100%",
      
    },
    point: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3
      )}px Work Sans`,
      lineHeight: "35px",
      textTransform: "uppercase",
      color: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2
        )}px Work Sans Bold`,
      },
    },
    pointName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--white)",
      margin: theme.spacing(0.2, 1.2),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1
        )}px Work Sans Medium`,
      },
    },
    text: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--text-green)",
      marginBottom: theme.spacing(1.5),
    },
    rootDiv: {
      border: "2px solid var(--border-color)",
      [theme.breakpoints.down("xs")]: {
        borderLeft: "none",
        borderRight: "none",
        width: "100%",
      },
    },
    taskName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--black)",
      margin: theme.spacing(1, 0),
      letterSpacing: "0.02em",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.2
        )}px Work Sans Semibold`,
      }
    },
    taskDiv: {
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(2.5, 1),
    },
    progress: {
      background: "#DCEFE4 !important",
      height: "8px !important",
      borderRadius: "12px",
      "& .MuiLinearProgress-bar": {
        background: "#3A857E !important",
      },
    },
    taskRoot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    upgradeRoot: {
      padding: theme.spacing(2, 1.5),
      background:
        "url(/assets/images/gifts/search_background.svg) top left no-repeat",
      alignItems: "center",
      borderRadius: "5px",
      backgroundSize: "cover",
      backgroundColor: "#044236",
      margin: theme.spacing(2, 0),
      [theme.breakpoints.down("xs")]: {
        backgroundImage: "none",
        padding: theme.spacing(1.5, 1.5),
        margin: theme.spacing(2, 1),
      },
    },
    storeHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      letterSpacing: "0.06em",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1),
      },
    },
    storeRootSecond: {
      display: "flex",
      alignItems: "stretch",
      marginTop: "12px",
    },
    secndDivider: {
      justifyContent: "center",
      width: "100%",
      // padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      borderLeft: "1px solid var(--text-color)",
      borderRight: "1px solid var(--text-color)",
    },
    divider: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      right: "50%",
      // height: "55px",
      borderLeft: "1px solid var(--text-color)",
      borderRight: "1px solid var(--text-color)",
      justifyContent: "center",
      marginRight: "-3px",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        width: "100%",
        borderRight: "none",
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
      },
    },
    offer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        width: "100%",
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
      },

      // justifyContent: "center",
      // margin: theme.spacing(2, 2, 2, 0),
    },
    title: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      color: "var(--secondary-black)",
      letterSpacing: "0.04em",
     
    },
    storetitle: {
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      color: "var(--secondary-black)",
      letterSpacing: "0.04em",
      margin: theme.spacing(1.2, 0),

      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Medium`,
      }
    },
    imgDiv: {
      margin: theme.spacing(1, 0),
    },
    outerContainer: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
      },
    },
    innerContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: theme.spacing(0, 1.4),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    headingDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexBasis: "70%",
    },
    header: {
      font: `normal ${theme.spacing(
        3.6
      )}px Druk Bold`,
      color: "var(--yellow-color)",
      letterSpacing: "0.04em",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        lineHeight: "inherit",
        // textAlign: "center",
        font: `normal ${theme.spacing(
         1.8
        )}px Druk Bold`,
      },
    },
    subHeader: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      color: "var(--white)",
      lineHeight: "25.6px",
      letterSpacing: "0.04em",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 1, 0),
        lineHeight: "inherit",
        // textAlign: "center",
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      },
    },
    upgradeBtn: {
      background: "var(--yellow-color)",
      // padding: theme.spacing(1, 5),
      flexBasis: "25%",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      [theme.breakpoints.down("sm")]: {
        flexBasis: "auto",
        padding: theme.spacing(1.5),
        height: "30px",
        width: "40%",
        borderRadius: "5px",
        margin: theme.spacing(1, 0, 0, 0),
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans Medium`,
      },
      [theme.breakpoints.down(350)]: {
        flexBasis: "auto",
        padding: theme.spacing(1.5),
        height: "30px",
        width: "50%",
        borderRadius: "5px",
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    btn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      color: "#363F3C",
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
    storeRoot: {
      background: "var(--white)",
      borderRadius: "12px",
      // border: "1px solid rgba(146, 146, 146, 0.1)",
      // padding: theme.spacing(1.4),
      marginTop: "20px",
    },
    img: {
      [theme.breakpoints.down("xs")]: {
        width: "50px",
        height: "100%",
        objectFit: "cover",
      },
    },
    img2: {
      width: "50px",
      height: "50px",
      objectFit: "fill",
    },
    loader: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: theme.zIndex.modal + 1,
      color: "#fff",
    },
    storeMobileDiv: {
      display: "flex",
      overflowX: "auto",
      width: "100%",
      borderTop: "1px solid var(--border-color)",
      borderBottom: "1px solid var(--border-color)",
      padding: "8px 0px",
      margin: theme.spacing(2, 1.5),
      "&::-webkit-scrollbar": {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        margin: theme.spacing(2, 1),
      },
    },
    imgMobileDiv: {
      width: "150px",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
    },
    mobileDiv: {
      width: "150px",
      height: "auto",
      // padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
    },
    outerDiv:{
      [theme.breakpoints.down("xs")]: {
        boxShadow: "0px 5px 20px rgba(35, 30, 30, 0.06)",
        padding: theme.spacing(0.5,2)
      },

    }
  })
);

interface Props {
  data: any;
  dashboardData: any;
  storeOffers: any;
}
const Dashboard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const { dashboardData, storeOffers } = props;
  const userInfoTierType =
    useSelector(
      (state: ReducersModal) => state.userDetailReducer.userInfo?.tierType
    ) || null;
  // const dashboardData = useSelector((state: ReducersModal) => state.dashboardReducer).dashboard || {}
  // const [storeOffers, setStoreOffers] = useState([])
  // const [loader, setLoader] = useState(false);
  const history = useHistory();
  const configs =
    useSelector((state: ReducersModal) => state.configReducer.generalConfigs) ||
    {};

  // const getTierData = () => {
  //   const query = `?type=1&tierType=${userData.tierType}`
  //   dispatch(showLoader())
  //   dispatch(getTierDetails(query, (resp: any) => {
  //     dispatch(hideLoader());
  //     setStoreOffers(resp?.[0] ? resp[0]?.contentData : [])
  //   }))
  // }

  // useEffect(() => {
  //   // setLoader(true);
  //   dispatch(showSkeleton())
  //   dispatch(getDashboardData(() => {
  //     dispatch(hideSkeleton())
  //     // setLoader(false);
  //     // if (dashboardData?.TierType) {
  //     //   getTierData()
  //     // }
  //   }))
  // }, [])

  // useEffect(() => {
  //   if (userData?.tierType && storeOffers.length === 0) {
  //     getTierData()
  //   }
  // }, [userData?.tierType]
  // );

  // const numFormatter = (num: any) => {
  //   if (num > 1 && num <= 100)
  //     return num;
  //   else if (num > 100 && num <= 1000)
  //     return num / 10;
  //   else if (num > 1000 && num <= 10000)
  //     return num / 100;

  // }

  const formRewardsData = () => {
    const data = [
      {
        id: 11,
        price: dashboardData?.TotalEarnedPoints || 0,
        text: "Total Points Earned",
      },
      {
        id: 12,
        price: dashboardData?.AvailablePoints || 0,
        text: "Total Points Available",
      },
      {
        id: 13,
        price: dashboardData?.TotalPointsRedeemed || 0,
        text: "Total Points Redeemed",
      },
    ];
    return data;
  };
  const tier = Utils.constants.tierType.find(
    (type: any) => type.id === dashboardData?.TierType
  );

  const formProgressData = () => {
    const progressData = [
      {
        id: 1,
        title:
          Utils.CommonFunctions.getCamelCaseString(tier?.label || "") +
          " Tier Spend",
        rate: dashboardData?.CurrentTierLimit,
        value:
          dashboardData?.CurrentTierSpend && dashboardData?.CurrentTierLimit
            ? (Number(dashboardData?.CurrentTierSpend) * 100) /
              Number(dashboardData?.UpgradeTierLimit)
            : 0,
      },
      {
        id: 2,
        title:
          dashboardData?.TierType !== 1
            ? `Spend ${dashboardData?.SpendToUpgrade || ""} to upgrade to ${
                dashboardData?.UpgradeTier || ""
              }`
            : "",
        rate: dashboardData?.UpgradeTierLimit || "",
        value:
          dashboardData?.CurrentTierSpend && dashboardData?.UpgradeTierLimit
            ? (Number(dashboardData?.CurrentTierSpend) * 100) /
              Number(dashboardData?.UpgradeTierLimit)
            : 0,
      },
    ];
    return progressData;
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.outerDiv}>
          {/* <Hidden xsDown>
            <Typography variant="h2" className={classes.heading}>
              My Dashboard
            </Typography>
          </Hidden> */}

          {/* <Hidden smUp>
            <Typography variant="h2" className={classes.heading}>
              My Rewards
            </Typography>
          </Hidden> */}
          <div className={classes.rewardOuterDiv}>
            <div className={classes.rewardDiv}>
              {formRewardsData().map((item: any) => (
                <div key={item.id} className={classes.pointBox}>
                  <div className={classes.pointInner}>
                    <div>
                      <Typography align="center" className={classes.point}>
                        {Utils.CommonFunctions.decimalFlat(item.price, 0)}
                      </Typography>
                    </div>
                    <div>
                      <Typography align="center" className={classes.pointName}>
                        {item.text}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.rootDiv}>
          {formProgressData().map((item: any) => {
            return (
              <>
                {item.title ? (
                  <div className={classes.taskDiv} key={item.id}>
                    <LinearProgress
                      variant="determinate"
                      className={classes.progress}
                      value={
                        item.value
                          ? Utils.CommonFunctions.decimalFlat(item.value, 0)
                          : 0
                      }
                    />
                    <div className={classes.taskRoot}>
                      <Typography className={classes.taskName}>
                        {item.title}
                      </Typography>
                      <Typography className={classes.taskName}>
                        {Utils.CommonFunctions.decimalFlat(item.rate, 0)}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
      </div>
      <>
        {dashboardData?.TierType !== 1 && (
          <div className={classes.upgradeRoot}>
            <div className={classes.outerContainer}>
              <img
                src={Utils.images.LYBC_FIVE}
                alt="lybcIcon"
                className={classes.img}
              />
              <div className={classes.innerContainer}>
                <div className={classes.headingDiv}>
                  <Typography variant="h2" className={classes.header}>
                    {configs?.lybc_banner_title || ""}
                  </Typography>
                  <Typography variant="h2" className={classes.subHeader}>
                    {configs?.lybc_banner_description || ""}
                  </Typography>
                </div>
                <Hidden xsDown>
                  <div
                    className={classes.upgradeBtn}
                    onClick={() =>
                      history.push({
                        pathname: Utils.routes.UPGRADE_MEMBERSHIP,
                        state: {
                          type: userInfoTierType === 2 ? 1 : 2,
                          pageName: "Love Your Body club",
                        },
                      })
                    }
                  >
                    <Typography variant="h1" className={classes.btn}>
                      Upgrade Now
                    </Typography>
                  </div>
                </Hidden>
              </div>
            </div>
            <Hidden smUp>
              <div
                className={classes.upgradeBtn}
                onClick={() =>
                  history.push({
                    pathname: Utils.routes.UPGRADE_MEMBERSHIP,
                    state: {
                      type: userInfoTierType === 2 ? 1 : 2,
                      pageName: "Love Your Body club",
                    },
                  })
                }
              >
                <Typography variant="h1" className={classes.btn}>
                  Upgrade Now
                </Typography>
              </div>
            </Hidden>
          </div>
        )}
        <div className={classes.storeRoot}>
          <Typography variant="h2" className={classes.storeHeading}>
            Store Offers
          </Typography>
          <Hidden xsDown>
            <Grid container className={classes.storeRootSecond}>
              {storeOffers?.map((storeItem: any, index: any) => (
                <Grid item xs={6} sm={4} md={4} key={storeItem?.title || ""}>
                  <div
                    className={clsx(
                      index % 2 === 0 ? classes.offer : classes.divider
                    )}
                  >
                    <div className={classes.imgDiv}>
                      <img
                        src={
                          storeItem?.webIcon
                            ? IMAGE_URL + storeItem.webIcon
                            : Utils.images.PRODUCT_PLACEHOLDER
                        }
                        alt="icon"
                        className={classes.img2}
                      />
                    </div>

                    <Typography variant="body1" className={classes.title}>
                      {storeItem?.title || ""}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Hidden>
          <Hidden smUp>
            <div className={classes.storeMobileDiv}>
              {storeOffers?.map((storeItem: any, index: any) => (
                <div
                  className={
                    index % 2 === 0 ? classes.mobileDiv : classes.secndDivider
                  }
                  key={storeItem?.title || ""}
                >
                  <div className={classes.imgMobileDiv}>
                    <img
                      src={
                        storeItem?.webIcon
                          ? IMAGE_URL + storeItem.webIcon
                          : Utils.images.PRODUCT_PLACEHOLDER
                      }
                      alt="icon"
                      className={classes.img2}
                    />

                    <Typography
                      variant="body1"
                      align="center"
                      className={classes.storetitle}
                    >
                      {storeItem?.title || ""}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Hidden>
        </div>
      </>
    </>
    // </>
  );
};

export default Dashboard;
