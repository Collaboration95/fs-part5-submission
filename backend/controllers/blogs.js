const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt  = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

blogsRouter.get('/', async (request, response,next) => {
      try{const blogs= await Blog.find({}).populate('user')
    response.json(blogs)}
    catch(error){
        next(error)
    }
})
blogsRouter.post('/', async (request, response, next) => {
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token missing, this route requires auth token' });
        }

        const user = await User.findById(request.token.id);
        const blog = new Blog({ ...request.body, user: user._id });

        const result = await blog.save({ runValidators: true });
        // Update user's blogs array with the new blog's ID
        user.blogs = user.blogs.concat(result._id);
        // Save the updated user document
        await user.save();

        response.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token missing, this route requires auth token' });
        }

        const user = await User.findById(request.token.id);
        const blog = await Blog.findById(request.params.id);
        
        if (!blog) {
            return response.status(404).json({ error: 'blog not found' });
        }

        // Check if the user is authorized to delete this blog
        if (blog.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: 'unauthorized to delete this blog' });
        }

        // Update user's blogs array to remove the deleted blog's ID
        user.blogs = user.blogs.filter(b => b.toString() !== request.params.id.toString());
        await user.save();

        // Delete the blog document from the database
        await Blog.findByIdAndDelete(request.params.id);
        
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});


blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body;
        const blog ={
            ...body
        }
        console.log('blog',blog)
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter