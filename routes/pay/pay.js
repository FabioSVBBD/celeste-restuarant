import express from "express";

const router = express.Router();

router.get('/', (req, res) => res.send("Unimplemented Endpoint - pay"));

router.post('/', (req, res) => {

    // Should receive order object { containing data such as productCode, salesCode etc.}
    // Should post order object to https://vodapay-gateway.sandbox.vfs.africa/v2/payments/pay
    // Receive back result and paymentId
    // res.send payment/order detail

    res.send("Pay Post Received");
});

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