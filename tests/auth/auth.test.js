import {auth_calls} from './auth';
import {jest} from '@jest/globals';

const valid_headers = {
    "client-id": "2021062571598628737253",
    "request-time": "2021-12-27T17:49:26.913+08:00",
    "signature": "algorithm=RSA256, keyVersion=1, signature=testing_signature" 
};

jest.setTimeout(1000 * 90); // 90 seconds

describe("Auth Tests", () => {
    afterEach(jest.clearAllMocks);
    it ('Should return status code 200 given "SUCCESS"', async () => {
        const stub = auth_calls.successPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(200);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 500 given "UNKNOWN EXCEPTION"', async () => {
        const stub = auth_calls.exceptionPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(500);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 401 given "USED_CODE"', async () => {
        const stub = auth_calls.usedPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 401 given "EXPIRED_CODE"', async () => {
        const stub = auth_calls.expiredPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 400 given "REFERENCE_CLIENT_ID_NOT_MATCH"', async () => {
        const stub = auth_calls.idNoMatchPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 400 given "PARAM_ILLEGAL"', async () => {
        const stub = auth_calls.paramPostStub();
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 404 given unknown parameter', async () => {
        const stub = auth_calls.postStub('ERROR');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(404);
        expect(stub).toHaveBeenCalledTimes(1);
    });

    it ('Should return status code 200 from User Details Fetch with "SUCCESS"', async () => {
        const stub = auth_calls.postStub('SUCCESS');
        const response = await auth_calls.getUserDetails('authCode', valid_headers);

        expect(response).toEqual(200);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 400 from User Details Fetch with "PARAM_ILLEGAL', async () => {
        const stub = auth_calls.postStub('PARAM_ILLEGAL');
        const response = await auth_calls.getUserDetails('authCode', valid_headers);

        expect(response).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(1);
    });
});

describe('Refactored Auth Tests using generic Stub', () => {
    afterEach(jest.clearAllMocks);
    it ('Should return status code 200 given "SUCCESS"', async () => {
        const stub = auth_calls.postStub('SUCCESS');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(200);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 500 given "UNKNOWN_EXCEPTION"', async () => {
        const stub = auth_calls.postStub('UNKNOWN_EXCEPTION');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(500);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 401 given "USED_CODE"', async () => {
        const stub = auth_calls.postStub('USED_CODE');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 401 given "EXPIRED_CODE"', async () => {
        const stub = auth_calls.postStub('EXPIRED_CODE');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(401);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 400 given "REFERENCE_CLIENT_ID_NOT_MATCH"', async () => {
        const stub = auth_calls.postStub('REFERENCE_CLIENT_ID_NOT_MATCH');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(1);
    });
    it ('Should return status code 400 given "PARAM_ILLEGAL"', async () => {
        const stub = auth_calls.postStub('PARAM_ILLEGAL');
        const response = await auth_calls.getAccessToken(valid_headers);

        expect(response).toEqual(400);
        expect(stub).toHaveBeenCalledTimes(1);
    });
});