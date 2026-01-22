import { openDB } from "idb";

export const DB_NAME = "app-db";
export const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("projects")) {
      db.createObjectStore("projects", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("activities")) {
      db.createObjectStore("activities", { keyPath: "id" });
    }
  },
});
