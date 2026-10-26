const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getPaymentLogsController');

const router = express.Router();
// A114: preserve the documented HTTP method and source endpoint.
router.get('/api/NewCon/GetPaymentLogs', auth, controller.listPayment);

// A114: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/paymentManagement/v4/payment-logs', auth, controller.listPayment);

module.exports = router;


const { tmfRoutes } = require('../../../middleware/response.util');
router.use(["/tmf-api/paymentManagement/v4", "/payment/v4", "/tmf-api/payment/v4"], tmfRoutes(express, auth, 'payment', { list: controller.listTmfPayment, get: controller.getTmfPayment, create: controller.createTmfPayment }));
router.use(["/tmf-api/paymentManagement/v4", "/payment/v4", "/tmf-api/payment/v4"], tmfRoutes(express, auth, 'refund', { list: controller.listTmfRefund, get: controller.getTmfRefund, create: controller.createTmfRefund }));
