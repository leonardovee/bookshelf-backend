const { Unauthorized, ServerError } = require('../helpers/http-helper')

class GetBookController {
  constructor (getBookUseCase) {
    this.getBookUseCase = getBookUseCase
  }

  async route (httpRequest) {
    try {
      const { _id } = httpRequest.body
      if (!_id) return Unauthorized('Missing param: _id')
      await this.getBookUseCase.get({ _id })
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = GetBookController
