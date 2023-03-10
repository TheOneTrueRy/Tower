import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"


class CommentsService{

  async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    AppState.comments.push(new Comment(res.data))
  }

  async deleteComment(commentId){
    const res = await api.delete('api/comments/' + commentId)
    let commentIndex = AppState.comments.findIndex(c => c.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }

}

export const commentsService = new CommentsService()