const GetBookController = require('./get-book-controller')
const { Unauthorized } = require('../helpers/http-helper.js')

const makeSut = () => {
  const sut = new GetBookController()
  return {
    sut
  }
}

describe('Get Book Controller', () => {
  test('Should thrown if no _id is provided', async () => {
    const { sut } = makeSut()
    const error = Unauthorized('Missing param: _id')

    const response = await sut.route({ body: {} })

    expect(response.body).toBe(error.body)
    expect(response.statusCode).toBe(error.statusCode)
  })
})
