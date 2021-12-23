import express from "express";
import axios from "axios";

import { extractHeaders } from "../../modules/helpers.js";

const app = express.Router();
const baseUrl = "https://vodapay-gateway.sandbox.vfs.africa";

app.get('/', (req, res) => res.send("In Auth Main"));

app.post('/', (req, res) => {
    let { authCode } = req.body;

    let headers = req.headers;
    headers = extractHeaders(headers);

    const reply = applyAuth(headers, authCode);

    (async () => {
        res.send(await reply);
    })();
});

async function applyAuth(headers, authCode) {
    var data = JSON.stringify({
        "grantType": "AUTHORIZATION_CODE",
        "authCode": authCode,
    });
      
    var config = {
        method: 'post',
        url: `${baseUrl}/v2/authorizations/applyToken`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        data : data
    };
      
    const response = await axios(config)
        .catch(function (error) {
        console.log(error);
    });

    return applyAccess(headers, response.data['accessToken']);
}

async function applyAccess(headers, accessToken) {
    var data = JSON.stringify({
        "authClientId": "2021061800599314688309",
        "accessToken": accessToken
    });
      
    var config = {
        method: 'post',
        url: `${baseUrl}/v2/customers/user/inquiryUserInfo`,
        headers: { 
            ...headers,
            'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios(config)
    .catch(function (error) {
        console.log(error);
    });

    return response.data['userInfo'];
}

export default app;