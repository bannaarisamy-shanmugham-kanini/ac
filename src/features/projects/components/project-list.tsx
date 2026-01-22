import { useEffect } from "react";
import { useAppStore, useProjectStore } from "@/store";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderName("Projects");
  }, [setHeaderName]);

  return (
    <div className="w-full flex justify-center px-6 py-6">
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Projects
          </h1>

          <Button
            size="lg"
            className="flex gap-2 bg-blue-400 hover:bg-blue-600 text-white"
            onClick={() => navigate("/projects/create")}
          >
            <Plus size={18} />
            Create Project
          </Button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16">S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.length > 0 ? (
                projects.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {item.description || "No description"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() =>
                            navigate(`/projects/edit/${item.id}`)
                          }
                        >
                          <Pencil size={18} />
                        </Button>

                        <Button
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No projects found. Create your first project.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
