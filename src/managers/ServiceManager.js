import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ServiceManager {
  constructor() {
    this.filePath = path.join(__dirname, "../data/services.json");
  }

  async _readFile() {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async _writeFile(data) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async getServices() {
    return await this._readFile();
  }

  async getServiceById(id) {
    const services = await this._readFile();
    return services.find(s => s.id === Number(id)) || null;
  }

  async addService(serviceData) {
    const required = ["name", "description", "duration", "price", "category", "available"];

    for (const field of required) {
      if (serviceData[field] === undefined) {
        return null;
      }
    }

    const services = await this._readFile();

    const newId = services.length > 0
      ? services[services.length - 1].id + 1
      : 1;

    const newService = { id: newId, ...serviceData };
    services.push(newService);

    await this._writeFile(services);

    return newService;
  }

  async updateService(id, updatedData) {
    const services = await this._readFile();
    const index = services.findIndex(s => s.id === Number(id));

    if (index === -1) {
      return null;
    }

    const current = services[index];

    const updated = {
      ...current,
      ...updatedData,
      id: current.id
    };

    services[index] = updated;

    await this._writeFile(services);

    return updated;
  }

  async deleteService(id) {
    const services = await this._readFile();
    const index = services.findIndex(s => s.id === Number(id));

    if (index === -1) {
      return null;
    }

    const deleted = services[index];
    services.splice(index, 1);

    await this._writeFile(services);

    return deleted;
  }
}

export default ServiceManager;