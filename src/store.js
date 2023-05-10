import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userRegisterReducer
} from './reducers/userReducers';
import {
  patientCreationReducer,
} from './reducers/patientReducers';
import {
  hospitalCreationReducer,
} from './reducers/hospitalReducers';


const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  }
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  createPatient: patientCreationReducer,
  createHospital: hospitalCreationReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
