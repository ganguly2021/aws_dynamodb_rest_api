const mapper = require("./../db/DynamoClient");
const TodoModel = require("./../models/Todo.model");

const updateTodoController = async (req, res) => {
  // get todo id from url
  const todo_id = req.params.id;

  // if todo id not provided
  if (todo_id === undefined) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      errorType: "ValidationError",
      message: "Todo ID not provided.",
    });
  }

  let todo = null;

  try {
    // get todo from database by id
    todo = await mapper.get(Object.assign(new TodoModel(), { uuid: todo_id }));
  } catch (err) {
    if (err.name === "ItemNotFoundException") {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        errorType: "DbNotFoundError",
        message: `Todo with id : ${todo_id} not found in database.`,
      });
    }

    // error response
    return res.status(500).json({
      success: false,
      statusCode: 500,
      errorType: "DbFindError",
      message: `Todo with id : ${todo_id} not found in database.`,
      error: err,
    });
  }

  // update todo data
  // update name
  req.body.name !== undefined && (todo.name = req.body.name);

  // update task status
  todo.completed === true ? (todo.completed = false) : (todo.completed = true);

  let updatedTodo = null;

  // udpate todo data into database
  try {
    // update data into database
    updatedTodo = await mapper.put({ item: todo });

    // return success message
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Todo task updated.",
      task: updatedTodo,
    });
  } catch (err) {
    // return success message
    return res.status(500).json({
      success: false,
      statusCode: 500,
      errorType: "DbUpdateFail",
      message: "Todo task update fail.",
      error: err,
    });
  }
};

module.exports = updateTodoController;
