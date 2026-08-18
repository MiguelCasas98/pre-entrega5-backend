import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";

export default class BookingsService {
  constructor() {
    this.bookingsRepo = new BookingsRepository();
    this.servicesRepo = new ServicesRepository();
  }

  async createBooking(data) {
    const { clientName, clientEmail, date, time, status } = data;

    if (!clientName || !clientEmail || !date || !time || !status) {
      return { error: "Faltan campos obligatorios" };
    }

    const newBooking = {
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: []
    };

    return await this.bookingsRepo.create(newBooking);
  }

  async getBookingById(id) {
    return await this.bookingsRepo.getById(id);
  }

  async addServiceToBooking(bid, sid) {
    const booking = await this.bookingsRepo.getById(bid);
    if (!booking) return { error: "La reserva no existe" };

    const service = await this.servicesRepo.getById(sid);
    if (!service) return { error: "El servicio no existe" };

    const existing = booking.services.find(s => s.service === Number(sid));

    if (existing) {
      existing.quantity += 1;
    } else {
      booking.services.push({
        service: Number(sid),
        quantity: 1
      });
    }

    const updated = await this.bookingsRepo.update(bid, booking);
    if (!updated) return { error: "No se pudo actualizar la reserva" };

    return updated;
  }
}