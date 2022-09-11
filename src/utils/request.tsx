import axios from "axios"
import { isAuthenticated, getAuthToken, removeSession, isGuestUser } from "./session"
import Utils from ".";
import store from "../store"
import { v4 as uuidv4 } from 'uuid';
import { hideLoader } from "../pages/home/actions";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`
});


// Set config defaults when creating the instancep
let deviceId = Utils.CommonFunctions.getCookie("deviceId") ?? uuidv4();
if (!Utils.CommonFunctions.getCookie('deviceId')) {

    Utils.CommonFunctions.setCookie('deviceId', deviceId)
}

instance.defaults.headers.common['language'] = 'en';
instance.defaults.headers.common['offset'] = '-330';
instance.defaults.headers.common['deviceid'] = deviceId;
instance.defaults.headers.common['platform'] = 'web';


// Add a request interceptor
instance.interceptors.request.use(
    (success) => {
        if (!success.headers.common['Authorization']) {
            if (isAuthenticated() || isGuestUser()) {
                success.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
            } else {
                success.headers.common['Authorization'] = `Basic ${process.env.REACT_APP_API_KEY}`;
            }
        }
        if (!success.headers.common['deviceid']) {
            let deviceId = uuidv4();
            success.headers.common['deviceid'] = deviceId
            Utils.CommonFunctions.setCookie('deviceId', deviceId)
        }


        return success;
    },
    (error) => {
        return Promise.reject(error);

    }
);


// Add a request interceptor
instance.interceptors.response.use(
    (success) => {

        return success;
    },
    (err) => {
        if (!window.navigator.onLine) {
            store.dispatch(hideLoader())
            store.dispatch({
                type: "show-alert",
                payload: {
                    type: "error",
                    message: "You are offline. Please check internet connection",
                },
            })
            return;
        } else if (err.response.status === Utils.statusCode.UNAUTHENTICATED) {
            removeSession();
            window.location.href = Utils.routes.LOGIN_OTP
            // createBrowserHistory().push(Utils.routes.LOGIN_OTP)
        }
        return Promise.reject(err);
    }
);


// Alter defaults after instance has been created

export default instance