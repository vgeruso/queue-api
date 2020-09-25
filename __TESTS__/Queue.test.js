import QueueDAO from '../src/app/DAOs/QueueDAO';

describe('API queue test', () => {
  const QueueDao = new QueueDAO();
  let userTest;

  test('should add user in queue', () => {
    const userAdded = QueueDao.addUser(2);
    expect(userAdded.added).toBe(true);
  });

  test('should add user in queue => ERROR: The user is already in a queue position', () => {
    const userAdded = QueueDao.addUser(2);
    expect(userAdded.added).toBe(false);
  });

  test('should show line', () => {
    const queue = QueueDao.showLine();
    userTest = queue.usersInQueue[0];
    expect(queue.found).toBe(true);
  });

  test('should find position by email', () => {
    const userPosition = QueueDao.findPosition(userTest.email);
    expect(userPosition.found).toBe(true);
    expect(userPosition.positionOfUser).toBe(1);
  });

  test('should filter line by genre', () => {
    const filter = QueueDao.filterLine('male');
    expect(filter.filtered).toBe(true);
    expect(filter.usersInQueueByGenre.length).toBe(1);
  });

  test('should pop line', () => {
    const userRemoved = QueueDao.popLine();
    expect(userRemoved.removed).toBe(true);
    expect(userRemoved.user.email).toBe(userTest.email);
  });
});
