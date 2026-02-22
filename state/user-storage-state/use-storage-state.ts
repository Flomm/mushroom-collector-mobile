import { AuthData } from '@/models/auth/auth-data.type';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { SecureStoreState } from './secure-storage-data.type';

const secureStorage: StateStorage = {
  getItem: async name => {
    const value = await SecureStore.getItemAsync(name);
    return value ?? null;
  },
  setItem: async (name, value) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async name => {
    await SecureStore.deleteItemAsync(name);
  }
};

export const useSecureStorage = create<SecureStoreState>()(
  persist(
    (set, _) => ({
      authData: null,
      setAuthData: (authData: AuthData | null) => set({ authData })
    }),
    {
      name: 'mushroom-secure-store',
      storage: createJSONStorage(() => secureStorage)
    }
  )
);
