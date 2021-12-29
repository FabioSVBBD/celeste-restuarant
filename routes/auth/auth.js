import express from "express";
import axios from "axios";

import { extractHeaders } from "../../modules/helpers.js";

const app = express.Router();
const baseUrl = "https://vodapay-gateway.sandbox.vfs.africa";

app.get('/', (req, res) => res.send({"info": "In Auth Main"}));

app.post('/', (req, res) => {
    let { authCode } = req.body;
    if (authCode === undefined) {
        res.send({"error": "authCode undefined"});
        return;
    }

    let headers = extractHeaders(req.headers);
    for (const key in headers) {
        if (headers[key] === undefined) {
            res.send({"error":"Headers undefined"});
            return;
        }
    }

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

    console.log("headers", headers);

    try {
        const response = await axios(config);
        return applyAccess(headers, response.data['accessToken']);
    } catch (error) {
        console.log(error);
    }
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

    try {
        const response = await axios(config);
        return response.data['userInfo'];
    } catch (error) {
        console.log(error);
    }
}

export default app;