const Model = require('../model/itemsModel');

const validateInput = async (description, method, id) => {
  const responseError = { message: 'Invalid input', error: true };

  if(!description || description === '') {
    return responseError
  };
  if(method === 'POST') {
    const responseCreate = await Model.createNewItem(description);
    return responseCreate.ops[0];
  }

  const responseModel = Model.getItemById();
  if(responseModel.length === 0) {
    responseError;
  }
  await Model.editItem(description, id);
  return { _id: id, description };
}

module.exports = {
  validateInput,
}