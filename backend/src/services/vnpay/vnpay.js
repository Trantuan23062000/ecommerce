// vnpayService.js
import crypto from 'crypto';
import querystring from 'querystring';

class VNPayService {
  constructor(secretKey, tmnCode, returnUrl) {
    this.secretKey = secretKey;
    this.tmnCode = tmnCode;
    this.returnUrl = returnUrl;
  }

  createVNPayHash() {
    return crypto.createHmac('sha512', this.secretKey);
  }

  createPaymentUrl(params) {
    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = Object.keys(params).sort().reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});

    // Tạo chuỗi query string
    const queryString = querystring.stringify(sortedParams);
    // Tạo chữ ký
    const vnp_SecureHash = this.createVNPayHash().update(queryString).digest('hex');

    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${queryString}&vnp_SecureHash=${vnp_SecureHash}`;
  }

  verifyReturn(query) {
    const vnp_SecureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;

    const sortedQuery = Object.keys(query).sort().reduce((result, key) => {
      result[key] = query[key];
      return result;
    }, {});

    const queryString = querystring.stringify(sortedQuery);
    const hash = this.createVNPayHash().update(queryString).digest('hex');

    return hash === vnp_SecureHash;
  }
}

export default VNPayService;
