import React from "react";
import Head from 'next/head';
import {Form, Input, FormGroup, Label} from 'reactstrap';
var $ = require('jquery');

function thanhtoan() {
    const [cartdata, setcart] = React.useState({ username: "",amount: 0, description: ""});
    const onHandleSubmit= (e)=> {
        e.preventDefault();
        console.log(cartdata)
      }
        return (
            <>
            <Form onSubmit={onHandleSubmit} id="createorder" action="connect_vnpay" method="POST">
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
                                    // return Object.assign({}, prevState, { message: val }); // Also works
                                  });
                                }}
                              />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">amount</Label>
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
    <Label for="exampledescription">description</Label>
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
      <button  type="submit" id="buttonaction">submit</button>
      </Form>
        <h1>{cartdata.username}</h1>
        <h1>{cartdata.amount}</h1>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src='https://pay.vnpay.vn/lib/vnpay/vnpay.js'></script>
        </>
    )
        $(buttonaction).click(function(){
var postData = $(createorder).serialize();
            var submitUrl = $(createorder).attr("action");
            $.ajax({
                type: "POST",
                url: submitUrl,
                data: postData,
                dataType: 'JSON',
                success: function (x) {
                    if (x.code === '00') {
                        if(window.vnpay)
                            {
                                vnpay.open({width: 768, height: 600, url: x.data});
                            }
                            else
                            {
                                location.href=x.data;
                            }
                            return false;

                    } else {
                        alert(x.Message);
                    }
                }
            });
            return false;
        });
};

export default thanhtoan;