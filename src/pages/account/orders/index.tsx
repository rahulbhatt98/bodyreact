import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  CircularProgress,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Utils from "../../../utils";
import { getOrderHistory } from "./action";
import { screenViewed } from "../../../utils/event/action";
import events from "../../../utils/event/constant"

// components
import OrderCard from "./orderCard";
import FilterModal from "./filterModal";
import OrderNotFound from "./orderNotFound";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../models";
import OrderListSkeleton from "../../../components/common/skeletonList/orderListSkeleton";
import { hideLoader, hideSkeleton, showLoader, showSkeleton } from "../../home/actions";
import { handleScrollHeight } from "../../../utils/scroll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderHistoryRoot: {
      // padding: theme.spacing(1.5, 2),
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
      padding: theme.spacing(1, 0),
    },
    headingDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        width: " 100%",
        justifyContent: "end"
      }
    },
    // heading: {
    //   font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
    //     1.8
    //   )}px Recoleta Alt`,
    //   color: "var(--secondary-black)",
    // },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      color: "#004236",

    },
    btnDiv: {
      [theme.breakpoints.down("xs")]: {
        zIndex: 1200,
        position: "fixed",
        top: "19px",
        right:"20px"
      }
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
    loader: {
      display: "flex",
      justifyContent: "center",
    },
    breadcrumb: {
      marginLeft: "-4px",
      marginBottom: "28px",
    },
  })
);

const OrderHistory: React.FC<any> = () => {
  const [page, setPage] = useState<any>(0);
  const [isFetching, setIsFetching] = useState<any>(false);
  const [filters, setFilters] = useState<any>([]);
  const limit = 10;
  const orderListData: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.orderListData)
    || {};
  const orderList =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.orderList)
    || [];
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orderListData?.nextPage) {
      dispatch(showSkeleton())
      getOrderList(true);
    } else {
      setPage(1);
    }

    window.addEventListener("scroll", handleScroll);

    /**
    * Event logger
    */
    screenViewed({
      ScreenName: events.SCREEN_MY_ORDERS,
      CTGenerated: "WEB"
    })

    return () => {
      dispatch({ type: "orderHistoryData", payload: {} });
      dispatch({ type: "orderHistoryList", payload: [] });
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getOrderList(orderListData?.nextPage > 0 ? true : false, filters);
  }, [isFetching]);

  // useEffect(() => {
  //   if (!flag) {
  //     getOrderList(true, () => {
  //       handleFilterClose()
  //     });
  //   }
  // }, [filterUpdated]);

  const getOrderList = async (
    hasMore: boolean,
    data?: any,
    pageNum?: number,
    callback?: Function
  ) => {
    if (hasMore) {
      let pageSize = pageNum ? pageNum : hasMore ? page + 1 : page;
      setPage(pageSize);
      let query = `?page=${pageSize}&limit=${limit}`;
      if (data?.length > 0) query = query + `&orderStatus=${data}`;
      getOrderHistory(query)
        .then((resp) => {
          if (resp?.data?.data) {
            if (callback) callback();
            let newList: any = [];
            if (
              orderListData.nextPage !== resp?.data?.data?.nexPage &&
              !pageNum
            ) {
              let list = orderList;
              dispatch({ type: "orderHistoryData", payload: resp?.data?.data });
              newList = [...list, ...resp.data.data?.data];
              dispatch({ type: "orderHistoryList", payload: [...newList] });
            } else {
              dispatch({ type: "orderHistoryData", payload: resp?.data?.data });
              newList = [...resp.data.data?.data];
              dispatch({ type: "orderHistoryList", payload: [...newList] });
            }
          }
          dispatch(hideLoader())
          dispatch(hideSkeleton())

        })
        .catch((err: any) => {
          setIsFetching(false);
          dispatch(hideLoader());
          dispatch(hideSkeleton())


        });
    }
  };

  const handleScroll = (e: any) => {
    handleScrollHeight(e, (value: boolean) => {
      setIsFetching(value);
    })
  };
  const classes = useStyles();
  const [state, setState] = useState({
    openFilterModal: false,
  });

  const handleFilterOpen = () => {
    setState({ ...state, openFilterModal: true });
  };

  const handleFilterClose = () => {
    setState({ openFilterModal: false });
  };

  const reSetFilters = (data: any) => {
    dispatch(showLoader())
    if (data.length === 0) {
      dispatch({ type: "orderHistoryList", payload: [] });
      dispatch({ type: "orderHistoryData", payload: {} });
      setPage(0);
    }
    setFilters([...data]);
    getOrderList(true, data, data.length === 0 ? 1 : undefined, () => {
      handleFilterClose();
    });
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  return (
    <>
      {
        skeletonLoader ?
          <OrderListSkeleton /> :
          <div className={classes.orderHistoryRoot}>
            <div className={classes.maxWidthDiv}>
              <div className={classes.headingDiv}>
                <Hidden xsDown>
                  <Typography className={classes.heading}>
                    My Orders
                  </Typography>
                </Hidden>
                <div className={classes.btnDiv}>
                  <Hidden xsDown>
                    <Button
                      startIcon={<img src={Utils.images.FILTER_ICON} alt="filter" />}
                      className={classes.filterBtn}
                      onClick={handleFilterOpen}
                    >
                      Filter
                    </Button>

                  </Hidden>
                  <Hidden smUp>
                    <img onClick={handleFilterOpen} src={Utils.images.FILTER} alt="filter" />
                  </Hidden>

                </div>
              </div>
              {
                !orderListData.totalCount || orderListData?.totalCount === 0 ?
                  <OrderNotFound
                  message="No Data Found"
                  noDataFoundIcon={true}
                    description={
                      filters.length > 0
                        ? "We have no order records for the selected filters."
                        : "We have no order records for this account."
                    }
                  /> :
                  <div>
                    {
                      orderList?.map((data: any) => {
                        return <OrderCard order={data} />;
                      })
                    }
                    {orderListData?.totalCount !== orderList?.length ? (
                      <div className={classes.loader}>
                        <CircularProgress color="primary" />
                      </div>
                    ) : null}
                  </div>
              }
              <FilterModal
                setFilters={setFilters}
                filters={filters}
                resetFilters={reSetFilters}
                setPage={setPage}
                open={state.openFilterModal}
                handleFilterClose={handleFilterClose}
                handleClose={() => {
                  getOrderList(true, filters, 1);
                  handleFilterClose();
                }}
              />
            </div>
          </div>
      }
    </>
  );
};

export default OrderHistory;
