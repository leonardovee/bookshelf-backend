const AddBookUseCase = require('./add-book-usecase.js')
const MissingParamError = require('../../utils/errors/missing-param-error.js')

describe('AddBook Usecase', () => {
  describe('add()', () => {
    test('Should throw if no name is provided', () => {
      const sut = new AddBookUseCase()

      const promise = sut.add({})

      expect(promise).rejects.toThrow(new MissingParamError('name'))
    })
  })
})
