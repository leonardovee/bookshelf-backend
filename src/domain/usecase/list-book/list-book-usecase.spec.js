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

  test('Should returns empty if ListBookRepository fails', async () => {
    const { sut, listBookRepositoryStub } = makeSut()
    jest.spyOn(listBookRepositoryStub, 'list').mockReturnValueOnce(null)

    const response = await sut.list(makeFakeRequest())

    expect(response).toStrictEqual([])
  })

  test('Should throw if ListBookRepository throws', async () => {
    const { sut, listBookRepositoryStub } = makeSut()
    jest.spyOn(listBookRepositoryStub, 'list').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.list(makeFakeRequest())

    expect(promise).rejects.toThrow(new Error())
  })
})
