const { randomUUID } = require('node:crypto');

const BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBillOnDemand';

const records = new Map();

function createCustomerBillOnDemand(payload = {}) {
  const id = randomUUID();

  const record = {
    ...payload,
    id,
    href: `${BASE_PATH}/${id}`,
    state: payload.state || 'done',
    '@type': payload['@type'] || 'CustomerBillOnDemand',
  };

  records.set(id, record);

  return record;
}

function listCustomerBillOnDemand(query = {}) {
  let results = Array.from(records.values());

  if (query.id) {
    results = results.filter(
      (record) => record.id === String(query.id)
    );
  }

  return results;
}

function getCustomerBillOnDemand(id) {
  return records.get(String(id)) || null;
}

module.exports = {
  createCustomerBillOnDemand,
  listCustomerBillOnDemand,
  getCustomerBillOnDemand,
};