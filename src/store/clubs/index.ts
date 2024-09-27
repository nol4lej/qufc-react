import { Club } from "@src/types/club";
import { create } from "zustand";

interface ClubsStore {
    clubs: Club[];
    setClubs: (clubs: Club[]) => void;
}

export const useClubsStore = create<ClubsStore>((set) => ({
    clubs: [],
    setClubs: (clubs: Club[]) => set({ clubs }),
}))