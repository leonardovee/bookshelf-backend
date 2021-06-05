const MongoHelper = require('../../helper/mongo-helper.js')

class ListBookRepository {
  async list ({ offset }) {
    const bookCollection = await MongoHelper.getCollection('books')
    const result = await bookCollection.find({}).toArray()
    return result
  }
}

module.exports = ListBookRepository
