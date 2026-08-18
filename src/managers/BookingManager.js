import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ServiceManager from "./ServiceManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BookingManager {
  constructor() {
    this.filePath = path.join(__dirname, "../data/bookings.json");
    this.serviceManager = new ServiceManager();
  }

  async _readFile() {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async _writeFile(data) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async getBookings() {
    return await this._readFile();
  }

  async createBooking(data) {
    const { clientName, clientEmail, date, time, status } = data;

    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error("Faltan campos obligatorios para crear la reserva");
    }

    const bookings = await this._readFile();

    const newBooking = {
      id: bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1,
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: []
    };

    bookings.push(newBooking);
    await this._writeFile(bookings);

    return newBooking;
  }

  async getBookingById(id) {
    const bookings = await this._readFile();
    return bookings.find(b => b.id === Number(id));
  }

  async addServiceToBooking(bid, sid) {
    const bookings = await this._readFile();
    const booking = bookings.find(b => b.id === Number(bid));

    if (!booking) {
      throw new Error("La reserva no existe");
    }

    const service = await this.serviceManager.getServiceById(Number(sid));
    if (!service) {
      throw new Error("El servicio no existe");
    }

    const existing = booking.services.find(s => s.service === Number(sid));

    if (existing) {
      existing.quantity += 1;
    } else {
      booking.services.push({
        service: Number(sid),
        quantity: 1
      });
    }

    await this._writeFile(bookings);
    return booking;
  }
}

export default BookingManager;