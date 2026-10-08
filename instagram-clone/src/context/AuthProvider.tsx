import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from './AuthContext';
import type { User, RegisterData } from '../types';

// ...rest of the file unchanged

interface AuthProviderProps {
  children: ReactNode;
}

interface StoredUser {
  user: User;
  password: string;
}

const INITIAL_USERS: Record<string, StoredUser> = {
  'alice@test.com': {
    user: {
      id: '1',
      username: 'alice',
      displayName: 'Alice Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?u=alice',
      bio: 'Designer. Coffee addict.',
      followerCount: 1240,
      followingCount: 342,
    },
    password: 'password',
  },
  'bob@test.com': {
    user: {
      id: '2',
      username: 'bob',
      displayName: 'Bob Smith',
      avatarUrl: 'https://i.pravatar.cc/150?u=bob',
      bio: 'Backend dev. Dog person.',
      followerCount: 890,
      followingCount: 112,
    },
    password: 'password',
  },
  'carol@test.com': {
    user: {
      id: '3',
      username: 'carol',
      displayName: 'Carol Martinez',
      avatarUrl: 'https://i.pravatar.cc/150?u=carol',
      bio: 'Photographer. Traveler.',
      followerCount: 15200,
      followingCount: 210,
    },
    password: 'password',
  },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalized = email.trim().toLowerCase();
    const stored = users[normalized];

    if (!stored) {
      throw new Error('No account found for that email.');
    }
    if (stored.password !== password) {
      throw new Error('Incorrect password.');
    }

    setCurrentUser(stored.user);
  }

  async function register(data: RegisterData) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = data.email.trim().toLowerCase();
    const normalizedUsername = data.username.trim().toLowerCase();

    if (users[normalizedEmail]) {
      throw new Error('An account with that email already exists.');
    }

    const usernameTaken = Object.values(users).some(
      (stored) => stored.user.username === normalizedUsername
    );
    if (usernameTaken) {
      throw new Error('That username is already taken.');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username: normalizedUsername,
      displayName: data.displayName.trim(),
      avatarUrl: `https://i.pravatar.cc/150?u=${normalizedEmail}`,
      bio: '',
      followerCount: 0,
      followingCount: 0,
    };

    setUsers({
      ...users,
      [normalizedEmail]: { user: newUser, password: data.password },
    });
    setCurrentUser(newUser);
  }

  function logout() {
    setCurrentUser(null);
  }

  const value: AuthContextValue = {
    user: currentUser,
    isAuthenticated: currentUser !== null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}