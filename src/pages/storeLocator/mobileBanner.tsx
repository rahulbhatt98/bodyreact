import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Utils from "../../utils";
import events from "../../utils/event/constant"
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "./searchList";
import AutoComplete from "react-google-autocomplete";
import request from "../../utils/request";
import { ReducersModal } from "../../models";
import _ from "lodash";
import { getAddressFromLatLng, getLocation } from "./action";
import { hideLoader, hideSkeleton, showSkeleton } from "../home/actions";
import { handleScrollHeight } from "../../utils/scroll";
import StoreDetail from "./storeDetail";
import { screenViewed, storeLocator } from "../../utils/event/action";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ebf2f1",
    "&:hover": {
      backgroundColor: "#ebf2f1",
    },
    marginRight: theme.spacing(2),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    padding: "10px",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    // pointerEvents: "none",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  fixedTop: {
    position: "sticky",
    top: "55px",
    background: "white",
    zIndex: 9,
  },
  searchInput: {
    border: "none",
    backgroundColor: "inherit",
    padding: theme.spacing(0.4, 1),
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )}px Work Sans`,
    width: "82%",
    position: "absolute",
  },

  searchFieldDiv: {
    margin: theme.spacing(1, 1),
    height: "50px",
  },
  searchWidth: {
    flexBasis: "82%",
  },
  storeOfferDiv: {
    width: "100%",
    overflowX: "auto",
    display: "flex",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  storeInnerDiv: {
    width: "340px",
    height: "100px",
    position: "relative",
    margin: theme.spacing(1, 0, 1, 1),
    borderRadius: "4px",
  },
  imgDiv: {
    width: "340px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  storeTextDiv: {
    position: "absolute",
    top: "10px",
    color: "white",
    width: "80%",
    margin: theme.spacing(1, 4),
  },
  outerDiv: {
    position: "relative",
  },
  arrowImg: {
    float: "right",
    marginRight: "10px",
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.1
    )}px Work Sans Regular`,
    color: "var(--white)",
    letterSpacing: "0.08em",
    lineHeight: "19px",
  },
  heading: {
    font: `normal ${theme.spacing(
      1.4
    )}px Work Sans SemiBold`,
    color: "var(--white)",
    lineHeight: "25px",
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )}px Recoleta Alt Bold`,
    color: "var(--secondary-black)",
    lineHeight: "25px",
    margin: theme.spacing(0, 1),
    letterSpacing: "0.06em",
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(1, 0),
    "& .MuiAppBar-root": {
      boxShadow: "none",
    },
  },
  tabDiv: {
    backgroundColor: "white",
    color: "var(--secondary-black)",
    font: `normal 600 ${theme.spacing(1.6)}px Work Sans`,
    boxShadow: "0px 4px 5px 0px rgb(0 0 0 / 14%)",

    "& .MuiTabs-indicator": {
      backgroundColor: "var(--primary) !important",
      height: "2.5px",
    },
    "& .MuiTab-root": {
      width: "50%",
    },
    "& .MuiTab-textColorInherit.Mui-selected": {
      color: "var(--primary) !important",
      fontWeight: "bold",
    },
  },
  // fixedTop: {
  //   position: "fixed",
  //   top: "55px",
  //   background: "white",
  //   zIndex: "9999",
  // },
}));

const MobileBanner = ({ storeDetail }: any) => {
  const [page, setPage] = useState<any>(0);
  const [isFetching, setIsFetching] = useState<any>(false);
  const limit = 10;
  const [toLocation, setToLocation] = React.useState({
    lat: undefined,
    lng: undefined,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const data = useSelector((state: ReducersModal) => state.storeReducer?.data);
  const [prodID, setProdID ] = useState("");
  const nextPage = useSelector(
    (state: ReducersModal) => state.storeReducer?.nextPage
  );
  const totalCount = useSelector(
    (state: ReducersModal) => state.storeReducer?.totalCount
  );

  const [address, setAddress] = useState("");
  const [findStoreDataLoc, setFindStoreDataLoc] = useState<any>();
  const [value, setValue] = React.useState(0);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [storeOffers, setStoreOffers] = useState([]);

  useEffect(() => {
    const dataLatLng = data.reduce((i, j) => {
      i.push({
        lat: j.location.coordinates[1],
        lng: j.location.coordinates[0],
      });
      return i;
    }, []);
    setMapMarkers(dataLatLng);
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!nextPage) {
      dispatch(showSkeleton());
      getStores(true);
    } else {
      setPage(1);
    }

    window.addEventListener("scroll", handleScroll);

    /**
     * Event logger
     */
     screenViewed({
      ScreenName: events.SCREEN_STORE_LOCATOR,
      CTGenerated: "WEB",
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    handleScrollHeight(e, (value: boolean) => {
      setIsFetching(value);
    });
  };

  useEffect(() => {
    if (!isFetching) return;
    getStores(nextPage !== undefined && nextPage > 0 ? true : false);
  }, [isFetching]);

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    getStores(true);
  }, [toLocation]);

  const defaultCenter = {
    lat: (mapMarkers[0] && mapMarkers[0]["lat"]) || 31.282213,
    lng: (mapMarkers[0] && mapMarkers[0]["lng"]) || 75.58709,
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getStores = (
    hasMore: boolean,
    data1?: any,
    pageNum?: number,
    callback?: Function
  ) => {
    if (hasMore) {
      let pageSize = pageNum ? pageNum : hasMore ? page + 1 : page;
      setPage(pageSize);

      // dispatch({ type: "reset-store-list" });
      request
        .get(Utils.endPoints.STORE_LIST, {
          params: {
            page: pageSize,
            limit: limit,
            fromLatitude: localStorage.getItem("currentLat") || 0,
            fromLongitude: localStorage.getItem("currentLng") || 0,
            toLatitude: toLocation.lat ?? "0",
            toLongitude: toLocation.lng ?? "0",
            // toLatitude: "0",
            // toLongitude: " 0"
          },
        })
        .then((resp) => {
          if (resp?.data?.data) {
            if (callback) callback();
            let newList: any = [];
            if (nextPage !== resp?.data?.data?.nextPage && !pageNum) {
              let list = data;
              newList = [...list, ...resp.data.data?.data];
              dispatch({
                type: "set-store-list",
                payload: {
                  data: [...newList],
                  nextPage: resp.data.data.nextPage,
                  totalCount: resp.data.data.totalCount,
                  showStoreDetail: false,
                },
              });
            } else {
              newList = [...resp.data.data?.data];
              dispatch({
                type: "set-store-list",
                payload: {
                  data: [...newList],
                  nextPage: resp.data.data.nextPage,
                  totalCount: resp.data.data.totalCount,
                  showStoreDetail: false,
                },
              });
            }
            dispatch(hideLoader());
            dispatch(hideSkeleton());
          }
        })
        .catch((err) => {
          setIsFetching(false);
          dispatch(hideLoader());
          dispatch(hideSkeleton());
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message:
                  err?.response?.data?.message === "FromLatitude is required"
                    ? "Please provide access to location"
                    : err.response.data.message,
              },
            });
        });
    }
  };

  const getOffers = useCallback(() => {
    request
      .get(Utils.endPoints.OFFERS)
      .then((resp) => {
        setStoreOffers(resp?.data?.data["content"]);
      })
      .catch((err) => {});
  }, [storeOffers]);

  let apiKey = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  const renderOffers = (item: any) => {
    return item["content"].map(
      (offer: any) =>
        (item.type.toLowerCase() === "store offer" ||
          item.type.toLowerCase() === "store offers") && (
          <div
            className={classes.outerDiv}
            onClick={() =>
              history.push({
                pathname: Utils.routes.BANKOFFER,
                state: { pageName: "Offers" },
              })
            }
          >
            <div
              className={classes.storeInnerDiv}
              style={{ backgroundColor: "#004236" }}
            >
              {/* <img
          src={offer.offer_image ? `${IMAGE_URL}${offer.offer_image}`: Utils.images.GIFTONE}
          className={classes.imgDiv}
          alt="storeimg"
        /> */}
            </div>
            <div className={classes.storeTextDiv}>
              <div className={classes.arrowImg}>
                <div
                  onClick={() =>
                    history.push({
                      pathname: Utils.routes.BANKOFFER,
                      state: { pageName: "Offers" },
                    })
                  }
                >
                  <img src={Utils.images.WHITE_RIGHT_ARROW} alt="arrow" />
                </div>
              </div>
              <Typography variant="h6" className={classes.heading}>
                {offer.title}
              </Typography>
              {/* <Typography variant="h5" className={classes.subHeading}>
            {Utils.CommonFunctions.replaceHtmlTag(offer?.title)}
          </Typography> */}
              <Typography
                className={classes.subHeading}
                dangerouslySetInnerHTML={{
                  __html: _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(offer?.content),
                    { length: 85 }
                  ),
                }}
              ></Typography>
            </div>
          </div>
        )
    );
  };

  return (
    <React.Fragment>
      <div className={classes.fixedTop}>
        <div className={classes.searchFieldDiv}>
          <div className={classes.search}>
            <div className={classes.searchWidth}>
              <img
                src={Utils.images.SEARCHICON}
                className={classes.searchIcon}
                alt="google"
              />

              <AutoComplete
                placeholder="Search by city, town and Pincode"
                apiKey={apiKey}
                options={{
                  componentRestrictions: { country: "in" },
                  // location: toLocation,
                  types: ["geocode"],
                }}
                onPlaceSelected={(place: any) => {
                  setFindStoreDataLoc(place);
                  setAddress(place?.formatted_address);
                  dispatch({ type: "reset-store-list" });
                  setToLocation({
                    lng: place?.geometry?.location?.lng(),
                    lat: place?.geometry?.location?.lat(),
                  });
                }}
                className={classes.searchInput}
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(e?.target?.value);
                  // getStores();
                }}
              />
            </div>
            <div
              onClick={() => {
                getLocation()
                  .then((resp: any) => {
                    const lat = resp.latitude;
                    const lng = resp.longitude;
                    getAddressFromLatLng(`${lat},${lng}`).then((resp: any) => {
                      if (resp) {
                        // let data = resp?.data?.results?.find((item: any) => item?.types?.includes("premise"))
                        let data = resp?.data?.results?.[0];
                        let pincode = _.find(
                          findStoreDataLoc?.address_components,
                          (item: any) => item.types.includes("postal_code")
                        );
                        storeLocator({
                          Location: `${toLocation.lat},${toLocation.lng}`,
                          Pincode: `${pincode?.long_name}`,
                          Latitude: `${toLocation?.lat}`,
                          Longitude: `${toLocation?.lng}`,
                          Platform: "Web",
                        });
                        setToLocation({
                          lng: data?.geometry?.location?.lng,
                          lat: data?.geometry?.location?.lat,
                        });
                        setAddress(data?.formatted_address);
                      }
                    });
                  })
                  .catch((err) => {});
              }}
            >
              <img
                src={Utils.images.SEARCH_LOCATION}
                alt="search"
                className={classes.searchIcon}
              />
            </div>
          </div>
        </div>
        <>
          <Typography variant="h4" className={classes.title}>
            Store Offers
          </Typography>
          <div className={classes.storeOfferDiv}>
            {storeOffers.map((item: any, index) => renderOffers(item))}
          </div>
        </>

        <Typography variant="h4" className={classes.title}>
          Nearest Stores <span>{`(${totalCount})`}</span>
        </Typography>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabDiv}
              aria-label="simple tabs example"
            >
              <Tab label="List" {...a11yProps(0)} />
              <Tab label="Map" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        {!_.isEmpty(data) && !storeDetail ? (
          <SearchList
            device="mob"
            handleTabChange={(e: any) => handleChange(e, 1)}
            handleProdID ={(id:any)=>{ setProdID(id); }}
          />
        ) : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StoreDetail productId={prodID || btoa(data[0]?.magentoId)} />
      </TabPanel>
    </React.Fragment>
  );
};

export default MobileBanner;
