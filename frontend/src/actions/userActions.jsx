import axios from "axios";
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

import {
  CHANGE_PASSWORD_API,
  EDIT_PROFIL_ADMIN_API,
  EDIT_PROFIL_API,
  GET_ALL_USERS_API,
  LOGIN_API,
  REGISTER_API,
  USER_DELETE_API,
} from "../utils/apiConfig";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(LOGIN_API, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const userRegister =
  (name, email, password, gender, isAdmin, workingWeek) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        REGISTER_API,
        { name, email, password, gender, isAdmin, workingWeek },
        config
      );

      dispatch(getAllUsers());

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(USER_DELETE_API + "/" + id, config);
    dispatch(getAllUsers());

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const updateUserProfile =
  (user, id = 0, type = "user") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          enctype: "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      var data1 = {};
      if (type === "admin") {
        const { data } = await axios.put(
          EDIT_PROFIL_ADMIN_API + "/" + id,
          user,
          config
        );
        data1 = data;
      } else {
        const { data } = await axios.put(EDIT_PROFIL_API, user, config);
        data1 = data;
      }

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data1,
      });
      if (type === "admin") {
        dispatch(getAllUsers());
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data1,
        });
        localStorage.setItem("userInfo", JSON.stringify(data1));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const updateUserPassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        CHANGE_PASSWORD_API,
        {
          "current-password": oldPassword,
          "new-password": newPassword,
          "new-password_confirmation": newPassword,
        },
        config
      );

      dispatch({
        type: USER_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGOUT,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(GET_ALL_USERS_API, config);

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
