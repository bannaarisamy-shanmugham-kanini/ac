import { create } from "zustand";
import { useAppStore } from "./useAppStore";
export type Project = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
};

type ProjectState = {
  projects: Project[];
  createProject: (item: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setProjects: (items: Project[]) => void;
  viewProject: (id: string) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],

  createProject: (item) => {
    const projectWithTimestamp = {
      ...item,
      createdAt: new Date(),
    };
    set((state) => ({
      projects: [...state.projects, projectWithTimestamp],
    }));
    useAppStore.getState().updateActivities({
      id: useAppStore.getState().activities.length + 1,
      actionType: "ADD",
      entityType: "PROJECT",
      entityId: item.id,
      entityName: item.title,
      changesMade: {
        field: "projects",
        prevChanges: "",
        newChanges: JSON.stringify(projectWithTimestamp),
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
      entityId: id,
      entityName: item?.title || "",
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
      entityId: id,
      entityName: project?.title || "",
      changesMade: {
        field: "projects",
        prevChanges: JSON.stringify({ ...project }),
        newChanges: "",
      },
      createdAt: new Date(),
    });
  },

  viewProject: (id) => {
    const project = useProjectStore
      .getState()
      .projects.find((item) => item.id === id);
    useAppStore.getState().updateActivities({
      id: useAppStore.getState().activities.length + 1,
      actionType: "VIEW",
      entityType: "PROJECT",
      entityId: id,
      entityName: project?.title || "",
      changesMade: {
        field: "projects",
        prevChanges: JSON.stringify({ ...project }),
        newChanges: JSON.stringify({ ...project }),
      },
      createdAt: new Date(),
    });
  },

  setProjects: (projects) => {
    set({ projects });
  },
}));
