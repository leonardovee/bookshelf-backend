const MongoHelper = require('../../helper/mongo-helper.js')

class ListBookRepository {
  async list ({ offset, name }) {
    if (name) return this.search({ offset, name })
    return this.find({ offset, name })
  }

  async search ({ offset, name }) {
    const bookCollection = await MongoHelper.getCollection('books')
    return await bookCollection
      .find({ name: { $regex: name, $options: 'i' } })
      .skip(parseInt(offset))
      .limit(10)
      .toArray()
  }

  async find ({ offset, name }) {
    const bookCollection = await MongoHelper.getCollection('books')
    return await bookCollection
      .find({})
      .skip(parseInt(offset))
      .limit(10)
      .toArray()
  }
}

module.exports = ListBookRepository
