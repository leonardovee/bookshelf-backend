class ListBookController {
  constructor (listBookUseCase) {
    this.listBookUseCase = listBookUseCase
  }

  async route (httpRequest) {
    const { query } = httpRequest
    await this.listBookUseCase.list(query)
  }
}

module.exports = ListBookController
