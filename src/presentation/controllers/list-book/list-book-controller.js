const { Ok, ServerError, Unauthorized } = require('../../helpers/http-helper.js')

class ListBookController {
  constructor (listBookUseCase) {
    this.listBookUseCase = listBookUseCase
  }

  async route (httpRequest) {
    try {
      const { offset } = httpRequest.query
      if (!parseInt(offset)) return Unauthorized('Incorrect param value: offset')
      const list = await this.listBookUseCase.list({ offset })
      return Ok(list)
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = ListBookController
