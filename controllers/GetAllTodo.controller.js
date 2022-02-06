const mapper = require("./../db/DynamoClient");
const TodoModel = require("./../models/Todo.model");

const getAllTodoController = async (req, res) => {
  // completed = 1 => not pending
  // completed = 0 => pending
  const completed = req.query.completed;

  if (completed !== undefined) {
    if (completed !== "1" && completed !== "0") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        errorType: "ValidationError",
        message: "completed can be 1 or 0.",
      });
    }
  }

  let todos = [];

  for await (const item of mapper.scan(TodoModel)) {
    if (completed !== undefined) {
      if (completed === "1") {
        // add todos with completed = true
        item.completed === true && (todos = todos.concat([{ ...item }]));
      } else {
        // add todos with completed = false
        item.completed === false && (todos = todos.concat([{ ...item }]));
      }
    } else {
      // add all todos to array
      todos = todos.concat([{ ...item }]);
    }
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All todos list.",
    todos: todos,
  });
};

module.exports = getAllTodoController;
