import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Box,
  Hidden,
} from "@material-ui/core";
import Utils from "../../../../utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getRewardHistory } from "../action";
import { useDispatch, useSelector } from "react-redux";
// import { handleScrollHeight } from "../../../../utils/scroll";
import { format } from "date-fns";
import { ReducersModal } from "../../../../models";
import MyOrdersSkeleton from "../../../../components/common/skeletonList/myOrderSkeleton";
import Skeleton from "@mui/material/Skeleton";

// const data = [
//   {
//     id: 1,
//     type: "positive",
//     img: Utils.images.LYBC_SIX,
//     title: "Txn ID: 0034563748",
//     date: "Thu, Mar 29, 2019: 03:15 PM",
//     price: "₹6300",
//     points: "2000 Points",
//     mode: "Earned",
//     txnId: "0034563748"
//   },
//   {
//     id: 2,
//     type: "positive",
//     img: Utils.images.LYBC_SIX,
//     title: "Txn ID: 0034563748",
//     date: "Thu, Mar 29, 2019: 03:15 PM",
//     price: "₹6300",
//     points: "2000 Points",
//     mode: "Earned",
//     txnId: "0034563748"

//   },

//   {
//     id: 3,
//     type: "positive",
//     img: Utils.images.LYBC_FIVE,
//     title: "Reward Bonus",
//     date: "Thu, Mar 29, 2019: 03:15 PM",
//     price: "",
//     points: "2000 Points",
//   },
//   {
//     id: 4,
//     type: "negative",
//     img: Utils.images.LYBC_SIX,
//     title: "Txn ID: 0034563748",
//     date: "Thu, Mar 29, 2019: 03:15 PM",
//     price: "₹6300",
//     points: "2000 Points",
//     mode: "Redeemed",
//     txnId: "0034563748"
//   },
// ];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "var(--white)",
      padding: theme.spacing(2),
      border: "1px solid var(--border-color)",

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0),
        backgroundColor: "#f8f8f8",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      letterSpacing: "0.04em",
    },
    outerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: theme.spacing(2.5, 0),
      [theme.breakpoints.down("xs")]: {
        background: "var(--white)",
        margin: theme.spacing(1, 0),
        padding: theme.spacing(0.7),
        alignItems: "start",
        // flexDirection: "column",
        // alignItems: "inherit",
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
    rewardTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "24px",
      textTransform: "uppercase",

      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
      },
    },
    para: {
      font: `normal 400 ${theme.spacing(1.4)}px Work Sans`,
      lineHeight: "24px",
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down(370)]: {
        fontSize: "11px",
      },
    },
    txnId: {
      font: `normal 400 ${theme.spacing(1.8)}px Work Sans`,
      lineHeight: "24px",
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14.6px",
        margin: theme.spacing(0, 0.3),
        font: `normal 400 ${theme.spacing(1.8)}px Work Sans Regular`,

      },
    },
    imgDiv: {
      background: "var(--primary)",
      display: "flex",
      placeItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1.2),
      marginRight: theme.spacing(1),
      flexDirection: "column",
      width: theme.spacing(8),
      height: theme.spacing(8),
      borderRadius: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        height: theme.spacing(6),
        padding: theme.spacing(0.6),
      },
      [theme.breakpoints.down(370)]: {
        marginRight: theme.spacing(0.5),
      },
    },
    innerBox: {
      display: "flex",
      alignItems: "center",
      // flexBasis: "50%",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0.4, 0),
      },
    },
    green: {
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#4CAF50",
      marginRight: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.3)}px Work Sans SemiBold`,
        marginRight: 0,
        marginTop: theme.spacing(1),
      },
    },
    red: {
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "24px",
      color: "#FA6334",
      marginRight: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.3)}px Work Sans SemiBold`,
        marginRight: 0,
        marginTop: theme.spacing(1),
      },
    },
    point: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--white)",
      marginTop: theme.spacing(0.3),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.6
        )}px Work Sans SemiBold`,
      },
      [theme.breakpoints.down(370)]: {
        fontSize: "11px",
      },
    },
    rightimg: {
      background: "#F4E4DD",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1.2),
      marginRight: theme.spacing(1),
    },
    outerBox2: {
      width: "100%",
      padding: theme.spacing(4),
    },
    img: {
      objectFit: "cover",
      [theme.breakpoints.down("xs")]: {
        width: "28px",
        height: "28px",
      },
    },
    secondBox: {
      display: "flex",
      // justifyContent: "space-between",
    },
    firstDiv: {
      flexBasis: "70%",
    },
    mode: {
      font: `normal 700 ${theme.spacing(1.5)}px Work Sans`,
      lineHeight: "24px",
      color: "#4CAF50",
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Medium`,
        marginRight: theme.spacing(0.5),
        lineHeight: "24px",
        letterSpacing: "0.04em",
      },
      [theme.breakpoints.down(370)]: {
        fontSize: "11px",
      },
    },
    filterBtn: {
      backgroundColor: "var(--main-opacity)",
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--white)",
      textTransform: "capitalize",
      letterSpacing: 0.5,
      padding: theme.spacing(0.7, 1.5),
      "&:hover": {
        backgroundColor: "var(--main-opacity)",
        color: "var(--white)",
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    btnBox: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    noData: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      padding: "20px",
    },
    sortBtn: {
      backgroundColor: "var(--creame-color)",
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      letterSpacing: 0.5,
      padding: theme.spacing(0.7, 1.5),
      margin: theme.spacing(0, 1),
      border: "1px solid var(--border-color)",
      "&:hover": {
        backgroundColor: "var(--creame-color)",
        color: "var(--secondary-black)",
        border: "1px solid var(--border-color)",
      },
    },
    skeleton: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
        // padding:"0px 10px",
      },
    },
  })
);

const Rewards = () => {
  const classes = useStyles();
  const [page, setPage] = useState<any>(1);
  // const [drawerOpen, setDrawerOpen] = useState<null | HTMLElement>(null);
  const [rewardHistory, setRewardHistory] = useState<any>({});
  const [isFetching, setIsFetching] = useState<any>(false);
  const [skeleton, showSkeleton] = useState(false);
  const limit = 40;
  // const skeletonLoader = useSelector((state: ReducersModal) => {
  //   return state.loadingReducer.skeletonLoader;
  // });
  const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   openFilterModal: false,
  // });

  useEffect(() => {
    showSkeleton(true);
    getRewardList();
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // }
  }, []);

  // useEffect(() => {
  //   if (!isFetching) return;
  //   getRewardList(rewardHistory?.nextPage > 0 ? true : false, filters);
  // }, [isFetching]);

  const getRewardList = () => {
    const query = `?limit=${limit}&page=${page}`;
    dispatch(
      getRewardHistory(query, (resp: any) => {
        if (resp) setRewardHistory(resp);
        else setIsFetching(false);
        showSkeleton(false);
      })
    );
  };

  // const handleScroll = (e: any) => {
  //   handleScrollHeight(e, (value: boolean) => {
  //     setIsFetching(value);
  //   })
  // };

  // const handleFilterOpen = () => {
  //   setState({ ...state, openFilterModal: true });
  // };

  // const handleFilterClose = () => {
  //   setState({ ...state, openFilterModal: false });
  // };

  // const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setDrawerOpen(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setDrawerOpen(null);
  // };

  const getRewardType = (item: any) => {
    // const green = ["Earned", "Refund", "Reverse", "Reward Bonus"];
    // const red = ['Redeemed', 'Expired'];
    const rewardType = Utils.constants.EASY_POINT_TYPE.find(
      (type: any) => type.id === Number(item?.easyPointTypeId)
    );
    return rewardType?.label
      ? {
          label: rewardType.label,
          pointsColor:
          //  green.includes(rewardType.label) 
          item?.isAccrued? "green" : "red",
          points: item?.points||""
          // green.includes(rewardType.label)
            // ? item?.totalAccruedPoints || ""
            // : item?.totalRedeemPoints || "",
        }
      : {
          label: null,
          pointsColor: null,
        };
  };
  return (
    <div className={classes.root}>
      {skeleton ? (
        <div className={classes.skeleton}>
          {/* <Hidden xsDown>
            <Skeleton height={20} width={130} />
          </Hidden> */}
          <MyOrdersSkeleton
            flag="reward"
            hideCheckBox={true}
            sections={[1, 2, 3, 4]}
          />
        </div>
      ) : rewardHistory?.data &&
        Array.isArray(rewardHistory?.data) &&
        rewardHistory?.data?.length > 0 ? (
        <>
          <Hidden xsDown>
            <div className={classes.headerDiv}>
              {/* <Typography variant={"h1"} className={classes.heading}>
                My Rewards
              </Typography> */}
              {/* <div className={classes.btnBox}>
            <Button
              startIcon={<img src={Utils.images.SORT_ICON} alt="sort" />}
              className={classes.sortBtn}
              endIcon={<img src={Utils.images.DOWN_ICON} alt="downIcon" />}
              onClick={handleClickSort}
            >
              Sort By
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={drawerOpen}
              keepMounted
              open={Boolean(drawerOpen)}
              onClose={handleClose}
            >
              {optionItem.map((item: any) => (
                <MenuItem onClick={handleClose}>{item.itemName}</MenuItem>
              ))}
            </Menu>
            <Button
              startIcon={<img src={Utils.images.FILTER_ICON} alt="filter" />}
              className={classes.filterBtn}
              onClick={handleFilterOpen}
            >
              Filter
            </Button>
            <FilterList
              open={state.openFilterModal}
              handleClose={handleFilterClose}
            />
          </div> */}
            </div>
          </Hidden>

          {
            // rewardHistory?.data && Array.isArray(rewardHistory?.data) ?
            rewardHistory.data.map((item: any, index: any) => {
              const data = getRewardType(item);
              const tag = data?.label || "";
              return (
                <Box key={index}>
                  <>
                    <div className={classes.outerBox} key={index}>
                      <div className={classes.innerBox}>
                        <div className={classes.imgDiv}>
                          <img
                            src={
                              tag?.toLowerCase() !== "reward bonus"
                                ? Utils.images.LYBC_SIX
                                : Utils.images.LYBC_FIVE
                            }
                            alt="icons"
                            className={classes.img}
                          />
                          {tag?.toLowerCase() !== "reward bonus" ? (
                            <Typography variant="h5" className={classes.point}>
                              ₹
                              {item?.totalBilledAmount
                                ? Utils.CommonFunctions.decimalFlat(
                                    item.totalBilledAmount
                                  )
                                : ""}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={classes.firstDiv}>
                          {tag?.toLowerCase() !== "reward bonus" ? (
                            <Typography variant="h5" className={classes.title}>
                              TXN ID:{" "}
                              <span className={classes.txnId}>
                                {item?.billNo || ""}
                              </span>
                            </Typography>
                          ) : (
                            <Typography
                              variant="h5"
                              className={classes.rewardTitle}
                            >
                              {tag}
                            </Typography>
                          )}
                          <div className={classes.secondBox}>
                            {tag?.toLowerCase() !== "reward bonus" ? (
                              <Typography
                                variant="body1"
                                className={classes.mode}
                              >
                                {tag}
                              </Typography>
                            ) : null}
                            <Typography
                              variant="body1"
                              className={classes.para}
                            >
                              {item?.billDate
                                ? format(
                                    new Date(item.billDate),
                                    "EEE, MMM dd, yyyy"
                                  )
                                : ""}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Typography
                          variant="body1"
                          className={clsx(
                            data?.pointsColor === "green"
                              ? classes.green
                              : classes.red
                          )}
                        >
                          {data?.points
                            ? `${Utils.CommonFunctions.decimalFlat(
                                data.points
                              )} Points`
                            : ""}
                        </Typography>
                      </div>
                    </div>
                    <Hidden xsDown>
                      {item.length - 1 !== index && <Divider light />}
                    </Hidden>
                  </>
                </Box>
              );
            })
          }
        </>
      ) : (
        <Typography className={classes.noData}>No Rewards Found</Typography>
      )}
    </div>
  );
};

export default Rewards;
