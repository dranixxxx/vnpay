import React from "react";
import Head from "next/head";
import { Form, Input, FormGroup, Label } from "reactstrap";
import axios from 'axios';
var $ = require("jquery");

function thanhtoan() {
  const [cartdata, setcart] = React.useState({
    username: "",
    amount: 0,
    description: "",
  });
  const getPaymentUrl = async () => {
    try {
      const response = await axios.get('/api/createpaymenturl', { params: cartdata });
      console.log('@getPaymentUrl: ', response)
    } catch (err) {
      console.error('@getPaymentUrl:', err);
    }
  }
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log(cartdata);
    getPaymentUrl();
  };
  return (
    <>
      <div className="w-100 h-100 d-flex flex-column align-items-center p-4">
        <Form
          onSubmit={onHandleSubmit}
          id="createorder"
          action="connect_vnpay"
          method="POST"
          className="w-50"
        >
          <FormGroup>
            <Label for="username">User Name</Label>
            <Input
              type="text"
              name="username"
              value={cartdata.username}
              placeholder="Enter a message"
              onChange={(e) => {
                const val = e.target.value;
                setcart((prevState) => {
                  return { ...prevState, username: val };
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Amount</Label>
            <Input
              type="text"
              name="amount"
              value={cartdata.amount}
              placeholder="Enter a message"
              onChange={(e) => {
                const val = e.target.value;
                setcart((prevState) => {
                  return { ...prevState, amount: val };
                });
              }}
            />
            <Label for="exampledescription">Description</Label>
            <Input
              type="text"
              name="orderDescription"
              value={cartdata.description}
              placeholder="Enter a message"
              onChange={(e) => {
                const val = e.target.value;
                setcart((prevState) => {
                  return { ...prevState, description: val };
                });
              }}
            />
          </FormGroup>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
        <h1>{cartdata.username}</h1>
        <h1>{cartdata.amount}</h1>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://pay.vnpay.vn/lib/vnpay/vnpay.js"></script>
      </div>
    </>
  );
}

export default thanhtoan;
