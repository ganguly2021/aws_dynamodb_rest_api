// env file
require('dotenv/config');

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');

// import todos api routes
const todosRoute = require('./routes/todos.route');


// middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/todos', todosRoute);


// default path
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'default api route.'
  })
});

// start web server
app.listen(port, () => {
  console.log(`Server running at port : ${port}`);
  console.log(`URL: http://localhost:${port}`);
});

