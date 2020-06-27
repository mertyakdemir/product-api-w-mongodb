const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST */
router.post('/register', (req, res, next) => {

  const { user_name, user_password} = req.body;
  bcryptjs.hash(user_password, 10).then((hash) => {
  const user = new User({
    user_name,
    user_password: hash
  }); 
  
  const promise = user.save();
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err);
  })
  });
});

module.exports = router;
