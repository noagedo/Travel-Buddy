import apiClient, { CanceledError } from "./api-client";

export { CanceledError };

export interface User {
  email: string;
  password: string;
  userName: string;
  refreshToken: string;
}

const signIn = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<User>("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to sign in:', error);
    throw error;
  }
};

const signUp = async (email: string, password: string, userName: string) => {
  try {
    const response = await apiClient.post<User>("/auth/register", { email, password, userName });
    return response.data;
  } catch (error) {
    console.error('Failed to sign up:', error);
    throw error;
  }
};

const logout = async (refreshToken: string) => {
  try {
    await apiClient.post("/auth/logout", { refreshToken });
  } catch (error) {
    console.error('Failed to log out:', error);
    throw error;
  }
};

export default { signIn, signUp, logout };