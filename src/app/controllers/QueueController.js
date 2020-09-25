import QueueDAO from '../DAOs/QueueDAO';

const dao = new QueueDAO();

export default class QueueController {
  store(req, res) {
    const { _id } = req.params;

    const userAdded = dao.addUser(_id);

    if (userAdded.added) {
      userAdded.added = undefined;
      return res.status(200).json(userAdded);
    }

    return res.status(userAdded.status).json(userAdded);
  }

  findUserInQueue(req, res) {
    const { email } = req.params;

    const positionOfUser = dao.findPosition(email);

    if (positionOfUser.found) {
      positionOfUser.found = undefined;
      return res.status(200).json(positionOfUser);
    }

    return res.status(positionOfUser.status).json(positionOfUser);
  }

  index(req, res) {
    const usersInQueue = dao.showLine();

    if (usersInQueue.found) {
      usersInQueue.found = undefined;
      return res.status(200).json(usersInQueue);
    }

    return res.status(usersInQueue.status).json(usersInQueue);
  }

  findByGenre(req, res) {
    const { genre } = req.params;

    const filteredQueue = dao.filterLine(genre);

    if (filteredQueue.filtered) {
      filteredQueue.filtered = undefined;
      return res.status(200).json(filteredQueue);
    }

    return res.status(filteredQueue.status).json(filteredQueue);
  }

  destroy(req, res) {
    const userRemoved = dao.popLine();

    if (userRemoved.removed) {
      userRemoved.removed = undefined;
      return res.status(200).json(userRemoved);
    }

    return res.status(userRemoved.status).json(userRemoved);
  }
}
