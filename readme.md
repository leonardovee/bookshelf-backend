# bookshelf
[![Test Coverage](https://api.codeclimate.com/v1/badges/d6f45579b8219affa4ef/test_coverage)](https://codeclimate.com/github/leonardovee/bookshelf-backend/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/d6f45579b8219affa4ef/maintainability)](https://codeclimate.com/github/leonardovee/bookshelf-backend/maintainability) [![Build Status](https://www.travis-ci.com/leonardovee/bookshelf-backend.svg?branch=main)](https://www.travis-ci.com/leonardovee/bookshelf-backend)

Hello, to use this projet you gotta have installed in your machine: Node.js, NPM and Git, but since you're here, you have all of that.

Here we are using some principles of DDD to guide towards the architecture, and TDD to guide towards the development.

The api, basically, have one resource, `/books`.

To create a book just post to:
```
  <ENDPOINT>:<PORT>/api/books
```

### Payload to create a book:
```json
{
    "name": "",
    "author": "",
    "description": ""
}
```

You can fetch books doing a `get`:
```
  <ENDPOINT>:<PORT>/api/books
```

You can find a book doing a `get`:
```
  <ENDPOINT>:<PORT>/api/books/:uuid
```

There is also methods to search a book and pagination, `get`:
```
  <ENDPOINT>:<PORT>/api/books?name=harry
  <ENDPOINT>:<PORT>/api/books?offset=10
```

### To test the api first you gotta clone and set the enviroment vars:
```console
$ git clone https://github.com/leonardovee/bookshelf-backend.git

$ cd bookshelf-backend

$ cp .env .env.example
```
### Install dependencies and you're good to go:
```console
$ yarn

$ yarn start
```
