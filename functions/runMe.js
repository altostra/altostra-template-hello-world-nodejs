const aws = require('aws-sdk')
const message = `

Welcome to Altostra - the no-code infrastructure platform for developers.

This is an example response from the API.
To make it more personal, call the POST /my-name endpoint with your name, like this:

curl ...???
`
const region = process.env.AWS_REGION
const isLocal = process.env.AWS_SAM_LOCAL
const dynamoDb = !isLocal && new aws.DynamoDB.DocumentClient({ region })
const TableName = process.env.TABLE_QUERYME01

module.exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      try {
        const message = await getMessage()
        return {
          body: message,
          statusCode: 200,
        }
      } catch (err) {
        return {
          statusCode: 500,
          body: `Unable to get the message due to a serverless error.`,
        }
      }

    case 'POST':
      try {
        setName(event.body)
        return {
          statusCode: 204,
        }
      } catch (err) {
        return {
          statusCode: 500,
          body: `Unable to set your name due to a serverless error.`,
        }
      }

    default:
      return {
        statusCode: 400,
        body: `It seems that you didn't provide the correct parameters :(`
      }
  }
}

async function getMessage() {
  let greeting = `Hi!`
  if (isLocal) {
    return `${greeting}${message}`
  }

  try {
    const response = await dynamoDb.get({
      TableName,
      Key: {
        pk: 'SINGLETON',
      }
    }).promise()

    const greeting = response.Item && response.Item.name
      ? `Hi ${response.Item.name}!`
      : `Hi!`

    return `${greeting}${message}`
  } catch (err) {
    const msg = `Failed to get name from storage.`
    console.error(msg, err)
    throw new Error(msg)
  }
}

async function setName(name) {
  if (isLocal) {
    return
  }

  try {
    if (typeof name !== 'string' || name.length < 1) {
      throw new Error(`Provided name is invalid.`)
    }

    dynamoDb.put({
      TableName,
      Item: {
        pk: 'SINGLETON',
        name,
      }
    }).promise()

  } catch (err) {
    const msg = `Failed to store the name is storage.`
    console.error(msg, err)
    throw new Error(msg)
  }
}