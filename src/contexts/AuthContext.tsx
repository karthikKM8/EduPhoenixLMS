import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', email: 'superadmin@eduphoenix.com', name: 'Super Admin', role: 'super_admin' },
  { id: '2', email: 'admin@eduphoenix.com', name: 'Admin User', role: 'admin' },
  { id: '3', email: 'instructor@eduphoenix.com', name: 'John Instructor', role: 'instructor' },
  { id: '4', email: 'student@eduphoenix.com', name: 'Jane Student', role: 'student' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eduphoenix_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        localStorage.setItem('eduphoenix_user', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem('eduphoenix_user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('eduphoenix_user');
    toast.success('Logged out successfully');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
