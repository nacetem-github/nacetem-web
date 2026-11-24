import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type AuthResult = {
  ok: boolean;
  message?: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isPasswordRecovery: boolean;
  login(email: string, password: string): Promise<boolean>;
  createAccount(email: string, password: string): Promise<AuthResult>;
  requestPasswordReset(email: string): Promise<AuthResult>;
  updatePassword(password: string): Promise<AuthResult>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  useEffect(() => {
    if (!supabase) { setIsAuthenticated(sessionStorage.getItem('nacetem-local-admin') === 'true'); setIsLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setIsAuthenticated(Boolean(data.session)); setIsLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(Boolean(session));
      if (event === 'PASSWORD_RECOVERY') setIsPasswordRecovery(true);
      if (event === 'SIGNED_OUT') setIsPasswordRecovery(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  const login = async (email: string, password: string) => {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error('SUPABASE LOGIN ERROR:', error.message);
      alert(`Login failed: ${error.message}`);
      return false;
    }

    console.log('LOGIN SUCCESSFUL:', data.user);
    setIsAuthenticated(true);
    return true;
  }

  const valid = Boolean(
    import.meta.env.VITE_ADMIN_EMAIL &&
    import.meta.env.VITE_ADMIN_PASSWORD &&
    email.trim() === import.meta.env.VITE_ADMIN_EMAIL &&
    password === import.meta.env.VITE_ADMIN_PASSWORD
  );

  if (valid) {
    sessionStorage.setItem('nacetem-local-admin', 'true');
    setIsAuthenticated(true);
  }

  return valid;
};

  const createAccount = async (email: string, password: string) => {
    if (!supabase) {
      return {
        ok: false,
        message: 'Account creation requires Supabase to be configured for this deployment.',
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/login`,
      },
    });

    return {
      ok: !error,
      message: error?.message || 'Account created. Check your email to confirm access before signing in.',
    };
  };

  const requestPasswordReset = async (email: string) => {
    if (!supabase) {
      return {
        ok: false,
        message: 'Password reset requires Supabase to be configured for this deployment.',
      };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });

    return {
      ok: !error,
      message: error?.message || 'Password reset instructions have been sent to your email.',
    };
  };

  const updatePassword = async (password: string) => {
    if (!supabase || !isPasswordRecovery) {
      return {
        ok: false,
        message: 'This password recovery link is invalid or has expired. Request a new link and try again.',
      };
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { ok: false, message: error.message };

    await supabase.auth.signOut();
    setIsPasswordRecovery(false);
    return { ok: true, message: 'Password updated. Sign in with your new password.' };
  };

  const logout = async () => { if (supabase) await supabase.auth.signOut(); sessionStorage.removeItem('nacetem-local-admin'); setIsAuthenticated(false); };
  return <AuthContext.Provider value={{ isAuthenticated, isLoading, isPasswordRecovery, login, createAccount, requestPasswordReset, updatePassword, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used within an AuthProvider'); return value; }
