import { useState } from "react"
import { useNavigate } from "react-router"
import { useData } from "../context/DataProvider"
import axios from "axios"
import { API_URL } from "../constants/Constants"

function ChannelCreate() {
  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const { userList, userHeaders } = useData()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/channels`, {
        name: channelName,
        user_ids: selectedUsers
      }, { headers: userHeaders })
      alert("Channel created successfully!")
      navigate(`/channel/${response.data.data.id}`);
    } catch (err) {
      alert("Error creating channel")
    }
  }

  const handleUserToggle = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        required
      />
      <div>
        <p>Select users to add:</p>
        {userList.map(user => (
          <label key={user.id}>
            <input
              type="checkbox"
              value={user.id}
              onChange={() => handleUserToggle(user.id)}
            />
            {user.email}
          </label>
        ))}
      </div>
      <button type="submit">Create Channel</button>
    </form>
  )
}

export default ChannelCreate
