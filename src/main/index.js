const MongoHelper = require('../infra/db/mongodb/helper/mongo-helper.js')
const env = require('./config/env.js')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
