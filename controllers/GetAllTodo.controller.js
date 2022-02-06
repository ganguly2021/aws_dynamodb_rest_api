const getAllTodoController = (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All todos list.",
    todo: []
  });
}

module.exports = getAllTodoController;