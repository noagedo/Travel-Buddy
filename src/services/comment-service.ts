import createHttpService from "./http-service";

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  sender: string;
  content: string;
  createdAt: string;
}

const commentService = createHttpService<Comment>("/comments");

export default commentService;


