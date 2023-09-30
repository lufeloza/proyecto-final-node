const request = require('supertest')
const app = require('../app');
require ('../models')

let id;
let token;

beforeAll(async()=>{
          
        const body ={
            email: "test@gmail.com",
            password: "test1234"
        }
        const res = await request(app).post('/users/login').send(body);
        token = res.body.token
    
})

test("GET / carts", async()=>{
    const  res = await request(app)
    .get('/carts')
    .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);    
    expect(res.body).toBeInstanceOf(Array);
})

test("POST / carts", async()=>{ 
    
    const body = { quantity: 4 }
    const  res = await request(app).post('/carts')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id
       
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(body.quantity)
})

test("DELETE / carts/:id ", async()=>{
       
    const  res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
       
})

