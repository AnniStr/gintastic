const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3001;
const app = express();

////////////////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/books", require("./routes/books"));
// app.use("/users", require("./routes/users"));
app.use("/gins", require("./routes/gins"));
// app.use("/tags", require("./routes/tags"));

const initDb = require("./db").initDb;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

////////////////////////////////////////////////////////////////
// DATABASE
////////////////////////////////////////////////////////////////

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "7YkECdk=dhhk",
//     database: "gintasticDB"
//   });
  
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

////////////////////////////////////////////////////////////////
// SWAGGER
////////////////////////////////////////////////////////////////

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "GinTastic WebApp Express API with Swagger",
    version: "1.0.0",
    description:
      "Web App for everything arround Gin. API Documented with Swagger",
    contact: {
      name: "Gin-Perium.de",
      url: "https://www.gin-perium.de"
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['server/swagger-components.js','server/routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
}),

////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);