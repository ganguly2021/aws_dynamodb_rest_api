const express = require("express");
const router = express.Router();

// import the todo controller
const createTodoController = require("./../controllers/CreateTodo.controller");
const updateTodoController = require("./../controllers/UpdateTodo.controller");
const getAllTodoController = require("./../controllers/GetAllTodo.controller");

// routes

/*
  URL: /
  Desc: Get all todos from database
  Access: Public
  Method: GET
*/
router.get("/", getAllTodoController);

/*
  URL: /
  Desc: Create todos in database
  Access: Public
  Method: POST
*/
router.post("/", createTodoController);

/*
  URL: /
  Desc: Update todo task status by id
  Access: Public
  Method: PUT
*/
router.put("/:id", updateTodoController);

// export router
module.exports = router;
