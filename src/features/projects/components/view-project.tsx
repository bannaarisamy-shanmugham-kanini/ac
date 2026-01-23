import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

export const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useProjectStore((s) => s.projects.find((p) => p.id === id));
  const viewProject = useProjectStore((s) => s.viewProject);

  useEffect(() => {
    if (project && id) {
      viewProject(id);
    }
  }, [project, id]);

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

  return (
    <div className="w-full flex justify-center px-6 py-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-sm p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-800">
              View Project
            </h1>
            <p className="text-sm text-gray-500">Check project details below</p>
          </div>
          <div className="flex flex-row">
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 rounded-2xl"
              size={"icon"}
              onClick={(e) => {
                navigate(`/projects/edit/${id}`);
              }}
            >
              <Pencil />
            </Button>
          </div>
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
            value={project.description}
            placeholder="Update project description"
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 pt-2">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => {
              navigate("/projects");
            }}
          >
            Go to Projects
          </Button>
        </div>
      </div>
    </div>
  );
};
