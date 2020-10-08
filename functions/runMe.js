const aws = require('aws-sdk')
const message = `

Welcome to Altostra.

To set your name, send a request to POST /my-name with your name as the body.

See the README file for more detailed instructions on how to run this project locally and how to deploy it.

Happy Clouding!
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
        await setName(event.body)
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
    if (typeof name !== 'string') {
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