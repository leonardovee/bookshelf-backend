const BookController = require('./book-controller.js')
const { Unauthorized, ServerError, Ok } = require('./helpers/http-helper.js')

class AddBookUseCaseStub {
  async add ({ name, author, description }) {}
}

describe('Book Controller', () => {
  describe('POST', () => {
    test('Should thrown if no name is provided', async () => {
      const sut = new BookController()
      const error = Unauthorized('Missing param: name')

      const response = await sut.post({})

      expect(response.body).toBe(error.body)
      expect(response.statusCode).toBe(error.statusCode)
    })

    test('Should thrown if no author is provided', async () => {
      const sut = new BookController()
      const error = Unauthorized('Missing param: author')

      const response = await sut.post({ name: 'any_name' })

      expect(response.body).toBe(error.body)
      expect(response.statusCode).toBe(error.statusCode)
    })

    test('Should thrown if no description is provided', async () => {
      const sut = new BookController()
      const error = Unauthorized('Missing param: description')

      const response = await sut.post({
        name: 'any_name',
        author: 'any_author'
      })

      expect(response.body).toBe(error.body)
      expect(response.statusCode).toBe(error.statusCode)
    })

    test('Should call AddBookUseCase with correct values', async () => {
      const addBookUseCaseStub = new AddBookUseCaseStub()
      const addSpy = jest.spyOn(addBookUseCaseStub, 'add')
      const sut = new BookController(addBookUseCaseStub)

      await sut.post({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(addSpy).toHaveBeenCalledWith({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })
    })

    test('Should return 500 if AddBookUseCase throws', async () => {
      const addBookUseCaseStub = new AddBookUseCaseStub()
      jest.spyOn(addBookUseCaseStub, 'add').mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
      const error = ServerError()
      const sut = new BookController(addBookUseCaseStub)

      const response = await sut.post({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(response.body).toBe(error.body)
      expect(response.statusCode).toBe(error.statusCode)
    })

    test('Should return 201 on success', async () => {
      const addBookUseCaseStub = new AddBookUseCaseStub()
      const sut = new BookController(addBookUseCaseStub)
      const ok = Ok()

      const response = await sut.post({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(response.body).toBe(ok.body)
      expect(response.statusCode).toBe(ok.statusCode)
    })
  })
})
