import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store";
import { useNavigate } from "react-router-dom";
export const CreateProject = ({}) => {
  const [projects, setProjects] = useState({
    projectName: "",
    projectDescription: "",
  });
  const [error, setError] = useState({
    projectName: "",
    projectDescription: "",
  });
  const projectsAdd = useProjectStore((state) => state.createProject);
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (projects.projectName == "") {
      setError({ ...error, projectName: "Please enter project name" });
      return;
    }
    if (projects.projectDescription == "") {
      setError({
        ...error,
        projectDescription: "Please enter project description",
      });
      return;
    }
    projectsAdd({
      id: Math.random().toString(36).substring(2, 9),
      title: projects.projectName,
      description: projects.projectDescription,
    });
    navigate("/projects");
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-2">
      <div className="flex flex-col justify-center w-md gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          className=""
          onChange={(e) => {
            setProjects({ ...projects, projectName: e.target.value });
            if (e.target.value != "" && error.projectName !== "") {
              {
                setError({ ...error, projectName: "" });
              }
            }
          }}
        />
      </div>
      {error.projectName != "" && (
        <div className="text-red-500">Please enter project name</div>
      )}
      <div className="w-md gap-2">
        <Label>Description</Label>
        <Textarea
          rows={3}
          cols={40}
          className=""
          onChange={(e) => {
            setProjects({ ...projects, projectDescription: e.target.value });
            if (e.target.value != "" && error.projectDescription !== "") {
              {
                setError({ ...error, projectDescription: "" });
              }
            }
          }}
        />
      </div>
      {error.projectDescription != "" && (
        <div className="text-red-500">Please enter project description</div>
      )}
      <div className="flex align-text-bottom w-md justify-between">
        <Button
          variant={"ghost"}
          size={"lg"}
          onClick={() => {
            navigate("/projects");
          }}
        >
          Cancel
        </Button>
        <Button variant={"default"} size={"lg"} onClick={handleCreateProject}>
          Create Project
        </Button>
      </div>
    </div>
  );
};
