import React, { useState } from "react";
import axios from "axios";
import { useData } from "../context/DataProvider";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

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
      <div>
        <select onChange={(e) => setSelectedUser(Number(e.target.value))}>
          <option>Select user</option>
          {userList.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Add to Channel</button>

        {Array.isArray(channels) && channels.length > 0 ? (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {channels.map((ch) => (
          <li
            key={ch.id}
            onClick={() => navigate(`/channel/${ch.id}`)}
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {ch.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No channels found.</p>
      )}
      </div>
    )
  }
  
  export default ChannelAddMember;