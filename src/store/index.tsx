import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const logger = createLogger({
  predicate: () => process.env.REACT_APP_ENV === 'development',
});

const enhancer = compose(applyMiddleware(thunk, logger));
/**
 * create new store
 */
const store: any = createStore(RootReducer, composeWithDevTools(
  // applyMiddleware(...middleware),
  // other store enhancers if any
  enhancer,
));

export default store;


// const store = createStore(reducer, composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));