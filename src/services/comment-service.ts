import  { CanceledError } from "./api-client"
import createHttpService from "./http-service"

export { CanceledError }

export interface Comment {
    postId : string;
    sender : string;
    content : string;
    createdAt : string;
    _id : string;
    
}


const commentService = createHttpService<Comment>("/comments");

export default commentService;


