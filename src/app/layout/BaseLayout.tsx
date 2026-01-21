import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const BaseLayout = () => {
  return (
    <div className="w-full top-0 flex flex-col">
      <div className="content-center">
        <Header />
      </div>
      <div className="flex gap-2 p-6 justify-center">
        <Outlet />
      </div>
    </div>
  );
};
