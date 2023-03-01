import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"


class EventsService{

  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    AppState.events.unshift(new Event(res.data))
  }

}

export const eventsService = new EventsService()