//const rescue = require('express-rescue');

const Model = require('../model/itemsModel');
const Service = require('../service/itemsService');


const create = async (req, res) => {
  const { description } = req.body;
  const valid = await Service.validateInput(description);

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
  const { description } = req.body;
  const valid = await Service.validateInput(description);

  if(valid.error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: valid.message,
      },
    });
  }
}

module.exports = {
  getAll,
  create,
  edit
}