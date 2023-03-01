import { dbContext } from "../db/DbContext.js"


class EventsService{
  async createEvent(eventData) {
    let event = dbContext.Events.create(eventData)
    return event
  }

}

export const eventsService = new EventsService()