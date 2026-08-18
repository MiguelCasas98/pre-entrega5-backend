import ServicesRepository from "../repositories/services.repository.js";

export default class ServicesService {
  constructor() {
    this.repository = new ServicesRepository();
  }

  async getServices(filters) {
    let services = await this.repository.getAll();

    if (filters.category) {
      services = services.filter(
        s => s.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.available !== undefined) {
      const isAvailable = filters.available === "true";
      services = services.filter(s => s.available === isAvailable);
    }

    return services;
  }

  getServiceById(id) {
    return this.repository.getById(id);
  }

  createService(data) {
    return this.repository.create(data);
  }

  updateService(id, data) {
    return this.repository.update(id, data);
  }

  deleteService(id) {
    return this.repository.delete(id);
  }
}