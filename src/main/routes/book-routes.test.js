const assert = require('assert')
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

  describe('GET /books/:_id', () => {
    test('Should return 200 on success', async () => {
      const insertedBook = await bookModel.insertOne({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      await request(app)
        .get(`/api/books/${insertedBook.ops[0]._id}`)
        .expect(200)
        .then(response => {
          assert(response.body, insertedBook)
        })
    })

    test('Should return 500 when invalid data is provided', async () => {
      await request(app)
        .get('/api/books/any_id')
        .expect(500)
    })

    test('Should return empty body when not found', async () => {
      await request(app)
        .get('/api/books/4cc45467c55f4d2d2a000002')
        .expect(200)
    })
  })

  describe('GET /books/', () => {
    test('Should return 200 on success', async () => {
      const insertedBook = await bookModel.insertOne({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      await request(app)
        .get('/api/books')
        .expect(200)
        .then(response => {
          assert(response.body, insertedBook)
        })
    })

    test('Should return 200 on query by name success', async () => {
      const insertedBook = await bookModel.insertOne({
        name: 'any_name',
        author: 'any_author',
        description: 'any_description'
      })

      await request(app)
        .get('/api/books?name=any_')
        .expect(200)
        .then(response => {
          assert(response.body, insertedBook)
        })
    })

    test('Should return 200 on query by offset success', async () => {
      const insertedBook = [
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
      await bookModel.insertMany(insertedBook)

      insertedBook.shift()

      await request(app)
        .get('/api/books?offset=1')
        .expect(200)
        .then(response => {
          assert(response.body, insertedBook)
        })
    })

    test('Should return 401 when invalid offset is provided', async () => {
      await request(app)
        .get('/api/books?offset=oi')
        .expect(401)
    })

    test('Should return empty body when not found', async () => {
      await request(app)
        .get('/api/books')
        .expect(200)
    })
  })
})
