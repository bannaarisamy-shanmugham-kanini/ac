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
import { set } from "date-fns";
// import { DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export const Activity = () => {
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const activities = useAppStore((s) => s.activities);
  const [filterData, setFilterData] = useState<string>("Today");
  const [openId, setOpenId] = useState<string | number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderName("Activities");
  }, [setHeaderName]);

  // Sort activities by createdAt in descending order (latest first)
  let sortedActivities = useMemo(() => {
    if (filterData === "") {
      return [...activities]
        .map((activity) => ({ ...activity, show: false }))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
    } else {
      return [...activities]
        .map((activity) => ({ ...activity, show: false }))
        .filter((activity) => {
          if (filterData === "All" || filterData === "Filter") return true;
          if (
            filterData === "ADD" ||
            filterData === "UPDATE" ||
            filterData === "DELETE"
          ) {
            return activity.actionType === filterData;
          }
          let startDate = new Date().getTime();
          let endDate = new Date().getTime();
          if (filterData === "Today") {
            startDate = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
            endDate = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
          }
          if (filterData === "Yesterday") {
            startDate = new Date(
              new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
                0,
                0,
                0,
                0,
              ),
            ).getTime();
            endDate = new Date(
              new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
                23,
                59,
                59,
                999,
              ),
            ).getTime();
          }
          return (
            new Date(activity.createdAt).getTime() >= startDate &&
            new Date(activity.createdAt).getTime() <= endDate
          );
        })
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
    }
  }, [activities, filterData]);

  // Format the time
  const formatTime = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "ADD":
        return <Plus className="text-green-600" size={18} />;
      case "UPDATE":
        return <Pencil className="text-blue-600" size={18} />;
      case "DELETE":
        return <Trash className="text-red-600" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-6 py-4">
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-4 justify-center">
        <ActivityIcon className="text-gray-700" />
        <h1 className="text-xl font-semibold">Activities</h1>
      </div>

      {/* Activity Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border">
        {/* Filters */}
        <div className="flex justify-center gap-2 p-3 border-b bg-gray-50 rounded-t-2xl w-full">
          {["Today", "Yesterday", "All", "Filter"].map((item: string) => (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setFilterData(item as string);
              }}
            >
              {item}
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                {["ADD", "UPDATE", "DELETE"].indexOf(filterData) > -1
                  ? `Group By ${filterData}`
                  : "Group By"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuRadioGroup>
                <DropdownMenuCheckboxItem
                  checked={filterData === "ADD"}
                  onCheckedChange={(open) => {
                    if (open) setFilterData("ADD");
                    else setFilterData("");
                  }}
                >
                  ADD
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterData === "UPDATE"}
                  onCheckedChange={(open) => {
                    if (open) setFilterData("UPDATE");
                    else setFilterData("");
                  }}
                >
                  UPDATE
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterData === "DELETE"}
                  onCheckedChange={(open) => {
                    if (open) setFilterData("DELETE");
                    else setFilterData("");
                  }}
                >
                  DELETE
                </DropdownMenuCheckboxItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Activity List */}
        <div className="flex flex-col divide-y">
          {sortedActivities.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No activities found
            </div>
          )}

          {sortedActivities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition"
            >
              <div className="flex flex-row justify-between w-full">
                <div className="flex gap-2">
                  {/* Icon */}
                  <div
                    className={clsx(
                      "flex items-center justify-center w-9 h-9 rounded-full",
                      activity.actionType === "ADD" && "bg-green-100",
                      activity.actionType === "UPDATE" && "bg-blue-100",
                      activity.actionType === "DELETE" && "bg-red-100",
                    )}
                  >
                    {renderIcon(activity.actionType)}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {activity.actionType}{" "}
                      <span className="text-gray-700">
                        {activity.entityName || activity.entityType}
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  {activity.actionType === "UPDATE" ? (
                    <div>
                      <Button
                        size={"icon"}
                        variant="ghost"
                        onClick={() => {
                          navigate("/projects/edit/" + activity.entityId);
                        }}
                      >
                        <SquareArrowOutUpRight />
                      </Button>
                      <Button
                        size={"icon"}
                        variant="ghost"
                        onClick={() => {
                          setOpenId((prev) => (prev ? null : activity.id));
                        }}
                      >
                        {activity.id === openId ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
              {activity.id === openId ? (
                <div className="flex min-h-8">
                  <ActivityDetails activity={activity} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
