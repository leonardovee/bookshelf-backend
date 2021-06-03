const Unauthorized = (message) => ({
  statusCode: 401,
  body: message
})

const ServerError = () => ({
  statusCode: 500,
  body: 'Internal server error'
})

const Ok = (body) => ({
  statusCode: 200,
  body
})

const Created = () => ({
  statusCode: 201,
  body: 'Resource created'
})

module.exports = { Unauthorized, ServerError, Ok, Created }
