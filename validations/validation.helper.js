// create right error format
// of joi errors
const getFormattedError = (error) => {
  let errors = {};

  error.details.forEach((err) => {
    errors = {
      ...errors,
      [err.context.key]: err.message,
    };
  });

  // return error new format
  return errors;
};

// check whether a object is empty or not
const isEmptyObject = (obj) => {
  // if object is undefined
  if (obj === undefined) {
    return true;
  }
  // check object has any key or not
  return Object.keys(obj).length === 0;
};

module.exports = {
  getFormattedError,
  isEmptyObject,
};
