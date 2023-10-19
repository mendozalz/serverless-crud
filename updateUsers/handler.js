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

const updateUsers = async(event, context) => {

  let userId = event.pathParameters.id

  const body = JSON.parse(event.body)
  const params = {
    TableName: 'usersTable',
    Key: { pk: userId },
    UpdateExpression: "set #name = :name, #telefono = :telefono",
    ExpressionAttributeNames : {"#name":"name", "#telefono": "telefono"},
    ExpressionAttributeValues: { ':name': body.name, ":telefono": body.telefono },
    ReturnValues: "ALL_NEW"
  }

  return dynamodb.update(params)
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
  updateUsers
}