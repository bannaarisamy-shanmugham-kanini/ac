import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

type ActivityItem = {
  id: string | number;
  actionType: "ADD" | "UPDATE" | "DELETE";
  entityName?: string;
  entityType?: string;
  createdAt: Date;
};

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
}: {
  activities: ActivityItem[];
}) => {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const groupedProjects = useMemo(
    () => groupByProject(activities),
    [activities],
  );

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
