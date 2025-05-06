import { useState } from "react"
import RetrieveMessage from "./Messages/RetrieveMessage"
import { useNavigate } from "react-router"
import { useData } from "../context/DataProvider"
import axios from "axios"
import { API_URL } from "../constants/Constants"
import InputUser from "./Messages/InputUser"
import { useParams } from "react-router"
import { useEffect } from "react"
import { useLocation } from "react-router";

function Channel() {

  const [channelID, setChannelID] = useState()
  const [channelName, setChannelName] = useState('')
  const [message, setMessage] = useState('')
  const [isChannelSet, setIsChannelSet] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [channelMembers, setChannelMembers] = useState([]);
  const { userHeaders, channels } = useData()
  const { userList, getUsers } = useData();
  const navigate = useNavigate()
  const { id } = useParams();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const requestHeaders = {
        headers: userHeaders
      }
      const requestBody = {
        receiver_id: Number(channelID),
        receiver_class: "Channel",
        body: message
      }

      const response = await axios.post(`${API_URL}/messages`, requestBody, requestHeaders)
      const { data } = response

      if (data.data) {
        setMessage('')
        setIsMessageSent(true)
        navigate("/channel")
        return alert("Successfully sent a message to channel")
      }
    } catch (error) {
      return alert("Failed to send message")
    }
  }

  const handleChannel = (e) => {
    e.preventDefault()

    const selectedChannel = channels.find(channel => channel.name === channelName)

    if (selectedChannel) {
      setChannelID(selectedChannel.id)
      setIsChannelSet(true)
      fetchChannelMembers(selectedChannel.id)
    } else {
      alert("Channel does not exist")
    }
  }

  const fetchChannelMembers = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/channels/${id}`, {
        headers: userHeaders,
      });
      console.log("Full response from channel endpoint:", response.data);
      const members = response.data.data?.channel_members || [];
      console.log("Members fetched:", members);

      const membersWithEmails = members.map((member) => {
        const matchedUser = userList.find(user => user.id === member.user_id);
        return {
          ...member,
          email: matchedUser ? matchedUser.email : "Unknown user"
        };
      });

      setChannelMembers(membersWithEmails);
    } catch (error) {
      alert("Failed to fetch channel members");
    }
  };

  const handleMemberAdded = () => {
    fetchChannelMembers(channelID); // Re-fetch the members after adding
  };

  const goBack = () => {
    navigate("/dashboard")
  }

  useEffect(() => {
    const selectedChannel = channels.find(channel => channel.id === Number(id));
    if (selectedChannel) {
      setChannelID(selectedChannel.id);
      setChannelName(selectedChannel.name);
      setIsChannelSet(true);
      fetchChannelMembers(selectedChannel.id)
    } else {
      alert("Channel not found");
      navigate("/dashboard");
    }
  }, [channels, id, navigate, location.key]);
  
  console.log("Rendering channel members:", channelMembers);

  return (
    <div className="w-50 h-100 position-relative start-50">
      <button onClick={goBack}>Back</button>

      {/* {!isChannelSet && (
        <form onSubmit={handleChannel}>
          <InputUser receiverInfo={channelName} setReceiverInfo={setChannelName} />
        </form>
      )} */}

      {!isChannelSet && (
        <div className="card-message border border-dark rounded p-10 me-5"></div>
      )}

      {isChannelSet && (
        <div>
          <h2>Channel: {channelName}</h2>
          <RetrieveMessage
            receiverID={channelID}
            receiverClass="Channel"
            isMessageSent={isMessageSent}
            setIsMessageSent={setIsMessageSent}
          />
          <button onClick={() => navigate(`/channel/${channelID}/add-member`)}>Add Member</button>
        </div>
      )}

      {isChannelSet && (
        <div>
            <h4>Channel Members</h4>
            {channelMembers.length > 0 ? (
            <ul>
            {channelMembers.map(member => (
            <li key={member.id}>{member.email}</li>
        ))}
            </ul>
        ) : (
      <p>No members in this channel.</p>
        )}
        </div>
        )}

      {console.log(channelMembers)}
    
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          disabled={!channelID}
          placeholder="Type message here..."
          className="text-black w-75 h-100 border-2 border-black col-span-7 p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!message}>Send</button>
      </form>

      {/* <ChannelAddMember channelId={channelID} onMemberAdded={handleMemberAdded} /> */}
    </div>
  )
}

export default Channel
