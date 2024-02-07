const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = 3000;
const { errorHandler, boomErrorHandler, logError} = require('./middlewares/error-handler')

app.use(express.json())

const whitelist = ['http://neurallity.com', 'http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if(!origin || origin == 'null' || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed'), false)
    }
  }
}

app.use(cors(options))

/*
app.get('/', (req, res) => {
  res.send({
    hola: "Carla"
  })
})

app.get('/users', (req, res) => {
  const {limit, offset} = req.query
  if(limit && offset) {
    res.json([{
      limit,
      offset
    }])
  } else {
    res.send('no hay params')
  }
})

app.get('/categories/:id/products/:productId', (req, res) => {
  const {id, productId} = req.params
  res.json({
    id,
    productId,
    product: "Toallas",
    price: 1000
  })
})
 */
routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('funciona ' + port)
})
