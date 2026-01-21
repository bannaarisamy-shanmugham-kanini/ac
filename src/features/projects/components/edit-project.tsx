import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store";
import { useNavigate, useParams } from "react-router-dom";

export const EditProject = () => {
  const { id } = useParams();
  const projectToEdit = useProjectStore((state) => state.projects).filter(
    (project) => project.id === id,
  );
  console.log(projectToEdit, "projectToEdit");
  const [projects, setProjects] = useState({
    projectName: "", //projectToEdit[0].title ?? "",
    projectDescription: "",
  });
  const [error, setError] = useState({
    projectName: "",
    projectDescription: "",
  });
  const projectsUpdate = useProjectStore((state) => state.updateProject);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      projectToEdit.length > 0 &&
      projects.projectName === "" &&
      projects.projectDescription === ""
    ) {
      setProjects({
        projectName: projectToEdit[0].title,
        projectDescription: projectToEdit[0].description ?? "",
      });
    }
  }, [projects, projectToEdit]);

  const handleUpdateProject = () => {
    if (!id) return;
    if (projects.projectDescription === "") {
      setError({
        ...error,
        projectDescription: "Please enter project description",
      });
      return;
    }
    projectsUpdate(id, { description: projects.projectDescription });
    navigate("/projects");
  };
  if (!id)
    return (
      <div className="flex justify-center gap-2 p-2">
        Edit page is accessed without Proper details, Please click{" "}
        <a href="/projects">here</a> to redirect to Projects page.
      </div>
    );
  return (
    <div className="flex flex-col justify-center gap-2 p-2">
      <div className="flex flex-col justify-center w-md gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          className=""
          value={projectToEdit[0].title}
          readOnly={true}
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
          value={projects.projectDescription}
          onChange={(e) => {
            setProjects(() => {
              return {
                ...projects,
                projectDescription: e.target.value,
              };
            });
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
        <Button
          variant={"default"}
          size={"lg"}
          onClick={() => handleUpdateProject()}
        >
          Update Project
        </Button>
      </div>
    </div>
  );
};
