// A158: development samples only; no confirmed TMF alignment.
// This module performs no database writes, reloads, or external requests.
const sampleInput = {
  "LTESLTNumber": "94113497410"
};
const sampleData = [
  {
    "balanceType": "C_MAIN_ACCOUNT",
    "balanceTypeName": "account balance",
    "totalAmount": "487900",
    "reservedAmount": "0",
    "depositFlag": "N",
    "refundFlag": "1",
    "currencyId": "1085",
    "balanceDetail": [
      {
        "instanceId": "705000000019790100",
        "amount": 487900,
        "initialAmount": 0,
        "effectiveTime": "20230529135053",
        "expireTime": "20370101053000",
        "originalType": "0",
        "originalId": "0"
      }
    ]
  }
];

async function getWalletDetail(input) {
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

module.exports = { getWalletDetail };
