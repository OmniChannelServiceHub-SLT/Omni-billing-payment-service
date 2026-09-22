const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/saveInvoiceService'
);

const mapper = require(
  '../mappers/saveInvoiceMapper'
);

function getValue(body, camelKey, legacyKey) {
  return body[camelKey] ?? body[legacyKey];
}

async function createInvoice(req, res) {
  try {
    const refNo = getValue(
      req.body,
      'refNo',
      'REF_NO'
    );

    const serviceType = getValue(
      req.body,
      'serviceType',
      'SERVICE_TYPE'
    );

    const packageName = getValue(
      req.body,
      'packageName',
      'PACKAGE_NAME'
    );

    const packageCountValue = getValue(
      req.body,
      'packageCount',
      'PACKAGE_COUNT'
    );

    const rentalValue = getValue(
      req.body,
      'rental',
      'RENTAL'
    );

    const initialChargeValue = getValue(
      req.body,
      'initialCharge',
      'INI_CHARGE'
    );

    const status = getValue(
      req.body,
      'status',
      'STATUS'
    );

    if (
      !refNo ||
      !serviceType ||
      !packageName ||
      packageCountValue === undefined ||
      rentalValue === undefined ||
      !status
    ) {
      return failure(res, {
        message:
          'REF_NO, SERVICE_TYPE, PACKAGE_NAME, PACKAGE_COUNT, RENTAL and STATUS are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const packageCount =
      Number(packageCountValue);
    const rental = Number(rentalValue);

    const initialCharge =
      initialChargeValue === undefined ||
      initialChargeValue === null ||
      initialChargeValue === ''
        ? 0
        : Number(initialChargeValue);

    if (
      !Number.isFinite(packageCount) ||
      packageCount < 1 ||
      !Number.isFinite(rental) ||
      rental < 0 ||
      !Number.isFinite(initialCharge) ||
      initialCharge < 0
    ) {
      return failure(res, {
        message:
          'PACKAGE_COUNT, RENTAL and INI_CHARGE must contain valid numeric values.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.saveInvoice({
        refNo: String(refNo).trim(),
        serviceType:
          String(serviceType).trim(),
        packageName:
          String(packageName).trim(),
        packageCount,
        rental,
        initialCharge,
        status: String(status).trim(),
      });

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      return res
        .status(200)
        .json(mapper.toLegacyResponse());
    }

    return res
      .status(200)
      .json(mapper.toTmfCustomerBill(record));
  } catch (error) {
    console.error(
      '[SaveInvoice] Failed:',
      error.message
    );

    return failure(res, {
      message: 'Failed to save invoice.',
      errorCode: 'E500',
      exceptionDetail:
        process.env.NODE_ENV === 'production'
          ? null
          : error.message,
      status: 500,
    });
  }
}

module.exports = {
  createInvoice,
};