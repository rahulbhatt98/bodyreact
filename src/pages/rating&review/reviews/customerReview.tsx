import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Divider,
  // IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Hidden,
} from "@material-ui/core";
import Utils from "../../../utils";
import LinearProgressReviews from "../../../components/linearProgressReviews";
import ContainedButton from "../../../components/containedButton";
import {
  submitReviewPoll,
  submitReviewReport,
} from "../../productDetail/action";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { ReducersModal } from "../../../models";
// import clsx from 'clsx'
import ReviewListSkeleton from "../../../components/common/skeletonList/reviewListSkeleton";
import images from "../../../utils/images";
import CustomButton from "../../../components/common/button";
import { isAuthenticated } from "../../../utils/session";
import { useState } from "react";
import MessageDialogue from "../../../components/common/product/messageDialogue";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans SemiBold`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
      }
    },
    headerDiv: {},

    innerContainer: {
      margin: theme.spacing(1.5, 0),
    },
    label: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.5
        )}px Work Sans SemiBold`,
      }

    },
    para: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans SemiBold`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      }
    },
    starRating: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.4
        )}px Work Sans Medium`
      }
    },
    smallDiv: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1, 0),
    },
    smallInnerDiv: {
      display: "flex",
      alignItems: "center",
    },
    description: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans Medium`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.4
        )}px Work Sans Regular`,
      }
    },
    type: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Regular`
      }
    },
    typeValue: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans Regular`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans`,
      }
    },
    typeDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      letterSpacing: "0.02em",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      }
    },

    headContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    reviewNameContainer: {
      display: "flex",
      alignItems: "center",
    },

    star1: {
      margin: theme.spacing(0, 0.5, 0, 0),
    },
    starContainer: {
      flexBasis: "30%",
    },
    progress: {
      margin: theme.spacing(0.8, 0),
      "& .MuiLinearProgress-colorPrimary": {
        borderRadius: "2px",
      },
    },
    ratingCount: {
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.4
        )}px Work Sans Medium`
      }
    },
    wasHelpful: {
      margin: theme.spacing(1, 0),
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      },
    },
    detail: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "15px",
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.2
        )}px Work Sans Regular`
      },
    },
    yesNoButtonContainer: {
      display: "flex",
      margin: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        "& .MuiButton-root": {
          padding: theme.spacing(1.2, 2),
          fontSize: "13px",
        },
      },
    },

    outDiv: {
      margin: theme.spacing(0, 1, 0, 0),
    },

    divider: {
      border: "1px solid var(--text-color)",
      margin: theme.spacing(2, 0),
    },
    skeleton: {
      margin: "10px 0px",
    },
    skeletonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    skeletonContentColumn: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    columnContent: {
      width: "35%",
    },

    skeletonSpacing: {
      margin: "20px",
    },
    skeletonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    leftSpacing: {
      marginLeft: "20px",
    },
    cursor: {
      cursor: "pointer",
    },
    loader: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    reviewImages: {
      marginTop: "20px",
      display: "flex",
      width: "100%",
      overflowX: "auto",
      gap: "20px",
      // marginTop: theme.spacing(2.5),
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    // reviewImage: {
    //   borderRadius: "20px",
    //   height: "160px",
    //   width: "160px",
    //   objectFit: "cover",
    //   // marginRight:"10px",
    //   marginTop: "10px",
    //   [theme.breakpoints.down("xs")]: {
    //     height: "120px",
    //     width: "120px",
    //   },
    // },
    reportText: {
      borderRadius: "4px",
      font: `normal 600 ${theme.spacing(1.2)}px Work Sans !important`,
      cursor: "pointer",
      color: "var(--primary)",
      lineHeight: "16px",
      padding: "6px 10px !important",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Medium !important`,
      }
    },
    innerDiv: {
      margin: theme.spacing(0, 0, 1, 1),
      width: theme.spacing(14),
      height: "auto",
      // cursor: "pointer",
    },
    reviewImg: {
      borderRadius: "12px",
      // height: "160px",
      // width: "160px",
      // objectFit: "cover",

      width: theme.spacing(13),
      height: theme.spacing(13),
      objectFit: "cover",
      [theme.breakpoints.down("xs")]: {
        height: "120px",
        width: "120px",
      },
    },
    reviewImage: {
      // height: "160px",
      // width: "160px",
      // margin: theme.spacing(1),
      // cursor: "pointer",
      borderRadius: "12px",
      width: theme.spacing(13),
      height: theme.spacing(13),
      [theme.breakpoints.down("xs")]: {
        height: "120px",
        width: "120px",
      },
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(
        2.0
      )}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px"

      // margin: theme.spacing(0.8, 0),
    },
    yes: {
      [theme.breakpoints.down("xs")]: {
        font: `normal 700 ${theme.spacing(
          1.3
        )}px Work Sans Medium !important`,
      }
    }
  })
);

const CustomerReview = ({
  data,
  getReviewData,
  sku,
  isFetching,
  reviewData,
}: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const profileData = useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) || {}
  const [loginAlert, showLoginAlert] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const productData: any =
    useSelector(
      (state: ReducersModal) => state.productDetailReducer?.product
    ) || {};
  const onClickHelpful = (value: string, reviewId: any) => {
    const payload = {
      reviewId: reviewId,
      sku, //"BS-91942001"
      pollType: value,
    };
    window.scrollTo(0, 0);
    dispatch(
      submitReviewPoll(payload, () => {
        getReviewData(false, true);
      })
    );
  };
  const sendReviewReport = (reviewId: any) => {
    const payload = {
      reviewId: reviewId,
      sku,
      //"BS-91942001"
    };
    window.scrollTo(0, 0);
    dispatch(
      submitReviewReport(payload, () => {
        getReviewData(false, true);
      })
    );
  };

  return (
    <div className={classes.root}>
      <MessageDialogue
        cancelText={'Cancel'}
        okText={'Okay'}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          const pathname = `${Utils.routes.LOGIN_OTP}`;
          const redirectTo = `?redirectTo=${history.location.pathname}`
          history.push({
            pathname: pathname, search: redirectTo, state: { id: productData?.magentoId }
          });
          showLoginAlert(false)
        }}
        message={'Please login to proceed'}
        heading={'The Body Shop'}
        headingClass={classes.messageHeading}

      />
      <div className={classes.headerDiv}>
        {skeletonLoader ? (
          <Skeleton
            className={classes.skeleton}
            variant="rectangular"
            width={180}
          />
        ) : (
          <Typography variant="h5" className={classes.heading}>
            Customer Reviews
          </Typography>
        )}
      </div>
      {skeletonLoader ? (
        <ReviewListSkeleton />
      ) : (
        data &&
        Array.isArray(data) &&
        data.map((item: any, index: any) => (
          <div>
            <div className={classes.headContainer}>
              <Typography variant={"h6"} className={classes.label}>
                {item?.review?.Title || ""}
              </Typography>
              <Hidden xsDown>
                {!item?.review?.isReported && profileData?._id !== item?.userId ? (
                  // <div
                  //   className={classes.cursor}
                  //   onClick={() => sendReviewReport(item?.review?.Id)}
                  // >
                  //   <img src={images.FLAG_ICON} alt="flag" />
                  // </div>
                  <CustomButton
                    type="button"
                    color="primary"
                    fullWidth={false}
                    variant="outlined"
                    text={"Report This"}
                    onClick={() => {
                      if (!isAuthenticated())
                        showLoginAlert(true);
                      else
                        sendReviewReport(item?.review?.Id)
                    }}
                    className={classes.reportText}
                  />
                ) : (
                  ""
                )}
              </Hidden>

              <Hidden smUp>
                {!item?.review?.isReported && profileData?._id !== item?.userId ? (
                  <CustomButton
                    type="button"
                    color="primary"
                    fullWidth={false}
                    variant="outlined"
                    text={"Report This"}
                    onClick={() => {
                      if (!isAuthenticated())
                        showLoginAlert(true);
                      else
                        sendReviewReport(item?.review?.Id)
                    }}
                    className={classes.reportText}
                  />
                ) : (
                  ""
                )}
              </Hidden>
            </div>
            <div className={classes.smallDiv}>
              <Typography variant={"body1"} className={classes.para}>
                {item?.review?.UserNickname || ""}
              </Typography>

              <div className={classes.smallInnerDiv}>
                <img src={Utils.images.STAR_TWO} alt="icon" />
                <Typography variant={"body2"} className={classes.starRating}>
                  {item?.review?.Rating || 0}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant={"body2"} className={classes.description}>
                {item?.review?.ReviewText || ""}
              </Typography>
            </div>
            {item?.review?.ContextDataFormatted &&
              Array.isArray(item.review.ContextDataFormatted) &&
              item.review.ContextDataFormatted.length > 0 && (
                <Divider className={classes.divider} />
              )}
            <div className={classes.innerContainer}>
              <Grid container spacing={isSmall ? 2 : 3}>
                {item?.review?.ContextDataFormatted &&
                  Array.isArray(item.review.ContextDataFormatted) &&
                  item.review.ContextDataFormatted.map(
                    (contextData: any, ind: any) => (
                      <>
                        <Grid item xs={6} md={4} key={contextData?.key || ind}>
                          <div className={classes.typeDiv}>
                            <Typography
                              variant={"body1"}
                              className={classes.type}
                            >
                              {contextData?.data?.DimensionLabel || ""}
                            </Typography>
                            :
                          </div>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <Typography
                            variant={"body1"}
                            className={classes.typeValue}
                          >
                            {contextData?.data?.ValueLabel || ""}
                          </Typography>
                        </Grid>
                      </>
                    )
                  )}
              </Grid>
            </div>
            {item?.review?.ContextDataFormatted &&
              Array.isArray(item.review.ContextDataFormatted) &&
              item.review.ContextDataFormatted.length > 0 && (
                <Divider className={classes.divider} />
              )}
            <div className={classes.headContainer}>
              {item?.review?.SecondaryRatingsFormatted &&
                Array.isArray(item.review.SecondaryRatingsFormatted) &&
                item.review.SecondaryRatingsFormatted.map(
                  (ratingData: any, ind: number) => (
                    <div
                      key={ratingData?.key || ind}
                      className={classes.starContainer}
                    >
                      <div className={classes.reviewNameContainer}>
                        <img
                          src={Utils.images.STAR_TWO}
                          alt="star"
                          className={classes.star1}
                        />
                        <Typography className={classes.ratingCount}>{ratingData?.data?.Value || ""}</Typography>
                      </div>
                      <div className={classes.progress}>
                        <LinearProgressReviews
                          value={
                            ratingData?.data?.Value
                              ? ratingData.data.Value * 20
                              : 0
                          }
                        />
                      </div>
                      <Typography className={classes.cardName}>
                        {ratingData?.key || ""}
                      </Typography>
                    </div>
                  )
                )}
            </div>
            {
              <div className={classes.reviewImages}>
                {item?.review?.Photos &&
                  Array.isArray(item.review?.Photos) &&
                  item.review?.Photos.map((photo: any) => {
                    return (
                      <>
                        <div className={classes.innerDiv}>
                          <div className={classes.reviewImg}>
                            <img
                              src={
                                photo?.Sizes?.normal?.Url
                                  ? photo.Sizes.normal.Url
                                  : Utils.images.PRODUCT_PLACEHOLDER
                              }
                              alt="review images"
                              className={classes.reviewImage}
                            />
                          </div>
                        </div>

                      </>
                    );
                  })}
              </div>
            }
            <Divider light className={classes.divider} />
            <>
              <div className={classes.headContainer}>
                <div>
                  <Typography className={classes.wasHelpful}>
                    Was this helpful ?
                  </Typography>
                  <Typography className={classes.detail}>
                    {item?.review?.isHelpfulCount || 0} found this helpful
                  </Typography>
                </div>
                {item?.review?.isHelpfulAllowed && (
                  <div className={classes.yesNoButtonContainer}>
                    <div className={classes.outDiv}>
                      <ContainedButton
                        isOutline={true}
                        text="No"
                        onClick={() => {
                          if (!isAuthenticated())
                            showLoginAlert(true);
                          else
                            onClickHelpful("No", item?.review?.Id)
                        }}
                        className={classes.yes}
                      />
                    </div>
                    <ContainedButton
                      isOutline={true}
                      text="Yes"
                      onClick={() => {
                        if (!isAuthenticated())
                          showLoginAlert(true);
                        else
                          onClickHelpful("Yes", item?.review?.Id)
                      }}
                      className={classes.yes}

                    />
                  </div>
                )}
              </div>
              <Divider light className={classes.divider} />
            </>
          </div>
        ))
      )}
      {isFetching && reviewData?.nextPage !== -1 ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : null}
    </div>
  );
};

export default CustomerReview;
