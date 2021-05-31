const { Unauthorized } = require('./helpers/http-helper')

class BookController {
  constructor (addBookUseCase) {
    this.addBookUseCase = addBookUseCase
  }

  async post ({ name, author, description }) {
    if (!name) return Unauthorized('Missing param: name')
    if (!author) return Unauthorized('Missing param: author')
    if (!description) return Unauthorized('Missing param: description')
    await this.addBookUseCase.add({ name, author, description })
  }
}

module.exports = BookController
