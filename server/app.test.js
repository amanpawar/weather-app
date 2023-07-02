import request from 'supertest'
import app from './app.js'


describe("GET /weather/:location", () => {
  describe("given a correct location", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).get(`/weather/london`)
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).get(`/weather/london`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has name, weather and main", async () => {
      const response = await request(app).get(`/weather/london`)
      expect(response.body.name).toBeDefined()
      expect(response.body.weather).toBeDefined()
      expect(response.body.main).toBeDefined()
    })
  })

  describe("when the location is not given", () => {
    test("should respond with a status code of 404", async () => {
      const response = await request(app).get(`/weather/`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe("when the location is not a valid city", () => {
    test("should respond with a status code of 200 and body.cod as 404", async () => {
      const response = await request(app).get(`/weather/jhbvjhbek`)
      expect(response.statusCode).toBe(200)
      expect(response.body.cod).toBe("404")
    })
  })

})