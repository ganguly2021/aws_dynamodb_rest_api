let database = [];

const updateTodoController = (req, res) => {
  // get todo id from url
  const todo_id = req.params.id;

  // find index
  const dbIndex = database.findIndex((todo) => todo.uuid === todo_id);

  // if todo exists in database
  if (dbIndex >= 0) {
    // copy old todo
    const updatedTodo = Object.assign({}, database[dbIndex]);

    // update todo status
    updatedTodo.completed = !updatedTodo.completed;

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
};

module.exports = updateTodoController;
