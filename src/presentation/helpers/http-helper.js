const Unauthorized = (message) => ({
  statusCode: 401,
  body: message
})

const ServerError = () => ({
  statusCode: 500,
  body: 'Internal server error'
})

module.exports = { Unauthorized, ServerError }
