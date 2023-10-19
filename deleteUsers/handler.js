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

const deleteUsers = async(event, context) => {

  let userId = event.pathParameters.id

  const body = JSON.stringify({"message": userId})
  const params = {
    TableName: 'usersTable',
    Key: { pk: userId }
  }

  return dynamodb.delete(params)
    .promise()
    .then(res => {
      console.log(res)
      return {        
          "statusCode": 200,
          "body": JSON.stringify({"user": res})        
      }
    })
}


module.exports = {
  deleteUsers
}