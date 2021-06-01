const MissingParamError = require('../../utils/errors/missing-param-error')

class AddBookUseCase {
  async add ({ name, author }) {
    if (!name) throw new MissingParamError('name')
    if (!author) throw new MissingParamError('author')
  }
}

module.exports = AddBookUseCase
