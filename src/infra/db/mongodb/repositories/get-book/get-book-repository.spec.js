const GetBookRepository = require('./get-book-repository.js')
const MongoHelper = require('../../helper/mongo-helper.js')

let bookCollection = null

describe('Get Book Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    bookCollection = await MongoHelper.getCollection('books')
    await bookCollection.deleteMany({})
  })

  describe('get()', () => {
    test('Should return a book on get success', async () => {
      const insertedBook = await bookCollection.insertOne({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })
      const sut = new GetBookRepository()

      const book = await sut.get({ _id: insertedBook.ops[0]._id })

      expect(book).toBeTruthy()
      expect(book.id).toBeTruthy()
      expect(book.name).toBe('any_name')
      expect(book.author).toBe('any_author')
      expect(book.description).toBe('any_description')
    })

    test('Should return null on get failure', async () => {
      const sut = new GetBookRepository()

      const book = await sut.get({ _id: '4cc45467c55f4d2d2a000002' })

      expect(book).toBeNull()
    })
  })
})
