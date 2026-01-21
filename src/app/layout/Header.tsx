import { useEffect, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  PanelsTopLeft,
  ListTodo,
  UserRound,
  Activity,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  {
    label: "Activity",
    href: "/",
    icon: <Activity />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <PanelsTopLeft />,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <ListTodo />,
  },
  {
    label: "Users",
    href: "/users",
    icon: <UserRound />,
  },
];

export const Header = () => {
  const headerName = useAppStore((state) => state.headerName);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Sheet open={sideBarOpen} onOpenChange={setSideBarOpen}>
      <SheetTrigger asChild className="w-30">
        <Button variant="ghost" size="icon">
          <div className="flex flex-row gap-2">
            <Menu /> {headerName || ""}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="min-w-[150px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
      >
        <SheetTitle>
          <div className="border-b-2">Activity App</div>
        </SheetTitle>
        <SheetDescription>
          {MENU_ITEMS.map((menu) => {
            return (
              <div className="p-3 w-full">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(menu.href);
                    setSideBarOpen(false);
                  }}
                >
                  {menu.label}
                </Button>
              </div>
            );
          })}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
