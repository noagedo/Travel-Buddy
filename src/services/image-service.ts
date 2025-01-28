import apiClient from "./api-client";

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const request = apiClient.post<{ url: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return request;
};

export default { uploadImage };