import { useEffect, useState } from "react";
import { useAppStore, useProjectStore } from "@/store";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash, Plus, FolderKanban, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const deleteProject = useProjectStore((s) => s.deleteProject);
  const setHeaderName = useAppStore((s) => s.updateHeaderName);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Sort projects by createdAt (latest first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Latest first
  });

  useEffect(() => {
    setHeaderName("Projects");
  }, [setHeaderName]);

  const handleDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
      setDeleteId(null);
    }
  };

  console.log("Projects:", projects);

  return (
    <div className="w-full flex justify-center px-6 py-6">
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FolderKanban className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </h1>
          </div>

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
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedProjects.length > 0 ? (
                sortedProjects.map((item, index) => (
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
                    <TableCell className="text-gray-600">
                      {new Date(item.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          className="text-green-600 hover:bg-green-50"
                          onClick={() =>
                            navigate(`/projects/view/${item.id}`)
                          }
                        >
                          <Eye size={18} />
                        </Button>

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
                          onClick={() => setDeleteId(item.id)}
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
                    colSpan={5}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
