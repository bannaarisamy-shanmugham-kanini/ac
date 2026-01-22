import { useCallback, useState } from "react";
import { type Activities } from "@/store/useAppStore";
import { ArrowRight } from "lucide-react";

export const ActivityDetails = (props: { activity: Activities }) => {
  const { activity } = props;

  const renderActivitydata = useCallback(() => {
    const newValues = activity?.changesMade?.newChanges
      ? JSON.parse(activity?.changesMade?.newChanges)
      : {};
    const oldValues = activity?.changesMade?.prevChanges
      ? JSON.parse(activity?.changesMade?.prevChanges)
      : {};
    const field = activity?.changesMade?.field || "";
    console.log(activity);
    return (
      <div className="flex justify-evenly">
        <div className="flex gap-2">
          <span className="text-blue-600">
            {oldValues["title"]} {"description"}:
          </span>
          <span className="text-gray-400 line-through">
            {oldValues["description"]}
          </span>{" "}
          <ArrowRight />
          <span className="text-gray-600">{newValues["description"]}</span>
        </div>
      </div>
    );
  }, [activity]);

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="flex flex-row justify-center">
          {renderActivitydata()}
        </div>
      </div>
    </div>
  );
};
