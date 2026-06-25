import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType { isAuthenticated: boolean; isLoading: boolean; login(email: string, password: string): Promise<boolean>; logout(): Promise<void>; }
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!supabase) { setIsAuthenticated(sessionStorage.getItem('nacetem-local-admin') === 'true'); setIsLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setIsAuthenticated(Boolean(data.session)); setIsLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setIsAuthenticated(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);
  const login = async (email: string, password: string) => {
    if (supabase) { const { error } = await supabase.auth.signInWithPassword({ email, password }); return !error; }
    const valid = Boolean(import.meta.env.VITE_ADMIN_EMAIL && import.meta.env.VITE_ADMIN_PASSWORD && email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD);
    if (valid) { sessionStorage.setItem('nacetem-local-admin', 'true'); setIsAuthenticated(true); }
    return valid;
  };
  const logout = async () => { if (supabase) await supabase.auth.signOut(); sessionStorage.removeItem('nacetem-local-admin'); setIsAuthenticated(false); };
  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used within an AuthProvider'); return value; }
