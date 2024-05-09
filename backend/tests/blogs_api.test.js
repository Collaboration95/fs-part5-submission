const { test, after, describe,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Author 1",
    url: "www.blog1.com",
    likes: 10
  },
  {
    title: "Blog 2",
    author: "Author 2",
    url: "www.blog2.com",
    likes: 5
  },
  {
    title: "Blog 3",
    author: "Author 3",
    url: "www.blog3.com",
    likes: 15
  },
  {
    title: "Blog 4",
    author: "Author 4",
    url: "www.blog4.com",
    likes: 8
  },
  {
    title: "Blog 5",
    author: "Author 5",
    url: "www.blog5.com",
    likes: 12
  }
];

describe('test get requets ()', async ()=>{
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test ('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('Number of blog posts', async () => {
    const response = 
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
      assert(response.body.length === initialBlogs.length)
  })

  test('unique identifier property', async () => {
    const response = 
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      response.body.forEach(blog => {
        assert(blog.id !== undefined,'Blog id should be defined')
        assert(blog._id===undefined,'Blog _id should be undefined')

      })
  })
})

describe('test post requests', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('Missing Likes Post Request',async()=>
    {
      const newBlog = {
        title:"This blog has likes parameter missing when posted",
        author:"Guru",
        url:"www.guru.com"
      }
      const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
      assert(response.body.likes==0)
  })

  test("POST request", async () => {  

    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "www.test.com",
      likes: 0
    }
    const getLength = await api.get('/api/blogs')
    const length = getLength.body.length
    const uploadBlog = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const getLengthAfter = await api.get('/api/blogs')
    const lengthAfter = getLengthAfter.body.length
    assert(lengthAfter === length + 1)
  })


test('Missing Title and URL Post Request', async () => {
  const newBlog = {
    author:"test Author",
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(400).expect('Content-Type', /application\/json/)
  assert(response.status === 400)
})
})

describe("test delete requests", async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('Delete Request', async () => {
    const getLength = await api.get('/api/blogs')
    const length = getLength.body.length
    const deleteBlog = await api.delete(`/api/blogs/${getLength.body[0].id}`).expect(204)
    const getLengthAfter = await api.get('/api/blogs')
    const lengthAfter = getLengthAfter.body.length
    assert(lengthAfter === length - 1)
  })
})
describe.only('test update requests', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
  
  test.only('Update Request', async () => {
    const getBlogs = await api.get('/api/blogs')
    const blogToUpdate = getBlogs.body[0]
    const updatedBlog = {
      ...blogToUpdate,
      title: 'Updated Blog Title',
      likes: 20
    }
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(response.body.title === updatedBlog.title, 'Title should be updated');
  })
})

after(async () => {
  await mongoose.disconnect();
});
