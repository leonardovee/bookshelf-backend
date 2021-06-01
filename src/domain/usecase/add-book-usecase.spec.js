const AddBookUseCase = require('./add-book-usecase.js')
const MissingParamError = require('../../utils/errors/missing-param-error.js')

class CreateBookRepositoryStub {
  async create ({ name, author, description }) {}
}

describe('AddBook Usecase', () => {
  describe('add()', () => {
    test('Should throw if no name is provided', () => {
      const sut = new AddBookUseCase()

      const promise = sut.add({})

      expect(promise).rejects.toThrow(new MissingParamError('name'))
    })

    test('Should throw if no author is provided', () => {
      const sut = new AddBookUseCase()

      const promise = sut.add({ name: 'any_name' })

      expect(promise).rejects.toThrow(new MissingParamError('author'))
    })

    test('Should throw if no description is provided', () => {
      const sut = new AddBookUseCase()

      const promise = sut.add({ name: 'any_name', author: 'any_author' })

      expect(promise).rejects.toThrow(new MissingParamError('description'))
    })

    test('Should call CreateBookRepository with correct values', async () => {
      const createBookRepositoryStub = new CreateBookRepositoryStub()
      const sut = new AddBookUseCase(createBookRepositoryStub)
      const createSpy = jest.spyOn(createBookRepositoryStub, 'create')

      await sut.add({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(createSpy).toHaveBeenCalledWith({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })
    })

    test('Should returns false if CreateBookRepository fails', async () => {
      const createBookRepositoryStub = new CreateBookRepositoryStub()
      const sut = new AddBookUseCase(createBookRepositoryStub)
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce(null)

      const response = await sut.add({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(response).toBe(false)
    })

    test('Should returns unique id if CreateBookRepository succeeds', async () => {
      const createBookRepositoryStub = new CreateBookRepositoryStub()
      const sut = new AddBookUseCase(createBookRepositoryStub)
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce('any_row_unique_id')

      const response = await sut.add({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(response).toBe('any_row_unique_id')
    })

    test('Should throw if CreateBookRepository throws', async () => {
      const createBookRepositoryStub = new CreateBookRepositoryStub()
      const sut = new AddBookUseCase(createBookRepositoryStub)
      jest.spyOn(createBookRepositoryStub, 'create').mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

      const promise = sut.add({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
