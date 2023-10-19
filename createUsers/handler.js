const aws = require("aws-sdk");
const { randomUUID } = require("crypto")

let dynamoLocal = {};

if (process.env.IS_OFFLINE) {
  dynamoLocal = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "MENDOZALZID",
    secretAccessKey: "MENDOZALZSECRET",
  };
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoLocal);

const createUsers = async (event, context) => {

    const id = randomUUID();
    let userBody = JSON.parse(event.body)
    userBody.pk = id

  const params = {
    TableName: "usersTable",
    Item: userBody
  };

  console.log(params.Item);

  return dynamodb
    .put(params)
    .promise()
    .then((res) => {
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({ 'user': params.Item }),
      };
    });
};

module.exports = {
  createUsers,
};
