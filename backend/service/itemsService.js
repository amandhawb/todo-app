const Model = require('../model/itemsModel');

const validateInput = async (description, method, id) => {
  const responseError = { message: 'Invalid input', error: true };
  console.log('validate input --- description:', description)
  if(!description || description === '') {
    return responseError
  };

  if(method === 'POST') {
    const responseCreate = await Model.createNewItem(description);
    return responseCreate.ops[0];
  }

  const responseModel = await Model.getItemById();
  if(responseModel.length === 0) {
    responseError;
  }
  await Model.editItem(description, id);
  return { _id: id, description };
}

const validateId = async (id) => {
  const responseError = { message: 'Invalid input', error: true };

  const responseModel = await Model.getItemById(id);

  if(responseModel.length === 0) {
    responseError;
  }
  const result = await Model.deleteItem(id);
  return result
};

module.exports = {
  validateInput,
  validateId,
}