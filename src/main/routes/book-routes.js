const createBookControllerComposer = require('../composers/create-book-controller-composer.js')
const GetBookControllerComposer = require('../composers/get-book-controller-composer.js')
const { adapt } = require('../adapters/express-router-adapter.js')

module.exports = router => {
  const createBookController = createBookControllerComposer.compose()
  router.post('/books', adapt(createBookController))
  const getBookControllerComposer = GetBookControllerComposer.compose()
  router.get('/books/:id', adapt(getBookControllerComposer))
}
