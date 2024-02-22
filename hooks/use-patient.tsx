import { create } from "zustand";

interface usePatientStore {
  pExists: boolean;
  onExist: () => void;
  onDoesNotExist: () => void;
}

export const usePatient = create<usePatientStore>((set) => ({
  pExists: false,
  onExist: () => set(() => ({ pExists: true })),
  onDoesNotExist: () => set(() => ({ pExists: true })),
}));
