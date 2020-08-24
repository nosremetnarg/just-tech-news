const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => { // this is incase the user requests an endpoint that doesn't exist
  res.status(404).end();
});

module.exports = router;


// prefixing all the routes adding in /api