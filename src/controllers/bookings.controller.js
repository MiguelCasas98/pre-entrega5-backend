import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
  const data = req.body;

  const booking = await bookingManager.createBooking(data);

  if (!booking) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  res.status(201).json(booking);
};

export const getBookingById = async (req, res) => {
  const { bid } = req.params;
  const booking = await bookingManager.getBookingById(Number(bid));

  if (!booking) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  res.status(200).json(booking);
};

export const addServiceToBooking = async (req, res) => {
  const { bid, sid } = req.params;

  const service = await serviceManager.getServiceById(Number(sid));
  if (!service) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  const updatedBooking = await bookingManager.addServiceToBooking(
    Number(bid),
    Number(sid)
  );

  if (!updatedBooking) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  res.status(200).json(updatedBooking);
};