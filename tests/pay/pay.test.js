const pay_calls = require('./pay');

const order = {
    "id": "pizza_m12",
    "value": "110",
    "name": "margheritapizza",
    "description": "Margherita Pizza - Large"
};

const valid_headers = {
    "client-id": "2021062571598628737253",
    "request-time": "2021-12-27T17:49:26.913+08:00",
    "signature": "algorithm=RSA256, keyVersion=1, signature=testing_signature" 
}

describe('Tests for Payments', () => {
    it('Should get payment url if input is valid', async () => {
        const axiosPostStub = pay_calls.createAxiosPostStub();
        const response = await pay_calls.getPaymentUrl(order, valid_headers);

        expect(response).toEqual(pay_calls.paymentResponse);
        expect(axiosPostStub).toBeCalled();
    });

    it ('Should return error after attempting to get payment url', async () => {
        const axiosPostStub = pay_calls.createAxiosPostFailureStub();
        const response = await pay_calls.getPaymentUrl(order, valid_headers);

        expect(response).toEqual(pay_calls.paymentFailureResponse);
        expect(axiosPostStub).toBeCalled();
    });
});

// Not really sure how mock functions test anything

// test('Get Payment URL [invalid order]', async () => {
//     expect.assertions(3);
    
//     // invalid order types: missing prop, order undefined, prop undefined
//     // therefore (3 assertions)
//     // Headers should not be checked so do not worry about them here

//     let bad_order_1 = undefined;
//     let bad_order_2 = {
//         "id": "pizza_m12",
//         "value": "110",
//         "name": "margheritapizza"
//     };
//     let bad_order_3 = {
//         "id": "pizza_m12",
//         "value": "110",
//         "name": "margheritapizza",
//         "description": undefined
//     };

//     const data1 = (await pay_calls.getPaymentUrl(bad_order_1)).data;
//     const data2 = (await pay_calls.getPaymentUrl(bad_order_2)).data;
//     const data3 = (await pay_calls.getPaymentUrl(bad_order_3)).data;

//     expect(data1).toEqual({"error": "order undefined"});
//     expect(data2).toEqual({"error": "order missing properties"});
//     expect(data3).toEqual({"error": `order[${0}] undefined`});
// });

// test('Get Payment URL [no headers]', async () => {
//     expect.assertions(1);
// });

// test('Get Payment URL [invalid headers]', async () => {
//     expect.assertions(2);
// });