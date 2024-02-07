const express = require('express');
const router = express.Router();
const ProductsService = require('./../services/products.service');
const {validatorHandler} = require('./../middlewares/validator.handler');
const {createProductSchema, getProductSchema, updateProductSchema} = require('./../schemas/product.schema');

const service = new ProductsService();

router.use('/', function (req, res, next) {
  next() // se utiliza para que se ejecute el router.get
})

router.get('/', async (req, res) => {
  const {size} = req.query;
  const products = await service.find()
  res.send(products)
})


router.get('/limit', async (req, res) => {
  const {id} = req.params
  res.json({res: '56456'})
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const product = await service.findOne(id);
      res.json(product)
    } catch (error) {
      next(error)
    }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body)
    res.status(201).json(product)
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const {id} = req.params
    const body = req.body;
    const product = await service.update(body, id)
    res.json(product)
  } catch(error) {
    next(error)
  }

})

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const body = req.body;
  const product = await service.update(body, id)
  res.json(product)
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params
  const idRes = await service.delete(id)
  res.json(idRes)
})

module.exports = router
