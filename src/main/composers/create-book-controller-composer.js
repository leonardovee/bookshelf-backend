const CreateBookRepository = require('../../infra/db/mongodb/repositories/create-book/create-book-repository.js')
const AddBookUseCase = require('../../domain/usecase/add-book/add-book-usecase.js')
const CreateBookController = require('../../presentation/controllers/create-book/create-book-controller.js')

class CreateBookControllerComposer {
  static compose () {
    const createBookRepository = new CreateBookRepository()
    const addBookUseCase = new AddBookUseCase(createBookRepository)
    return new CreateBookController(addBookUseCase)
  }
}

module.exports = CreateBookControllerComposer
