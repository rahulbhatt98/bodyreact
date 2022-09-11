import React, { useState, useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "google-map-react";

import Utils from "../../utils";
import { makeStyles } from "@material-ui/core";

let apiKey = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`;


const useStyles = makeStyles((theme) => ({
  mapTop: {
    position: "relative",
    height: "200px",
    width: " 100% ",
  },
  mapPointer:{
    position: "absolute",
    top: "-45px",
    left: "-15px",
  }

}));



const MapContainer = (props: any) => {
  const { center, position, multiple, zoom, handleProoductIDChange ,selectedProductId} = props;
  const classes = useStyles();
  const defaultProps = {
    center: {
      lat: center?.lat,
      lng: center?.lng,
    },
    zoom: zoom,
  };
  const Marker = (props: any) => {
    const { color, name, id, } = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: "pointer" }}
          title={name}
          onDoubleClick={props.closeForgot}
        />
        <img
          className={classes.mapPointer}
          src={atob(selectedProductId) == id.id ? `${Utils.images.MAP_PIN_YELLOW}` : `${Utils.images.MAP_PIN}`}
          onClick={() => {
            handleProoductIDChange(id);
          }}
        />
      </div>
    );
  };
  return (
    <div className={classes.mapTop}>
      <GoogleMap
        bootstrapURLKeys={{ key: apiKey }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        style={{
          height: "100%",
          width: "375px",
        }}
      >
        {multiple ? (
          position?.map((mark: any, index: number) => (
            <Marker lat={mark.lat} lng={mark.lng} id={mark} name="Center" />
          ))
        ) : (
          <Marker lat={center.lat} ng={center.lng} />
        )}
      </GoogleMap>
    </div>
  );
};

export default React.memo(MapContainer);
