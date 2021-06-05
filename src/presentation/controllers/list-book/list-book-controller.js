const { ServerError } = require('../../helpers/http-helper.js')

class ListBookController {
  constructor (listBookUseCase) {
    this.listBookUseCase = listBookUseCase
  }

  async route (httpRequest) {
    try {
      const { query } = httpRequest
      await this.listBookUseCase.list(query)
    } catch (error) {
      return ServerError()
    }
  }
}

module.exports = ListBookController
