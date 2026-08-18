import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ServicesDAO {
  constructor() {
    this.filePath = path.join(__dirname, "../data/services.json");
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo services.json:", error);
      return [];
    }
  }

  async getById(id) {
    const services = await this.getAll();
    return services.find(s => s.id === Number(id)) || null;
  }

  async create(service) {
    const services = await this.getAll();
    service.id = services.length ? services[services.length - 1].id + 1 : 1;
    services.push(service);

    await fs.promises.writeFile(this.filePath, JSON.stringify(services, null, 2));
    return service;
  }

  async update(id, updatedData) {
    const services = await this.getAll();
    const index = services.findIndex(s => s.id === Number(id));

    if (index === -1) return null;

    services[index] = { ...services[index], ...updatedData };

    await fs.promises.writeFile(this.filePath, JSON.stringify(services, null, 2));
    return services[index];
  }

  async delete(id) {
    const services = await this.getAll();
    const filtered = services.filter(s => s.id !== Number(id));

    await fs.promises.writeFile(this.filePath, JSON.stringify(filtered, null, 2));
    return true;
  }
}