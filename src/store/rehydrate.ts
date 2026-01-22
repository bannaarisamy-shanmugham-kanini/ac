import { getAllProjects, getAllActivities } from "@/lib/db/db-helpers";
import { useProjectStore } from "./useProjectStore";
import { useAppStore } from "./useAppStore";

export async function rehydrateStore() {
  const [projects, activities] = await Promise.all([
    getAllProjects(),
    getAllActivities(),
  ]);

  useProjectStore.getState().setProjects([...projects]);
  useAppStore.getState().setActivities([...activities]);
}
