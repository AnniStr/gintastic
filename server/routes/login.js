const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Login Screen | User: Logged in' : 'Login Screen | User: Logged out');
});

module.exports = router;