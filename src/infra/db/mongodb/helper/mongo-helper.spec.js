const sut = require('./mongo-helper.js')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongo is down', async () => {
    let bookCollection = await sut.getCollection('book')
    expect(bookCollection).toBeTruthy()

    await sut.disconnect()

    bookCollection = await sut.getCollection('book')
    expect(bookCollection).toBeTruthy()
  })
})
