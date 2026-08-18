import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class BookingsDAO {
  constructor() {
    this.filePath = path.join(__dirname, "../data/bookings.json");
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo bookings.json:", error);
      return [];
    }
  }

  async getById(id) {
    const bookings = await this.getAll();
    return bookings.find(b => b.id === Number(id)) || null;
  }

  async create(booking) {
    const bookings = await this.getAll();
    booking.id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
    bookings.push(booking);

    await fs.promises.writeFile(this.filePath, JSON.stringify(bookings, null, 2));
    return booking;
  }

  async update(id, updatedBooking) {
    const bookings = await this.getAll();
    const index = bookings.findIndex(b => b.id === Number(id));

    if (index === -1) return null;

    bookings[index] = updatedBooking;

    await fs.promises.writeFile(this.filePath, JSON.stringify(bookings, null, 2));
    return updatedBooking;
  }
}