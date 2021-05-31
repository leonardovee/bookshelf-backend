const { Unauthorized } = require('./helpers/http-helper')

class BookController {
  async post ({ name, author, description }) {
    if (!name) return Unauthorized('Missing param: name')
    if (!author) return Unauthorized('Missing param: author')
    if (!description) return Unauthorized('Missing param: description')
  }
}

module.exports = BookController
