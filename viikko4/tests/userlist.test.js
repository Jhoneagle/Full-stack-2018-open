const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', name: 'admin', password: 'sekret', adult: 'true' })
    await user.save()
  })

  test('adding user succeeds with a fresh username', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'testman',
      name: 'Testi Ihminen',
      password: 'salainen',
      adult: 'true'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    const usernames = await usersAfter.map(u => u.username)
    
    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usernames).toContain(newUser.username)
  })
  
  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique'})

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })
})
