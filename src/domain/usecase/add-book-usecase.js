const MissingParamError = require('../../utils/errors/missing-param-error')

class AddBookUseCase {
  async add ({ name }) {
    if (!name) throw new MissingParamError('name')
  }
}

module.exports = AddBookUseCase
