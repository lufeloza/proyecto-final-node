const request = require('supertest')
const app = require('../app');

let id;
let token;
test("POST / usuarios debe crear un usuario", async()=>{ 
    const user = {
        firstName: "Luna",
        lastName: "Lopez",
        email: "luna2@gmail.com",
        phone: "2299292929",
        password: "luna1234",
    }
    const  res = await request(app).post('/users').send(user);
    id = res.body.id
    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
   expect(res.body.password).toBeFalsy();
})
test('POST /users/login', async () =>{
    const body = {
        email: "luna2@gmail.com",
        password: "luna1234",
    }
    
    const res= await request(app).post('/users/login').send(body);
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
})
test("GET / users debe retonar los usuarios", async()=>{
    const  res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
test("PUT / usuarios/:id debe actualizar un usuario", async()=>{
    const userUpdated ={
        firstName: "Eliana",
        lastName: "Lopez",
        phone : "9999999999"
    } 
    const  res = await request(app).put(`/users/${id}`)
        .send(userUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName)
    expect(res.body.lastName).toBe(userUpdated.lastName)
    expect(res.body.phone).toBe(userUpdated.phone)
})


test('POST /users/login con credencial invalida debe retornar error ', async () =>{
    const body = {
        email: "invalid@gmail.com",
        password: "invalid1234",
    }
    const res= await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
    
})


test("DELETE / users/:id debe eliminar un usuario", async()=>{
       
    const  res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
    
})
// .set('Authorization', `Bearer ${token}`)