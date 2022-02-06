const { v4: uuidV4 } = require("uuid");
const mapper = require("./../db/DynamoClient");
const Todo = require("./../models/Todo.model");

const createTodoController = (req, res) => {
  // get unique id
  const uid = uuidV4();

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
    .catch((error) => {
      // return success message
      return res.status(500).json({
        success: false,
        statusCode: 500,
        errorType: "DbInsertFail",
        message: "Fail to add toto.",
        error: error,
      });
    });
};

module.exports = createTodoController;
