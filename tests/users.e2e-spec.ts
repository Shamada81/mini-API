import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a2@a.mail.ru', password: 'fdjksghldjfhgsldkh' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@a.mail.ru', password: 'fdjksghldjfhgsldkh' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@a.mail.ru', password: '123' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@a.mail.ru', password: 'fdjksghldjfhgsldkh' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Autorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('a2@a.mail.ru');
	});

	it('Info - error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@a.mail.ru', password: 'fdjksghldjfhgsldkh' });
		const res = await request(application.app).get('/users/info').set('Autorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
