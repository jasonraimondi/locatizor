import React from "react";
import { Link } from "react-router-dom";

import { FileSelect } from "@/renderer/FileSelect";

export const Layout: React.FC = ({ children }) => {
  return <div id="app-container">
    <aside>
      <nav className="mt-8">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/photo/2">Two</Link></li>
        </ul>
        <div className="overflow-y">
          <FileSelect/>
        </div>
      </nav>
    </aside>
    <article>
      {children}
    </article>
  </div>;
};
