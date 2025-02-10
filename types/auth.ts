export interface User {
  id: string;
  email: string;
  displayName?: string;
}

export interface AuthState {
  isLoading: boolean;
  isSignedIn: boolean;
  user: User | null;
} 