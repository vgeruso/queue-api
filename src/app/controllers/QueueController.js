import QueueDAO from '../DAOs/QueueDAO';

export default class QueueController {
  store(req, res) {
    const { _id } = req.params;

    const dao = new QueueDAO();
    const userAdded = dao.addUser(_id);

    if (userAdded.added) {
      userAdded.added = undefined;
      return res.status(200).json(userAdded);
    }

    return res.status(userAdded.status).json(userAdded);
  }
}
