import apiClient, { CanceledError } from "./api-client";


export { CanceledError }

export interface User {
    _id?: string,
    userName: string;
    email: string,
    password: string,
    profilePicture?: string

}
  
const signUp = (user: User) => {
    const abortController = new AbortController()
    const request = apiClient.post<User>('/auth/register',
        user,
        { signal: abortController.signal })
    return { request, abort: () => abortController.abort() }
}

const signIn = (user: { email: string; password: string }) => {
    const abortController = new AbortController();
    const request = apiClient.post<User>('/auth/login', user, { signal: abortController.signal });
    return { request, abort: () => abortController.abort() };
  };

const uploadImage = (img: File) => {
    // const abortController = new AbortController()
    const formData = new FormData();
    formData.append("file", img);
    const request = apiClient.post('/file?file=' + img.name, formData, {
        headers: {
            'Content-Type': 'image/*'
        }
    })
    return { request }
}



const update = (user: User) => {
    const abortController = new AbortController();
    const request = apiClient.put<User>(`/auth/${user._id}`, user, { signal: abortController.signal });
    return { request, abort: () => abortController.abort() };
  };



export default { signUp,signIn, uploadImage, update }


