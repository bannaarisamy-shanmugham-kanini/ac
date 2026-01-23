import { useAppStore } from "@/store";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Activity as ActivityIcon,
  Pencil,
  Plus,
  Trash,
  ChevronUp,
  ChevronDown,
  SquareArrowOutUpRight,
} from "lucide-react";
import clsx from "clsx";
import { ActivityDetails } from "./ActivityDetails";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

/* ------------------ Project Card ------------------ */

const groupByProject = (activities: any[]) => {
  const map: Record<string, any[]> = {};

  activities.forEach((activity) => {
    const project =
      activity.entityName || activity.entityType || "Unknown Project";

    if (!map[project]) {
      map[project] = [];
    }
    map[project].push(activity);
  });

  Object.keys(map).forEach((key) => {
    map[key].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );
  });

  return map;
};

const ProjectActivityCard = ({ activities }: { activities: any[] }) => {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const groupedProjects = useMemo(
    () => groupByProject(activities),
    [activities],
  );

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

  return (
    <div className="bg-white border rounded-2xl shadow-sm sticky top-20">
      <div className="px-4 py-3 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          Project Activities
        </h2>
      </div>

      <div className="divide-y max-h-[70vh] overflow-auto">
        {Object.entries(groupedProjects).map(
          ([projectName, projectActivities]) => {
            const isOpen = openProject === projectName;

            return (
              <div key={projectName}>
                {/* Header */}
                <button
                  onClick={() =>
                    setOpenProject(isOpen ? null : projectName)
                  }
                  className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-50"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{projectName}</p>
                    <p className="text-xs text-gray-400">
                      {projectActivities.length} activities
                    </p>
                  </div>

                  {isOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Content */}
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

/* ------------------ Main Activity Page ------------------ */

export const Activity = () => {
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const activities = useAppStore((s) => s.activities);
  const [filterData, setFilterData] = useState<string>("Today");
  const [openId, setOpenId] = useState<string | number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderName("Activities");
  }, [setHeaderName]);

  const sortedActivities = useMemo(() => {
    return [...activities]
      .filter((activity) => {
        if (filterData === "All") return true;
        if (["ADD", "UPDATE", "DELETE"].includes(filterData)) {
          return activity.actionType === filterData;
        }

        let start = new Date().setHours(0, 0, 0, 0);
        let end = new Date().setHours(23, 59, 59, 999);

        if (filterData === "Yesterday") {
          start = new Date(
            new Date().setDate(new Date().getDate() - 1),
          ).setHours(0, 0, 0, 0);
          end = new Date(
            new Date().setDate(new Date().getDate() - 1),
          ).setHours(23, 59, 59, 999);
        }

        return (
          new Date(activity.createdAt).getTime() >= start &&
          new Date(activity.createdAt).getTime() <= end
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );
  }, [activities, filterData]);

  const renderIcon = (type: string) => {
    if (type === "ADD") return <Plus size={18} className="text-green-600" />;
    if (type === "UPDATE")
      return <Pencil size={18} className="text-blue-600" />;
    if (type === "DELETE")
      return <Trash size={18} className="text-red-600" />;
    return null;
  };

  return (
    <div className="w-full px-6 py-4">
      {/* Page Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <ActivityIcon />
        <h1 className="text-xl font-semibold">Activities</h1>
      </div>

      {/* 2 Column Layout */}
      <div className="flex justify-center gap-6">
        {/* Center Column */}
        <div className="flex-1 max-w-3xl bg-white border rounded-2xl shadow-sm">
          <div className="flex justify-center gap-2 p-3 border-b bg-gray-50 rounded-t-2xl">
            {["Today", "Yesterday", "All"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                onClick={() => setFilterData(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="divide-y">
            {sortedActivities.map((activity) => (
              <div
                key={activity.id}
                className="px-4 py-3 hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div
                      className={clsx(
                        "w-9 h-9 rounded-full flex items-center justify-center",
                        activity.actionType === "ADD" && "bg-green-100",
                        activity.actionType === "UPDATE" && "bg-blue-100",
                        activity.actionType === "DELETE" && "bg-red-100",
                      )}
                    >
                      {renderIcon(activity.actionType)}
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {activity.actionType}{" "}
                        {activity.entityName || activity.entityType}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {activity.actionType === "UPDATE" && (
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          navigate("/projects/edit/" + activity.entityId)
                        }
                      >
                        <SquareArrowOutUpRight />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setOpenId(
                            openId === activity.id ? null : activity.id,
                          )
                        }
                      >
                        {openId === activity.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {openId === activity.id && (
                  <div className="mt-2">
                    <ActivityDetails activity={activity} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-80">
          <ProjectActivityCard activities={activities} />
        </div>
      </div>
    </div>
  );
};
