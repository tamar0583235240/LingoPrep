import { create } from 'zustand';

interface UserState {
  userId?: string;
  fullName?: string;
  answered: number;
  total: number;
  setUserId: (id: string) => void;
  setFullName: (name: string) => void;
  setAnswered: (count: number) => void;
  setTotal: (count: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  fullName: undefined,
  answered: 0,
  total: 0,
  setUserId: (id) => set({ userId: id }),
  setFullName: (name) => set({ fullName: name }),
  setAnswered: (count) => set({ answered: count }),
  setTotal: (count) => set({ total: count }),
}));
