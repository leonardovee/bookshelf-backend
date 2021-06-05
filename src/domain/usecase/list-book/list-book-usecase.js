class ListBookUseCase {
  constructor (listBookRepository) {
    this.listBookRepository = listBookRepository
  }

  async list ({ offset }) {
    await this.listBookRepository.list({ offset })
  }
}

module.exports = ListBookUseCase
