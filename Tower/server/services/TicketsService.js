import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TicketsService{
  async createTicket(ticketData) {
    let ticket =  await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    let event = await dbContext.Events.findById(ticketData.eventId)
    event.capacity--
    await event.save()
    return ticket
  }

  async getMyTickets(accountId){
    let tickets = await dbContext.Tickets.find({accountId: accountId})
    .populate('event')
    return tickets
  }
  
  async getEventTickets(eventId){
    let tickets = await dbContext.Tickets.find({eventId: eventId})
    .populate('profile', 'name picture')
    return tickets
  }

  async deleteTicket(ticketId, requestorId){
    let ticket = await dbContext.Tickets.findById(ticketId)
    if(requestorId != ticket.accountId){
      throw new Forbidden("That's not your ticket!")
    }
    let event = await dbContext.Events.findById(ticket.eventId)
    event.capacity++
    await event.save()
    await ticket.remove()
    return 'Ticket Successfully Deleted!'
  }
}

export const ticketsService = new TicketsService()