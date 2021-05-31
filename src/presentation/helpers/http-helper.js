const Unauthorized = (message) => ({
  statusCode: 401,
  body: message
})

module.exports = { Unauthorized }
