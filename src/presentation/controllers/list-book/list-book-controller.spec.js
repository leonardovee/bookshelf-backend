const ListBookController = require('./list-book-controller.js')
const { Unauthorized, ServerError, Ok } = require('../../helpers/http-helper.js')

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
})
 