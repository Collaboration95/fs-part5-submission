const { test, after, describe,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: 'user1',
        passwordHash: 'password1',
        blogs: []
    },
    {
        username: 'user2',
        passwordHash: 'password2',
        blogs: []
    },
    {
        username: 'user3',
        passwordHash: 'password3',
        blogs: []}
    
];
describe('User API', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })

    test('GET /api/users should return all users', async () => {
        const response = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
        assert(response.body.length === initialUsers.length)
    })

    test('POST /api/users should create a new user', async () => {

        const newUser = {

            username: 'user4',
            password: 'password4',
            blogs: []
        }
        const response = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
        assert(response.body.username === newUser.username)
    })

    test('POST /api/users should return 400 if password is less than 3 characters', async () => {
        const newUser = {
            username: 'user4',
            password: 'pa',
            blogs: []
        }
        const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        assert(response.body.error === 'Password must be at least 3 characters long')
    })

    test('POST should only accept unique users', async () => {
        const newUser = {
            username: initialUsers[0].username,
            password: 'pa',
            blogs: []
        }
        const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        assert(response.body.error === 'Password must be at least 3 characters long')
    })

})


after(async () => {
    await mongoose.disconnect();
  });
  
