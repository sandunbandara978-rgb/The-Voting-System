import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  adminToken: string | null;
  adminUser: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAdminLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [adminUser, setAdminUser] = useState<any | null>(
    localStorage.getItem('admin_user') ? JSON.parse(localStorage.getItem('admin_user')!) : null
  );

  const login = (token: string, user: any) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ adminToken, adminUser, login, logout, isAdminLoggedIn: !!adminToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
