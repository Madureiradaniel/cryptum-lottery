import create from 'zustand';
import { persist } from 'zustand/middleware';

const useToken = create(
  persist(
    (set) => ({
      data: '',
      setData: (data) => set({ data })
    }),
    {
      name: 'data',
    }
  )
);

export default useToken;
