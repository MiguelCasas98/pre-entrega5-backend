import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
  try {
    const data = req.body;
    const booking = await bookingsService.createBooking(data);

    if (booking?.error) {
      return res.status(400).json(booking);
    }

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error en createBooking:", error);
    res.status(500).json({ error: "Error interno al crear la reserva" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params;
   
    if (isNaN(Number(bid))) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const booking = await bookingsService.getBookingById(Number(bid));

    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error en getBookingById:", error);
    res.status(500).json({ error: "Error interno al obtener la reserva" });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    
    if (isNaN(Number(bid)) || isNaN(Number(sid))) {
      return res.status(400).json({ error: "IDs inválidos" });
    }

    const updatedBooking = await bookingsService.addServiceToBooking(
      Number(bid),
      Number(sid)
    );

    if (updatedBooking?.error) {
      const status = updatedBooking.error.includes("no existe") ? 404 : 400;
      return res.status(status).json(updatedBooking);
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error en addServiceToBooking:", error);
    res.status(500).json({ error: "Error interno al agregar servicio a la reserva" });
  }
};