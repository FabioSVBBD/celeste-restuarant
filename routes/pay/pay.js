import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { extractHeaders, dateToString } from "../../modules/helpers.js";

// FAILS SOMETIMES FOR SOME REASON, COULD BE RELATED UUIDV4, but re-running the request should work

const router = express.Router();

router.get("/", (req, res) => res.send("Unimplemented Endpoint - pay"));
router.get("/test", (req, res) =>
  res.send({ info: "Test Endpoint embedded in /pay" })
);

router.post("/", (req, res) => {
  console.log("Pay Post Request Hit", new Date().toTimeString());
  let { order } = req.body;
  let headers = extractHeaders(req.headers);

  if (order === undefined) {
    res.send({ error: "order undefined" });
    return;
  }
  if (
    !(
      "id" in order &&
      "value" in order &&
      "name" in order &&
      "description" in order
    )
  ) {
    res.send({ error: "order missing properties" });
    return;
  }
  for (const key in order) {
    if (order[key] === undefined) {
      res.send({ error: `order[${key}] undefined` });
      return;
    }
  }

  for (const key in headers) {
    if (headers[key] === undefined) {
      res.send({ error: `headers[${key}] undefined` });
      return;
    }
  }

  const response = getPaymentId(order, headers);

  (async () => {
    res.send(await response);
  })();
});

async function getPaymentId(order, headers) {
  let expDate = new Date();
  expDate.setFullYear(expDate.getFullYear() + 1);
  let expTime = dateToString(expDate);

  let data = JSON.stringify({
    productCode: "CASHIER_PAYMENT",
    salesCode: "51051000101000000011",
    paymentRequestId: uuidv4(),
    paymentNotifyUrl:
      "https://celeste-restuarant.herokuapp.com/pay/paymentNotify",
    paymentRedirectUrl:
      "https://celeste-restuarant.herokuapp.com/pay/paymentRedirect",
    paymentExpiryTime: expTime,
    paymentAmount: {
      currency: "ZAR",
      value: order.value,
    },
    order: {
      goods: {
        referenceGoodsId: order.id,
        goodsUnitAmount: {
          currency: "ZAR",
          value: order.value,
        },
        quantity: order.quantity === undefined ? "1" : order.quantity,
        goodsName: order.name,
      },
      env: {
        terminalType: "MINI_APP",
      },
      orderDescription: order.description,
      buyer: {
        referenceBuyerId: "216610000000259832353",
      },
    },
  });

  var config = {
    method: "post",
    url: "https://vodapay-gateway.sandbox.vfs.africa/v2/payments/pay",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log("Response Result: ", response.data["result"]["resultCode"]);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Unimplemented
router.post("/paymentNotify", (req, res) => {
  const response = req.body;
  //
  console.log("Payment Notification Received");
  console.log(response);
  res.send({ info: "payment notify hit" });
});

router.post("/paymentRedirect", (req, res) => {
  const response = req.body;
  //
  console.log("Payment Redirect Hit");
  console.log(response);
  res.send({ info: "payment redirect hit" });
});

export default router;
