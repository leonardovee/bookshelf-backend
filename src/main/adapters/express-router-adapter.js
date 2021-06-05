class ExpressRouterAdapter {
  static adapt (router, func) {
    return async (req, res) => {
      const httpResponse = await router.route({
        body: req.body,
        params: req.params,
        query: req.query
      })
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

module.exports = ExpressRouterAdapter
