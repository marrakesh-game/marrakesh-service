import request from 'supertest'
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { connect, disconnect } from '../src/lib/mongo'
import express from 'express'
import appFactory from '../src/app'

const app = appFactory(express)
describe('when calling the readiness probe', () => {
  describe('and mongo is up and running', () => {
    beforeAll(() => connect())

    afterAll(() => disconnect())

    it('should return 200', async () => {
      const response = await request(app).get('/probes/ready')

      expect(response.status).toEqual(OK)
    })

    it('should return ready as true', async () => {
      const response = await request(app).get('/probes/ready')

      expect(response.body as object).toHaveProperty('isReady', true)
    })
  })

  describe('and mongo is not up', () => {
    it('should return 500', async () => {
      const response = await request(app).get('/probes/ready')

      expect(response.status).toEqual(INTERNAL_SERVER_ERROR)
    })

    it('should return ready as false', async () => {
      const response = await request(app).get('/probes/ready')

      expect(response.body as object).toHaveProperty('isReady', false)
    })
  })
})
