import axios from 'axios';
import {jest} from '@jest/globals';

import { getResponseObject } from '../../routes/auth/auth_refactored';

/**
SUCCESS : 200
UNKNOWN_EXCEPTION: 500
USED_CODE: 401
EXPIRED_CODE: 401
REFERENCE_CLIENT_ID_NOT_MATCH: 400
PARAM_ILLEGAL: 400
default: 404
 */

const valid_headers = {
    "client-id": "2021062571598628737253",
    "request-time": "2021-12-27T17:49:26.913+08:00",
    "signature": "algorithm=RSA256, keyVersion=1, signature=testing_signature" 
};
const invalid_headers = {
    "request-time": "2021-12-27T17:49:26.913+08:00",
    "signature": "algorithm=RSA256, keyVersion=1, signature=testing_signature" 
};
const reply_Success = {
    first: {
        "data": {
            "result": {
                "resultCode": 'SUCCESS',
                "resultStatus": 'S',
                "resultMessage": 'success'
            },
            "accessToken": '0000000002202110113YtsZ7XRWs45tC00037036',
            "accessTokenExpiryTime": '2031-10-09T16:27:39+02:00',
            "refreshToken": '000000000320211011VB4yvgMjG445cq00039941',
            "refreshTokenExpiryTime": '2031-10-09T16:27:39+02:00',
            "customerId": '216610000000495657455'
        }
    },
    second: {
        "data": {
            "userInfo": {
                nickName: 'David',
                userName: {
                    firstName: 'defaultFirstname',
                    lastName: 'defaultSurname',
                    fullName: 'defaultFirstname defaultSurname'
                },
                birthDate: '1998-07-03',
                userId: '216610000000495657455',
                nationality: 'South Africa',
                contactInfos: [
                    {
                        contactType: 'EMAIL',
                        contactNo: 'davidwalter.burt3@vcontractor.co.za'
                    },
                    { contactType: 'MOBILE_PHONE', contactNo: '27-609000084' }
                ],
                loginIdInfos: [
                    {
                        loginIdType: 'MOBILE_PHONE',
                        hashLoginId: '401f2fc83d45b7bbaacae113f1e151c107801e03896257956cfea164e7b314d2',
                        loginId: '27-609000084',
                        maskLoginId: '27-6****0084'
                    }
                ]
            }
        }
    }
};
const reply_Unknown = {
    first: {
        "data": {
            "result": {
                "resultCode": "UNKNOWN_EXCEPTION",
                "resultStatus": "F",
                "resultMessage": "An Unknown exception has occurred."
            }
        }
    },
    second: {}
};
const reply_Used = {
    "first": {
        "data": {
            "result": {
                "resultCode": "USED_CODE",
                "resultStatus": "F",
                "resultMessage": "The authorization code has been used."
            }
        }
    },
    second: {}
};
const reply_Expired = {
    first: {
        "data": {
            "result": {
                "resultCode": "EXPIRED_CODE",
                "resultStatus": "F",
                "resultMessage": "The authorization code has expired."
            }
        }
    },
    second: {},
};
const reply_IdNoMatch = {
    first: {
        "data": {
            "result": {
                "resultCode": "REFERENCE_CLIENT_ID_NOT_MATCH",
                "resultStatus": "F",
                "resultMessage": "The reference client ID did not match the authorization code."
            }
        }
    },
    second: {},
}
const reply_Param = {
    first: {
        "data": {
            "result": {
                "resultStatus": "F",
                "resultCode": "PARAM_ILLEGAL",
                "resultMsg": "AE11112060005167@Invalid scopes"
            }
        }
    },
    second: {}
};
const reply_error = {
    first: {
        "data": {
            "result": { "resultCode": "ERROR" }
        }
    },
    second: {},
};

const genericStub = function(type) {
    let resultType = {};

    switch (type) {
        case 'SUCCESS':
            resultType = reply_Success;
            break;
        case 'UNKNOWN_EXCEPTION':
            resultType = reply_Unknown;
            break;
        case 'USED_CODE':
            resultType = reply_Used;
            break;
        case 'EXPIRED_CODE':
            resultType = reply_Expired;
            break;
        case 'REFERENCE_CLIENT_ID_NOT_MATCH':
            resultType = reply_IdNoMatch;
            break;
        case 'PARAM_ILLEGAL':
            resultType = reply_Param;
            break;
        default:
            resultType = reply_error;
            break;
    }

    const stub = jest
        .spyOn(axios, 'post')
        .mockClear()
        .mockResolvedValueOnce(resultType.first)
        .mockResolvedValueOnce(resultType.second);

    return stub;
}

jest.setTimeout(1000 * 90); // 90 seconds

describe("Auth Refactored Tests", () => {
    afterEach(jest.clearAllMocks);
    it ('Refactored: Should return status code 200 given "SUCCESS"', async () => {
        const stub = genericStub('SUCCESS');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(200);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 500 given "UNKNOWN_EXCEPTION"', async () => {
        const stub = genericStub('UNKNOWN_EXCEPTION');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(500);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 401 given "USED_CODE"', async () => {
        const stub = genericStub('USED_CODE');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 401 given "EXPIRED_CODE"', async () => {
        const stub = genericStub('EXPIRED_CODE');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 400 given "REFERENCE_CLIENT_ID_NOT_MATCH"', async () => {
        const stub = genericStub('REFERENCE_CLIENT_ID_NOT_MATCH');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 400 given "PARAM_ILLEGAL"', async () => {
        const stub = genericStub('PARAM_ILLEGAL');
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it ('Refactored: Should return status code 404 given unknown paramter', async () => {
        const stub = genericStub('ERROR');  // Any string that isn't one of the above valid codes
        const { result } = await getResponseObject('authCode', valid_headers);

        expect(result.httpCode).toEqual(404);
        expect(stub).toHaveBeenCalledTimes(2);
    });

    it ('Refactored: Should return undefined authcode', async () => {
        const response = await getResponseObject();

        expect(response).toEqual({"error": "authCode undefined"});
    });
    it ('Refactored: Should return undefined headers', async () => {
        const response = await getResponseObject('authCode');

        expect(response).toEqual({"error": "Headers undefined"});
    });
    it ('Refactored: Should return undefined headers [2]', async () => {
        const response = await getResponseObject('authCode', invalid_headers);

        expect(response).toEqual({"error": "Headers undefined"});
    });
});