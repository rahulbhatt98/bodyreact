
import React, { Suspense, useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import Store from './store';
import RouterContainer from './router/index';
import { v4 as uuidv4 } from 'uuid';
import Utils from './utils';
import CookieConsent from "react-cookie-consent";
import Maintainance from './pages/error/maintainance';
import ReactGA from 'react-ga'

// @ts-ignore
import ClevertapReact from 'clevertap-react';
import { Helmet } from 'react-helmet';
import { ReducersModal } from './models';

const TRACKING_ID = "UA-21871889-5"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const App: React.FC = () => {

  useEffect(() => {
    ClevertapReact.initialize("TEST-96Z-Z74-RK6Z");

  }, [])

  React.useEffect(() => {
    if (!Utils.CommonFunctions.getCookie('deviceId'))
      Utils.CommonFunctions.setCookie('deviceId', uuidv4())

  })
  // useEffect(() => {
  //   setUnderMaintainance(generalConfig?.underMaintenance)
  // }, [generalConfig?.underMaintenance])

  // if (localStorage.getItem('underMaintenance') === '1') {
  //   return <Maintainance />
  // } else {
  return (
    <div>
      <div className="root-container">
        {process.env.REACT_APP_ENV === 'staging' && <Helmet>
          <meta name="google-site-verification" content="1svsraQYJBeNl1D328vRK0dVGYDDZHGIiQ2zXLQfpLg" />
        </Helmet>}
        {/* {!navigator.onLine ?
            <CustomAlert type="error" show={true} message="You are offline. Please check internet connection" /> :
            null
          } */}
        {/* <Detector
            render={({ online }) => (
              online ? null : (<CustomAlert type="error" show={true} message="You are offline. Please check internet connection" />)
            )}
          /> */}
        <CookieConsent
          enableDeclineButton
          location="bottom"
          buttonText="Allow"
          declineButtonText="Decline"
          style={{ background: "#2B373B" }}
          declineButtonStyle={{ color: "#000000", backgroundColor: "#ffffff", fontSize: "13px" }}
          buttonStyle={{ color: "#000000", backgroundColor: "#ffffff", fontSize: "13px", marginRight: 150 }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        {/* <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent> */}
        <Provider store={Store}>
          <Suspense fallback={'Loading...'}>
            {/* {localStorage.getItem('underMaintenance') === '1' ? */}
            {
            // underMaintainance===1?
              <RouterContainer />
            }
          </Suspense>
        </Provider>
      </div>
    </div>
  );
  // }
};

export default App;

