import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Utils from "../../utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "./searchList";
import AutoComplete from "react-google-autocomplete";
import request from "../../utils/request";
import { ReducersModal } from "../../models";
import _ from "lodash";
import BreadCrumb from "../../components/breadCrumb";
import { getAddressFromLatLng, getLocation } from "./action";
import { hideLoader, hideSkeleton, showLoader, showSkeleton } from "../home/actions";
import { handleScrollHeight } from "../../utils/scroll";
import { screenViewed, storeLocator } from "../../utils/event/action";
import { Helmet } from "react-helmet";
import events from "../../utils/event/constant"

// import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      backgroundImage: `url(${Utils.images.STORE_LOCATOR_BG})`,
      height: "612px",
      backgroundColor: "rgba(0, 66, 54, 0.8)",
      backgroundSize: "cover",
      boxShadow: "inset 2000px 0 0 0 rgba(0, 66, 54, 0.8)",
      color: "var(--white)",
      [theme.breakpoints.down(300)]: {
        height: "auto",
      },
    },
    routeName: {
      padding: theme.spacing(2, 0, 0, 1.5),
    },
    findContainer: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    innerFindContainer: {
      textAlign: "center",
    },
    heading: {
      font: `${theme.typography.fontWeightBold} ${theme.spacing(4)}px RecoletaMedium`,
      // letterSpacing: "0.08em",
      lineHeight: "65px",
      padding: theme.spacing(0.2),
    },
    subHeading: {
      font: `${theme.typography.fontWeightMedium} ${theme.spacing(
        1.8
      )}px Work Sans Regular`,
      letterSpacing: "0.333333px",
      lineHeight: "21px",
      margin: theme.spacing(2.5, 0, 0, 0),
      padding: theme.spacing(0.2),
    },

    searchContainer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "left",
      margin: theme.spacing(8, 0, 0, 0),
    },
    searchDiv: {
      display: "flex",
      position: "relative",
      width: "80%",
    },
    inputContainer: {
      width: "80%",
      backgroundColor: "var(--white)",

      // flexBasis: "70%",
    },
    searchInput: {
      border: "none",
      backgroundColor: "var(--white)",
      padding: theme.spacing(0.5, 1),
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "54px",
      width: "90%",
      [theme.breakpoints.down("sm")]: {
        width: "85%",

        // textOverflow: "ellipse",
        // padding: theme.spacing(1),
      },
    },
    sendButton: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      textTransform: "capitalize",
      borderRadius: "4px",
      color: theme.palette.primary.main,
      padding: theme.spacing(1, 3.5),
      flexBasis: "30%",
      // cursor: "not-allowed",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
      },
      "&.Mui-disabled": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        cursor: "not-allowed",
        pointerEvents: "all",
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
        },
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.2),
      },
    },
    searchIcon: {
      top: "15px",
      right: "32%",
      position: "absolute",
      zIndex: 1,
      cursor: "pointer",
    },
  })
);

const FindNearestStore = ({ details, storeDetail }: any) => {
  const [toLocation, setToLocation] = React.useState({
    lat: undefined,
    lng: undefined,
  });
  const [page, setPage] = useState<any>(0);
  const limit = 12;

  const classes = useStyles();
  const dispatch = useDispatch();
  const data  = useSelector((state: ReducersModal) => state.storeReducer?.data);

  const [address, setAddress] = useState("");
  const [findStoreDataLoc, setFindStoreDataLoc] = useState<any>();

  const handleChange = (e: any, page: number) => {
    window.scrollTo(0, 400);
    showLoader();
    getStores(true, page);
  };
  useEffect(() => {
    screenViewed({
      ScreenName: events.SCREEN_STORE_LOCATOR,
      CTGenerated: "WEB",
    });
  }, []);
  const getStores = (
    hasMore: boolean,
    pageNum?: number,
  ) => {
    if (hasMore) {
      let pageSize = pageNum ? pageNum : hasMore ? page + 1 : page;
      setPage(pageSize);

      request
        .get(Utils.endPoints.STORE_LIST, {
          params: {
            page: pageSize,
            limit: limit,
            fromLatitude: localStorage.getItem("currentLat") || 0,
            fromLongitude: localStorage.getItem("currentLng") || 0,
            toLatitude: toLocation.lat ?? "0",
            toLongitude: toLocation.lng ?? "0",
          },
        })
        .then((resp) => {
          if (resp?.data?.data) {
              dispatch({
                type: "set-store-list",
                payload: {
                  data: resp.data.data.data,
                  AllData: resp.data.data,
                  nextPage: resp.data.data.nextPage,
                  totalCount: resp.data.data.totalCount,
                  showStoreDetail: false,
                },
              });
            // }
            dispatch(hideLoader());
            dispatch(hideSkeleton());
          }
        })
        .catch((err) => {
          dispatch(hideLoader());
          dispatch(hideSkeleton());
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: err?.response?.data?.message === "FromLatitude is required" ? "Please provide access to location" : err.response.data.message,
              },
            });
        });
    }
  };

  let apiKey = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`
  return (
    <React.Fragment>
      <>
      <Helmet>
        <title>THE BODY SHOP STORES | The Body Shop Outlets</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
        <div className={classes.mainContainer}>
          <div className={classes.routeName}>
            <BreadCrumb
              type="white"
              breadcrumb={[
                { title: "Home", action: "/" },
                {
                  title: "Find the nearest The Body Shop Store",
                  action: Utils.routes.STORE,
                },
              ]}
            />
          </div>
          {/* <Typography variant="body1" className={classes.routeName}>
          Home / Find nearest Bodyshop store
        </Typography> */}
          <div className={classes.findContainer}>
            <div className={classes.innerFindContainer}>
              <Typography variant="h2" className={classes.heading}>
              Find Your Nearest The Body Shop Store

              </Typography>
              <Typography variant="body1" className={classes.subHeading}>
              Scrub up your body & scrub up the world at The Body Shop's Stores.
              </Typography>
              <div className={classes.searchContainer}>
                <div className={classes.searchDiv}>
                  <div className={classes.inputContainer}>
                    <AutoComplete
                      placeholder="Search by city, town and postcode"
                      apiKey={apiKey}
                      options={{
                        componentRestrictions: { country: "in" },
                        // location: toLocation,
                        types: ["geocode"],
                      }}
                      onPlaceSelected={(place: any) => {
                        setFindStoreDataLoc(place);       
                        setAddress(place?.formatted_address)
                        setToLocation({
                          lng: place?.geometry?.location?.lng(),
                          lat: place?.geometry?.location?.lat(),
                        });
                      }}
                      className={classes.searchInput}
                      value={address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAddress(e?.target?.value)
                      }}
                    />

                    <div
                      onClick={() => {
                        getLocation().then((resp: any) => {
                          const lat = resp.latitude;
                          const lng = resp.longitude;
                          dispatch(showLoader());
                          getAddressFromLatLng(`${lat},${lng}`)
                            .then((resp: any) => {
                              if (resp) {
                                // let data = resp?.data?.results?.find((item: any) => item?.types?.includes("premise"))
                                let data = resp?.data?.results?.[0]                   
                                setToLocation({
                                  lng: data?.geometry?.location?.lng,
                                  lat: data?.geometry?.location?.lat,
                                });
                                setAddress(data?.formatted_address)
                                dispatch(hideLoader());
                              }
                            })
                        }).catch((err) => {
                           dispatch(hideLoader());
                        })
                      }}
                    >
                      <img
                        src={Utils.images.SEARCH_LOCATION}
                        alt="search"
                        className={classes.searchIcon}
                      />

                    </div>
                  </div>
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    // disableElevation
                    disabled={toLocation.lng && toLocation.lat ? false : true}
                    className={classes.sendButton}
                    onClick={() => {
                      getStores(true, 1)
                      let pincode = _.find(findStoreDataLoc?.address_components, (item: any) => item.types.includes("postal_code"))
                      storeLocator({
                        Location: `${toLocation.lat},${toLocation.lng}`,
                        Pincode:   `${pincode.long_name}`,
                        Latitude:  `${toLocation?.lat}`,
                        Longitude: `${toLocation?.lng}`,
                        Platform:   'Web' ,
                      });
                    }}
                  >
                    Find Store
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!_.isEmpty(data) && !storeDetail ? <SearchList handleChange={handleChange} /> : null}
        
      </>
      {/* )} */}
    </React.Fragment>
  );
};

export default FindNearestStore;
