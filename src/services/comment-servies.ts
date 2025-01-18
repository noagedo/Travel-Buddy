import apiClient, { CanceledError } from "./api-client"


export { CanceledError }


export interface Comment {
    postId : string;
    sender : string;
    content : string;
    createdAt : string;
}


export const fetchCommentsByPostId = async (postId: string) => {
    try {
      const response = await apiClient.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
    }
  };
  
  export const createComment = async (comment: { postId: string; sender: string; content: string }) => {
    try {
      const response = await apiClient.post('/comments', comment);
      return response.data; 
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    }
  };
