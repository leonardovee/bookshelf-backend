const ListBookController = require('./list-book-controller.js')
const { Ok, ServerError, Unauthorized } = require('../../helpers/http-helper.js')

class ListBookUseCaseStub {
  async list ({ _id }) {}
}

const makeFakeRequest = () => ({
  query: {
    offset: 10
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

  test('Should return 401 if query is incorrect', async () => {
    const { sut } = makeSut()
    const error = Unauthorized()

    const response = await sut.route({
      query: {
        offset: 'any_offset'
      }
    })

    expect(response.body).toBe('Incorrect param value: offset')
    expect(response.statusCode).toBe(error.statusCode)
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

  test('Should return the list on success', async () => {
    const { sut, listBookUseCaseStub } = makeSut()
    const list = [
      {
        _id: 'any_id',
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      },
      {
        _id: 'any_id',
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      }
    ]
    jest.spyOn(listBookUseCaseStub, 'list').mockReturnValueOnce(list)
    const ok = Ok(list)

    const response = await sut.route(makeFakeRequest())

    expect(response.body).toBe(ok.body)
    expect(response.statusCode).toBe(ok.statusCode)
  })
})
