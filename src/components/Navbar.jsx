import React from "react";
import Link from "next/link";
import {
  AiOutlineControl,
  AiOutlineShoppingCart,
  AiOutlineSetting,
  AiOutlineDollar,
  AiOutlineDashboard,
  AiOutlineUsergroupAdd,
  AiOutlineProject,
} from "react-icons/ai";

const Navbar = () => {
  let iconStyles = { color: "white" };
  return (
    <div className="fixed top-0 w-[20%] h-screen bg-cyan-900 pt-10 ease-in duration-500">
      <div>
        <div className="flex w-full items-center justify-between"></div>
        <div className="text-white font-bold uppercase pl-5">
          <p>User Super Admin</p>
        </div>
      </div>
      <div className=" flex flex-col pl-10">
        <ul>
          <div className="flex items-center">
            <AiOutlineDashboard style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Tablero
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineShoppingCart style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Ventas
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineUsergroupAdd style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Clientes
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineProject style={iconStyles} />
            <Link href="/productos">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Productos
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineControl style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Tareas
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineSetting style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Administración
              </li>
            </Link>
          </div>

          <div className="flex items-center">
            <AiOutlineDollar style={iconStyles} />
            <Link href="/">
              <li className="pl-2 py-4 text-sm font-bold text-gray-400 hover:text-white">
                Financiera
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
