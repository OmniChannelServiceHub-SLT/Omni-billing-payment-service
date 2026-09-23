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

function listAppliedCustomerBillingRates(req, res) {
  const records =
    service.listAppliedCustomerBillingRates(req.query);

  return res.status(200).json(
    records.map((record) =>
      selectFields(record, req.query.fields)
    )
  );
}

function retrieveAppliedCustomerBillingRate(
  req,
  res
) {
  const record =
    service.getAppliedCustomerBillingRate(
      req.params.id
    );

  if (!record) {
    return res.status(404).json({
      code: '404',
      reason: 'Not Found',
      message:
        'AppliedCustomerBillingRate not found.',
      status: '404',
      '@type': 'Error',
    });
  }

  return res.status(200).json(
    selectFields(record, req.query.fields)
  );
}

module.exports = {
  listAppliedCustomerBillingRates,
  retrieveAppliedCustomerBillingRate,
};