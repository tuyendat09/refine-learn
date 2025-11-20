import Sidebar from "../shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router";

export default function DashBoardLayout() {
  return (
    <div className="flex w-full gap-2 bg-cream h-screen overflow-hidden">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto pr-3">
        <Outlet />
      </div>
    </div>
  );
}
