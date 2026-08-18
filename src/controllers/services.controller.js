import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();

export const getServices = async (req, res) => {
  const { category, available } = req.query;
  const services = await serviceManager.getServices({ category, available });
  res.status(200).json(services);
};

export const getServiceById = async (req, res) => {
  const { sid } = req.params;
  const service = await serviceManager.getServiceById(Number(sid));

  if (!service) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.status(200).json(service);
};

export const createService = async (req, res) => {
  const data = req.body;

  const newService = await serviceManager.addService(data);

  if (!newService) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  res.status(201).json(newService);
};

export const updateService = async (req, res) => {
  const { sid } = req.params;
  const data = req.body;

  const updated = await serviceManager.updateService(Number(sid), data);

  if (!updated) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.status(200).json(updated);
};

export const deleteService = async (req, res) => {
  const { sid } = req.params;

  const deleted = await serviceManager.deleteService(Number(sid));

  if (!deleted) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.status(200).json(deleted);
};