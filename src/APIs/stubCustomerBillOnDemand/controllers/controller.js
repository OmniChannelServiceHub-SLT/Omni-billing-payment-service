const service = require(
  '../services/service'
);

function selectFields(record, fields) {
  if (!fields) {
    return record;
  }

  const selected = {
    href: record.href,
  };

  const requestedFields = String(fields)
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);

  for (const field of requestedFields) {
    if (
      Object.prototype.hasOwnProperty.call(record, field)
    ) {
      selected[field] = record[field];
    }
  }

  return selected;
}

function createCustomerBillOnDemand(req, res) {
  const payload = req.body || {};

  if (
    !payload.billingAccount &&
    !payload.relatedParty
  ) {
    return res.status(400).json({
      code: '400',
      reason: 'Invalid request',
      message:
        'billingAccount or relatedParty is required.',
      status: '400',
      '@type': 'Error',
    });
  }

  const record =
    service.createCustomerBillOnDemand(payload);

  return res.status(201).json(record);
}

function listCustomerBillOnDemand(req, res) {
  const records =
    service.listCustomerBillOnDemand(req.query);

  return res.status(200).json(
    records.map((record) =>
      selectFields(record, req.query.fields)
    )
  );
}

function retrieveCustomerBillOnDemand(req, res) {
  const record = service.getCustomerBillOnDemand(
    req.params.id
  );

  if (!record) {
    return res.status(404).json({
      code: '404',
      reason: 'Not Found',
      message: 'CustomerBillOnDemand not found.',
      status: '404',
      '@type': 'Error',
    });
  }

  return res.status(200).json(
    selectFields(record, req.query.fields)
  );
}

module.exports = {
  createCustomerBillOnDemand,
  listCustomerBillOnDemand,
  retrieveCustomerBillOnDemand,
};