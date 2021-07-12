/* eslint-disable no-undef */
const supertest = require('supertest');
const request = supertest('http://localhost:3000');


describe('Sign in tests', () => {

  describe('/api/login', () => {

    describe('POST', () => {
      it('If username and password are correct respond with 200 status', async () => {
        const res = await request.post('/api/login')
        .send({data:{email:'superman@gmail.com', password: 'test'}});
        expect(res.status).toBe(200);
		expect(res.text).toBe('good');
        return;
      });

	  it('If password is not correct should respond with 400 status', async () => {
        const res = await request.post('/api/login')
        .send({data:{email:'superman@gmail.com', password: 'apple'}});
        expect(res.status).toBe(400);
        return;
      });

	  it('If user does not exist should respond with 400 status', async () => {
        const res = await request.post('/api/login')
        .send({data:{email:'supermaniac@gmail.com', password: 'apple'}});
        expect(res.status).toBe(400);
        return;
      });

	  it('If the email field is blank respond with 400 status', async () => {
        const res = await request.post('/api/login')
        .send({data:{password: 'apple'}});
        expect(res.status).toBe(400);
        return;
      });

	  it('If the password field is blank respond with 400 status', async () => {
        const res = await request.post('/api/login')
        .send({data:{email:'superman@gmail.com'}});
        expect(res.status).toBe(400);
        return;
      });
    
    });
  });
});