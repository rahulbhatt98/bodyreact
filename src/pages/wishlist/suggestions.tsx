import { Grid, Typography, makeStyles, Hidden } from "@material-ui/core";
import { useState, useEffect } from "react";
import { getSuggestionList } from "./action";
import Utils from "../../utils";
import _ from "lodash";
/**
 * Components
 */
import Product from "../../components/common/product";
import { useDispatch, useSelector } from "react-redux";
import { hideSkeleton, showSkeleton } from "../home/actions";
import { ReducersModal } from "../../models";
import SkeletonProductView from "../../components/common/skeletonList/skeletonProductView";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme) => ({
  suggestionContainer: {
    marginTop: 10,
  },
  heading: {
    font: "normal 700 20px Recoleta Alt",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "10px",
    },
  },
  skeletonContainer: {
    marginTop: "20px !important",
  },
  skeleton: {
    marginLeft: "20px !important",
  },
  productContainer: {
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      "&.MuiGrid-container": {
        flexWrap: "nowrap",
        overflowX: "auto",
        columnGap: "5px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      "& .MuiGrid-grid-xs-6": {
        maxWidth: "60%",
        flexBasis: "60%",
      },
    },
    // [theme.breakpoints.down("xs")]: {
    //   "&.MuiGrid-container": {
    //     flexWrap: "nowrap",
    //     overflowX: "auto",
    //     columnGap: "5px",
    //     "&::-webkit-scrollbar": {
    //       display: "none",
    //     },
    //   },
    //   "& .MuiGrid-grid-xs-6": {
    //     maxWidth: "60%",
    //     flexBasis: "60%",
    //   },
    // },
  },
}));

const Suggestions = () => {
  const classes = useStyles();
  const [list, setList] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showSkeleton());
    getSuggestionList({ page: 1, limit: 8 })
      .then((resp) => {
        if (resp) {
          const data = { ...resp.data.data };
          setList(data);
        }
        dispatch(hideSkeleton());
      })
      .catch(() => {
        dispatch(hideSkeleton());
      });
    return () => {};
  }, []);

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <div className={classes.suggestionContainer}>
      {skeletonLoader || !list?.data ? (
        <div className={classes.skeletonContainer}>
          <Skeleton
            variant="rectangular"
            width="45%"
            className={classes.skeleton}
            height={20}
          />
          <SkeletonProductView flag={"suggestions"} />
        </div>
      ) : list?.data?.length > 0 ? (
        <>
          <Hidden xsDown>
            <Typography className={classes.heading}>
              Suggestions based on your recent search.
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography className={classes.heading}>
              {" "}
              Recommended For You
            </Typography>
          </Hidden>
        </>
      ) : null}
      {
        // skeletonLoader ?
        //     <SkeletonProductView flag={"suggestions"} />
        //     :
        //     _.isEmpty(wishlistData?.data) ?null:
        <Grid container className={classes.gridContainer}>
          {list?.data?.map((item: any, i: any) => {
            let image = item?.image?.[0]?.file;
            // let image = _.find(item.customAttributes, { attribute_code: 'image' });
            let configurableProduct =
              item?.configurableProductLinks?.find(
                (item: any) => item?.isInStock
              ) || item?.configurableProductLinks[0];
            let desc =
              item?.type === "configurable"
                ? _.find(configurableProduct?.customAttributes, {
                    attribute_code: "short_description",
                  })
                : _.find(item?.customAttributes, {
                    attribute_code: "short_description",
                  });

            return (
              <Grid item xs={6} md={3} key={i}>
                <div className={classes.productContainer}>
                  <Product
                    type="wishlist-recommend"
                    key={item?._id}
                    section="wishlist"
                    detail={_.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                      { length: 80 }
                    )}
                    rate={item?.price}
                    img={image}
                    attr={item}
                    isSearchOrRecommend={true}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      }
    </div>
  );
};

export default Suggestions;
