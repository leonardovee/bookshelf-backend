const { Unauthorized } = require('../helpers/http-helper')

class GetBookController {
  constructor (getBookUseCase) {
    this.getBookUseCase = getBookUseCase
  }

  async route (httpRequest) {
    const { _id } = httpRequest.body
    if (!_id) return Unauthorized('Missing param: _id')
    await this.getBookUseCase.get({ _id })
  }
}

module.exports = GetBookController
