import UserDAO from '../src/app/DAOs/UserDAO';
import faker from 'faker';

describe('API user test', () => {
  const dao = new UserDAO();

  test('should create user', () => {
    const name = faker.name.findName();
    const user = {
      name,
      email: faker.internet.email(name),
      genre: 'female',
    };

    const newUser = dao.create(user);

    expect(newUser.created).toBe(true);
  });
});
