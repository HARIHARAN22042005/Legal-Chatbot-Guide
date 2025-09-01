import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Supabase configuration - you'll need to add these to your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl !== 'your-supabase-url' &&
                           supabaseAnonKey !== 'your-supabase-anon-key' &&
                           supabaseUrl !== 'your-actual-supabase-url-here' &&
                           supabaseAnonKey !== 'your-actual-anon-key-here';

export const supabase: SupabaseClient = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://demo.supabase.co', 'demo-key'); // This will fail gracefully

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  resendConfirmation: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasValidCredentials) {
      // Check for mock authentication in localStorage
      const mockAuth = localStorage.getItem('mock-auth');
      if (mockAuth) {
        try {
          const { user, session } = JSON.parse(mockAuth);
          setUser(user);
          setSession(session);
        } catch (error) {
          console.error('Error parsing mock auth:', error);
          localStorage.removeItem('mock-auth');
        }
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!hasValidCredentials) {
      // Mock authentication for demo purposes
      if (email && password) {
        const mockUser = {
          id: 'mock-user-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          aud: 'authenticated',
          role: 'authenticated',
          app_metadata: {},
          user_metadata: {},
        } as User;

        const mockSession = {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          expires_in: 3600,
          expires_at: Date.now() + 3600000,
          token_type: 'bearer',
          user: mockUser,
        } as Session;

        setUser(mockUser);
        setSession(mockSession);
        localStorage.setItem('mock-auth', JSON.stringify({ user: mockUser, session: mockSession }));
        return { error: null };
      }
      return { error: { message: 'Invalid credentials' } };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (!hasValidCredentials) {
      // Mock signup - same as signin for demo
      return await signIn(email, password);
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (!hasValidCredentials) {
      setUser(null);
      setSession(null);
      localStorage.removeItem('mock-auth');
      return;
    }

    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    if (!hasValidCredentials) {
      // Mock password reset
      return { error: null };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  const resendConfirmation = async (email: string) => {
    if (!hasValidCredentials) {
      // Mock resend confirmation
      return { error: null };
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    resendConfirmation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};