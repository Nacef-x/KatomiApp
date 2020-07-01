import { fetchApi } from "../service/api";

export const sendEvents = (payload) => {
  console.log("sending events", payload);
  return async (dispatch, getState) => {
    const state = getState();
    console.log("state", state);

    const {
      userReducer: {
        getUser: {
          isSuccess,
          userDetails: { token },
        },
      },
    } = state;
    if (!isSuccess) console.log("NOT LOGGED IN !!!");
    console.log("token from store", token);

    try {
      dispatch({
        type: "SEND_EVENTS_LOADING",
      });

      payload.sensors.forEach(async (sensor) => {
        if (!sensor._id) return;
        console.log("fetching", sensor.name);

        let url = `/events/`;
        let data = {
          sensorId: sensor._id,
          mesure: sensor.value + 15,
          time: payload.time,
        };
        const response = await fetchApi(url, "POST", data, 201, token);

        console.log("response", response);

        if (response.success) {
          dispatch({
            type: "SEND_EVENT_SUCCESS",
          });
        }
      });
    } catch (error) {
      dispatch({
        type: "SEND_EVENTS_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const createNewUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_USER_LOADING",
      });
      const response = await fetchApi("/user/signup", "POST", payload, 200);

      if (response.success) {
        dispatch({
          type: "CREAT_USER_SUCCESS",
        });
        dispatch({
          type: "AUTH_USER_SUCCESS",
          token: response.token,
        });
        dispatch({
          type: "GET_USER_SUCCESS",
          payload: response.responseBody,
        });

        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "CREAT_USER_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOGIN_USER_LOADING",
      });
      const response = await fetchApi("/user/login", "POST", payload, 200);

      if (response.success) {
        dispatch({
          type: "LOGIN_USER_SUCCESS",
        });
        dispatch({
          type: "AUTH_USER_SUCCESS",
          token: response.token,
        });
        dispatch({
          type: "GET_USER_SUCCESS",
          payload: response.responseBody,
        });
        return response;
      } else {
        //throw response;

        dispatch({
          type: "LOGIN_USER_FAIL",
          payload: response.responseBody,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_USER_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authData: { token },
        },
      } = state;
      console.log("token", token);
      /*const response = await fetchApi(
        "/user/logout",
        "DELETE",
        null,
        200,
        token
      );
      console.log("response", response);*/
      dispatch({
        type: "USER_LOGGED_OUT_SUCCESS",
      });
    } catch (e) {
      console.log(e);
    }
  };
};
