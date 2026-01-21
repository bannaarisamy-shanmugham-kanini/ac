import { create } from "zustand";
import { useAppStore } from "./useAppStore";
export type Project = {
  id: string;
  title: string;
  description?: string;
};

type ProjectState = {
  projects: Project[];
  createProject: (item: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setProjects: (items: Project[]) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],

  createProject: (item) => {
    set((state) => ({
      projects: [...state.projects, item],
    }));
    useAppStore.getState().updateActivities({
      id: useAppStore.getState().activities.length + 1,
      actionType: "ADD",
      entityType: "PROJECT",
      changesMade: {
        field: "projects",
        prevChanges: "",
        newChanges: JSON.stringify(item),
      },
      createdAt: new Date(),
    });
  },

  updateProject: (id, updates) => {
    const item = useProjectStore
      .getState()
      .projects.find((item) => item.id === id);
    set((state) => ({
      projects: state.projects.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
    useAppStore.getState().updateActivities({
      id: useAppStore.getState().activities.length + 1,
      actionType: "UPDATE",
      entityType: "PROJECT",
      changesMade: {
        field: "projects",
        prevChanges: JSON.stringify(item),
        newChanges: JSON.stringify({ ...updates }),
      },
      createdAt: new Date(),
    });
  },

  deleteProject: (id) => {
    const project = useProjectStore
      .getState()
      .projects.find((item) => item.id === id);
    set((state) => ({
      projects: state.projects.filter((item) => item.id !== id),
    }));
    useAppStore.getState().updateActivities({
      id: useAppStore.getState().activities.length + 1,
      actionType: "DELETE",
      entityType: "PROJECT",
      changesMade: {
        field: "projects",
        prevChanges: JSON.stringify({ ...project }),
        newChanges: "",
      },
      createdAt: new Date(),
    });
  },

  setProjects: (projects) => {
    set({ projects });
  },
}));
