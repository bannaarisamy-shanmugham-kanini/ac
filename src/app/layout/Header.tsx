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
import clsx from "clsx";

const MENU_ITEMS = [
  {
    label: "Activity",
    href: "/",
    icon: Activity,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: PanelsTopLeft,
  },
  // {
  //   label: "Tasks",
  //   href: "/tasks",
  //   icon: ListTodo,
  // },
  // {
  //   label: "Users",
  //   href: "/users",
  //   icon: UserRound,
  // },
];

export const Header = () => {
  const headerName = useAppStore((state) => state.headerName);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Sheet open={sideBarOpen} onOpenChange={setSideBarOpen}>
      {/* Header Button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50"
        >
          <Menu size={18} />
          <span className="font-semibold text-sm">{headerName || "Menu"}</span>
        </Button>
      </SheetTrigger>

      {/* Sidebar */}
      <SheetContent side="left" className="w-64 bg-white border-r shadow-lg">
        {/* Brand */}
        <SheetTitle>
          <div className="flex items-center gap-2 px-4 py-4 border-b">
            <Activity className="text-indigo-600" />
            <span className="font-bold text-lg text-indigo-600">
              Activity App
            </span>
          </div>
        </SheetTitle>

        {/* Menu */}
        <SheetDescription className="pt-2">
          {MENU_ITEMS.map((menu) => {
            const Icon = menu.icon;

            return (
              <div key={menu.href} className="px-3 py-1">
                <Button
                  variant="ghost"
                  size="lg"
                  className={clsx(
                    "w-full justify-start gap-3 text-gray-700",
                    "hover:bg-indigo-50 hover:text-indigo-600",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(menu.href);
                    setSideBarOpen(false);
                  }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{menu.label}</span>
                </Button>
              </div>
            );
          })}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
