const BookController = require('./book-controller.js')
const { Unauthorized } = require('./helpers/http-helper.js')

describe('Book Controller', () => {
  describe('POST', () => {
    test('Should thrown if no name is provided', async () => {
      const sut = new BookController()
      const error = Unauthorized('Missing param: name')

      const response = await sut.post({})

      expect(response.body).toBe(error.body)
      expect(response.statusCode).toBe(error.statusCode)
    })
  })
})