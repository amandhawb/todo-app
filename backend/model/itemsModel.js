const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createNewItem = async (description) => {
  const db = await connection();
  const insertedItem = await db.collection('items')
    .insertOne({ description, status: 'pending' });
  return insertedItem;
}

const getAll = async () => {
  const db = await connection();

  const allItems = await db.collection('items')
    .find().toArray();
  return allItems;
}

const editItem = async (newDescription, idParam) => {
  const db = await connection();

  const editedItem = await db.collection('items')
    .updateOne({ _id: ObjectId(idParam) }, { $set: 
      { description: newDescription, status: 'pending' }
    });
  return editedItem;
}

module.exports = {
  getAll,
  createNewItem,
  editItem,
}