const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/reset', async (request, response) => {
  response.status(204).send('Hello World');

})

router.post('/reset', async (request, response) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    
    response.status(200).json({ message: 'Database reset successful. All blogs and users have been deleted.' });
  } catch (error) {
    response.status(500).json({ message: 'Database reset failed.', error: error.message });
  }
});

module.exports = router