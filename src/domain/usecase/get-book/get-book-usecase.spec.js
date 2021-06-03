const MissingParamError = require('../../../utils/errors/missing-param-error.js')
const GetBookUseCase = require('./get-book-usecase.js')

class GetBookRepositoryStub {
  async get ({ _id }) {}
}

const makeFakeRequest = () => ({
  _id: 'any_id'
})

const makeSut = () => {
  const getBookRepositoryStub = new GetBookRepositoryStub()
  const sut = new GetBookUseCase(getBookRepositoryStub)
  return {
    sut,
    getBookRepositoryStub
  }
}

describe('Get Book Usecase', () => {
  test('Should throw if no _id is provided', () => {
    const { sut } = makeSut()

    const promise = sut.get({})

    expect(promise).rejects.toThrow(new MissingParamError('_id'))
  })

  test('Should call GetBookRepository with correct values', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(getBookRepositoryStub, 'get')

    await sut.get(makeFakeRequest())

    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should returns empty if GetBookRepository fails', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    jest.spyOn(getBookRepositoryStub, 'get').mockReturnValueOnce(null)

    const response = await sut.get(makeFakeRequest())

    expect(response).toStrictEqual({})
  })

  test('Should throw if GetBookRepository throws', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    jest.spyOn(getBookRepositoryStub, 'get').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.get(makeFakeRequest())

    expect(promise).rejects.toThrow(new Error())
  })

  test('Should returns book if CreateBookRepository succeeds', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    const book = {
      _id: 'any_id',
      name: 'any_name',
      author: 'any_author',
      description: 'any_description'
    }
    jest.spyOn(getBookRepositoryStub, 'get').mockReturnValueOnce(book)

    const response = await sut.get(makeFakeRequest())

    expect(response).toBe(book)
  })
})
