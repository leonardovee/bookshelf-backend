const GetBookRepository = require('../../infra/db/mongodb/repositories/get-book/get-book-repository.js')
const GetBookUseCase = require('../../domain/usecase/get-book/get-book-usecase.js')
const GetBookController = require('../../presentation/controllers/get-book/get-book-controller.js')

class GetBookControllerComposer {
  static compose () {
    const getBookRepository = new GetBookRepository()
    const getBookUseCase = new GetBookUseCase(getBookRepository)
    return new GetBookController(getBookUseCase)
  }
}

module.exports = GetBookControllerComposer
