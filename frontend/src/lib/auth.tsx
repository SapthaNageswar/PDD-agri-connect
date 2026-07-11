import React, { useEffect, useState, createContext, useContext } from 'react';
type Role = 'farmer' | 'buyer' | 'admin';
interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
}
const AuthContext = createContext<AuthContextType>({
  role: 'farmer',
  setRole: () => {}
});
export const AuthProvider = ({ children }: {children: React.ReactNode;}) => {
  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem('agriconnect_role');
    return saved as Role || 'farmer';
  });
  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('agriconnect_role', newRole);
  };
  return (
    <AuthContext.Provider
      value={{
        role,
        setRole
      }}>
      
      {children}
    </AuthContext.Provider>);

};
export const useAuth = () => useContext(AuthContext);