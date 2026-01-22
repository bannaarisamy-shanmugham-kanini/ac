import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store";
import { useNavigate } from "react-router-dom";

export const CreateProject = () => {
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
  });

  const [errors, setErrors] = useState({
    projectName: "",
    projectDescription: "",
  });

  const createProject = useProjectStore((s) => s.createProject);
  const navigate = useNavigate();

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { projectName: "", projectDescription: "" };

    if (!form.projectName.trim()) {
      newErrors.projectName = "Project name is required";
      valid = false;
    }

    if (!form.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    createProject({
      id: crypto.randomUUID(),
      title: form.projectName,
      description: form.projectDescription,
    });

    navigate("/projects");
  };

  return (
    <div className="w-full flex justify-center px-6 py-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-sm p-6 flex flex-col gap-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Project
          </h1>
          <p className="text-sm text-gray-500">
            Add a new project to manage tasks and activities
          </p>
        </div>

        {/* Project Name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            value={form.projectName}
            onChange={(e) => {
              setForm({ ...form, projectName: e.target.value });
              if (errors.projectName) {
                setErrors({ ...errors, projectName: "" });
              }
            }}
          />
          {errors.projectName && (
            <span className="text-sm text-red-500">
              {errors.projectName}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="projectDescription">Description</Label>
          <Textarea
            id="projectDescription"
            rows={4}
            placeholder="Briefly describe the project"
            value={form.projectDescription}
            onChange={(e) => {
              setForm({ ...form, projectDescription: e.target.value });
              if (errors.projectDescription) {
                setErrors({ ...errors, projectDescription: "" });
              }
            }}
          />
          {errors.projectDescription && (
            <span className="text-sm text-red-500">
              {errors.projectDescription}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </Button>

          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
};
