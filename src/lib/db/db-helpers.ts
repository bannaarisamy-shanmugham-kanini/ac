import { dbPromise } from "./database";

// Projects
export async function saveProjects(projects: any[]) {
  const db = await dbPromise;
  const tx = db.transaction("projects", "readwrite");
  for (const project of projects) {
    await tx.store.put(project);
  }
  await tx.done;
}

export async function getAllProjects() {
  const db = await dbPromise;
  return db.getAll("projects");
}

// Activities
export async function saveActivities(activities: any[]) {
  const db = await dbPromise;
  const tx = db.transaction("activities", "readwrite");
  for (const activity of activities) {
    await tx.store.put(activity);
  }
  await tx.done;
}

export async function getAllActivities() {
  const db = await dbPromise;
  return db.getAll("activities");
}
