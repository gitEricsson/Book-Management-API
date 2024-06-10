import request from 'supertest';
import app from './../app';

// jest.useRealTimers();

describe('Book Management API', () => {
  it('It should add a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.data).toHaveProperty('id');
    expect(res.body.status).toEqual('success');
  });

  it('It should retrieve a list of all books', async () => {
    const res = await request(app).get('/api/books');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('It should retrieve details of a specific book by ID', async () => {
    const initialRes = await request(app)
      .post('/api/books')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    console.log(initialRes.body);

    const bookId = initialRes.body.data.data.id;
    const res = await request(app).get(`/api/books/${bookId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.data.id).toEqual(bookId);
  });

  it('It should update the details of a specific book by ID', async () => {
    const initialRes = await request(app)
      .post('/api/books')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    const bookId = initialRes.body.data.data.id;
    const res = await request(app)
      .patch(`/api/books/${bookId}`)
      .send({
        author: 'Updated Author',
        publishedYear: 2010
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
  });

  it("It should delete a specific book by it's ID", async () => {
    const initialRes = await request(app)
      .post('/api/books')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    const bookId = initialRes.body.id;
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(204);
  });
});
