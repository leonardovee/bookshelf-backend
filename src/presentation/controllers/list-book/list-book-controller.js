const { Ok, ServerError } = require('../../helpers/http-helper.js')

class ListBookController {
  constructor (listBookUseCase) {
    this.listBookUseCase = listBookUseCase
  }

  async route (httpRequest) {
    try {
      const { query } = httpRequest
      const list = await this.listBookUseCase.list(query)
      return Ok(list)
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = ListBookController
