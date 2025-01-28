import  { CanceledError } from "./api-client"
import createHttpService from "./http-service"


export { CanceledError }

export interface Post {
    _id: string
    sender: string;
    content: string;
    createdAt: string;
    likes: number;
    likesBy: string[];
    photos: string[];
    
}

const postService = createHttpService<Post>("/posts");

export default postService;