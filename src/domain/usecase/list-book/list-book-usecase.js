class ListBookUseCase {
  constructor (listBookRepository) {
    this.listBookRepository = listBookRepository
  }

  async list ({ offset, name }) {
    const list = await this.listBookRepository.list({ offset, name })
    if (!list) return []
    return list
  }
}

module.exports = ListBookUseCase
