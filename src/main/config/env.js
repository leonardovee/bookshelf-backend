module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://<user>:<password>@cluster0.5umt5.mongodb.net/<database>?retryWrites=true&w=majority',
  port: process.env.PORT || 5050
}
