import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
  try {
    const { category, available } = req.query;
    const services = await servicesService.getServices({ category, available });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error en getServices:", error);
    res.status(500).json({ error: "Error interno al obtener servicios" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { sid } = req.params;
   
    if (isNaN(Number(sid))) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const service = await servicesService.getServiceById(Number(sid));

    if (!service) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error en getServiceById:", error);
    res.status(500).json({ error: "Error interno al obtener el servicio" });
  }
};

export const createService = async (req, res) => {
  try {
    const data = req.body;
    const newService = await servicesService.createService(data);
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error en createService:", error);
    res.status(500).json({ error: "Error interno al crear el servicio" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { sid } = req.params;

   
    if (isNaN(Number(sid))) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const data = req.body;
    const updated = await servicesService.updateService(Number(sid), data);

    if (!updated) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error en updateService:", error);
    res.status(500).json({ error: "Error interno al actualizar el servicio" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { sid } = req.params;

    
    if (isNaN(Number(sid))) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const deleted = await servicesService.deleteService(Number(sid));

    if (!deleted) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteService:", error);
    res.status(500).json({ error: "Error interno al eliminar el servicio" });
  }
};