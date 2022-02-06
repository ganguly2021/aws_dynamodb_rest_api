const uuidV4 = require("uuid").v4;
const mapper = require("./../db/DynamoClient");
const Todo = require("./../models/Todo.model");
const { todoSchema } = require("../validations/schema/todos.schema");
const {
  getFormattedError,
  isEmptyObject,
} = require("./../validations/validation.helper");

const createTodoController = (req, res) => {
  // get unique id
  const uid = uuidV4();

  // validate form data
  const { error } = todoSchema.validate(
    { name: req.body.name },
    { abortEarly: false }
  );

  // if validation error occur
  if (!isEmptyObject(error)) {
    // return error message
    return res.status(400).json({
      success: false,
      statusCode: 400,
      errorType: "ValidationError",
      message: "Form validation error",
      error: getFormattedError(error),
    });
  }

  // create dynamodb document
  const todo = new Todo();

  todo.name = req.body.name;
  todo.uuid = uid;
  todo.completed = false;

  // insert data into dynamo db
  mapper
    .put({ item: todo })
    .then((temp) => {
      // return success message
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "New todo task added.",
        task: temp,
      });
    })
    .catch((err) => {
      // return success message
      return res.status(500).json({
        success: false,
        statusCode: 500,
        errorType: "DbInsertFail",
        message: "Fail to add toto.",
        error: err,
      });
    });
};

module.exports = createTodoController;
