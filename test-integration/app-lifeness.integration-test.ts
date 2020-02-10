import request from 'supertest'
import express from 'express'
import appFactory from '../src/app'
import { OK } from 'http-status-codes'
import { connect, disconnect } from '../src/lib/mongo'

import { any } from 'expect'

const app = appFactory(express)
describe('when calling the lifeness probe', () => {
  describe('and mongo is up and running', () => {
    beforeAll(() => connect())

    afterAll(() => disconnect())

    it('should return 200', async () => {
      const response = await request(app).get('/probes/health')

      expect(response.status).toEqual(OK)
    })

    it('should return the health info', async () => {
      const response = await request(app).get('/probes/health')

      expect(response.body as object).toHaveProperty('hostname', any(String))
      expect(response.body as object).toHaveProperty('upForSeconds', any(Number))
    })
  })

  describe('and mongo is not up', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/probes/health')

      expect(response.status).toEqual(OK)
    })

    it('should return the health info', async () => {
      const response = await request(app).get('/probes/health')

      expect(response.body as object).toHaveProperty('hostname', any(String))
      expect(response.body as object).toHaveProperty('upForSeconds', any(Number))
    })
  })
})
