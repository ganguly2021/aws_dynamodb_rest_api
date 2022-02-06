const joi = require("joi");

// todo form validation schema
const todoSchema = joi.object({
  name: joi.string().trim().required().messages({
    "string.empty": "Todo task name is empty.",
    "any.required": "Todo task name is required.",
  }),
});

module.exports = {
  todoSchema,
};
