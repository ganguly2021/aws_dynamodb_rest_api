// dotenv for env file read
require("dotenv/config");

const AWS = require("aws-sdk");
const DataMapper = require("@aws/dynamodb-data-mapper").DataMapper;

// aws config
let config = {};

if (process.env.NODE_ENV === "development") {
  // set the aws config values
  // ex:- us-central-1 => region
  config = {
    ...config,
    region: "ap-south-1",
    endpoint: "http://localhost:8000",
    accessKey: "vVXMu48cG8VVBFSr",
    secretAccessKey: "BFAQBwaD4ZKv66fd",
  };
} else {
  config = {
    ...config,
    region: "ap-south-1",
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

// Create DynamoDB connection client
const client = new AWS.DynamoDB(config);
const mapper = new DataMapper({ client });

module.exports = mapper