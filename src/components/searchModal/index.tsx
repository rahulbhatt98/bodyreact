import React, { useState } from "react";
import {
  makeStyles,
  Divider,
  Button,
  Modal,
  Fade,
  Typography,
  Chip,
} from "@material-ui/core";
import Utils from "../../utils";
import request from "../../utils/request";
import _ from "lodash";

/**Components */
import SearchBox from "../../components/searchBox";
import SearchProducts from "./searchProducts";
import TrendingProducts from "./trendingProducts";
import { Skeleton } from "@mui/material";
import { getTopSearch } from "../../pages/home/actions";
import { useHistory } from "react-router-dom";
import { userSearch } from "../../pages/home/actions";
import { searchProducts } from "../../utils/event/action";
import { getAuthToken } from "../../utils/session";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #0000",
    position: "absolute",
    top: 13,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2),
    borderRadius: "5px",
    width: "60%",
    height: "80%",
    // [theme.breakpoints.only("sm")]: {
    //     // height: "100%"
    // },
    [theme.breakpoints.down(300)]: {
      width: "85%",
    },
  },
  searchIcon: {
    width: "20px",
  },
  innerContainer: {
    display: "flex",
  },
  clearBtn: {
    borderRadius: "4px",
    color: theme.palette.secondary.light,
  },
  productContainer: {
    // padding: theme.spacing(0,2),
    overflowY: "auto",
    height: "inherit",
  },
  topSearch: {
    "& .MuiChip-root": {
      margin: theme.spacing(0.3),
    },
  },
  heading: {
    fontSize: 16,
    // margin: theme.spacing(1, 0)
    padding: theme.spacing(2, 0),
    color: "var(--light-gray)",
  },
  skeletonView: {
    display: "flex",
    flexDirection: "row",
    "& .MuiSkeleton-root": {
      margin: theme.spacing(1),
      borderRadius: 20,
    },
  },
  searchContent: {
    display: "flex",
    overflowX: "auto",
    // width:"100vw",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  color: {
    backgroundColor: "#EAE49E",
  },
}));

export default function SearchIndex(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [productData, setProductData] = useState<any>();
  const [suggestion, setSuggestion] = useState<any>();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [topSearch, setTopSearch] = useState([]);
  const dispatch = useDispatch()

  
  React.useEffect(() => {
    if (getAuthToken()) {
      getTopSearch()
        .then((resp) => {
          setTopSearch(resp.data.data.result);
        })
        .catch((err) => { });

      request
        .get(Utils.endPoints.RECOMMEND_PRODUCT, {
          params: {
            value: "trending",
            limit: 4,
          },
        })
        .then((resp) => {
          setTrendingProducts(resp.data.data.data);
        })
        .catch((err) => { });

    }
  }, []);

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    if (!_.isEmpty(e.target.value) && e.target.value.length >= 3) {
      userSearch({
        value: e.target.value,
        limit: 10,
      })
        .then((resp) => {
          // let eventPayload = {
          //   SearchKey: e.target.value,
          //   FromScreen: "Search",
          //   ClickBehaviour: "Search Suggestions",
          // };
          // searchProducts(eventPayload);
          // dispatch(hideLoader())
          setProductData(resp.data.data.products);
          setSuggestion(resp.data.data.suggestions);
        })
        .catch((err) => {
          // dispatch(hideLoader())
        });
    } else {
      setProductData({});
      setSuggestion({});
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        {...props}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div className={classes.innerContainer}>
              <img
                src={Utils.images.SEARCHICON}
                alt="search"
                className={classes.searchIcon}
              />
              <SearchBox
                placeholder="Type here to search"
                onChange={(e: any) => {
                  handleChange(e)
                }}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && keyword) {
                    props.handleSuggestionClick(keyword)
                  }
                }}
                value={keyword}
              />
              {keyword.length ? (
                <Button
                  onClick={() => {
                    setKeyword("");
                  }}
                  className={classes.clearBtn}
                >
                  Clear
                </Button>
              ) : null}
            </div>
            <Divider />
            <div className={classes.productContainer}>
              <div className={classes.topSearch}>
                <Typography className={classes.heading}>Top Search</Typography>
                {topSearch.length ? (
                  <div className={classes.searchContent}>
                    {topSearch.map((item: any, index) => {
                      return (
                        <Chip
                          className={classes.color}
                          label={item}
                          key={index}
                          onClick={() => {
                            props.onClose();
                            dispatch({ type: 'mobile-applied-filters', payload: null })
                            let url = `${Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_SEARCH_LIST, { ":keyword": item })}?isSearched=true`
                            history.push(url);
                            // history.push({
                            //   pathname: Utils.routes.PRODUCT_LIST,
                            //   search: `?keyword=${item}`,
                            // })
                          }
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className={classes.skeletonView}>
                    {[1, 2, 3, 4, 5].map((item: any) => (
                      <Skeleton variant="rectangular" key={item} width={150} height={30} />
                    ))}
                  </div>
                )}
              </div>
              {_.isEmpty(keyword) ? (
                <TrendingProducts
                  trendingProducts={trendingProducts}
                  {...props}
                  onModalClose={() => setKeyword("")}
                />
              ) : // !_.isEmpty(productData?.product_data) && !_.isEmpty(suggestion?.result) ?
                !_.isEmpty(productData?.product_data) ? (
                  <SearchProducts
                    productData={productData}
                    suggestion={suggestion}
                    {...props}
                    onModalClose={() => setKeyword("")}
                  />
                ) : _.has(productData, "product_data") &&
                  _.has(suggestion, "result") ? (
                  "No Records Found"
                ) : (
                  "Loading..."
                )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
