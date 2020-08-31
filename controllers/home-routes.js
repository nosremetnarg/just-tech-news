const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage'); // using render instead of send or sendfile
}); // .handlebars extension is implied

module.exports = router;