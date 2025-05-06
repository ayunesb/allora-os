import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <nav>
      <ul>
        {/* ...existing code... */}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {/* ...existing code... */}
      </ul>
    </nav>
  );
};
export default Sidebar;
