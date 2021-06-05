const ListBookUseCase = require('./list-book-usecase.js')

class ListBookRepositoryStub {
  async list ({ _id }) {}
}

const makeFakeRequest = () => ({
  offset: 'any_offset'
})

const makeSut = () => {
  const listBookRepositoryStub = new ListBookRepositoryStub()
  const sut = new ListBookUseCase(listBookRepositoryStub)
  return {
    sut,
    listBookRepositoryStub
  }
}

describe('List Book Usecase', () => {
  test('Should call ListBookRepository with correct values', async () => {
    const { sut, listBookRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(listBookRepositoryStub, 'list')

    await sut.list(makeFakeRequest())

    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
