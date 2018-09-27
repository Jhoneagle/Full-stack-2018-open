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
      adult: true
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
  
  test('adding fails with proper statuscode and message if username already taken', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      adult: true
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
  
  test('adding fails with proper statuscode and message if password too small', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'passwordman',
      name: 'Superuser',
      password: 'f',
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be atleast 3 letters'})

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })
  
  test('adding user without boolean of being adult', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'noAgeMan',
      name: 'whereIsAge',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    
    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(response.body.adult).toBe(true)
  })
})
