import { useAppStore } from "@/store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Activity as ActivityIcon,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import clsx from "clsx";

export const Activity = () => {
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const activities = useAppStore((s) => s.activities);

  useEffect(() => {
    setHeaderName("Activities");
  }, [setHeaderName]);

  // Sort activities by createdAt in descending order (latest first)
  const sortedActivities = [...activities].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  // Format the time
  const formatTime = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
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
          {["Today", "Yesterday", "All", "Filter"].map((item) => (
            <Button key={item} variant="ghost" size="sm">
              {item}
            </Button>
          ))}
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
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
            >
              {/* Icon */}
              <div
                className={clsx(
                  "flex items-center justify-center w-9 h-9 rounded-full",
                  activity.actionType === "ADD" && "bg-green-100",
                  activity.actionType === "UPDATE" && "bg-blue-100",
                  activity.actionType === "DELETE" && "bg-red-100"
                )}
              >
                {renderIcon(activity.actionType)}
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {activity.actionType}{" "}
                  <span className="text-gray-700">
                    {activity.entityType}
                  </span>
                </span>
                <span className="text-xs text-gray-400">
                  {formatTime(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
