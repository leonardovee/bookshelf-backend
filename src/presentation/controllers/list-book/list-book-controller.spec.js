const ListBookController = require('./list-book-controller.js')
const { ServerError } = require('../../helpers/http-helper.js')

class ListBookUseCaseStub {
  async list ({ _id }) {}
}

const makeFakeRequest = () => ({
  query: {
    offset: 'any_offset'
  }
})

const makeSut = () => {
  const listBookUseCaseStub = new ListBookUseCaseStub()
  const sut = new ListBookController(listBookUseCaseStub)
  return {
    sut,
    listBookUseCaseStub
  }
}

describe('List Book Controller', () => {
  test('Should call ListBookUseCase with correct values', async () => {
    const { sut, listBookUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(listBookUseCaseStub, 'list')

    await sut.route(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().query)
  })

  test('Should return 500 if ListBookUseCase throws', async () => {
    const { sut, listBookUseCaseStub } = makeSut()
    jest.spyOn(listBookUseCaseStub, 'list').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const error = ServerError()

    const response = await sut.route(makeFakeRequest())

    expect(response.body).toBe(error.body)
    expect(response.statusCode).toBe(error.statusCode)
  })
})
