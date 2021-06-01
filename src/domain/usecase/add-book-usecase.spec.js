const AddBookUseCase = require('./add-book-usecase.js')
const MissingParamError = require('../../utils/errors/missing-param-error.js')

class CreateBookRepositoryStub {
  async create ({ name, author, description }) {}
}

const makeFakeRequest = () => ({
  name: 'any_name',
  author: 'any_author',
  description: 'any_description'
})

const makeSut = () => {
  const createBookRepositoryStub = new CreateBookRepositoryStub()
  const sut = new AddBookUseCase(createBookRepositoryStub)
  return {
    sut,
    createBookRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  describe('add()', () => {
    test('Should throw if no name is provided', () => {
      const { sut } = makeSut()

      const promise = sut.add({})

      expect(promise).rejects.toThrow(new MissingParamError('name'))
    })

    test('Should throw if no author is provided', () => {
      const { sut } = makeSut()

      const promise = sut.add({ name: 'any_name' })

      expect(promise).rejects.toThrow(new MissingParamError('author'))
    })

    test('Should throw if no description is provided', () => {
      const { sut } = makeSut()

      const promise = sut.add({ name: 'any_name', author: 'any_author' })

      expect(promise).rejects.toThrow(new MissingParamError('description'))
    })

    test('Should call CreateBookRepository with correct values', async () => {
      const { sut, createBookRepositoryStub } = makeSut()
      const createSpy = jest.spyOn(createBookRepositoryStub, 'create')

      await sut.add(makeFakeRequest())

      expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
    })

    test('Should returns false if CreateBookRepository fails', async () => {
      const { sut, createBookRepositoryStub } = makeSut()
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce(null)

      const response = await sut.add(makeFakeRequest())

      expect(response).toBe(false)
    })

    test('Should returns unique id if CreateBookRepository succeeds', async () => {
      const { sut, createBookRepositoryStub } = makeSut()
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce('any_row_unique_id')

      const response = await sut.add(makeFakeRequest())

      expect(response).toBe('any_row_unique_id')
    })

    test('Should throw if CreateBookRepository throws', async () => {
      const { sut, createBookRepositoryStub } = makeSut()
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

      const promise = sut.add(makeFakeRequest())

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
