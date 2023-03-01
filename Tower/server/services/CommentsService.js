import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class CommentsService{
  async createComment(commentData){
    let comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getEventComments(eventId){
    let comments = await dbContext.Comments.find({eventId: eventId})
    .populate('creator', 'name picture')
    return comments
  }

  async deleteComment(commentId, requestorId){
    let comment = await dbContext.Comments.findById(commentId)
    if(requestorId != comment.creatorId){
      throw new Forbidden("That's not your comment, silly!")
    }
    comment.remove()
    return 'Comment Successfully Deleted!'
  }
}

export const commentsService = new CommentsService()