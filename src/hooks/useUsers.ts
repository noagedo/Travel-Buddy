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
    try {
      const user = await userService.signIn(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setError(null);
    } catch {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userName: string) => {
    setIsLoading(true);
    try {
      const user = await userService.signUp(email, password, userName);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setError(null);
    } catch  {
      setError("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (user && user.refreshToken) {
        await userService.logout(user.refreshToken);
      }
      setUser(null);
      localStorage.removeItem('user');
    } catch{
      setError("Failed to log out. Please try again.");
    }
  };

  return { user, error, isLoading, signIn, signUp, signOut };
};

export default useUsers;