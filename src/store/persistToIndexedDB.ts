import { useProjectStore } from "./useProjectStore";
import { useAppStore } from "./useAppStore";
import { saveProjects, saveActivities } from "@/lib/db/db-helpers";

let initialized = false;

export function initZustandPersistence() {
  if (initialized) return;
  initialized = true;

  useProjectStore.subscribe((state) => {
    saveProjects(state.projects);
  });
  useAppStore.subscribe((state) => {
    saveActivities(state.activities);
  });
}
