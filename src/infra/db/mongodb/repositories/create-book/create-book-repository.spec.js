const CreateBookRepository = require('./create-book-repository.js')
const MongoHelper = require('../../helper/mongo-helper.js')

let bookCollection = null

describe('Create Book Repository', () => {
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

  describe('create()', () => {
    test('Should return an book on create success', async () => {
      const sut = new CreateBookRepository()

      const book = await sut.create({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      expect(book).toBeTruthy()
      expect(book.id).toBeTruthy()
      expect(book.name).toBe('any_name')
      expect(book.author).toBe('any_author')
      expect(book.description).toBe('any_description')
    })
  })
})
