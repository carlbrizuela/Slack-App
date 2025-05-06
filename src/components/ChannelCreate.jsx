import { useState } from "react"
import { useNavigate } from "react-router"
import { useData } from "../context/DataProvider"
import axios from "axios"
import { API_URL } from "../constants/Constants"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ChannelCreate() {
  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const { userList, userHeaders } = useData()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userIDs = selectedUsers.map(user => user.id)
      const response = await axios.post(`${API_URL}/channels`, {
        name: channelName,
        user_ids: userIDs
      }, { headers: userHeaders })
      alert("Channel created successfully!")
      navigate(`/channel/${response.data.data.id}`)
    } catch (err) {
      alert("Error creating channel")
    }
  }

  const goBack = () => {
    navigate("/dashboard")
  }

//   const handleUserToggle = (id) => {
//     setSelectedUsers(prev =>
//       prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
//     )
//   }

return (
    <div className="w-50 h-100 position-relative start-50">
    <button onClick={goBack}>Back</button>

    <form onSubmit={handleSubmit}>
      <TextField
        label="Channel Name"
        variant="outlined"
        fullWidth
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        required
        sx={{ width: 300 }}
      />

      <Autocomplete
        multiple
        options={userList}
        getOptionLabel={(option) => option.email}
        value={selectedUsers}
        onChange={(event, newValue) => setSelectedUsers(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Select users" placeholder="Start typing..." />
        )}
        sx={{ width: 300 }}
      />

      <button type="submit">Create Channel</button>
    </form>
    </div>
  )
}

export default ChannelCreate
