const connection = require('./connection');

const createNewItem = async (description) => {
  console.log('entrou aqui -- model')
  
  try {
    const db = await connection();
    const insertedItem = await db.collection('items')
      .insertOne({ description, status: 'pending' });
    return insertedItem;
  } catch (error) {
    console.log(error)
  }

}

const getAll = async () => {
  const db = await connection();

  const allItems = await db.collection('items')
    .find().toArray();
  return allItems;
}

module.exports = {
  getAll,
  createNewItem,
}