import UserDAO from '../DAOs/UserDAO';

const dao = new UserDAO();

export default class UserController {
  store(req, res) {
    const user = req.body;

    const newUser = dao.create(user);

    if (newUser.created) {
      newUser.created = undefined;
      return res.status(200).json(newUser);
    }

    return res.status(newUser.status).json(newUser);
  }
}
