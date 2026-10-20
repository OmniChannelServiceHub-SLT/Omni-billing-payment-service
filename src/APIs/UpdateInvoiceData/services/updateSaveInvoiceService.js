// A145: development samples only; no confirmed TMF alignment.
// This module performs no database writes, reloads, or external requests.
const sampleInput = {
  "REF_NO": "LTE_100"
};
const sampleData = {};

async function updateInvoiceData(input) {
  if (process.env.INTERIM_MODE !== 'mock' || !['development', 'test'].includes(process.env.NODE_ENV)) {
    const error = new Error('Interim sample mode is disabled. No real backend operation was performed.');
    error.status = 503;
    throw error;
  }
  const matches = Object.keys(sampleInput).every(key =>
    key === 'amount' ? Number(input[key]) === Number(sampleInput[key]) : input[key] === sampleInput[key]
  );
  if (!matches) return null;
  return JSON.parse(JSON.stringify(sampleData));
}

module.exports = { updateInvoiceData };
