const { ObjectId } = require('mongodb')
const MongoHelper = require('../../helper/mongo-helper.js')

class GetBookRepository {
  async get ({ _id }) {
    const bookCollection = await MongoHelper.getCollection('books')
    const result = await bookCollection.findOne({ _id: ObjectId(_id) })
    if (!result) return null
    return MongoHelper.map(result)
  }
}

module.exports = GetBookRepository
