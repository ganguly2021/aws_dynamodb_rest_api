const express = require("express");
const router = express.Router();
const { v4: uuidV4 } = require("uuid");
let database = [];

// routes

/*
  URL: /
  Desc: Get all todos from database
  Access: Public
  Method: GET
*/
router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All todos list.",
    todos: database,
  });
});

/*
  URL: /
  Desc: Create todos in database
  Access: Public
  Method: POST
*/
router.post("/", (req, res) => {
  // get unique id
  const uid = uuidV4();

  // create new document
  const document = {
    name: req.body.name,
    id: uid,
    completed: false,
  };

  // insert document into database
  database = database.concat([document]);

  // return success message
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "New todo task added.",
    task: document,
  });
});

/*
  URL: /
  Desc: Update todo task status by id
  Access: Public
  Method: PUT
*/
router.put("/:id", (req, res) => {
  // get todo id from url
  const todo_id = req.params.id;

  // find index
  const dbIndex = database.findIndex((todo) => todo.id === todo_id);

  // if todo exists in database
  if (dbIndex >= 0) {
    // copy old todo
    const updatedTodo = Object.assign({}, database[dbIndex]);

    // update todo compelete status to true
    updatedTodo.completed = true;

    // if new name provided for todo
    if (req.body.name) {
      updatedTodo.name = req.body.name;
    }

    // update database
    database[dbIndex] = Object.assign({}, updatedTodo);

    // return success message
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Todo task updated.",
      task: updatedTodo,
    });
  } else {
    // return error message
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Todo task not found in database.",
    });
  }
});

// export router
module.exports = router;
