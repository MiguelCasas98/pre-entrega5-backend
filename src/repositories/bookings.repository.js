import BookingsDAO from "../dao/bookings.dao.js";

export default class BookingsRepository {
  constructor() {
    this.dao = new BookingsDAO();
  }

  getAll() {
    return this.dao.getAll();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(data) {
    return this.dao.create(data);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }
}