// env file
require('dotenv/config');

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');


// middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

