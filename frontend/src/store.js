import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import {
  userChangePasswordReducer,
  userLoginReducer,
  userResetPasswordReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  getAllUsersReducer,
  userDeleteReducer,
} from "./reducers/userReducers";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  accepteDemandeReducer,
  getAllDemandeReducer,
  getUserDemandeReducer,
  refuseDemandeReducer,
  updateUserDemandeReducer,
  userAddDemandeReducer,
  userGetDemandeStatsReducer,
} from "./reducers/demandeReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userChangePassword: userChangePasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userAll: getAllUsersReducer,
  userStats: userGetDemandeStatsReducer,

  userDemande: getUserDemandeReducer,
  userAddDemande: userAddDemandeReducer,
  userUpdateDemande: updateUserDemandeReducer,
  adminListDemande: getAllDemandeReducer,
  adminAccepteDemande: accepteDemandeReducer,
  adminRefuseDemande: refuseDemandeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
