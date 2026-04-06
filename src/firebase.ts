// Mock Firebase to use local backend since Firebase was declined
export const auth = {
  get currentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  },
  signOut: async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export const onAuthStateChanged = (authObj: any, callback: (user: any) => void) => {
  // Call immediately with current state
  callback(auth.currentUser);
  
  // Listen for storage changes to sync across tabs
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'user') {
      callback(auth.currentUser);
    }
  };
  window.addEventListener('storage', handleStorage);
  
  // Also listen for a custom event for same-tab updates
  const handleUserUpdate = () => {
    callback(auth.currentUser);
  };
  window.addEventListener('user-auth-changed', handleUserUpdate);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('user-auth-changed', handleUserUpdate);
  };
};

export const signOut = async (authObj: any) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('user-auth-changed'));
};

export const googleProvider = {};

// Mock Firestore functions to point to our API
export const db = {};
export const collection = (db: any, path: string) => path;
export const doc = (db: any, path: string, id: string) => `${path}/${id}`;
export const getDoc = async (path: string) => {
  const response = await fetch(`/api/${path}`);
  return { exists: () => response.ok, data: () => response.json() };
};

export const signInWithEmailAndPassword = async (authObj: any, email: string, pass: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);
  window.dispatchEvent(new Event('user-auth-changed'));
  return { user: data.user };
};

export const createUserWithEmailAndPassword = async (authObj: any, email: string, pass: string) => {
  // This is handled by our register endpoint
  return { user: { email, uid: Math.random().toString(36).substr(2, 9) } };
};

export const signInWithPopup = async (authObj: any, provider: any) => {
  throw new Error("Google Login requires Firebase. Please use email/password.");
};

export const sendPasswordResetEmail = async (authObj: any, email: string) => {
  alert("La réinitialisation du mot de passe n'est pas disponible sans Firebase. Veuillez contacter le support.");
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}
