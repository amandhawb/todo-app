const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost/todoList';
const url = 'http://localhost:3000';

describe('Testing the endpoint to get all items', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('todoList');
    await db.collection('items').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('items').deleteMany({});
    const myObj = { description: 'Go to the supermarket' };
    await db.collection('items').insertOne(myObj);
  });

  afterEach(async () => {
    await db.collection('items').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should not be empty', async () => {
    await frisby
      .get(`${url}/todo-items/`)
      .expect('status', 200)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const item = body.description;
        expect(item).not.toBeNull();
      });
  });

  it('should return all items', async () => {
    await frisby
      .get(`${url}/todo-items/`)
      .expect('status', 200)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const firstItem = body.list[0].description;
        expect(firstItem).toEqual('Go to the supermarket');
      });
  });
});

describe('Testing the endpoint to create a new item', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('todoList');
    await db.collection('items').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('items').deleteMany({});
    const myObj = { description: 'Go to the supermarket' }
    ;
    await db.collection('items').insertOne(myObj);
  });

  afterEach(async () => {
    await db.collection('items').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should return an error if the body is empty', async () => {
    await frisby
    .post(`${url}/todo-items`)
    .expect('status', 422)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);
      const error = body.err;
      const { message } = body.err;
      expect(error.code).toEqual('invalid_data');
      expect(message).toEqual('Invalid input')
    })
  });

  it('should create a new item with no problems', async () => {
    await frisby
    .post(`${url}/todo-items`, {
      description: 'Call to my best friend'
    })
    .expect('status', 200)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);

      const description = body.description;
      const status = body.status;

      expect(description).toEqual('Call to my best friend');
      expect(status).toEqual('pending');

      expect(body).toHaveProperty('_id');
    })
  })
});

describe('Testing the endpoint to edit an item', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('todoList');
    await db.collection('items').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('items').deleteMany({});
    const myObj = { description: 'Go to the supermarke' }
    ;
    await db.collection('items').insertOne(myObj);
  });

  afterEach(async () => {
    await db.collection('items').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should return an error if the body is empty', async () => {
    let result;
    let resultItemId;

    await frisby
    .get(`${url}/todo-items/`)
    .expect('status', 200)
    .then((res) => {
      const { body } = res;
      result = JSON.parse(body);
      resultItemId = result.list[0]._id;
    });

    await frisby
    .put(`${url}/todo-items/${resultItemId}`)
    .expect('status', 422)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);

      const error = body.err;
      const { message } = body.err;

      expect(error.code).toEqual('invalid_data');
      expect(message).toEqual('Invalid input');
    })
  });

  it('should return an error if the id passed on params doesn`t exist', async () => {
    await frisby
    .put(`${url}/todo-items/123`)
    .expect('status', 422)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);

      const error = body.err;
      const { message } = body.err;

      expect(error.code).toEqual('invalid_data');
      expect(message).toEqual('Invalid input');
    })
  });

  it('should edit a task with no problems', async () => {
    let result;
    let resultItemId;

    await frisby
    .get(`${url}/todo-items/`)
    .expect('status', 200)
    .then((res) => {
      const { body } = res;
      result = JSON.parse(body);
      resultItemId = result.list[0]._id;
    });

    await frisby
    .put(`${url}/todo-items/${resultItemId}`, {
      description: 'Go to the supermarket'
    })
    .expect('status', 200)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);

      const newDescription = body.description;

      expect(newDescription).toEqual('Go to the supermarket');
      expect(body).toHaveProperty('_id');
    })
  })
});

describe('Testing the endpoint to delete an item', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('todoList');
    await db.collection('items').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('items').deleteMany({});
    const myObj = { description: 'Go to the supermarket' };
    await db.collection('items').insertOne(myObj);
  });

  afterEach(async () => {
    await db.collection('items').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should return an error if the id does not exist', async () => {
    await frisby
    .put(`${url}/todo-items/123`)
    .expect('status', 422)
    .then((res) => {
      let { body } = res;
      body = JSON.parse(body);

      const error = body.err;
      const { message } = body.err;

      expect(error.code).toEqual('invalid_data');
      expect(message).toEqual('Invalid input');
    });
  });

  it('should delete a task with no problems', async () => {
    let result; 
    let resultItemId;

    await frisby
    .get(`${url}/todo-items/`)
    .expect('status', 200)
    .then((res) => {
      const { body } = res
      result = JSON.parse(body)
      resultItemId = result.list[0]._id
    });

    await frisby
    .delete(`${url}/todo-items/${resultItemId}`)
    .expect('status', 200);

    await frisby
    .get(`${url}/todo-items`)
    .expect('status', 200)
    .then((res) => {
      const { body } = res;
      result = JSON.parse(body);
      expect(result.list.length).toBe(0);
    });
  });
});
