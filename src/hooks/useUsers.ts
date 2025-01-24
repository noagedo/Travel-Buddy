import { useState, useEffect } from "react";
import userService, { User } from "../services/user-servies";

const useUsers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { request } = userService.signIn({ email, password, userName: '', avatar: '' });
      const response = await request;
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true };
    } catch (err) {
      const errorMessage = "Email or password is incorrect. Please try again.";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userName: string, avatarFile?: File) => {
    setIsLoading(true);
    setError(null);
    try {
      let avatarUrl = '';
      
      // Upload image if provided
      if (avatarFile) {
        const { request: imageRequest } = userService.uploadImage(avatarFile);
        const imageResponse = await imageRequest;
        avatarUrl = imageResponse.data.url;
      }

      const { request } = userService.signUp({ 
        email, 
        userName,
        password, 
        avatar: avatarUrl 
      });
      
      const response = await request;
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, error, isLoading, signIn, signUp, signOut };
};

export default useUsers;