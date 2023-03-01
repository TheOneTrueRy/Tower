import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";


export class TicketsController extends BaseController{
  constructor(){
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTicket)
    .delete('/:ticketId', this.deleteTicket)
  }

  async createTicket(req, res, next){
    try {
      const user = req.userInfo
      const ticketData = req.body
      ticketData.accountId = user.id
      const ticket = await ticketsService.createTicket(ticketData)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next){
    try {
      const requestorId = req.userInfo.id
      const ticketId = req.params.ticketId
      const ticket = await ticketsService.deleteTicket(ticketId, requestorId)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}