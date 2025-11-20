import { useState } from "react";
import { clsx } from "clsx";
import { Icon } from "@iconify/react";
import useSideBar from "./hooks/useSideBar";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogOut, user, linksArr } = useSideBar();
  const hoverClass = "hover:bg-[#1D1F20] transition duration ";

  return (
    <motion.div
      animate={{
        width: collapsed ? 200 : 65,
      }}
      className=" h-screen"
    >
      <div className="bg-black text-white h-full p-3  overflow-hidden">
        <p className="p-2 mb-4">Hello,{collapsed ? user : ""}</p>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            "p-2  w-full text-left flex gap-2 items-center justify-between rounded-lg",
            hoverClass,
          )}
        >
          <div>
            <motion.div
              transition={{ type: "tween" }}
              animate={{
                opacity: collapsed ? 1 : 0,
                x: collapsed ? 0 : 20,
              }}
            >
              Dashboard
            </motion.div>
          </div>
          <motion.div
            className="text-white"
            animate={{
              x: collapsed ? 0 : -85,
            }}
            transition={{ type: "tween" }}
          >
            <Icon
              className="-rotate-45"
              icon="system-uicons:scale-extend"
              width="20"
              height="20"
            />
          </motion.div>
        </button>

        <ul className="mt-4 flex flex-col   h-[85%] gap-3 ">
          {linksArr.map((link) => (
            <Link
              to={link.url}
              key={link.label}
              className={clsx(
                "flex gap-1 items-center p-2 rounded-lg",
                hoverClass,
              )}
            >
              <div> {link.icon}</div>
              <motion.li
                transition={{ type: "tween" }}
                animate={{
                  opacity: collapsed ? 1 : 0,
                  x: collapsed ? 0 : 20,
                }}
                key={link.label}
                className="text-white whitespace-nowrap overflow-hidden"
              >
                {link.label}
              </motion.li>
            </Link>
          ))}

          <button
            className={clsx(
              "hover:text-gray-300 p-2 mt-auto transition flex items-center h-10 rounded-lg  cursor-pointer",
              hoverClass,
            )}
            onClick={handleLogOut}
          >
            <div>
              <Icon icon="mdi:logout" width="20" height="20" />
            </div>
            <motion.li
              transition={{ type: "tween" }}
              animate={{
                opacity: collapsed ? 1 : 0,
                x: collapsed ? 0 : 20,
              }}
            >
              Log Out
            </motion.li>
          </button>
        </ul>
      </div>
    </motion.div>
  );
}
