const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/books.js'];

const doc = {
    info: {
        version: "1.0.0",
        title: "Quinn's Reading List API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module. <a href='https://github.com/qcoyle/books'>GitHub</a>"
    },
    host: "api.quinncoyle.com",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
        "name": "Book",
        "description": "Endpoints"
    }]
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
});