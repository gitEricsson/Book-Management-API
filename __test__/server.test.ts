import request from 'supertest';
import app from './../app';

describe('Book Management API', () => {
  it('It should add a new book', async () => {
    console.log(await request(app).get('/'));

    const res = await request(app)
      .post('/')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toEqual('success');
  });

  it('It should retrieve a list of all books', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('It should retrieve details of a specific book by ID', async () => {
    const initialRes = await request(app)
      .post('/')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    const bookId = initialRes.body.id;
    const res = await request(app).get(`/${bookId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(bookId);
  });

  it('It should update the details of a specific book by ID', async () => {
    const initialRes = await request(app)
      .post('/')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    const bookId = initialRes.body.id;
    const res = await request(app)
      .patch(`/${bookId}`)
      .send({
        author: 'Updated Author',
        publishedYear: 2010
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
  });

  it("It should delete a specific book by it's ID", async () => {
    const initialRes = await request(app)
      .post('/')
      .send({
        title: 'Things Fall Apart',
        author: 'Chinua Achibe',
        publishedYear: 1958
      });

    const bookId = initialRes.body.id;
    const res = await request(app).delete(`/${bookId}`);
    expect(res.statusCode).toEqual(204);
  });
});
