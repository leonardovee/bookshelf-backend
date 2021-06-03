const GetBookController = require('./get-book-controller')
const { Unauthorized, ServerError } = require('../helpers/http-helper.js')

class GetBookUseCaseStub {
  async get ({ _id }) {}
}

const makeFakeRequest = () => ({
  body: {
    _id: 'any_id'
  }
})

const makeSut = () => {
  const getBookUseCaseStub = new GetBookUseCaseStub()
  const sut = new GetBookController(getBookUseCaseStub)
  return {
    sut,
    getBookUseCaseStub
  }
}

describe('Get Book Controller', () => {
  test('Should thrown if no _id is provided', async () => {
    const { sut } = makeSut()
    const error = Unauthorized('Missing param: _id')

    const response = await sut.route({ body: {} })

    expect(response.body).toBe(error.body)
    expect(response.statusCode).toBe(error.statusCode)
  })

  test('Should call GetBookUseCase with correct values', async () => {
    const { sut, getBookUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(getBookUseCaseStub, 'get')

    await sut.route(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 500 if GetBookUseCase throws', async () => {
    const { sut, getBookUseCaseStub } = makeSut()
    jest.spyOn(getBookUseCaseStub, 'get').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const error = ServerError()

    const response = await sut.route(makeFakeRequest())

    expect(response.body).toBe(error.body)
    expect(response.statusCode).toBe(error.statusCode)
  })
})