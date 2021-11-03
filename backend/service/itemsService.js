const Model = require('../model/itemsModel');

const validateInput = async (description) => {
  const responseError = { message: 'Invalid input', error: true };

  if(!description) {
    return responseError
  };
  if(description === '') {
    return responseError
  };

  const response = await Model.createNewItem(description);
  return response.ops[0];
}

module.exports = {
  validateInput,
}