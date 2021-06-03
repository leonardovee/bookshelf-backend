const MissingParamError = require('../../utils/errors/missing-param-error')

class GetBookUseCase {
  constructor (getBookRepository) {
    this.getBookRepository = getBookRepository
  }

  async get ({ _id }) {
    if (!_id) throw new MissingParamError('_id')
    const book = await this.getBookRepository.get({ _id })
    if (!book) return {}
  }
}

module.exports = GetBookUseCase
