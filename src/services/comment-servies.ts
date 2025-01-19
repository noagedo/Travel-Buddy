
import createHttpService, { CanceledError } from "./api-client"

export { CanceledError }

export interface Comment {
    postId : string;
    sender : string;
    content : string;
    createdAt : string;
}


const commentService = createHttpService<Comment>("/comments");

export default commentService;


