const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


// GET
router.get('/', (req, res) => {
  const promiseGet = Product.find({ });
  promiseGet.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  });
});

// GET ID
router.get('/:product_id', (req, res, next) => {
    const promiseGetId = Product.findById(req.params.product_id);

    promiseGetId.then((data) => {
      if(!data)
      next({ message: 'The product was not found' });
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

// GET ID PUT
router.put('/:product_id', (req, res, next) => {
  const promiseGetIdPut = Product.findByIdAndUpdate(req.params.product_id, req.body, { new : true });

  promiseGetIdPut.then((data) => {
    if(!data)
    next({ message: 'The product was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// GET ID REMOVE
router.delete('/:product_id', (req, res, next) => {
  const promiseGetIdRemove = Product.findByIdAndRemove(req.params.product_id);

  promiseGetIdRemove.then((data) => {
    if(!data)
    next({ message: 'The product was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


// POST
router.post('/', (req, res, next) => {
  
  const product = new Product(req.body);
  const promise = product.save();

  promise.then((data) => {
    res.json(data);

  }).catch((err) => {
    res.json(err);
  })

});

module.exports = router;
