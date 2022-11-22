// SERVER requires
const express = require("express");
var cors = require('cors');
const fs = require('fs');
const https = require('https');
const { auth } = require('express-openid-connect');
const initDb = require("./services/db").initDb;
// SWAGGER requires
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./config");
var path = require('path');

////////////////////////////////////////////////////////////////
// SERVER SETUP
////////////////////////////////////////////////////////////////
const app = express();

// Get self signed certificate for https
const key = fs.readFileSync(path.resolve('server/key.pem'));
const cert = fs.readFileSync(path.resolve('server/cert.pem'));
const server = https.createServer({key: key, cert: cert }, app);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config.auth0.config));

// use CORS module
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// req.isAuthenticated is provided from the auth router
app.use("/login", require("./routes/login"));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Home Screen | User: Logged in' : 'Home Screen | User: Logged out');
});

// ROUTES requires
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
        url: 'https://localhost:3001',
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
// START SERVER
////////////////////////////////////////////////////////////////

initDb(
  server.listen(config.app.port, ()=>{
    console.log("Database connection is READY and "
      + "Server is listening on port", config.app.port);
  })
);