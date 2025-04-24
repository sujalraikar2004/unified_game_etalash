
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user data
    const savedUser = localStorage.getItem('treasureHuntUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('treasureHuntUser');
      }
    }
    setIsLoading(false);
  }, []);

  // In a real app, these would make API calls to a backend
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser = { id: '123', username: 'DemoUser', email: 'demo@example.com' };
        setUser(mockUser);
        localStorage.setItem('treasureHuntUser', JSON.stringify(mockUser));
        toast.success("Successfully logged in!");
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser = { id: Date.now().toString(), username, email };
      setUser(newUser);
      localStorage.setItem('treasureHuntUser', JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('treasureHuntUser');
    toast.info("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
