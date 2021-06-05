const MongoHelper = require('../../helper/mongo-helper.js')

class CreateBookRepository {
  async create ({ name, author, description }) {
    const bookCollection = await MongoHelper.getCollection('books')
    const result = await bookCollection.insertOne({ name, author, description })
    return MongoHelper.map(result.ops[0])
  }
}

module.exports = CreateBookRepository
