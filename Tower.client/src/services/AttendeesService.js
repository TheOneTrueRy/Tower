import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AttendeesService{

  async getEventTickets(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.eventTickets = res.data.map(t => new Ticket(t))
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

}

export const attendeesService = new AttendeesService()