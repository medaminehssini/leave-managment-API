import axios from "axios";
import {
  ADMIN_ACCEPTE_DEMANDE_FAIL,
  ADMIN_ACCEPTE_DEMANDE_REQUEST,
  ADMIN_ACCEPTE_DEMANDE_SUCCESS,
  ADMIN_LIST_DEMANDE_FAIL,
  ADMIN_LIST_DEMANDE_REQUEST,
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
  USER_UPDATE_DEMANDE_SUCCESS,
} from "../constants/demandeConstants";
import { ADMIN_DEMANDE_API, USER_DEMANDE_API } from "../utils/apiConfig";

export const getUserDemande = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DEMANDE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(USER_DEMANDE_API, config);

    dispatch({
      type: USER_DEMANDE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DEMANDE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const userAddDemande = (demande) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADD_DEMANDE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(USER_DEMANDE_API, demande, config);

    dispatch(getUserDemande());

    dispatch({
      type: USER_ADD_DEMANDE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_DEMANDE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const updateUserDemande =
  (demande, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_DEMANDE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          enctype: "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        USER_DEMANDE_API + "/" + id,
        demande,
        config
      );

      dispatch({
        type: USER_UPDATE_DEMANDE_SUCCESS,
        payload: data,
      });

      dispatch(getUserDemande());
    } catch (error) {
      dispatch({
        type: USER_UPDATE_DEMANDE_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const getAllDemande = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_DEMANDE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(ADMIN_DEMANDE_API, config);

    dispatch({
      type: ADMIN_LIST_DEMANDE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_DEMANDE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const accepteDemande = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ACCEPTE_DEMANDE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(ADMIN_DEMANDE_API + "/" + id, {}, config);

    dispatch({
      type: ADMIN_ACCEPTE_DEMANDE_SUCCESS,
      payload: data,
    });
    dispatch(getAllDemande());
  } catch (error) {
    dispatch({
      type: ADMIN_ACCEPTE_DEMANDE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const refuseDemande = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REFUSE_DEMANDE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(ADMIN_DEMANDE_API + "/" + id, {}, config);

    dispatch({
      type: ADMIN_REFUSE_DEMANDE_SUCCESS,
      payload: data,
    });
    dispatch(getAllDemande());
  } catch (error) {
    dispatch({
      type: ADMIN_REFUSE_DEMANDE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const getDemandeStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_STATS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(USER_DEMANDE_API + "/stats", config);

    dispatch({
      type: USER_GET_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_STATS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
