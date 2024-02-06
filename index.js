const express = require('express');
const routerApi = require('./routes')

const app = express();
const port = 3000;
const { errorHandler, logError} = require('./middlewares/error-handler')
app.use(express.json())
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
app.use(errorHandler)

app.listen(port, () => {
  console.log('funciona ' + port)
})
