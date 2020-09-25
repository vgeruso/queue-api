import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

dotEnv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const adapter = new FileSync(process.env.DB_FILE);
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

  findPosition(email) {
    const userFound = DB.get('user').find({ email: email }).value();

    if (userFound === undefined) {
      return {
        msg: 'user not found',
        status: 404,
        found: false,
      };
    }

    const queue = DB.get('queue').value();
    for (let user of queue) {
      if (user.userId === userFound._id) {
        return {
          positionOfUser: user.position,
          found: true,
        };
      }
    }

    return {
      msg: 'user not found in queue',
      status: 404,
      found: false,
    };
  }

  showLine() {
    const queue = DB.get('queue').value();

    if (queue.length === 0) {
      return {
        msg: 'Queue is empty',
        status: 404,
        found: false,
      };
    }

    let usersInQueue = [];
    for (let user of queue) {
      const userFound = DB.get('user').find({ _id: user.userId }).value();
      userFound.position = user.position;
      usersInQueue.push(userFound);
    }

    return {
      usersInQueue,
      found: true,
    };
  }

  filterLine(genre) {
    const queue = DB.get('queue').value();

    if (queue.length === 0) {
      return {
        msg: 'Queue is empty',
        status: 404,
        filtered: false,
      };
    }

    let usersInQueueByGenre = [];
    for (let user of queue) {
      const userFound = DB.get('user').find({ _id: user.userId }).value();
      if (userFound.genre === genre) {
        userFound.position = user.position;
        usersInQueueByGenre.push(userFound);
      }
    }

    return {
      usersInQueueByGenre,
      filtered: true,
    };
  }

  popLine() {
    const queue = DB.get('queue').value();

    if (queue.length === 0) {
      return {
        msg: 'Queue is empty',
        status: 404,
        removed: false,
      };
    }

    const userDel = DB.get('queue').remove({ position: 1 }).write();

    const postDeletionQueue = DB.get('queue').map().value();

    let position = 1;
    for (let i = 0; i < postDeletionQueue.length; i++) {
      console.log(position);
      DB.get('queue')
        .find({ position: position + 1 })
        .assign({ position: position })
        .write();
      position++;
    }

    const userFound = DB.get('user').find({ _id: userDel[0].userId }).value();
    userFound.position = userDel[0].position;

    return {
      user: userFound,
      removed: true,
    };
  }
}
