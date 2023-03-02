import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AttendeesService{

  async getEventTickets(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.eventTickets = res.data.map(t => new Ticket(t))
  }

  async getEventComments(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data)
    AppState.comments = res.data.map(c => new Comment(c))
    logger.log(AppState.comments)
  }

  async attendEvent(eventData){
    const res = await api.post('api/tickets', eventData)
    AppState.eventTickets.push(new Ticket(res.data))
    AppState.myTickets.push(new Ticket(res.data))
    AppState.attending = true
  }

  async getMyTickets(){
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.myTickets)
  }

  async deleteTicket(ticketId){
    const res = await api.delete('api/tickets/' + ticketId)
    const ticketIndex = AppState.myTickets.findIndex(t => t.id == ticketId)
    if(ticketIndex != -1){
      AppState.myTickets.splice(ticketIndex, 1)
    }
  }

}

export const attendeesService = new AttendeesService()