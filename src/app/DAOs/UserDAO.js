import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./src/db/database.json');
const DB = lowdb(adapter);

export default class UserDAO {
  create(user) {
    const users = DB.get('user').value();

    let _id;
    if (users.length === 0) {
      user._id = 1;
      _id = user._id;
    } else {
      const idPrev = users[users.length - 1]._id;
      user._id = idPrev + 1;
      _id = user._id;
    }

    DB.get('user').push(user).write();
    const userFound = DB.get('user').find({ _id: _id }).value();

    if (userFound != null) {
      return {
        user: userFound,
        created: true,
      };
    }

    return {
      msg: 'error creating user',
      created: false,
    };
  }
}
