import express from "express";
import axios from "axios";

import { extractHeaders } from "../../modules/helpers.js";

const app = express.Router();
const baseUrl = "https://vodapay-gateway.sandbox.vfs.africa";

app.get("/", (req, res) => res.send({ info: "In Auth Main" }));

app.post("/", (req, res) => {
  let { authCode } = req.body;
  let headers = req.headers;

  (async () => {
    const retVal = await getResponseObject(authCode, headers);
    res.send(retVal);
  })();
});

function checkQueryData(authCode, headers) {
  if (authCode === undefined) return { error: "authCode undefined" };

  if (headers === undefined) {
    return { error: "Headers undefined" };
  }

  headers = extractHeaders(headers);
  for (const key in headers) {
    if (headers[key] === undefined) {
      return { error: "Headers undefined" };
    }
  }
}

export async function getResponseObject(authCode, headers) {
  const checks = checkQueryData(authCode, headers);
  if (checks !== undefined) {
    return checks;
  }

  headers = extractHeaders(headers);
  const response = await getAccessToken(headers, authCode);
  const userInfo = await getUserInfo(headers, response.accessToken);

  if (response.result.httpCode === 200) {
    return {
      result: response.result,
      userInfo: userInfo,
    };
  } else {
    return { result: response.result };
  }
}

async function getAccessToken(headers, authCode) {
  var data = JSON.stringify({
    grantType: "AUTHORIZATION_CODE",
    authCode: authCode,
  });

  var config = {
    method: "post",
    url: `${baseUrl}/v2/authorizations/applyToken`,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    // const response = (await axios.post(config.url, data, config)).data;
    const reply = await axios.post(config.url, data, config);
    const response = await reply.data;

    const { resultCode } = response.result;
    let httpCode = getHttpResponseCode(resultCode);
    let retVal = {};

    if (httpCode === 200) {
      const { accessToken } = response;

      retVal = {
        result: {
          httpCode: httpCode,
        },
        accessToken: accessToken,
      };
    } else {
      retVal = {
        result: {
          httpCode: httpCode,
        },
      };
    }

    return retVal;
  } catch (error) {
    console.log(error);
  }
}

async function getUserInfo(headers, accessToken) {
  var body = JSON.stringify({
    authClientId: "2021061800599314688309",
    accessToken: accessToken,
  });

  var config = {
    method: "post",
    url: `${baseUrl}/v2/customers/user/inquiryUserInfo`,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: body,
  };

  try {
    const { data } = await axios.post(config.url, body, config);

    if (data === undefined) return data;

    const { userInfo } = data;
    return userInfo;
  } catch (error) {
    console.log(error);
  }
}

function getHttpResponseCode(code) {
  let retVal;

  switch (code) {
    case "SUCCESS":
    case "ACCEPT":
      retVal = 200;
      break;
    case "UNKNOWN_EXCEPTION":
      retVal = 500;
      break;
    case "USED_CODE":
    case "EXPIRED_CODE":
      retVal = 401;
      break;
    case "REFERENCE_CLIENT_ID_NOT_MATCH":
    case "PARAM_ILLEGAL":
      retVal = 400;
      break;
    default:
      retVal = 404;
      break;
  }

  return retVal;
}

export default app;
