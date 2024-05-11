const {describe, it, after, before} = require('mocha')

const superTest = require('supertest')
const assert = require('assert')

describe('API test', () => {
  let app

  before((done) => {
     app = require('./api')
     app.once('listening', done)
  })

  after((done) => app.close(done))

  describe('/contact', () => {
     it('should request the contact page and return HTTP status 200', async () => {
      const response = await superTest(app)
      .get('/contact')
      .expect(200) 

      assert.strictEqual(response.text, 'contact us page')
     })
  })

  describe('/contact:get', () => {
     it('should request the contact page and return HTTP status 200', async () => {
      const response = await superTest(app)
      .get('/contact')
      .expect(200) 

      assert.strictEqual(response.text, 'contact us page')
     })
  })

  describe('/login:post', () => {
     it('should request the login and return http status 200', async () => {
      const response = await superTest(app)
      .post('/login')
      .send({
        userName: 'teste',
        password: '123'
      })
      .expect(200) 

      assert.strictEqual(response.text, 'ok')
     })

     it('should request the login and return http status 401', async () => {
      const response = await superTest(app)
      .post('/login')
      .send({
        userName: 'incorrect_user',
        password: '123'
      })
      .expect(401) 

      assert.strictEqual(response.text, 'Login Failed')
     })
  })
  describe('404 not found', () => {
   it('should return http status 404', async () => {
      const response = await superTest(app)
      .get('/invalid-route')
      .send({
        userName: 'incorrect_user',
        password: '123'
      })
      .expect(404)

      assert.strictEqual(response.text, 'not found')
     }) 
  })
})