const axios = require('axios');
const baseUrl = "http://localhost:5000"; //"https://celeste-restuarant.herokuapp.com";
const sandboxUrl = "https://vodapay-gateway.sandbox.vfs.africa/v2/authorizations/applyAuthCode"

// const authCodeResponse = {
//     "result": {
//         "resultStatus": "S",
//         "resultCode": "SUCCESS",
//         "resultMsg": "success"
//     },
//     "authCode": "0000000001QITWfV5IHf45MF00156050",
//     "merchantId": "216620000000388635013"
// };

const auth_calls = {
    authCodeResponse: {
        "result": {
            "resultStatus": "S",
            "resultCode": "SUCCESS",
            "resultMsg": "success"
        },
        "authCode": "0000000001QITWfV5IHf45MF00156050",
        "merchantId": "216620000000388635013"
    },
    authCodeFailureResponse: {
        "result": {
            "resultCode": "PARAM_ILLEGAL",
            "resultStatus": "F",
            "resultMessage": "Illegal parameters. For example, non-numeric input, invalid date."
        }
    },
    getStub: () => {
        const axiosGetStub = jest
            .spyOn(axios, "get")
            .mockClear()
            .mockResolvedValue({"info": "In Auth Main"});

        return axiosGetStub;
    },
    root: async () => {
        const response = await axios.get(`${baseUrl}/auth`);

        return response;
    },
    authCodeStub: () => {
        const axiosPostStub = jest
            .spyOn(axios, "post")
            .mockClear()
            .mockResolvedValue(auth_calls.authCodeResponse);

        return axiosPostStub;
    },
    authCodeFailureStub: () => {
        const axiosPostStub = jest
            .spyOn(axios, "post")
            .mockClear()
            .mockResolvedValue(auth_calls.authCodeFailureResponse);

        return axiosPostStub;
    },
    getValidAuthCode: async (headers) => {
        let data = JSON.stringify({
            "clientId": "2021062571598628737253",
            "userId": "216610000000495657455",
            "scopes": "auth_user"
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

        return response;
    },
    getUserDetails: (authCode, headers) => {
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

        return axios(config);
    }
};

module.exports = auth_calls