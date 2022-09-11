import loadable from '@loadable/component';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import './index.css';
import './i18n';
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore
import TagManager from 'react-gtm-module'



//custom imports below
const App = loadable(() => import('./App'));


//removed for one signal need to check it's effect.
// import * as serviceWorker from "./serviceWorker";

// const tagManagerArgs = {
//   gtmId: 'GTM-KRDWB64'
// }

// TagManager.initialize(tagManagerArgs)


i18n.on('initialized', () => {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
});

// ReactDOM.render(<App />, document.getElementById("root"));
// serviceWorker.unregister();

