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
  <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
    <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Create a Channel</h4>
        <button onClick={goBack} className="btn btn-outline-secondary btn-sm">Back</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Autocomplete
            multiple
            options={userList}
            getOptionLabel={(option) => option.email}
            value={selectedUsers}
            onChange={(event, newValue) => setSelectedUsers(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select users"
                placeholder="Start typing..."
              />
            )}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Channel
        </button>
      </form>
    </div>
  </div>
)
}

export default ChannelCreate