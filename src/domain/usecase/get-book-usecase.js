const MissingParamError = require('../../utils/errors/missing-param-error')

class GetBookUseCase {
  async get ({ _id }) {
    if (!_id) throw new MissingParamError('_id')
  }
}

module.exports = GetBookUseCase
