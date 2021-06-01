const MissingParamError = require('../../utils/errors/missing-param-error')

class AddBookUseCase {
  constructor (createBookRepository) {
    this.createBookRepository = createBookRepository
  }

  async add ({ name, author, description }) {
    if (!name) throw new MissingParamError('name')
    if (!author) throw new MissingParamError('author')
    if (!description) throw new MissingParamError('description')
    await this.createBookRepository.create({ name, author, description })
  }
}

module.exports = AddBookUseCase
