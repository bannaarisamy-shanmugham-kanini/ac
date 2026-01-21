import { useEffect, useState } from "react";
import { useAppStore, useProjectStore } from "@/store";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProjectList = () => {
  const projects = useProjectStore((projectStore) => projectStore.projects);
  const setHeaderName = useAppStore((appStore) => appStore.updateHeaderName);
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderName("Projects");
  }, []);
  return (
    <div className="flex justify-center p-6 flex-col w-3/4 gap-2">
      <div className="flex flex-row justify-between">
        <div className="flex justify-start">
          <h1 className="text-2xl">Projects</h1>
        </div>
        <div className="flex justify-end">
          <Button
            size={"lg"}
            variant={"outline"}
            className="flex gap-2"
            onClick={(e) => {
              e.preventDefault();
              navigate("/projects/create");
            }}
          >
            {" "}
            <Plus /> Create Project
          </Button>
        </div>
      </div>
      <div className="flex justify-center-safe">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {item.description ? item.description : "No description"}
                  </TableCell>
                  <TableCell>
                    <div className="flex max-w-5">
                      <Button
                        variant={"ghost"}
                        // size="lg"
                        className="flex justify-start"
                        onClick={(e) => {
                          navigate(`/projects/edit/${item.id}`);
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        className="flex justify-end"
                        variant={"ghost"}
                        // size="lg"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>AI Core App</TableCell>
                <TableCell>
                  An App Lets user to create multiple apps and deploy more apps
                  in a single platform
                </TableCell>
                <TableCell>
                  <div className="flex max-w-5">
                    <Button
                      variant={"ghost"}
                      // size="lg"
                      className="flex justify-start"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      className="flex justify-end"
                      variant={"ghost"}
                      // size="lg"
                    >
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
