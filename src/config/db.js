// src/config/db.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set.');

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);

  // eslint-disable-next-line no-console
  console.log(`Billing & Payment Service connected to MongoDB (${mongoose.connection.name})`);

  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err.message);
  });

  return mongoose.connection;
};

// Development samples from the latest Excel, exposed through the existing npm seed command.
const sampleRecords = [
  [
    "BillDetail",
    {
      "telephoneNo": "0112053609",
      "accountNo": "0037994858"
    },
    {
      "listofbillingInquiryType": [
        {
          "billAmount": "4446.08",
          "lastBillDate": "2018/01/03",
          "paymentDueDate": "2018/01/24",
          "lastPaymentDate": "2017/11/20",
          "lastPaymentAmount": "10000.00",
          "outstandingBalance": "12150.67"
        }
      ],
      "listofProductDetail": [
        {
          "promotionName": "SLT Megaline Triple Play Package",
          "voicePckg": "N/A",
          "voiceStatus": "Active",
          "voiceType": "V-VOICE COPPER",
          "bbPckg": "N/A",
          "bbStatus": "Active",
          "bbType": "BB-INTERNET COPPER",
          "peoPckg": "N/A",
          "peoStatus": "Active",
          "peoType": "E-IPTV COPPER",
          "subcriberID": "WI2053609"
        }
      ],
      "myPackageInfo": {
        "package_name": "ENTREE",
        "package_summary": null,
        "usageDetails": [
          {
            "name": "Total Usage",
            "limit": 15.0,
            "remaining": 12.5,
            "used": 2.5,
            "percentage": 83.0,
            "volume_unit": "GB",
            "expiry_date": "29-Feb"
          }
        ]
      }
    }
  ],
  [
    "EBillStatus",
    {
      "accountNo": "0037994858",
      "tpNo": "0112053609"
    },
    {
      "mobileno": "0715364923",
      "emailaddress": "eathameera@gmail.com"
    }
  ],
  [
    "SMSServiceStatus",
    {
      "accountNo": "0037994858",
      "tpNo": "0112053609"
    },
    {
      "serviceAvailable": false
    }
  ],
  [
    "EBillUserCheck",
    {
      "accountNo": "0037994858"
    },
    {
      "userexist": "N",
      "referenceNumber": "randikaslt@gmail.com",
      "responseMessage": "New User,OTP Sent"
    }
  ],
  [
    "BillStatus",
    {
      "accountNo": "0041010368",
      "tpNo": "0382248430"
    },
    {
      "bill_code": "02",
      "bill_code_desc": "E-statement by email",
      "mobile": "eathameera@gmail.com",
      "email": "0715364923",
      "possiblebillmodelist": [
        {
          "bill_code": "02",
          "bill_code_desc": "E - statement by email"
        }
      ]
    }
  ],
  [
    "BillPayment",
    {
      "telephoneNo": "0112053609",
      "accountNo": "0037994858"
    },
    {
      "billAmount": "4446.08",
      "lastBillDate": "2018/01/03",
      "paymentDueDate": "2018/01/24",
      "lastPaymentDate": "2017/11/20",
      "lastPaymentAmount": "10000.00",
      "outstandingBalance": "12150.67"
    }
  ],
  [
    "PaymentLog",
    {
      "order_ref": "FTTH_162",
      "logId": "80"
    },
    {
      "order_ref": "FTTH_162",
      "nic_no": "892703531V",
      "sys_id": "FTTH",
      "date_enter": "2021-08-13 11:22:21",
      "amount": "1.00",
      "epoch_val": "INT16288339428255",
      "gw_ref": "122515572372",
      "gw_status": "1",
      "refund_sys": "0",
      "crm_state": "10",
      "sys_status": "1",
      "CRNumber": "CR004375691",
      "AccNo": "0048025415",
      "refund_ncp": "0",
      "passport_no": "/",
      "lastUpdate": "2021-08-26 11:36:30",
      "cashierRef": "235703271",
      "logId": "80"
    }
  ],
  [
    "BillCode",
    {
      "billCode": "01"
    },
    {
      "billCodeName": "Hard Copy",
      "billCodeDescription": "Paper Bill",
      "displayOrder": 0,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "02"
    },
    {
      "billCodeName": "E-statement by email",
      "billCodeDescription": "E-statement by email",
      "displayOrder": 1,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "03"
    },
    {
      "billCodeName": "E-statement & Post",
      "billCodeDescription": "E-statement & Post",
      "displayOrder": 2,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "04"
    },
    {
      "billCodeName": "E-statement on web",
      "billCodeDescription": "E-statement on web",
      "displayOrder": 3,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "21"
    },
    {
      "billCodeName": "Corporate_E-statement by Email",
      "billCodeDescription": "Corporate_E-statement by Email",
      "displayOrder": 4,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "06"
    },
    {
      "billCodeName": "Prestige -  E-statement",
      "billCodeDescription": "Prestige -  E-statement",
      "displayOrder": 5,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "05"
    },
    {
      "billCodeName": "Prestige - Post",
      "billCodeDescription": "Prestige - Post",
      "displayOrder": 6,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "22"
    },
    {
      "billCodeName": "Corporate_E-statement by Report",
      "billCodeDescription": "Corporate_E-statement by Report",
      "displayOrder": 7,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "23"
    },
    {
      "billCodeName": "E-Statement-App Mode",
      "billCodeDescription": "E-Statement-App Mode",
      "displayOrder": 8,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "24"
    },
    {
      "billCodeName": "E-Statement by SMS",
      "billCodeDescription": "E-Statement by SMS",
      "displayOrder": 9,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "07"
    },
    {
      "billCodeName": "Prepaid",
      "billCodeDescription": "Prepaid",
      "displayOrder": 10,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "08"
    },
    {
      "billCodeName": "By Hand - Data",
      "billCodeDescription": "By Hand - Data",
      "displayOrder": 11,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "09"
    },
    {
      "billCodeName": "By Hand - BCU",
      "billCodeDescription": "By Hand - BCU",
      "displayOrder": 12,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "10"
    },
    {
      "billCodeName": "By Hand - Operator",
      "billCodeDescription": "By Hand - Operator",
      "displayOrder": 13,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "11"
    },
    {
      "billCodeName": "By Hand - Special",
      "billCodeDescription": "By Hand - Special",
      "displayOrder": 14,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "12"
    },
    {
      "billCodeName": "No Print",
      "billCodeDescription": "No Print",
      "displayOrder": 15,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "13"
    },
    {
      "billCodeName": "Corporate_ E-Statement by FTP",
      "billCodeDescription": "Corporate_ E-Statement by FTP",
      "displayOrder": 16,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "14"
    },
    {
      "billCodeName": "DNR",
      "billCodeDescription": "DNR",
      "displayOrder": 17,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "15"
    },
    {
      "billCodeName": "BCU Single side print",
      "billCodeDescription": "BCU Single side print",
      "displayOrder": 18,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "16"
    },
    {
      "billCodeName": "Prestige - Post & E-statement",
      "billCodeDescription": "Prestige - Post & E-statement",
      "displayOrder": 19,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "17"
    },
    {
      "billCodeName": "Special List 1",
      "billCodeDescription": "Special List 1",
      "displayOrder": 20,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "18"
    },
    {
      "billCodeName": "Special List 2",
      "billCodeDescription": "Special List 2",
      "displayOrder": 21,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "19"
    },
    {
      "billCodeName": "Corporate Hard Copy & E-Bill",
      "billCodeDescription": "Corporate Hard Copy & E-Bill",
      "displayOrder": 22,
      "isActive": true
    }
  ],
  [
    "BillCode",
    {
      "billCode": "20"
    },
    {
      "billCodeName": "Hard Copy & CD",
      "billCodeDescription": "Hard Copy & CD",
      "displayOrder": 23,
      "isActive": true
    }
  ]
];

module.exports.seedSampleData = async function seedSampleData() {
  if (process.env.NODE_ENV === 'production') throw new Error('Use a development database for Excel sample data.');
  try {
    await module.exports();
    const models = {
      ...require('../models/TMF678_BillingPayment'),
      ...require('../models/TMF676_Payment'),
    };
    for (const [name, filter, values] of sampleRecords) {
      await models[name].findOneAndUpdate(filter, { $setOnInsert: { ...filter, ...values } }, {
        upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true,
      });
    }
    console.log('Excel sample records inserted where absent. Existing records were not overwritten.');
  } finally {
    await mongoose.disconnect();
  }
};
