// const axios = require('axios');
import axios from 'axios';
const baseUrl = "http://localhost:5000"; //"https://celeste-restuarant.herokuapp.com";
const sandboxUrl = "https://vodapay-gateway.sandbox.vfs.africa/v2/authorizations/applyToken";

import {jest} from '@jest/globals';

export const auth_calls = {
    userDetailsResponse: {
        "result": {
            "resultCode": "SUCCESS",
            "resultMessage": "Success",
            "resultStatus": "S"
        },
        "userInfo": {
            "nickName": "David",
            "userName": {
                "firstName": "defaultFirstname",
                "lastName": "defaultSurname",
                "fullName": "defaultFirstname defaultSurname"
            },
            "birthDate": "1998-07-03",
            "nationality": "South Africa",
            "contactInfos": [
                {
                    "contactType": "EMAIL",
                    "contactNo": "davidwalter.burt3@vcontractor.co.za"
                },
                {
                    "contactType": "MOBILE_PHONE",
                    "contactNo": "27-609000084"
                }
            ]
        }
    },
    authResponseSuccess: {
        "result": {
            "resultStatus": "S",
            "resultCode": "SUCCESS",
            "resultMsg": "success"
        },
        "authCode": "0000000001QITWfV5IHf45MF00156050",
        "merchantId": "216620000000388635013"
    },
    authResponseException: {
        "result": {
            "resultCode": "UNKNOWN_EXCEPTION",
            "resultStatus": "F",
            "resultMessage": "An Unknown exception has occurred."
        }
    },
    authResponseUsed: {
        "result": {
            "resultCode": "USED_CODE",
            "resultStatus": "F",
            "resultMessage": "The authorization code has been used."
        }
    },
    authResponseExpired: {
        "result": {
            "resultCode": "EXPIRED_CODE",
            "resultStatus": "F",
            "resultMessage": "The authorization code has expired."
        }
    },
    authResponseIdNoMatch: {
        "result": {
            "resultCode": "REFERENCE_CLIENT_ID_NOT_MATCH",
            "resultStatus": "F",
            "resultMessage": "The reference client ID did not match the authorization code."
        }
    },
    authResponseParam: {
        "result": {
            "resultCode": "PARAM_ILLEGAL",
            "resultStatus": "F",
            "resultMessage": "Illegal parameters. For example, non-numeric input, invalid date."
        }
    },
    successPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseSuccess);

        return stub;
    },
    exceptionPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseException);

        return stub;
    },
    usedPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseUsed);

        return stub;
    },
    expiredPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseExpired);

        return stub;
    },
    idNoMatchPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseIdNoMatch);

        return stub;
    },
    paramPostStub: () => {
        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(auth_calls.authResponseParam);

        return stub;
    },
    postStub: (type) => {
        let resolveValue;

        switch(type) {
            case 'SUCCESS':
                resolveValue = auth_calls.authResponseSuccess;
                break;
            case 'UNKNOWN_EXCEPTION':
                resolveValue = auth_calls.authResponseException;
                break;
            case 'USED_CODE':
                resolveValue = auth_calls.authResponseUsed;
                break;
            case 'EXPIRED_CODE':
                resolveValue = auth_calls.authResponseExpired;
                break;
            case 'REFERENCE_CLIENT_ID_NOT_MATCH':
                resolveValue = auth_calls.authResponseIdNoMatch;
                break;
            case 'PARAM_ILLEGAL':
                resolveValue = auth_calls.authResponseParam;
                break;
            default:
                resolveValue = { result: { resultCode: "ERROR" } };
                break;
        }

        const stub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(resolveValue);

        return stub;
    },
    getAccessToken: async (headers) => {
        let data = JSON.stringify({
            "grantType": "AUTHORIZATION_CODE",
            "authCode": "0000000001ugCgPH2MTK45j400157451"
          });
        let config = {
            method: 'post',
            url: sandboxUrl,
            headers: { 
              ...headers,
              'Content-Type': 'application/json'
            },
            data : data
        };

        const response = await axios.post(config.url, data, config);
        const code = response.result.resultCode;
        let retVal = auth_calls.getHttpResponseCode(code);

        return retVal;
    },
    getHttpResponseCode: (code) => {
        let retVal;

        switch(code) {
            case 'SUCCESS':
            case 'ACCEPT':
                retVal = 200;
                break;
            case 'UNKNOWN_EXCEPTION':
                retVal = 500;
                break;
            case 'USED_CODE':
            case 'EXPIRED_CODE':
                retVal = 401;
                break;
            case 'REFERENCE_CLIENT_ID_NOT_MATCH':
            case 'PARAM_ILLEGAL':
                retVal = 400;
                break;
            default:
                retVal = 404;
                break;
        }

        return retVal;
    },
    getUserDetails: async (authCode, headers) => {
        let data = JSON.stringify({
            "authCode": authCode
        });
        let config = {
            method: 'POST',
            url: `${baseUrl}/auth`,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        const response = await axios.post(config.url, data, config);
        let retVal = auth_calls.getHttpResponseCode(response.result.resultCode);

        return retVal;
    }
};

// module.exports = auth_calls