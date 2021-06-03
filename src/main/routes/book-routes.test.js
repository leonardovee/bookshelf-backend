const request = require('supertest')
const app = require('../config/app.js')
const MongoHelper = require('../../infra/db/mongodb/helper/mongo-helper.js')

describe('Book Routes', () => {
  let bookModel

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    bookModel = await MongoHelper.getCollection('books')
  })

  beforeEach(async () => {
    await bookModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /books', () => {
    test('Should return 201 on success', async () => {
      await request(app)
        .post('/api/books')
        .send({
          name: 'any_name',
          author: 'any_author',
          description: 'any_description'
        })
        .expect(201)
    })

    test('Should create a book on success', async () => {
      const insertedBook = {
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      }
      await request(app)
        .post('/api/books')
        .send(insertedBook)
      const { _id, ...retrievedBook } = await bookModel.findOne({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })
      expect(retrievedBook).toEqual(insertedBook)
    })

    test('Should return 401 when invalid data is provided', async () => {
      await request(app)
        .post('/api/books')
        .send({
          name: 'any_name',
          author: 'any_author'
        })
        .expect(401)
    })
  })
})
