import React, { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import { useNavigate } from "react-router";

function MainArea({ onLogout }) {
  const { getUsers, userList, channels, fetchChannels, userHeaders } = useData();
  const [showAllUsers, setShowAllUsers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userList.length === 0) getUsers();
    fetchChannels();
  }, []);

  return (
    <div className="flex-grow-1 d-flex flex-column p-4 bg-light" style={{ overflowY: "auto" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">Dashboard</h2>
        <button className="btn btn-warning" onClick={onLogout}>Logout</button>
      </div>

      <section className="mb-5">
        <h4 className="text-secondary mb-3">Users</h4>
        <div className="row row-cols-1 row-cols-md-2 g-3" style={{ maxHeight: "300px", overflowY:"scroll"}}>
          {Array.isArray(userList) && userList.length > 0 ? (
            <>
              {userList.slice(0, showAllUsers ? userList.length : 4).map(({ id, email }) => (
                <div key={id} className="col">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <p className="card-text mb-1"><strong>ID:</strong> {id}</p>
                      <p className="card-text mb-0"><strong>Email:</strong> {email}</p>
                    </div>
                  </div>
                </div>
              ))}
              {userList.length > 4 && (
                <div className="col-12">
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={() => setShowAllUsers(!showAllUsers)}
                  >
                    {showAllUsers ? "Show Less" : "Show All"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted">No users available...</p>
          )}
        </div>
      </section>

      <section>
        <div className="d-flex flex-row justify-content-between">
        <h4>Your Channels</h4>
        <button
          className="btn btn-success shadow-sm me-2 mb-2"
          onClick={() => navigate("/channel/create")}
        >
          + New Channel
        </button>
        </div>
        <div className="channellist">
        {Array.isArray(channels) && channels.length > 0 ? (
          <ul className="list-group">
            {channels.map((ch) => (
              <li
                key={ch.id}
                className="channel-item list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  onClick={() => navigate(`/channel/${ch.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  #{ch.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No channels found.</p>
        )}
        </div>
      </section>
    </div>
  );
}

export default MainArea;
