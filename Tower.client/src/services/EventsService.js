import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"


class EventsService{

  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    AppState.events.unshift(new Event(res.data))
  }

  async getAllEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))
  }

}

export const eventsService = new EventsService()