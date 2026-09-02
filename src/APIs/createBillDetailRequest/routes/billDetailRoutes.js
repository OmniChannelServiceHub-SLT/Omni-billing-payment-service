// src/APIs/createBillDetailRequest/routes/billDetailRoutes.js

const express = require('express');

const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billDetailController');

const router = express.Router();

/**
 * Bill Detail Request
 *
 * TMF678 - Customer Bill Management
 *
 * GET /tmf-api/customerBillManagement/v4/bill-detail
 *
 * Query parameters:
 * - telephoneNo
 * - accountNo
 */
router.get(
  '/bill-detail',
  auth,
  controller.createBillDetailRequest
);

module.exports = router;