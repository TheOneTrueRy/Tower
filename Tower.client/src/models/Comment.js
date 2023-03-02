

export class Comment{
  constructor(data){
    this.id = data.id
    this.creator = data.creator
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
  }
}