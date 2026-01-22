import { create } from "zustand";

export type App = {
  headerName: string;
};

export type Activities = {
  id: number;
  actionType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  changesMade: {
    field: string;
    prevChanges: string;
    newChanges: string;
  };
  createdAt: Date;
};

type AppState = {
  headerName: string;
  updateHeaderName: (headerName: string) => void;
  activities: Activities[];
  updateActivities: (activities: Activities) => void;
  setActivities: (activities: Activities[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  headerName: "Activities",

  updateHeaderName: (headerName) => set({ headerName }),

  activities: [],

  updateActivities: (activityAdded: Activities) =>
    set((state) => ({ activities: [...state.activities, activityAdded] })),

  setActivities: (activities: Activities[]) => set({ activities }),
}));
