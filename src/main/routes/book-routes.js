const createBookControllerComposer = require('../composers/create-book-controller-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  const createBookController = createBookControllerComposer.compose()
  router.post('/books', adapt(createBookController))
}
