import create from "zustand";

const useInfo = create((set) => ({
  user: { email: "", nome: "" },
  setUser: (user) => set({ user }),
}));

export default useInfo;
