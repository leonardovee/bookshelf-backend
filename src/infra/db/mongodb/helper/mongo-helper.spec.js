const sut = require('./mongo-helper.js')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongo is down', async () => {
    let accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
  })
})
