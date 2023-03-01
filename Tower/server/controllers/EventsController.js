import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController{
  constructor(){
    super('api/events')
    this.router
    .post('', this.createEvent)

  }

  async createEvent(req, res, next){
    try {
      const eventData = req.body
      const event = await eventsService.createEvent(eventData)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}