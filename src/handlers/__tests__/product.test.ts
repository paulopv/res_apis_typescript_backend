import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should create a new product', async() => {
        const response = await request(server).post('/api/products').send({
            "name" : "Mouse",
            "price": 50
        })
        expect(response.status).toBe(201)

        expect(response.status).not.toBe(400)
        expect(response.body.data.name).toBe("Mouse")
        expect(response.body.data.price).toBe(50) 
    })
})

describe('GET /api/products/', () =>{
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(Array.isArray(response.body.data)).toBe(true)

        expect(response.status).not.toBe(201)
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('error')

    })
})