const request = require('supertest')
const app = require('../app');
const Category = require('../models/Category');
const Imagen = require('../models/Imagen');
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

test("GET / products debe retonar los productos", async()=>{
    const  res = await request(app).get('/products');
    
    expect(res.status).toBe(200);
    
    expect(res.body).toBeInstanceOf(Array);
})

test("POST / products debe crear un product", async()=>{ 
    const category = await Category.create({name : "Test"})
    const product = {
        
            title: "celular 2",
            description: ",.,nm.,m.,vmc.cx,m.x",
            brand: "ñsdñlfñdlfjñdl",
            price: 1234,
            categoryId : category.id
        
    }
    const  res = await request(app).post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id
       
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

test("PUT / products/:id debe actualizar un producto", async()=>{
    const productUpdated ={
        title: "Celular update"
    } 
    const  res = await request(app).put(`/products/${id}`)
        .send(productUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);    
})

test("Post / products/:id/images debe insertar las imagenes a  un producto", async()=>{
    const image = await Imagen.create({
        url : "dldldldldldldldl",
        publicId : "kdkdkdkdk"
    })
    const  res = await request(app)
        .post(`/products/${id}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    
})

test("DELETE / products/:id debe eliminar un producto", async()=>{
       
    const  res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
       
})