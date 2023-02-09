const { faker } = require("@faker-js/faker");

const dotenv = require("dotenv");
const fs = require("fs");
const { Parser } = require("json2csv");
const path = require("path");

const TORUS_TEST_VERIFIER = "torus-test-health";
const NETWORK = "cyan"

function generateKeyAssignData(n) {
  const keyAssignData = [];
  for (let i = 1; i < n; i++) {
    const email = (Math.random() + 1).toString(36).substring(7) + faker.internet.email();
    keyAssignData.push({ email, verifier: TORUS_TEST_VERIFIER, network: NETWORK });
  }
  const keyAssignDataParser = new Parser({ header: false, escapedQuote: `` });
  const keyAssignCsv = keyAssignDataParser.parse(keyAssignData);
  fs.writeFileSync("./loadTest/KeyAssign.csv", Buffer.from(keyAssignCsv), { flag: "w+" });
}

generateKeyAssignData(process.argv[2] || 1000);
