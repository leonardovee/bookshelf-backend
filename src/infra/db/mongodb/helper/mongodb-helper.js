const { MongoClient } = require('mongodb')

const MongodbHelper = {
  client: null,
  url: null,

  async connect (url) {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect () {
    await this.client.close()
    this.client = null
  },

  async getCollection (name) {
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },

  map (collection) {
    const { _id, ...collectionWithoudId } = collection
    return Object.assign({}, collectionWithoudId, { id: _id })
  }
}

module.exports = MongodbHelper
