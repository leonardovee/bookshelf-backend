const MissingParamError = require('../../utils/errors/missing-param-error')
const GetBookUseCase = require('./get-book-usecase')

const makeSut = () => {
  const sut = new GetBookUseCase()
  return {
    sut
  }
}

describe('Get Book Usecase', () => {
  test('Should throw if no _id is provided', () => {
    const { sut } = makeSut()

    const promise = sut.get({})

    expect(promise).rejects.toThrow(new MissingParamError('_id'))
  })
})
