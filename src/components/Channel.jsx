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
      const members = response.data.data?.channel_members || [];

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
      navigate("/dashboard");
    }
  }, [channels, id, navigate, location.key]);

  return (
    <div className="container-fluid p-4">
      <button className="btn btn-secondary mb-3" onClick={goBack}>← Back</button>

      {isChannelSet && (
        <div className="mb-4">
          <h3 className="text-primary">Channel: #{channelName}</h3>
          <button className="btn btn-outline-success mt-2" onClick={() => navigate(`/channel/${channelID}/add-member`)}>
            + Add Member
          </button>
        </div>
      )}

      {isChannelSet && (
        <div className="mb-4">
          <h5>Channel Members</h5>
          {channelMembers.length > 0 ? (
            <ul className="list-group">
              {channelMembers.map(member => (
                <li key={member.id} className="list-group-item">
                  {member.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No members in this channel.</p>
          )}
        </div>
      )}

      {isChannelSet && (
        <div className="mb-4">
          <RetrieveMessage
            receiverID={channelID}
            receiverClass="Channel"
            isMessageSent={isMessageSent}
            setIsMessageSent={setIsMessageSent}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-start gap-2">
        <textarea
          disabled={!channelID}
          placeholder="Type your message here..."
          className="form-control w-100"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!message}>
          Send
        </button>
      </form>
    </div>
  )
}

export default Channel