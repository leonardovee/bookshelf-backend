const MongoHelper = require('../../helper/mongo-helper.js')

class ListBookRepository {
  async list ({ offset, name }) {
    const bookCollection = await MongoHelper.getCollection('books')
    if (name) return await bookCollection.find({ name: { $regex: name, $options: 'i' } }).toArray()
    const result = await bookCollection
      .find({})
      .skip(parseInt(offset))
      .limit(100)
      .toArray()
    return result
  }
}

module.exports = ListBookRepository
