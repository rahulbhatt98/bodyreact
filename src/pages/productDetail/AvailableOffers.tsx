import { makeStyles, Typography, Divider, Hidden } from "@material-ui/core";
import { ReducersModal } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import React, { useEffect } from "react";
import { getProductOffers } from "./../offers/action";
import Skeleton from "@mui/material/Skeleton";
import images from "../../utils/images";
import MoreBankOffer from "../shoppingBags/MoreBankOffers";

const useStyles = makeStyles((theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Recoleta Alt`,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "var(--secondary-black)",
    [theme.breakpoints.down("xs")]: {
      font: `normal 700 ${theme.spacing(1.6)}px Recoleta Alt Bold`,
    },
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "16px",
    letterSpacing: "0.02em",
    color: "var(--main-opacity)",
    margin: theme.spacing(0, 0.5),
    [theme.breakpoints.down("xs")]:{
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
    }
    
  },
  mainContainer: {
    border: "1px solid #D2D2D2",
    padding: theme.spacing(1.2),
    borderRadius: "4px",
    margin: theme.spacing(2, 1, 2, 0),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 1, 0, 0),
      padding: theme.spacing(1),
      width: "280px",
    },
  },
  secondContainer: {
    border: "1px solid #D2D2D2",
    padding: theme.spacing(1.2),
    borderRadius: "4px",
    margin: theme.spacing(2, 0, 2, 0),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 1, 0, 0),
      padding: theme.spacing(1),
      width: "280px",
    },
  },
  outerContainer2: {
    flexBasis: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "310px",
    },
  },
  titleContainer: {
    display: "flex",
  },
  details: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "19px",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]:{
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
    }
  },
  valid: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.2
    )}px Work Sans`,
    lineHeight: "19px",
    color: "var(--light-gray)",
    [theme.breakpoints.down("xs")]:{
      font: `normal ${theme.spacing(
        1.2
      )}px Work Sans Regular`,
    }
  },
  divider: {
    margin: theme.spacing(2, 0, 3, 0),
  },
  skeleton: {
    margin: "10px 0px",
  },
  outerDiv: {
    display: "flex",
    // overflowY: "auto",
    // height: theme.spacing(29.2),
    [theme.breakpoints.down("xs")]: {
      overflowX: "auto",
      width: "100%",
      display: "flex",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  addNewCard: {
    font: `normal ${theme.spacing(1.4)}px Work Sans`,
    fontWeight: 600,
    lineHeight: "16px",
    textTransform: "uppercase",
    color: "var(--black)",
    cursor: "pointer",
  },
  headerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const AvailableOffers = (props: any) => {
  let offerData: any = { data: [] };
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    openBankModal: false,
  });

  useEffect(() => {
    dispatch(getProductOffers("?page=1&limit=100"));
  }, []);

  offerData = useSelector((state: ReducersModal) => state.offerReducer);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const handleBankOfferOpen = () => {
    setState({ ...state, openBankModal: true });
  };

  const handleBankOfferClose = () => {
    setState({ ...state, openBankModal: false });
  };
  return (
    <div>
      {offerData?.data?.length ? (
        <>
          <div className={classes.headerDiv}>
            <Typography className={classes.heading}>
              {skeletonLoader ? (
                <Skeleton />
              ) : offerData?.data?.length > 0 ? (
                "Bank Offers"
              ) : (
                ""
              )}
            </Typography>
            {offerData?.data?.length > 2 && (
              <Hidden xsDown>
                {skeletonLoader ? (
                  <Skeleton
                    className={classes.skeleton}
                    width={100}
                    height={30}
                  />
                ) : (
                  <Typography
                    className={classes.addNewCard}
                    onClick={handleBankOfferOpen}
                  >
                    VIEW ALL
                  </Typography>
                )}
                {state.openBankModal && (
                  <MoreBankOffer
                    open={state.openBankModal}
                    handleClose={handleBankOfferClose}
                  />
                )}
              </Hidden>
            )}
          </div>

          {skeletonLoader ? (
            Array.of(1, 2).map((item: any) => (
              <Skeleton
                className={classes.skeleton}
                variant="rectangular"
                key={item}
                height={100}
              />
            ))
          ) : (
            <div className={classes.outerDiv}>
              {offerData?.data?.map((item: any, index: number) => (
                <>
                  <Hidden xsDown>
                    {index < 2 && (
                      <div className={classes.outerContainer2}>
                        <div
                          className={
                            index % 2 === 0
                              ? classes.mainContainer
                              : classes.secondContainer
                          }
                          key={item.magentoId}
                        >
                          <div className={classes.titleContainer}>
                            <img src={images.TAG_ICON} alt="tag" />
                            <Typography className={classes.title}>
                              {item.ruleName}
                            </Typography>
                          </div>
                          <Typography className={classes.details}>
                            {item.shortDesc}
                          </Typography>
                          <Typography className={classes.valid}>
                            Valid till{" "}
                            <Moment format="Do MMMM, YYYY">
                              {item.dateTo || new Date()}
                            </Moment>
                          </Typography>
                        </div>
                      </div>
                    )}
                  </Hidden>

                  <Hidden smUp>
                    <div className={classes.outerContainer2}>
                      <div
                        className={
                          index % 2 === 0
                            ? classes.mainContainer
                            : classes.secondContainer
                        }
                        key={item.magentoId}
                      >
                        <div className={classes.titleContainer}>
                          <img src={images.TAG_ICON} alt="tag" />
                          <Typography className={classes.title}>
                            {item.ruleName}
                          </Typography>
                        </div>
                        <Typography className={classes.details}>
                          {item.shortDesc}
                        </Typography>
                        <Typography className={classes.valid}>
                          Valid till{" "}
                          <Moment format="Do MMMM, YYYY">
                            {item.dateTo || new Date()}
                          </Moment>
                        </Typography>
                      </div>
                    </div>
                  </Hidden>
                </>
              ))}
            </div>
          )}
          <Divider light className={classes.divider} />
        </>
      ) : null}
    </div>
  );
};

export default AvailableOffers;
