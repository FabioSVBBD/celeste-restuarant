import express from "express";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => res.send("Unimplemented Endpoint - pay"));
router.get('/test', (req, res) => {
    let expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 1);
    let expTime = dateToString(expDate);
    console.log(expTime);
    res.send("Test Data");
})

router.post('/', (req, res) => {
    console.log("Post Request Hit");
    let { order } = req.body;
    let headers = req.headers;
    headers = extractHeaders(headers);

    const response = getPaymentId(order, headers);

    (async () => {
        res.send(await response);
    })();
});

function dateToString(date) {
    let retVal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
                ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes() + ":" + date.getSeconds() + "+08:00" ;
  
    return retVal;
}

async function getPaymentId(order, headers) {
    let expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 1);
    let expTime = dateToString(expDate);

    let data = JSON.stringify({
        "productCode": "CASHIER_PAYMENT",
        "salesCode": "51051000101000000011",
        "paymentRequestId": uuidv4(),
        "paymentNotifyUrl": "https://celeste-restuarant.herokuapp.com/pay/paymentNotify",
        "paymentRedirectUrl": "https://celeste-restuarant.herokuapp.com/pay/paymentRedirect",
        "paymentExpiryTime": expTime,
        "paymentAmount": {
            "currency": "ZAR",
            "value": order.value
        },
        "order": {
            "goods": {
            "referenceGoodsId": order.id,
            "goodsUnitAmount": {
                "currency": "ZAR",
                "value": order.value
            },
            "goodsName": order.name
            },
            "env": {
            "terminalType": "MINI_APP"
            },
            "orderDescription": order.description,
            "buyer": {
            "referenceBuyerId": "216610000000259832353"
            }
        }
    });
      
    var config = {
        method: 'post',
        url: 'https://vodapay-gateway.sandbox.vfs.africa/v2/payments/pay',
        headers: { 
            'client-id': '2021061800599314688309', 
            'request-time': '2021-12-23T09:53:39+08:00', 
            'signature': 'algorithm=RSA256, keyVersion=1, signature=testing_signature', 
            'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios(config)
    .catch(function (error) { console.log(error) } );

    console.log("Response Result: ", response.data['result']['resultCode']);

    return response.data;
}

function extractHeaders(headers) {
    let c = headers['client-id'];
    let r = headers['request-time'];
    let s = headers['signature'];
    let retVal = {
        'client-id': c,
        'request-time': r,
        'signature': s,
    };

    return retVal;
}

router.post('/paymentNotify', (req, res) => {
    const response = req.body;
    //
    console.log("Payment Notification Received");
    console.log(response);
    res.send(response);
});

router.post('/paymentRedirect', (req, res) => {
    const response = req.body;
    //
    console.log("Payment Redirect Hit");
    console.log(response);
    res.send(req.body);
});

export default router;

// Should receive order object { containing data such as productCode, salesCode etc.}
// Should post order object to https://vodapay-gateway.sandbox.vfs.africa/v2/payments/pay
// Receive back result and paymentId
// res.send payment/order detail