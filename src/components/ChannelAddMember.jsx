import React, { useState } from "react";
import axios from "axios";
import { useData } from "../context/DataProvider";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

function ChannelAddMember({ onMemberAdded }) {
    const { userList, userHeaders, channels } = useData()
    const [selectedUser, setSelectedUser] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();
    const channelId = Number(id);
  
    const handleAdd = async () => {
      try {
        await axios.post(`${API_URL}/channel/add_member`, {
          id: channelId,
          member_id: selectedUser
        }, { headers: userHeaders })
        alert("User added to channel")
        if (onMemberAdded) onMemberAdded();
        navigate(`/channel/${channelId}`)
      } catch {
        alert("Failed to add user")
      }
    }

    // const fetchChannelMembers = async (id) => {
    //   try {
    //     const response = await axios.get(`${API_URL}/channels/${id}`, {
    //       headers: userHeaders,
    //     });
    //     const members = response.data.members || [];
    //     // Optionally, update the state for members if needed
    //     console.log(members);
    //   } catch (error) {
    //     alert("Failed to fetch channel members");
    //   }
    // };
  
    return (
      <div className="container mt-5 p-4 bg-light rounded shadow w-50">
        <h3 className="mb-4 text-center">Add Member to Channel</h3>
        
        <div className="mb-3">
          <label className="form-label">Select User</label>
          <select
            className="form-select"
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option>Select user</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
  
        <div className="d-flex justify-content-between mb-4">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={!selectedUser}
          >
            Add to Channel
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/channel/${channelId}`)}
          >
            Back to Channel
          </button>
        </div>
  
        <h5 className="mb-3">Your Channels</h5>
        {Array.isArray(channels) && channels.length > 0 ? (
          <ul className="list-group">
            {channels.map((ch) => (
              <li
                key={ch.id}
                onClick={() => navigate(`/channel/${ch.id}`)}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
              >
                #{ch.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No channels found.</p>
        )}
      </div>
    );
  }
  
  export default ChannelAddMember;