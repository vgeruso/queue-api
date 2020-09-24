import UserDAO from '../DAOs/UserDAO';

export default class UserController {
  store(req, res) {
    const user = req.body;

    const dao = new UserDAO();
    const newUser = dao.create(user);

    if (newUser.created) {
      newUser.created = undefined;
      return res.status(200).json(newUser);
    }

    newUser.created = undefined;
    return res.status(406).json(newUser);
  }
}
