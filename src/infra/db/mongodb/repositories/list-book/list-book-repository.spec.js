const ListBookRepository = require('./list-book-repository.js')
const MongoHelper = require('../../helper/mongo-helper.js')

let bookCollection = null

describe('List Book Repository', () => {
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

  describe('list()', () => {
    test('Should return full book list when no offset is provided', async () => {
      const insertedList = [
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        },
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        }
      ]
      await bookCollection.insertMany(insertedList)

      const sut = new ListBookRepository()

      const list = await sut.list({})

      expect(list).toEqual(insertedList)
    })

    test('Should return the book list offset', async () => {
      const insertedList = [
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        },
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        },
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        }
      ]
      await bookCollection.insertMany(insertedList)

      const sut = new ListBookRepository()

      const list = await sut.list({ offset: 1 })

      insertedList.shift()

      expect(list).toEqual(insertedList)
    })

    test('Should return the book list by name', async () => {
      let insertedList = [
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        },
        {
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        },
        {
          name: 'any_correct_name',
          author: 'any_author',
          description: 'any_description'
        }
      ]
      await bookCollection.insertMany(insertedList)

      const sut = new ListBookRepository()

      const list = await sut.list({ name: 'any_correct' })

      insertedList = [insertedList.pop()]

      expect(list).toEqual(insertedList)
    })
  })
})
