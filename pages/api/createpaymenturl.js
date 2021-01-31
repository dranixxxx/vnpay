import config from "../../config/config.json";
import moment from 'moment';
import querystring from 'qs';
import sha256 from 'sha256';
const REQUEST_METHODS = {
	POST: 'POST',
	GET: 'GET',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
}

export default function createPaymentUrl(req, res) {
	if (req.method === REQUEST_METHODS.GET) {
		return get(req, res);
	}
	if (req.method === REQUEST_METHODS.POST) {
		// return post(req, res);
	}
}

function get(req, res) {
	console.log('@createPaymentUrl: ', req)
	const ipAddr = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	const tmnCode = config['vnp_TmnCode'];
	const secretKey = config['vnp_HashSecret'];
	let vnpUrl = config['vnp_Url'];
	const returnUrl = config['vnp_ReturnUrl'];

	const date = new Date();

	const createDate = moment(date).format('yyyyMMDDHHmmss');
	const orderId = moment(date).format('HHmmss');
	var amount = req.query.amount;
	var bankCode = 'NCB';
	var orderInfo = req.query.username;
	var locale = 'vn';
	var currCode = 'VND';
	var vnp_Params = {};
	var orderInfo = req.query.description;

	vnp_Params['vnp_Version'] = '2';
	vnp_Params['vnp_Command'] = 'pay';
	vnp_Params['vnp_TmnCode'] = tmnCode;
	// vnp_Params['vnp_Merchant'] = ''
	vnp_Params['vnp_Locale'] = locale;
	vnp_Params['vnp_CurrCode'] = currCode;
	vnp_Params['vnp_TxnRef'] = orderId;
	vnp_Params['vnp_OrderInfo'] = orderInfo;
	vnp_Params['vnp_Amount'] = amount * 100;
	vnp_Params['vnp_ReturnUrl'] = returnUrl;
	vnp_Params['vnp_IpAddr'] = ipAddr;
	vnp_Params['vnp_CreateDate'] = createDate;
	vnp_Params['vnp_BankCode'] = bankCode;

	vnp_Params = sortObject(vnp_Params);

	const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

	const secureHash = sha256(signData);

	vnp_Params['vnp_SecureHashType'] =  'SHA256';
	vnp_Params['vnp_SecureHash'] = secureHash;
	vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

	//Neu muon dung Redirect thi dong dong ben duoi
	res.status(200).json({code: '00', data: vnpUrl});
}

function sortObject(o) {
	var sorted = {},
		key, a = [];

	for (key in o) {
		if (o.hasOwnProperty(key)) {
			a.push(key);
		}
	}

	a.sort();

	for (key = 0; key < a.length; key++) {
		sorted[a[key]] = o[a[key]];
	}
	return sorted;
}