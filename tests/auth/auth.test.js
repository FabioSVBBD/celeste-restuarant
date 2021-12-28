const auth_calls = require('./auth');

const valid_headers = {
    "client-id": "2021062571598628737253",
    "request-time": "2021-12-27T17:49:26.913+08:00",
    "signature": "algorithm=RSA256, keyVersion=1, signature=testing_signature" 
};

jest.setTimeout(1000 * 90); // 90 seconds

describe("Auth Tests", () => {
    it('Should return an info message', async () => {
        const axiosGetStub = auth_calls.getStub();
        const response = await auth_calls.root();
    
        expect(response).toEqual({"info": "In Auth Main"});
        expect(axiosGetStub).toBeCalled();
    });

    it('Should get an auth code', async () => {
        const axiosPostStub = auth_calls.authCodeStub();
        const response = await auth_calls.getValidAuthCode(valid_headers);

        expect(response).toEqual(auth_calls.authCodeResponse);
        expect(axiosPostStub).toBeCalled();
    });

    it('Should return error object after attempting getting auth code', async () => {
        const axiosPostStub = auth_calls.authCodeFailureStub();
        const response = await auth_calls.getValidAuthCode(valid_headers);

        expect(response).toEqual(auth_calls.authCodeFailureResponse);
        expect(axiosPostStub).toBeCalled();
    });
});



// test('Fetch User Details [no auth code]', async () => {
//     expect.assertions(1);

//     // No AuthCode 
//     const { data } = await auth_calls.getUserDetails();
//     expect(data).toEqual({"error": "authCode undefined"});
// });

// test('Fetch User Details [invalid auth code]', async () => {
//     expect.assertions(1);

//     // Bad AuthCode
//     let authCode = "abc";
//     let headers = valid_headers;
//     const { data } = await auth_calls.getUserDetails(authCode, headers);
//     expect(data).toEqual("");
// });

// test('Fetch User Details [no headers]', async () => {
//     // No Headers (authCode can be good/bad, as long as it's not undefined for this test)
//     const authCode = "abc";
//     const { data } = await auth_calls.getUserDetails(authCode);

//     expect(data).toEqual({"error": "Headers undefined"});
// });

// test('Fetch User Details [invalid headers]', async () => {
//     expect.assertions(2);

//     // Bad headers
//     // This means Good authCode.. so that call needs to happen here
//     const { authCode } = (await auth_calls.getValidAuthCode(valid_headers)).data;
//     // const { data } = await auth_calls.getUserDetails(authCode, invalid_headers_1);
//     const data1 = (await auth_calls.getUserDetails(authCode, invalid_headers_1)).data;
//     const data2 = (await auth_calls.getUserDetails(authCode, invalid_headers_2)).data;

//     expect(data1).toEqual("");
//     expect(data2).toEqual({"error": "Headers undefined"});
// });

// test('Fetch User Details [valid]', async () => {
//     expect.assertions(2);

//     const { authCode } = (await auth_calls.getValidAuthCode(valid_headers)).data;
//     const { data } = await auth_calls.getUserDetails(authCode, valid_headers);

//     expect(data['nickName']).toEqual("David");
//     expect(data['userId']).toEqual("216610000000495657455");
// });
