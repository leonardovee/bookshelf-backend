const { Unauthorized, ServerError, Ok } = require('./helpers/http-helper')

class BookController {
  constructor (addBookUseCase) {
    this.addBookUseCase = addBookUseCase
  }

  async post ({ name, author, description }) {
    try {
      if (!name) return Unauthorized('Missing param: name')
      if (!author) return Unauthorized('Missing param: author')
      if (!description) return Unauthorized('Missing param: description')
      await this.addBookUseCase.add({ name, author, description })
      return Ok()
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = BookController
