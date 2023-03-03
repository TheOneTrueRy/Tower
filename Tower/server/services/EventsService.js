import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService{
  async createEvent(eventData) {
    let event = await dbContext.Events.create(eventData)
    return event
  }
  
  async getAllEvents(){
    let events = await dbContext.Events.find()
    .populate('creator', 'name picture')
    return events
  }
  
  async getEventById(eventId) {
    let event = await dbContext.Events.findById(eventId)
    .populate('creator', 'name picture')
    return event
  }
  async editEvent(eventId, eventData, requestorId) {
    let event = await dbContext.Events.findById(eventId)
    if(requestorId != event.creatorId){
      throw new Forbidden("That's not your event, silly!")
    }
    if(event.isCanceled == true){
      throw new BadRequest("Can't edit a cancelled event!")
    }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.type = eventData.type || event.type
    event.startDate = eventData.startDate || event.startDate
    event.coverImg = eventData.coverImg || event.coverImg
    await event.save()
    return event
  }

  async cancelEvent(eventId, requestorId){
    let event = await dbContext.Events.findById(eventId)
    .populate('creator', 'name picture')
    if(requestorId != event.creatorId){
      throw new Forbidden("That's not your event, silly!")
    }
    event.isCanceled = true
    await event.save()
    return event
  }
}

export const eventsService = new EventsService()