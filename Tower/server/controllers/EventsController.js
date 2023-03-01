import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController{
  constructor(){
    super('api/events')
    this.router
    .get('', this.getAllEvents)
    .get('/:eventId', this.getEventById)
    .get('/:eventId/tickets', this.getEventTickets)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvent)
    .put('/:eventId', this.editEvent)
    .delete('/:eventId', this.cancelEvent)

  }

  async createEvent(req, res, next){
    try {
      const user = req.userInfo
      const eventData = req.body
      eventData.creatorId = user.id
      const event = await eventsService.createEvent(eventData)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next){
    try {
      const events = await eventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next){
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next){
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next){
    try {
      const requestorId = req.userInfo.id
      const eventData = req.body
      const eventId = req.params.eventId
      const editedEvent = await eventsService.editEvent(eventId, eventData, requestorId)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next){
    try {
      const requestorId = req.userInfo.id
      const eventId = req.params.eventId
      const canceledEvent = await eventsService.cancelEvent(eventId, requestorId)
      res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }
}