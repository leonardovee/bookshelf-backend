const { Unauthorized } = require('./helpers/http-helper')

class BookController {
  async post ({ name }) {
    if (!name) return Unauthorized('Missing param: name')
  }
}

module.exports = BookController
