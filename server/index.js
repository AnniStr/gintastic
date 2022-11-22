const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3001;
var cors = require('cors');
const app = express();
const initDb = require("./services/db").initDb;

////////////////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use("/books", require("./routes/books"));
app.use("/gins", require("./routes/gins"));

////////////////////////////////////////////////////////////////
// SWAGGER
////////////////////////////////////////////////////////////////
{
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "GinTastic WebApp Express API with Swagger",
      version: "1.0.0",
      description:
        "Web App for everything arround Gin. API Documented with Swagger",
      contact: {
        name: "GinTastic.gin",
        url: "https://www.gin-tastic.gin"
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: "gins",
        description: "Operations about publicly available gins"
      },
    ]
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
  });
}
////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////
// START SERVER
////////////////////////////////////////////////////////////////

initDb(
  app.listen(PORT, ()=>{
    console.log("Database connection is READY and "
          + "Server is listening on port", PORT);
  })
);