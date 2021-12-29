import axios from 'axios';
import {jest} from '@jest/globals';

const baseUrl = "https://celeste-restuarant.herokuapp.com"; // http://localhost:5000

export const pay_calls = {
    paymentResponse: {
        "result": {
            "resultStatus": "A",
            "resultCode": "ACCEPT", 
            "resultMessage": "ACCEPT."
        },
        "paymentId": "20211223111212800100166350400448602",
        "redirectActionForm": {
            "redirectUrl": "https://vodapay-m.sandbox.vfs.africa/m/portal/cashier/checkout?bizNo=20211223111212800100166350400448602&timestamp=1640699319538&mid=216620000000379230883&sign=CFOTH7z5LrODrGFeESdiqjoapBb8VtkMHDF0hy8nKZ%2FrqPulBjBgyX21MvJZDcOsALbHk2jgKxY%2FBl6PdTubu2ueCFEnIeSh6F5r8D7lHawXKmaRGM0ivHNLb6ntjCskGN415UF3yBhm9QOy8JVl8jFs2nA4K3GtD3W32kOx56wSx68MUbm9n88lviRn%2FXbsWrtMi74sakDNCARXNs6bQ9GLlxIn4zKXCXhfZ3x5T40pZ7g0SBHKthgzF6kqeCG0lcLTYKIipHYNB%2B8uCRPBaemQop9Uo3VIgAm2RF6RIjWIDH9ELm5vsyfpfhqKAHj5SCORuRat2g7jpw8GjTEWnQ%3D%3D"
        }
    },
    paymentFailureResponse: {
        "result": {
            "resultStatus": "F",
            "resultCode": "PARAM_ILLEGAL",
            "resultMessage": "paymentAmount must not be null"
        }
    },
    createAxiosPostStub: () => {
        const axiosPostStub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(pay_calls.paymentResponse);

        return axiosPostStub;
    },
    createAxiosPostFailureStub: () => {
        const axiosPostStub = jest
            .spyOn(axios, 'post')
            .mockClear()
            .mockResolvedValue(pay_calls.paymentFailureResponse);

        return axiosPostStub;
    },
    getPaymentUrl: async (order, headers) => {
        let data = JSON.stringify({ "order": order });

        let config = {
            method: 'post',
            url: `${baseUrl}/pay`,
            headers: { 
                ...headers,
                'Content-Type': 'application/json'
            },
            data : data
        };

        const response = await axios.post(config.url, data, config);
        return response;
    }
};
