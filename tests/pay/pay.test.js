import {pay_calls} from './pay';

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