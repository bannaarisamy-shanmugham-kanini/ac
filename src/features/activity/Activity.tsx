import { useAppStore } from "@/store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Activity as ActivityIcon, Pencil, Plus, Trash } from "lucide-react";

export const Activity = () => {
  const setHeaderName = useAppStore((appStore) => appStore.updateHeaderName);
  const activities = useAppStore((state) => state.activities);
  console.log(activities, "activities");
  useEffect(() => {
    setHeaderName("Activities");
  }, []);
  return (
    <div className="w-full top-0 content-center">
      <h1>
        <div className="flex flex-row gap-2 py-2">
          <ActivityIcon />
          Activities
        </div>
      </h1>
      <div className="w-2/4 bg-gray-300 rounded-2xl border-gray-700 flex flex-col border-b-2">
        <div className="flex flex-row justify-center">
          <div className="">
            <Button variant="ghost">Today</Button>
          </div>
          <div className="">
            <Button variant="ghost">Yesterday</Button>
          </div>
          <div className="">
            <Button variant="ghost">All</Button>
          </div>
          <div className="">
            <Button variant="ghost">Filter</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          {activities.map((activity) => {
            if (activity.actionType === "ADD") {
              return (
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <Plus /> {activity.actionType} {activity.entityType}
                  </div>
                  <div className="flex flex-row"></div>
                </div>
              );
            }
            if (activity.actionType === "UPDATE") {
              return (
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <Pencil /> {activity.actionType} {activity.entityType}
                  </div>
                  <div className="flex flex-row"></div>
                </div>
              );
            }
            if (activity.actionType === "DELETE") {
              return (
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <Trash /> {activity.actionType} {activity.entityType}
                  </div>
                  <div className="flex flex-row"></div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
