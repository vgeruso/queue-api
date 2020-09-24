import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./src/db/database.json');

const DB = lowdb(adapter);

export default class QueueDAO {
  addUser(userId) {
    const userFound = DB.get('user')
      .find({ _id: Number(userId) })
      .value();

    if (userFound === undefined) {
      return {
        msg: 'user not found',
        status: 404,
        added: false,
      };
    }

    const queue = DB.get('queue').find({ userId: userFound._id }).value();

    if (queue === undefined) {
      const queue = DB.get('queue').value();

      let userQueue;
      if (queue.length === 0) {
        userQueue = {
          userId: userFound._id,
          position: 1,
        };
      } else {
        const positionPrev = queue[queue.length - 1].position;
        userQueue = {
          userId: userFound._id,
          position: positionPrev + 1,
        };
      }

      DB.get('queue').push(userQueue).write();

      return {
        positionOfUser: userQueue.position,
        added: true,
      };
    }

    return {
      msg: 'The user is already in the queue',
      status: 406,
      added: false,
    };
  }
}
