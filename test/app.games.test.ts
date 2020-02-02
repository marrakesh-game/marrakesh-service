import request from 'supertest'
import app from '../src/app'

describe('the games route', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
})
