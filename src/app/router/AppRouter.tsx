import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ProjectsListPage } from "@/features/projects/pages/ProjectsListPage";
import { BaseLayout } from "../layout/BaseLayout";
import { Activity } from "@/features/activity/Activity";
import { ProjectList } from "@/features/projects/components/project-list";
import { CreateProject } from "@/features/projects/components/create-project";
import { EditProject } from "@/features/projects/components/edit-project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Activity /> },
      { path: "projects", element: <ProjectList /> },
      { path: "projects/create", element: <CreateProject /> },
      { path: "projects/edit/:id", element: <EditProject /> },
      // add: { path: "projects/:projectId", element: <ProjectDetailPage /> }
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
