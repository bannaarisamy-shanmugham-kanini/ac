import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, SquareArrowOutUpRight } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Activities } from "@/store";

type ActivityItem = Activities;

const groupByProject = (activities: ActivityItem[]) => {
  const map: Record<string, ActivityItem[]> = {};

  activities.forEach((activity) => {
    const projectName =
      activity.entityName || activity.entityType || "Unknown Project";

    if (!map[projectName]) {
      map[projectName] = [];
    }

    map[projectName].push(activity);
  });

  // Sort latest first inside each project
  Object.keys(map).forEach((key) => {
    map[key].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );
  });

  return map;
};

const formatTime = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/* ---------- Component ---------- */

export const ProjectActivityPage = ({
  activities,
    projects,
}: {
  activities: ActivityItem[];
  projects: { title: string }[];
}) => {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const navigate = useNavigate();

  const groupedProjects = useMemo(
    () => groupByProject(activities),
    [activities],
  );

  console.log(activities, "activities");

  return (
    <div className="bg-white border rounded-2xl shadow-sm sticky top-20">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          Project Activities
        </h2>
      </div>

      {/* Accordion */}
      <div className="divide-y max-h-[70vh] overflow-auto">
        {Object.keys(groupedProjects).length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No project activities
          </div>
        )}

        {Object.entries(groupedProjects).map(
          ([projectName, projectActivities]) => {
            const isOpen = openProject === projectName;

            return (
              <div key={projectName}>
                {/* Accordion Header */}
                <button
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                  onClick={() =>
                    setOpenProject(isOpen ? null : projectName)
                  }
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">
                      {projectName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {projectActivities.length} activities
                    </p>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="bg-gray-50 px-4 py-2 space-y-2">
                    {projectActivities.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-white border rounded-md p-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p
                              className={clsx(
                                "text-xs font-semibold",
                                activity.actionType === "ADD" &&
                                  "text-green-600",
                                activity.actionType === "UPDATE" &&
                                  "text-blue-600",
                                activity.actionType === "DELETE" &&
                                  "text-red-600",
                              )}
                            >
                              {activity.actionType}
                            </p>

                            <p className="text-xs text-gray-500">
                              {formatTime(activity.createdAt)}
                            </p>
                          </div>

                          {activity.actionType === "UPDATE" && activity.entityId && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              disabled={!projects.some(project => project.title === activity.entityName)}
                              onClick={() =>
                                navigate("/projects/edit/" + activity.entityId)
                              }
                            >
                              <SquareArrowOutUpRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
