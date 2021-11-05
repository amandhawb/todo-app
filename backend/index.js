const express = require('express');
const bodyParser = require('body-parser');
const ItemsController = require('./controller/itemsController');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log('Running...');
});


app.post('/todo-items', ItemsController.create);
app.get('/todo-items', ItemsController.getAll);