import App from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Should return error on registering an existent user', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'fedor.klochkov@gmail.com',
			password: '123',
		});

		expect(res.statusCode).toBe(422);
	});

	it('Should successfully login user', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'fedor.klochkov@gmail.com',
			password: 'Passw0rd!',
		});

		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Should return error on non successful user login ', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'fedor.klochkov@gmail.com',
			password: '123',
		});

		expect(res.statusCode).toBe(401);
	});

	it('Should return user info ', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'fedor.klochkov@gmail.com',
			password: 'Passw0rd!',
		});
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('fedor.klochkov@gmail.com');
	});

	it('Should return login status error ', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'fedor.klochkov@gmail.com',
			password: 'Passw0rd',
		});
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	application.close();
});
