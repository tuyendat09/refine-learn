import Sidebar from "../shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router";

export default function DashBoardLayout() {
  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-cream">
      <Sidebar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}
