import { useState } from "react";
import { clsx } from "clsx";
import { Icon } from "@iconify/react";
import useSideBar from "./hooks/useSideBar";
import { Link } from "react-router";
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// gsap.registerPlugin(useGSAP);

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogOut, user, linksArr } = useSideBar();

  return (
    <div
      className={clsx(
        "bg-black  text-white h-full transition-all duration-300 relative p-3",
        collapsed ? "w-64" : "w-64",
      )}
    >
      <p>Hello,{user}</p>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 hover:bg-stone-700 w-full text-left"
      >
        {collapsed ? ">" : "<"}
      </button>

      <ul className="mt-4 px-2 flex flex-col gap-3 justify-center">
        {linksArr.map((link) => (
          <Link
            to={link.url}
            key={link.label}
            className="flex gap-1 items-center"
          >
            {link.icon}
            <li
              key={link.label}
              className="text-white whitespace-nowrap overflow-hidden"
            >
              {!collapsed && link.label}
            </li>
          </Link>
        ))}

        <button
          className="hover:text-gray-300 transition flex items-center gap-2 rounded-full absolute bottom-12 cursor-pointer "
          onClick={handleLogOut}
        >
          <Icon icon="mdi:logout" width="20" height="20" />
          Log Out
        </button>
      </ul>
    </div>
  );
}
