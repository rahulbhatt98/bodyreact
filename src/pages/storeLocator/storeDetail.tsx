import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Hidden,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import Utils from "../../utils";
import request from "../../utils/request";
// import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../home/actions";
import Map from "./mapContainer";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    storeName: {
      display: "flex",
      
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    storeBoxDiv: {
      padding: theme.spacing(0, 7, 5, 7),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(5, 1),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(5, 1),
      },
      "&>*": {
        padding: theme.spacing(1),
      },
    },
    flexBoxDiv: {
      display: "flex",
      padding: theme.spacing(1, 0),
    },

    boxShadowDiv: {
      margin: theme.spacing(0, 0),
      padding: theme.spacing(6, 7),
      boxShadow: "var(--box-shadow-div)",
      backgroundColor: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        boxShadow: "none",
        padding: theme.spacing(6, 1),
        backgroundColor: "var( --backgroun-color)",
      },
    },
    heading: {
      flexBasis: "70%",
      font: `normal ${theme.spacing(2)}px Recoleta Alt Bold`,
      lineHeight: "27px",

      color: "var(--secondary-black)",
    },
    subCardBox: {
      display: "flex",
      padding: theme.spacing(1, 1),

      flexDirection: "row",
      justifyContent: "space-between",
    },
    subheading: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      color: "var(--light-gray)",
      margin: theme.spacing(1, 0, 0, 0),
      lineHeight: "20px",
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(1.2)}px Work Sans Regular`,
        // margin: theme.spacing(0.5, 0.5, 0),
        letterSpacing: "0.02em",
      },
    },
    subHeading: {
      font: `normal ${theme.spacing(1.6)}px Recoleta Alt Bold`,
      lineHeight: "22px",
      color: "var(--secondary-black)",

      letterSpacing: "0.02em",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.8)}px Recoleta Alt Bold`,
      },
    },

    subCardText: {
      lineHeight: "15px",
      color: "var(--black)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.2
        )}px Work Sans Medium`,
      },
    },
    mapDiv: {
      display: "flex",
      alignItems: "center",
      alignSelf: "flex-start",
      justifyContent: "center",
      margin: theme.spacing(0,1),

    },
    subCardPara: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "14px",
      color: "var(--black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.4)}px Work Sans Medium`,
      },
    },

    subCardImg: {
      margin: theme.spacing(0, 1, 0, 0),
    },

    dayName: {
      font: `normal ${theme.spacing(1.6)}px Work Sans Bold`,
      lineHeight: "30px",
      color: "var(--black)",
      margin: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-body1": {
          font: `normal ${theme.spacing(1.2)}px Work Sans Medium`,
          lineHeight: "21px",
        },
      },
    },
    // timeName: {
    //   font: `normal  ${theme.spacing(1.6)}px Work Sans`,
    //   color: "var(--light-gray)",
    //   lineHeight: "30px",
    //   [theme.breakpoints.down("xs")]: {

    //     margin: theme.spacing(0, 0, 0),
    //   },
    // },
    timings: {
      display: "inline-block",
      // margin: theme.spacing(0, 1),
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "30px",
      margin: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-body1": {
          font: `normal ${theme.spacing(1.2)}px Work Sans Medium`,
          lineHeight: "21px",
        },
      },
    },
    backButton: {
      padding: "20px 20px 20px 30px",
      cursor: "pointer",
    },
  })
);

const MapContainer = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState<any>(
    props.productId
  );
  const [mapZoom, setMapZoom] = useState<any>(props.mapZoom || 8);

  const [storeData, setStoreData] = React.useState<any>();
  const data = useSelector((state: ReducersModal) => state.storeReducer?.data);
  const [mapMarkers, setMapMarkers] = useState([]);

  const handleProoductIDChange = useCallback(
    (value: any) => {
      setSelectedProductId(btoa(value.id));
      setMapZoom(14);
      dispatch(showLoader());
      let index = data.findIndex((d) => d.magentoId === value.id);
      const singleMarkerData = data[index];
      setStoreData(singleMarkerData);
      dispatch(hideLoader());
    },
    [selectedProductId, storeData, mapZoom]
  );
  React.useEffect(() => {
    let index = data.findIndex((d) => d.magentoId == atob(selectedProductId));
    const singleMarkerData = data[index];
    setStoreData(singleMarkerData);
  }, [data, storeData]);

  useEffect(() => {
    const dataLatLng = data.reduce((i, j) => {
      i.push({
        lat: j.location.coordinates[1],
        lng: j.location.coordinates[0],
        id: j.magentoId,
      });
      return i;
    }, []);
    setMapMarkers(dataLatLng);
  }, [data]);

  const mapStyles = {
    height: "auto",
    width: "100%",
  };

  const defaultCenter = {
    lat: storeData?.location?.coordinates?.[1],
    lng: storeData?.location?.coordinates?.[0],
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={12} xl={12}>
          {defaultCenter.lat && defaultCenter.lng ? (
            <div style={mapStyles}>
              {/* <Map center={defaultCenter} /> */}
              <Map
                center={defaultCenter}
                position={mapMarkers}
                multiple={true}
                selectedProductId={selectedProductId}
                handleProoductIDChange={handleProoductIDChange}
                zoom={mapZoom}
                // zoom={11}
              />
            </div>
          ) : null}
        </Grid>
      </Grid>
      <Hidden xsDown>
        <img
          src={Utils.images.BACK_ARROW}
          className={classes.backButton}
          alt="back"
          onClick={() => props?.setStoreDetail(false)}
        />
      </Hidden>
      <Grid container className={classes.storeBoxDiv} >
        <Grid item xs={12} sm={6} md={5}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <div className={classes.storeName}>
                <Typography variant="h4" className={classes.heading}>
                  {storeData?.name}
                </Typography>
                <div className={classes.mapDiv}>
                  <img
                    src={Utils.images.LOCATIONM}
                    alt="mapicon"
                    className={classes.subCardImg}
                  />
                  <Typography variant="h3" className={classes.subCardPara}>
                    {storeData?.distance}
                  </Typography>
                </div>
              </div>
              <Hidden xsDown>
                <Typography variant="h5" className={classes.subheading}>
                  {storeData?.location?.address}, {storeData?.location?.city},{" "}
                  {storeData?.location?.state}, {storeData?.location?.country},{" "}
                  {storeData?.location?.pincode}
                </Typography>
                <div className={classes.flexBoxDiv}>
                  <img
                    src={Utils.images.PHONEICON}
                    alt="phoneicon"
                    className={classes.subCardImg}
                  />
                  <Typography variant="h5" className={classes.subCardText}>
                    <a href={`tel:${storeData?.contactNo?.join(", ")}`}>
                      {storeData?.contactNo?.join(", ")}
                    </a>
                  </Typography>
                </div>
              </Hidden>
            </Grid>
            <Hidden smUp>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.subheading}>
                  {storeData?.location?.address}, {storeData?.location?.city},{" "}
                  {storeData?.location?.state}, {storeData?.location?.country},{" "}
                  {storeData?.location?.pincode}
                </Typography>
                <div className={classes.flexBoxDiv}>
                  <img
                    src={Utils.images.PHONEICON}
                    alt="phoneicon"
                    className={classes.subCardImg}
                  />
                  <Typography variant="h5" className={classes.subCardText}>
                    {storeData?.contactNo ? (
                      <a href={`tel:${storeData?.contactNo?.join(", ")}`}>
                        {storeData?.contactNo?.join(", ")}
                      </a>
                    ) : (
                      ""
                    )}
                  </Typography>
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" className={classes.subHeading}>
                Opening Hours
              </Typography>
              <Grid container>
                <Grid item xs={5}>
                  <div className={classes.dayName}>
                    {days.map((day: string, index: number) => (
                      <Typography component="h3" key={index}>
                        {day} :
                      </Typography>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={7}>
                  {storeData?.hours?.length &&
                    storeData?.hours.map((hour: any, index: any) => (
                      <div className={classes.timings} key={index}>
                        {Object.keys(hour).map((item: any, key: any) => {
                          return (
                            <Typography component="h3" key={key}>
                              {hour[item]}
                            </Typography>
                          );
                        })}
                      </div>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MapContainer;
