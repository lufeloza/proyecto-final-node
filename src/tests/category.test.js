const request = require('supertest')
const app = require('../app');

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

test("GET / categories debe retonar las categorias", async()=>{
    const  res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST / categories debe crear una categoria", async()=>{ 
    const category = {
        name: "Celulares"
    }
    const  res = await request(app).post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id
       
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("PUT / categories/:id debe actualizar una categoria", async()=>{
    const categoryUpdated ={
        name: "Celulares update"
    } 
    const  res = await request(app).put(`/categories/${id}`)
        .send(categoryUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);    
})

test("DELETE / categories/:id debe eliminar una categoria", async()=>{
       
    const  res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
       
})

// .set('Authorization', `Bearer ${token}`)