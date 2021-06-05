class ListBookUseCase {
  constructor (listBookRepository) {
    this.listBookRepository = listBookRepository
  }

  async list ({ offset }) {
    const list = await this.listBookRepository.list({ offset })
    if (!list) return []
  }
}

module.exports = ListBookUseCase
