const { Unauthorized } = require('../helpers/http-helper')

class GetBookController {
  async route (httpRequest) {
    const { _id } = httpRequest.body
    if (!_id) return Unauthorized('Missing param: _id')
  }
}

module.exports = GetBookController
