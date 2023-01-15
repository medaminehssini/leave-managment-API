import {
  ADMIN_ACCEPTE_DEMANDE_FAIL,
  ADMIN_ACCEPTE_DEMANDE_REQUEST,
  ADMIN_ACCEPTE_DEMANDE_SUCCESS,
  ADMIN_LIST_DEMANDE_FAIL,
  ADMIN_LIST_DEMANDE_REQUEST,
  ADMIN_LIST_DEMANDE_RESET,
  ADMIN_LIST_DEMANDE_SUCCESS,
  ADMIN_REFUSE_DEMANDE_FAIL,
  ADMIN_REFUSE_DEMANDE_REQUEST,
  ADMIN_REFUSE_DEMANDE_SUCCESS,
  USER_ADD_DEMANDE_FAIL,
  USER_ADD_DEMANDE_REQUEST,
  USER_ADD_DEMANDE_SUCCESS,
  USER_DEMANDE_FAIL,
  USER_DEMANDE_REQUEST,
  USER_DEMANDE_SUCCESS,
  USER_GET_STATS_FAIL,
  USER_GET_STATS_REQUEST,
  USER_GET_STATS_SUCCESS,
  USER_UPDATE_DEMANDE_FAIL,
  USER_UPDATE_DEMANDE_REQUEST,
  USER_UPDATE_DEMANDE_RESET,
  USER_UPDATE_DEMANDE_SUCCESS,
} from "../constants/demandeConstants";

export const getUserDemandeReducer = (state = { demandes: [] }, action) => {
  switch (action.type) {
    case USER_DEMANDE_REQUEST:
      return { loading: true, demandes: [] };
    case USER_DEMANDE_SUCCESS:
      return { loading: false, demandes: action.payload };
    case USER_DEMANDE_FAIL:
      return { loading: false, error: action.payload, demandes: [] };
    default:
      return state;
  }
};

export const userAddDemandeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_DEMANDE_REQUEST:
      return { loading: true };
    case USER_ADD_DEMANDE_SUCCESS:
      return { loading: false, demande: action.payload, success: true };
    case USER_ADD_DEMANDE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserDemandeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DEMANDE_REQUEST:
      return { loading: true };
    case USER_UPDATE_DEMANDE_SUCCESS:
      return { loading: false, demande: action.payload, success: true };
    case USER_UPDATE_DEMANDE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_DEMANDE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllDemandeReducer = (state = { demandes: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_DEMANDE_REQUEST:
      return { loading: true, demandes: [] };
    case ADMIN_LIST_DEMANDE_SUCCESS:
      return { loading: false, success: true, demandes: action.payload };
    case ADMIN_LIST_DEMANDE_FAIL:
      return { loading: false, error: action.payload, demandes: [] };
    case ADMIN_LIST_DEMANDE_RESET:
      return { demandes: [] };
    default:
      return state;
  }
};

export const accepteDemandeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ACCEPTE_DEMANDE_REQUEST:
      return { loading: true };
    case ADMIN_ACCEPTE_DEMANDE_SUCCESS:
      return { loading: false, demande: action.payload };
    case ADMIN_ACCEPTE_DEMANDE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const refuseDemandeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REFUSE_DEMANDE_REQUEST:
      return { loading: true };
    case ADMIN_REFUSE_DEMANDE_SUCCESS:
      return { loading: false, demande: action.payload };
    case ADMIN_REFUSE_DEMANDE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetDemandeStatsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_STATS_REQUEST:
      return { loading: true };
    case USER_GET_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case USER_GET_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
