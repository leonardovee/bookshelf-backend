const MissingParamError = require('../../utils/errors/missing-param-error')

class AddBookUseCase {
  async add ({ name, author, description }) {
    if (!name) throw new MissingParamError('name')
    if (!author) throw new MissingParamError('author')
    if (!description) throw new MissingParamError('description')
  }
}

module.exports = AddBookUseCase
