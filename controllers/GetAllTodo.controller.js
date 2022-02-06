const mapper = require("./../db/DynamoClient");
const TodoModel = require("./../models/Todo.model");

const getAllTodoController = async (req, res) => {
  let todos = [];

  for await (const item of mapper.scan(TodoModel)) {
    // add items to array
    todos = todos.concat([{ ...item }]);
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All todos list.",
    todos: todos,
  });
};

module.exports = getAllTodoController;
