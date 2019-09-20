const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mobile', { title: 'mobile' });
});

module.exports = router;
