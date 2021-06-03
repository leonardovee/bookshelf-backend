const { Unauthorized, ServerError, Created } = require('../../helpers/http-helper')

class CreateBookController {
  constructor (addBookUseCase) {
    this.addBookUseCase = addBookUseCase
  }

  async route (httpRequest) {
    try {
      const { name, author, description } = httpRequest.body
      if (!name) return Unauthorized('Missing param: name')
      if (!author) return Unauthorized('Missing param: author')
      if (!description) return Unauthorized('Missing param: description')
      await this.addBookUseCase.add({ name, author, description })
      return Created()
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = CreateBookController
