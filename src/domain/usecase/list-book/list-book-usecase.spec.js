const ListBookUseCase = require('./list-book-usecase.js')

class ListBookRepositoryStub {
  async list ({ _id }) {}
}

const makeFakeRequest = () => ({
  offset: 'any_offset',
  name: 'any_name'
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

  test('Should returns list if ListBookRepository succeeds', async () => {
    const { sut, listBookRepositoryStub } = makeSut()
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
    jest.spyOn(listBookRepositoryStub, 'list').mockReturnValueOnce(list)

    const response = await sut.list(makeFakeRequest())

    expect(response).toBe(list)
  })
})
