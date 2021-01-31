
// import moment from 'moment';
var config = require("./config/config.json");
var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var sha256 = require('sha256');
var querystring = require('qs');

var $ = require('jquery');


router.get('/thanhtoan', function (req, res, next) {

    var date = new Date();

    var desc = 'Thanh toan don hang thoi gian: ' + dateFormat(date, 'yyyy-mm-dd HH:mm:ss');
    res.render('thanhtoan'
        , {username: 'Tạo mới đơn hàng', amount: 10000, description: desc}
        )
});
// router.post('/connect_vnpay', function (req, res, next) {
// 	const ipAddr = req.headers['x-forwarded-for'] ||
// 		req.connection.remoteAddress ||
// 		req.socket.remoteAddress ||
// 		req.connection.socket.remoteAddress;
// 	const tmnCode = config['vnp_TmnCode'];
// 	const secretKey = config['vnp_HashSecret'];
// 	let vnpUrl = config['vnp_Url'];
// 	const returnUrl = config['vnp_ReturnUrl'];
//
// 	const date = new Date();
//
// 	const createDate = moment(date).format('yyyyMMDDHHmmss');
// 	const orderId = moment(date).format('HHmmss');
// 	var amount = req.body.amount;
// 	var bankCode = 'NCB';
// 	var orderInfo = req.body.username;
// 	var locale = 'vn';
// 	var currCode = 'VND';
// 	var vnp_Params = {};
// 	var orderInfo = req.body.description;
//
// 	vnp_Params['vnp_Version'] = '2';
// 	vnp_Params['vnp_Command'] = 'pay';
// 	vnp_Params['vnp_TmnCode'] = tmnCode;
// 	// vnp_Params['vnp_Merchant'] = ''
// 	vnp_Params['vnp_Locale'] = locale;
// 	vnp_Params['vnp_CurrCode'] = currCode;
// 	vnp_Params['vnp_TxnRef'] = orderId;
// 	vnp_Params['vnp_OrderInfo'] = orderInfo;
// 	vnp_Params['vnp_Amount'] = amount * 100;
// 	vnp_Params['vnp_ReturnUrl'] = returnUrl;
// 	vnp_Params['vnp_IpAddr'] = ipAddr;
// 	vnp_Params['vnp_CreateDate'] = createDate;
// 	vnp_Params['vnp_BankCode'] = bankCode;
//
// 	vnp_Params = sortObject(vnp_Params);
//
// 	const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
//
// 	const secureHash = sha256(signData);
//
// 	vnp_Params['vnp_SecureHashType'] =  'SHA256';
// 	vnp_Params['vnp_SecureHash'] = secureHash;
// 	vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
//
// 	//Neu muon dung Redirect thi dong dong ben duoi
// 	res.status(200).json({code: '00', data: vnpUrl});
// })
// router.get('/success', function (req, res, next) {
//     var vnp_Params = req.query;
//
//     var secureHash = vnp_Params['vnp_SecureHash'];
//
//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];
//
//     vnp_Params = sortObject(vnp_Params);
//
//     var tmnCode = config.get('vnp_TmnCode');
//     var secretKey = config.get('vnp_HashSecret');
//
//     var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
//
//     var checkSum = sha256(signData);
//
//     if(secureHash === checkSum){
//         //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
//
//         res.render('success', {code: vnp_Params['vnp_ResponseCode']})
//     } else{
//         res.render('success', {code: '97'})
//     }
// });

// function sortObject(o) {
// 	var sorted = {},
// 		key, a = [];
//
// 	for (key in o) {
// 		if (o.hasOwnProperty(key)) {
// 			a.push(key);
// 		}
// 	}
//
// 	a.sort();
//
// 	for (key = 0; key < a.length; key++) {
// 		sorted[a[key]] = o[a[key]];
// 	}
// 	return sorted;
// }

module.exports = router;