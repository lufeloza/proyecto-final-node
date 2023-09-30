const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const userTest ={
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com",
            phone: "2299292929",
            password: "test1234"
        }
        await request(app).post('/users').send(userTest);
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();