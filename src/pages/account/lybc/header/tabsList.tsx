import { makeStyles, createStyles, Theme, Divider, Hidden } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Dashboard from "../dashboard";
import Rewards from "../reward";
import Voucher from "../voucher";
import { useEffect, useState } from "react";
import Utils from "../../../../utils";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import DashboardBannerSkeleton from "../../../../components/common/skeletonList/dashboardBannerSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import { hideLoader, showLoader } from "../../../home/actions";
import { getDashboardData, getTierDetails, getVouchers } from "../action";
import DashboardSkeleton from "../../../../components/common/skeletonList/dashboardSkeleton";
import VoucherSkeletonList from "../../../../components/common/skeletonList/voucherSkeletonList";
import { SpeakerNotesSharp } from "@material-ui/icons";
import { Skeleton } from "@mui/material";
import { screenViewed } from "../../../../utils/event/action";
import events from "../../../../utils/event/constant"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0),
      boxSizing: "border-box",
      boxShadow: "30px",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(.5, 0),

      }
      // background: "var(--creame-color)",
    },
    tab: {
      "& .MuiTabs-flexContainer": {
        background: "var(--creame-color)",
        [theme.breakpoints.down("xs")]: {
          background: "white",
          paddingBottom: "10px"
        }
      },
      "& .MuiTabs-indicator": {
        height: "0",
        padding: 0,
      },

      "& span": {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.8
        )}px Work Sans`,
        color: "var(--secondary-black)",
        textTransform: "capitalize",
        minWidth: "200px",
        textAlign: "center",
        padding: theme.spacing(2.5, 1.5),
        backgroundColor: "transparent",
        [theme.breakpoints.down("xs")]: {
          minWidth: "80px",
          fontSize: "14px !important",
          padding: "15px",
          font: `normal ${theme.spacing(
            1.5
          )}px Work Sans Bold`,
        },
        "&.active": {
          borderBottom: "3px solid var(--primary)",
          font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
            1.8
          )}px Work Sans SemiBold`,
          color: theme.palette.primary.main,
          cursor: "pointer",
          [theme.breakpoints.down("xs")]: {
            
            font: `normal ${theme.spacing(
              1.6
            )}px Work Sans Bold`,
          },
        },
      },
    },
    cursor: {
      cursor: "pointer"
    },
    voucherSkeletonContainer: {
      paddingTop: "10px",
      background: "#f8f8f8"
    },
    voucherSkeleton: {
      margin: "0px 10px"
    }

  })
);

function TabList(props: any) {
  const classes = useStyles();
  const params: any = useParams();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [voucherList, setVoucherList] = useState([]);
  const [storeOffers, setStoreOffers] = useState([]);
  const [skeleton, showSkeleton] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // const { showSkeleton } = useSelector((state: ReducersModal) => {
  //   return state.loadingReducer;
  // });
  const dashboardData =
    useSelector((state: ReducersModal) => state.userDetailReducer.dashboard) ||
    {};
  const tierType =
    useSelector(
      (state: ReducersModal) => state.userDetailReducer.userInfo?.tierType
    ) || 0;

  useEffect(() => {
    // setLoader(true);
    if (
      params.slug === "dashboard" ||
      ((params.slug === "vouchers" || params.slug === "rewards") &&
        Object.keys(dashboardData).length === 0)
    ) {
      showSkeleton(true);
      dispatch(
        getDashboardData(() => {
          showSkeleton(false);
          // setLoader(false);
          // if (dashboardData?.TierType) {
          //   getTierData()
          // }
        })
      );
    }
    if (params.slug === "vouchers") getRedeemData();
  }, [params.slug]);

  const getRedeemData = () => {
    // dispatch(showSkeleton())
    showSkeleton(true);
    dispatch(
      getVouchers((resp: any) => {
        // if (Object.keys(dashboardData).length > 0)
        // dispatch(hideSkeleton())
        showSkeleton(false);

        setVoucherList(resp?.GVOffer || []);
      })
    );
  };
  const getTierData = () => {
    const query = { type: 1, tierType };
    dispatch(showLoader());
    dispatch(
      getTierDetails(query, (resp: any) => {
        dispatch(hideLoader());
        setStoreOffers(resp?.[0] ? resp[0]?.contentData : []);
      })
    );
  };
  useEffect(() => {
    if (tierType) getTierData();
    
  }, [tierType]);
  
  useEffect(() => {
    if(params.slug === "dashboard") screenViewed({
      ScreenName: events.SCREEN_DASHBOARD,
      CTGenerated: "WEB"
    });
  }, []);


  return (
    <>
      <div className={classes.root}>
        {skeleton && params.slug === "dashboard" ? (
          <>
            <DashboardBannerSkeleton label="tabs" />
            <DashboardSkeleton />
          </>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={classes.tab}
          >
            <span
              key={"my_dashboard"}
              className={params.slug === "dashboard" ? "active" : classes.cursor}
              onClick={() => {
                history.push({
                  pathname: Utils.CommonFunctions.replaceUrlParams(
                    Utils.routes.LYBC,
                    { ":slug": "dashboard" }
                  ),
                  state: { pageName: "Love Your Body CLub" },
                });
              }}
            >
              My Dashboard
            </span>
            <span
              key={"my_rewards"}
              className={params.slug === "rewards" ? "active" : classes.cursor}
              onClick={() => {
                history.push({
                  pathname: Utils.CommonFunctions.replaceUrlParams(
                    Utils.routes.LYBC,
                    { ":slug": "rewards" }
                  ),
                  state: { pageName: "Love Your Body CLub" },
                });
              }}
            >
              My Rewards
            </span>
            <span
              key={"my_voucher"}
              className={params.slug === "vouchers" ? "active" : classes.cursor}
              onClick={() => {
                history.push({
                  pathname: Utils.CommonFunctions.replaceUrlParams(
                    Utils.routes.LYBC,
                    { ":slug": "vouchers" }
                  ),
                  state: { pageName: "Love Your Body CLub" },
                });
              }}
            >
              My Vouchers
            </span>
          </Tabs>
        )}
        {skeleton ? (
          params.slug === "vouchers" ? (
            <div className={classes.voucherSkeletonContainer}>
              {/* <Hidden xsDown>
                <Skeleton className={classes.voucherSkeleton} height={20} width={250} />
              </Hidden> */}
              <VoucherSkeletonList />
            </div>
          ) : null
        ) : params.slug === "dashboard" ? (
          <Dashboard
            storeOffers={storeOffers}
            dashboardData={dashboardData}
            data={props}
          />
        ) : params.slug === "rewards" ? (
          <Rewards />
        ) : params.slug === "vouchers" ? (
          <Voucher getRedeemData={getRedeemData} voucherList={voucherList} />
        ) : null}
      </div>
    </>
  );
}

export default TabList;
