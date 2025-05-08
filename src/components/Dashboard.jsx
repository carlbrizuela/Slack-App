import React, { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router";

function Dashboard(props) {
  const { onLogout } = props;
  const { getUsers, userList, channels, fetchChannels } = useData();
//const [userList, setUserList] = useState([]); //transferred to data provider
//const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllChannels, setShowAllChannels] = useState(false);

// -------------------------------Transferred to data provider-----------------------------------------------
//   const getUsers = async () => {
//     try {

//       const requestHeaders = {
//         headers: userHeaders
//       };
//       const response = await axios.get(`${API_URL}/users`, requestHeaders);
//       const { data } = response;
//       setUserList(data.data);

//     } catch (error) {
//       if(error) {
//         return alert("Cannot get users");
//       }
//     }
//   }


  // const fetchChannels = async () => {
  //   try {
  //       const response = await axios.get(`${API_URL}/channels`);
  //       setChannels(response.data);
  //   } catch (error) {
  //       return console.log("Error fetching channel");
  //   }
  // };
// --------------------------------------------------------------------------------
  // const handleCreate = async () => {
  //   if (!channelName) return;
  //   try {
  //       await axios.post(`${API_URL}/channels`, { name: channelName });
  //       setChannelName("");
  //       fetchChannels();
  //   } catch (error) {
  //       return alert("Error creating channel")
  //   }
  // };

  useEffect(() => {
    if(userList.length === 0){
      getUsers();
    }
    fetchChannels();
  }, []);

  const sendMessage = () => {
    navigate('/message');
    console.log(userList)
  }

  const navigateToChannelCreate = () => {
    navigate("/channel/create");
  };

  return (
    <div className="w-100" style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>Welcome, </p>
      <button onClick={sendMessage}>Message</button>
      <button onClick={onLogout}>Logout</button>
  
      <h3>Slack Users</h3>
      {Array.isArray(userList) && userList.length > 0 ? (
        <>
          {userList.slice(0, showAllUsers ? userList.length : 5).map((individual) => {
            const { id, email } = individual;
            return (
              <div key={id}>
                <p>ID: {id}</p>
                <p>Email: {email}</p>
              </div>
            );
          })}
          {userList.length > 5 && (
            <button onClick={() => setShowAllUsers(!showAllUsers)}>
              {showAllUsers ? "Show Less" : "Show All"}
            </button>
          )}
        </>
      ) : (
        <p>No users available...</p>
      )}
  
      <h3>Create Channel</h3>
      <button onClick={navigateToChannelCreate}>Create</button>
  
      <h3>Your Channels</h3>
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
  );
}

export default Dashboard;