import axios from "axios";
import _ from "lodash";
import Utils from "../../utils";
import { location, updateProfile, updateProfileMultiple } from "../../utils/event/action";
import store from "../../store";


import request from "../../utils/request";
import { hideLoader, hideSkeleton } from "../home/actions";

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (resp) => showPosition(resp, resolve),
                (err) => error(err, reject),
                { enableHighAccuracy: true, timeout: 60000, maximumAge: 0 }
            );
        }

    })
}

const error = (error: any, callback: Function) => {
    localStorage.setItem("currentLat", '0')
    localStorage.setItem("currentLng", '0')
    callback({ currentLat: localStorage.getItem('currentLat'), currentLng: localStorage.getItem('currentLat') })
}

const showPosition = (position: any, callback: Function) => {
    getAddressFromLatLng(`${position?.coords.latitude},${position?.coords.longitude}`).then((resp: any) => {
        if (resp) {
            let results = resp?.data?.results || [];
            let state = _.find(results?.[0]?.address_components, (item: any) => item.types.includes("administrative_area_level_1"))
            let city = _.find(results?.[0]?.address_components, (item: any) => item.types.includes("locality"))
            updateProfile('State', state?.long_name);
            updateProfile('City', city?.long_name);
        }
    }).catch((err) => {

    })

    var latitude = position.coords.latitude,
        longitude = position.coords.longitude;
    localStorage.setItem("currentLat", latitude)
    localStorage.setItem("currentLng", longitude)
    getStores(latitude, longitude);
    /**
     * Event Logger
     */
    let payload = {
        Location: `${latitude},${longitude}`,
        // CreatedAt: `${Date.now()}`,
        // UserId: `${localStorage.getItem("userId")}`
    }

    location(payload);
    updateProfileMultiple({
        Latitude: latitude,
        Longitude: longitude
    })

    callback(position.coords)

}

const getStores = (currentLat: any, currentLng: any) => {
    request
        .get(Utils.endPoints.STORE_LIST, {
            params: {
                page: 1,
                limit: 10,
                fromLatitude: currentLat,
                fromLongitude: currentLng,
                toLatitude: "0",
                toLongitude: "0",
            },
        })
        .then((resp) => {
            if (resp?.data?.data) {
                store.dispatch({
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
                store.dispatch(hideLoader());
                store.dispatch(hideSkeleton());
            }
        })
        .catch((err) => {
            store.dispatch(hideLoader());
            store.dispatch(hideSkeleton());
            if (err?.response?.data?.message)
                store.dispatch({
                    type: "show-alert",
                    payload: {
                        type: "error",
                        message: err?.response?.data?.message === "FromLatitude is required" ? "Please provide access to location" : err.response.data.message,
                    },
                });
        });

};


export const getAddressFromLatLng = (latLng: string) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&language=en`)
}

export const getAddressFromPin = (pin: string) => {
    // return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${pin}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&language=en`)
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pin}|country:IN&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&language=en`)
}
