import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store";
import { useNavigate, useParams } from "react-router-dom";

export const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useProjectStore((s) =>
    s.projects.find((p) => p.id === id)
  );

  const updateProject = useProjectStore((s) => s.updateProject);

  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setDescription(project.description ?? "");
    }
  }, [project]);

  /* ---------------- Guard States ---------------- */
  if (!id) {
    return (
      <div className="flex justify-center p-6 text-red-500">
        Invalid project reference.{" "}
        <Button variant="link" onClick={() => navigate("/projects")}>
          Go back
        </Button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center p-6 text-gray-500">
        Project not found.
      </div>
    );
  }

  /* ---------------- Submit ---------------- */
  const handleUpdate = () => {
    if (!description.trim()) {
      setError("Project description is required");
      return;
    }

    updateProject(id, { description });
    navigate("/projects");
  };

  return (
    <div className="w-full flex justify-center px-6 py-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-sm p-6 flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Project
          </h1>
          <p className="text-sm text-gray-500">
            Update project details below
          </p>
        </div>

        {/* Project Name */}
        <div className="flex flex-col gap-1">
          <Label>Project Name</Label>
          <Input value={project.title} readOnly />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label>Description</Label>
          <Textarea
            rows={4}
            value={description}
            placeholder="Update project description"
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError("");
            }}
          />
          {error && (
            <span className="text-sm text-red-500">{error}</span>
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
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleUpdate}
          >
            Update Project
          </Button>
        </div>
      </div>
    </div>
  );
};
