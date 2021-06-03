const { Unauthorized, ServerError, Ok } = require('../../helpers/http-helper')

class GetBookController {
  constructor (getBookUseCase) {
    this.getBookUseCase = getBookUseCase
  }

  async route (httpRequest) {
    try {
      const { _id } = httpRequest.body
      if (!_id) return Unauthorized('Missing param: _id')
      const books = await this.getBookUseCase.get({ _id })
      return Ok(books)
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = GetBookController
