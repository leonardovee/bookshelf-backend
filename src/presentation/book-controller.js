const { Unauthorized } = require('./helpers/http-helper')

class BookController {
  async post ({ name, author }) {
    if (!name) return Unauthorized('Missing param: name')
    if (!author) return Unauthorized('Missing param: author')
  }
}

module.exports = BookController
