import React from "react";
import Sidebar from "./Sidebar";
import MainArea from "./MainArea";

function Dashboard(props) {
  return (
    <div className="d-flex w-100 vh-100">
      
      <Sidebar />
    
      <div className="flex-grow-1">
        <MainArea onLogout={props.onLogout} />
      </div>

    </div>
  );
}

export default Dashboard;
