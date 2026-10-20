// A166: development samples only; no confirmed TMF alignment.
// This module performs no database writes, reloads, or external requests.
const sampleInput = {
  "LTESLTNumber": "94253123587",
  "transactionId": "45465845545446113",
  "channelCode": "USSD123456",
  "amount": "1"
};
const sampleData = {
  "resultCode": "1001",
  "resultDescription": "Operation Successful",
  "transactionRef": "1000127"
};

async function reloadSubscriber(input) {
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

module.exports = { reloadSubscriber };
