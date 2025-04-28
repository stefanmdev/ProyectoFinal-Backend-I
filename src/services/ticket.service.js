import Ticket from "../models/Ticket.js"; // Importamos el modelo Ticket

export const createTicket = async (ticketData) => {
  try {
    const ticket = await Ticket.create(ticketData);
    return ticket;
  } catch (error) {
    throw new Error("Error al crear el ticket: " + error.message);
  }
};
