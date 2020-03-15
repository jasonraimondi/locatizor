import React from "react";
import { Link } from "react-router-dom";

import { FileSelect } from "@/renderer/file_select.tsx";
import { useCurrentPath } from "@/renderer/providers/current_path";
import { Button } from "@/renderer/elements/button";

import "@/renderer/sidebar_layout";

export const SidebarLayout: React.FC = ({ children }) => {
  const { openFileSelector } = useCurrentPath();

  return <div id="app-container">
    <header/>
    <aside className="flex flex-col">
      <nav className="mt-8">
        <ul className="flex">
          <li className="flex-1 self-center"><Link className="button w-full h-full" to="/">Home</Link></li>
          <li className="flex-1 self-center"><Link className="button w-full h-full" to="/photo/2">Two</Link></li>
          <li className="flex-1 self-center">
            <Button className="w-full" onClick={openFileSelector}>Open</Button>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col justify-center align-center overflow-y-auto">
        <FileSelect/>
      </div>
    </aside>
    <article>
      {children}
    </article>
  </div>;
};
