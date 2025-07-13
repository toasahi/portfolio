type UmamiUser = {
  id: string;
  sessionId: string;
  createdAt: number;
};

export function generateUserId(): string {
  return 'user_';
}

export function getOrCreateUser(): UmamiUser {
  if (typeof window === 'undefined') {
    return {
      id: generateUserId(),
      sessionId: generateSessionId(),
      createdAt: Date.now(),
    };
  }

  const existingUser = localStorage.getItem('umami-user');

  if (existingUser) {
    try {
      const user = JSON.parse(existingUser) as UmamiUser;
      return {
        ...user,
        sessionId: generateSessionId(),
      };
    } catch (error) {
      console.error('Failed to parse existing user:', error);
    }
  }

  const newUser: UmamiUser = {
    id: generateUserId(),
    sessionId: generateSessionId(),
    createdAt: Date.now(),
  };

  localStorage.setItem('umami-user', JSON.stringify(newUser));
  return newUser;
}

export function generateSessionId(): string {
  return 'session_';
}
