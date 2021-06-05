const ListBookRepository = require('../../infra/db/mongodb/repositories/list-book/list-book-repository.js')
const ListBookUseCase = require('../../domain/usecase/list-book/list-book-usecase.js')
const ListBookController = require('../../presentation/controllers/list-book/list-book-controller.js')

class ListBookControllerComposer {
  static compose () {
    const listBookRepository = new ListBookRepository()
    const listBookUseCase = new ListBookUseCase(listBookRepository)
    return new ListBookController(listBookUseCase)
  }
}

module.exports = ListBookControllerComposer
