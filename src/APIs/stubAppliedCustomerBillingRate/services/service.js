const BASE_PATH =
  '/tmf-api/customerBillManagement/v4/appliedCustomerBillingRate';

const records = [
  {
    id: 'ctk-applied-rate-001',
    href: `${BASE_PATH}/ctk-applied-rate-001`,
    isBilled: false,
    name: 'CTK applied customer billing rate',
    description:
      'Stub record used for TMF678 CTK validation.',
    appliedTax: [],
    '@type': 'AppliedCustomerBillingRate',
  },
];

function listAppliedCustomerBillingRates(query = {}) {
  let results = [...records];

  if (query.id) {
    results = results.filter(
      (record) => record.id === String(query.id)
    );
  }

  if (query.isBilled !== undefined) {
    const isBilled =
      String(query.isBilled).toLowerCase() === 'true';

    results = results.filter(
      (record) => record.isBilled === isBilled
    );
  }

  return results;
}

function getAppliedCustomerBillingRate(id) {
  return (
    records.find(
      (record) => record.id === String(id)
    ) || null
  );
}

module.exports = {
  listAppliedCustomerBillingRates,
  getAppliedCustomerBillingRate,
};