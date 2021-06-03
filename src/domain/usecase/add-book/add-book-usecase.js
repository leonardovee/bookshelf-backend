const MissingParamError = require('../../../utils/errors/missing-param-error.js')

class AddBookUseCase {
  constructor (createBookRepository) {
    this.createBookRepository = createBookRepository
  }

  async add ({ name, author, description }) {
    if (!name) throw new MissingParamError('name')
    if (!author) throw new MissingParamError('author')
    if (!description) throw new MissingParamError('description')
    const isCreated = await this.createBookRepository.create({ name, author, description })
    if (!isCreated) return false
    return isCreated
  }
}

module.exports = AddBookUseCase
