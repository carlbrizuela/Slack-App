import React from "react";
import { useNavigate } from "react-router";

function Sidebar(props) {
  const navigate = useNavigate();
  const { onLogout } = props;

  return (
    <div className="vh-100 bg-secondary text-light p-3" style={{ width: "250px", minWidth: "250px" }}>
      <h5 className="mt-2 mb-4">Slack App</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <span className="nav-link text-light" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Home</span>
        </li>
        <li className="nav-item mb-2">
          <span className="nav-link text-light" onClick={() => navigate("/channel/create")} style={{ cursor: "pointer" }}>+ Add Channel</span>
        </li>
        <li className="nav-item mb-2">
          <span className="nav-link text-light" onClick={() => navigate("/message")} style={{ cursor: "pointer" }}>Direct Messages</span>
        </li>
        {/* <li className="nav-item mt-4">
          <span className="nav-link text-warning" onClick={onLogout} style={{ cursor: "pointer" }}>Logout</span>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
