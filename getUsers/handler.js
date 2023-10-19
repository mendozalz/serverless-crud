const aws = require("aws-sdk");

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

const getUsers = async (event, context) => {

    let userID = event.pathParameters.id

  const params = {
    ExpressionAttributeValues: { ":pk": userID },
    KeyConditionExpression: "pk = :pk",
    TableName: "usersTable",
  };
  return dynamodb
    .query(params)
    .promise()
    .then((res) => {
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({ user: res }),
      };
    });
};

module.exports = {
  getUsers,
};
