import app  from "../src/app";
import supertest from 'supertest';
import server from "../src/app";

describe('Login Route', () => {
  it('should login and return token', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({
        email: "admin",
        password: "admin"
      })
      .expect(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login, incorrect user', async () => {
    await supertest(app)
      .post('/login')
      .send({
        name: "jaime",
        password: "incorrect"
      })
      .expect(500);
  });
});

afterAll(() => {
    server.close();
  });