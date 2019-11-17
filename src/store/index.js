import { createStore } from 'redux';
import rootReducer from '../reducers';

// const epicMiddleware = createEpicMiddleware();

// function configureStore(initialState) {
//   const enhancer = composeEnhancers(
//     applyMiddleware(epicMiddleware)
//   );
//   // create store
//   return createStore(rootReducer, initialState, enhancer);
// }

// const store = configureStore();

// epicMiddleware.run(epics);

const store = createStore(rootReducer);

export default store;
