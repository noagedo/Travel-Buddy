import apiClient, { CanceledError } from "./api-client"


export { CanceledError }

export interface Post {
    _id: number
    sender: string;
    content: string;
    createdAt: string;
    likes: number;
    photos: string[];
}

const getAllPosts = () => {
    const abortController = new AbortController()
    const request = apiClient.get<Post[]>("/posts"
        , { signal: abortController.signal })
    return { request, abort: () => abortController.abort() }
}

export default { getAllPosts }