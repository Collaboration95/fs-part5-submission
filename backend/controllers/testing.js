const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/reset', async (request, response) => {
  response.status(204).send('Hello World');

})

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router