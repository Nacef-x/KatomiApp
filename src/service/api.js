const BASE_URL = "http://192.168.43.147:3000";

export const api = async (url, method, body = null, headers = {}) => {
  try {
    const endPoint = BASE_URL.concat(url);
    const reqBody = body ? JSON.stringify(body) : null;

    const fetchParams = { method, headers };

    if (method === "POST" && !reqBody) {
      throw new Error("Request body required");
    }

    if (reqBody) {
      fetchParams.headers["Content-Type"] = "application/json";
      fetchParams.body = reqBody;
    }

    let response = await fetch(endPoint, fetchParams);

    return response;
  } catch (e) {
    return e;
  }
};

export const fetchApi = async (
  url,
  method,
  body,
  statusCode,
  token = null,
  loader = false
) => {
  try {
    const headers = {};
    const result = {
      token: null,
      success: false,
      responseBody: null,
    };
    if (token) {
      //headers["x-auth"] = token;
      headers["Authorization"] = token;
    }

    const response = await api(url, method, body, headers);

    if (response.status === statusCode) {
      result.success = true;

      if (response.headers.get("x-auth")) {
        result.token = response.headers.get("x-auth");
      }

      let responseBody;
      const responseText = await response.text();

      try {
        responseBody = JSON.parse(responseText);
      } catch (e) {
        responseBody = responseText;
      }

      result.responseBody = responseBody;
      return result;
    }

    let errorBody;
    const errorText = await response.text();

    try {
      errorBody = JSON.parse(errorText);
    } catch (e) {
      errorBody = errorText;
    }

    result.responseBody = errorBody;

    return result;
  } catch (error) {
    return error;
  }
};
