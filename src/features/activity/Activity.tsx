import { useAppStore, useProjectStore } from "@/store";
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
  Eye,
} from "lucide-react";
import clsx from "clsx";
import { ActivityDetails } from "./ActivityDetails";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectActivityPage } from "./ProjectActivityCard";

/* ------------------ Main Activity Page ------------------ */

export const Activity = () => {
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const activities = useAppStore((s) => s.activities);
  const projects = useProjectStore((s) => s.projects);
  const [filterData, setFilterData] = useState<string>("Today");
  const [groupByAction, setGroupByAction] = useState<string>("ADD");
  const [openId, setOpenId] = useState<string | number | null>(null);
  const navigate = useNavigate();
  const [hightLightId, setHighLightId] = useState("");

  useEffect(() => {
    setHeaderName("Activities");
  }, [setHeaderName]);

  console.log(projects, "projects");

  const showHighLight = (highLightRow: string) => {
    setHighLightId((prev) => highLightRow);
    const targetId = highLightRow;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.focus({ preventScroll: true });
      setTimeout(() => {
        setHighLightId("");
      }, 1000);

      // target.classList.add("animate-pulse"); // tailwind built-in
      // setTimeout(() => target.classList.remove("animate-pulse"), 600);
    }
  };

  const sortedActivities = useMemo(() => {
    return [...activities]
      .filter((activity) => {
        if (filterData === "All") return true;

        if (filterData === "GroupBy") {
          return activity.actionType === groupByAction;
        }

        let start = new Date().setHours(0, 0, 0, 0);
        let end = new Date().setHours(23, 59, 59, 999);

        if (filterData === "Yesterday") {
          start = new Date(
            new Date().setDate(new Date().getDate() - 1),
          ).setHours(0, 0, 0, 0);
          end = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
            23,
            59,
            59,
            999,
          );
        }

        return (
          new Date(activity.createdAt).getTime() >= start &&
          new Date(activity.createdAt).getTime() <= end
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [activities, filterData, groupByAction]);

  const renderIcon = (type: string) => {
    if (type === "ADD") return <Plus size={18} className="text-green-600" />;
    if (type === "UPDATE")
      return <Pencil size={18} className="text-blue-600" />;
    if (type === "DELETE") return <Trash size={18} className="text-red-600" />;
    if (type === "VIEW") return <Eye size={18} className="text-amber-500" />;
    return null;
  };

  return (
    <div className="w-full px-6 py-4">
      {/* Page Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <ActivityIcon className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Activities
        </h1>
      </div>

      {/* 2 Column Layout */}
      <div className="flex justify-center gap-6">
        {/* Center Column */}
        <div className="flex-1 max-w-3xl bg-white border rounded-2xl shadow-sm">
          <div className="flex justify-center gap-2 p-3 border-b bg-gray-50 rounded-t-2xl">
            {["Today", "Yesterday", "All"].map((item) => (
              <Button
                key={item}
                variant={filterData === item ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterData(item)}
                className={clsx(
                  filterData === item && "bg-blue-500 text-white",
                )}
              >
                {item}
              </Button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={filterData === "GroupBy" ? "default" : "ghost"}
                  size="sm"
                  className={clsx(
                    filterData === "GroupBy" && "bg-blue-500 text-white",
                  )}
                >
                  GroupBy {filterData === "GroupBy" && `(${groupByAction})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 bg-white border rounded-lg shadow-lg">
                <DropdownMenuItem
                  onClick={() => {
                    setFilterData("GroupBy");
                    setGroupByAction("ADD");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Plus size={16} className="text-green-600" />
                  </div>
                  <span className="font-medium text-sm">ADD</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setFilterData("GroupBy");
                    setGroupByAction("UPDATE");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Pencil size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">UPDATE</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setFilterData("GroupBy");
                    setGroupByAction("DELETE");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Trash size={16} className="text-red-600" />
                  </div>
                  <span className="font-medium text-sm">DELETE</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setFilterData("GroupBy");
                    setGroupByAction("VIEW");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Eye size={16} className="text-amber-500" />
                  </div>
                  <span className="font-medium text-sm">VIEW</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="divide-y">
            {sortedActivities.map((activity) => (
              <div
                key={activity.id}
                id={`activity-${activity.id}`}
                className={clsx(
                  "px-4 py-3 hover:bg-gray-100 last:hover:rounded-b-2xl",
                  hightLightId === `activity-${activity.id}` &&
                    "transition ring-4 ring-sky-300 ring-offset-2 bg-sky-50",
                )}
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div
                      className={clsx(
                        "w-9 h-9 rounded-full flex items-center justify-center",
                        activity.actionType === "ADD" && "bg-green-100",
                        activity.actionType === "UPDATE" && "bg-blue-100",
                        activity.actionType === "DELETE" && "bg-red-100",
                        activity.actionType === "VIEW" && "bg-amber-100",
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
                        className="cursor-pointer"
                        disabled={
                          !projects.some(
                            (project) => project.title === activity.entityName,
                          )
                        }
                        onClick={() =>
                          navigate("/projects/edit/" + activity.entityId)
                        }
                      >
                        <SquareArrowOutUpRight />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenId(openId === activity.id ? null : activity.id)
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
          <ProjectActivityPage
            activities={activities}
            projects={projects}
            setHighLightId={showHighLight}
          />
        </div>
      </div>
    </div>
  );
};
