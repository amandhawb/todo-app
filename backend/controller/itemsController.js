//const rescue = require('express-rescue');

const Model = require('../model/itemsModel');
const Service = require('../service/itemsService');


const create = async (req, res) => {
  const { description } = req.body;
  const { method } = req;
  const valid = await Service.validateInput(description, method);

  if(valid.error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: valid.message,
      },
    });
  }

  return res.status(200).json(valid);
};

const getAll = async (req, res) => {
  const result = await Model.getAll();

  return res.status(200).json({ list: result });
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { method } = req;
  const valid = await Service.validateInput(description, method, id);

  if(valid.error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: valid.message,
      },
    });
  }

  return res.status(200).json(valid)
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  
  const response = await Service.validateId(id);

  if(response.error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: response.message
      }
    });
  }

  return res.status(200).json({ message: 'Item deleted.'})
};

module.exports = {
  getAll,
  create,
  edit,
  deleteItem
}