const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Business = require('../models/Business');


// GET PRODUCTS OF BUSINESS
router.get('/', (req, res) => {
    const getPromise = Business.aggregate([
      {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'product_id',
        as: 'product'
      }
    },
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          business_name: '$business_name',
          business_founded: '$business_founded'
        },
        product: {
          $push: '$product',
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        business_name: '$_id.business_name',
        business_founded: '$_id.business_founded',
        product: '$product'
      }
    }
    ]);

    getPromise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
})


// GET PRODUCTS OF BUSINESS ID

router.get('/:business_id', (req, res) => {
  const getPromise = Business.aggregate([
    {
      $match: {
        '_id' : mongoose.Types.ObjectId(req.params.business_id)
      }
    },
    {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'product_id',
      as: 'product'
    }
  },
  {
    $unwind: {
      path: '$product',
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $group: {
      _id: {
        _id: '$_id',
        business_name: '$business_name',
        business_founded: '$business_founded'
      },
      product: {
        $push: '$product',
      }
    }
  },
  {
    $project: {
      _id: '$_id._id',
      business_name: '$_id.business_name',
      business_founded: '$_id.business_founded',
      product: '$product'
    }
  }
  ]);

  getPromise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

// POST
router.post('/', (req, res, next) => {

  const business = new Business(req.body);
  const promise = business.save(); 
  
  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
      res.json(err)
  })
});

module.exports = router;
