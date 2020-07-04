import { fetchApi } from "../service/api";

export const sendEvents = (payload) => {
  return async (dispatch, getState) => {
    const state = getState();

    const {
      userReducer: {
        getUser: {
          isSuccess,
          userDetails: { token },
        },
      },
    } = state;
    if (!isSuccess) console.log("NOT LOGGED IN !!!");

    try {
      dispatch({
        type: "SEND_EVENTS_LOADING",
      });

      console.log("SENDING DATA TO API", payload.sensors);

      payload.sensors.forEach(async (sensor) => {
        if (!sensor._id) return;

        let url = `/events/`;
        let data = {
          sensorId: sensor._id,
          mesure: sensor.value,
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
