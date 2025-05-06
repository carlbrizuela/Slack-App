import { useState } from "react"
import RetrieveMessage from "./RetrieveMessage"
import { useNavigate } from "react-router"
import { useData } from "../../context/DataProvider"
import axios from "axios"
import { API_URL } from "../../constants/Constants"
import InputUser from "./InputUser"

function Message() {

  const [receiverID, setReceiverID] = useState()
  const [receiverInfo, setReceiverInfo] = useState('')
  const [message, setMessage] = useState('')
  const [receiverClass, setReceiverClass] = useState('')
  const [isReceiverSet, setIsReceiverSet] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const { userHeaders, userList, channels } = useData()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestHeaders = {
        headers: userHeaders
      }
      const requestBody = {
        receiver_id: Number(receiverID),
        receiver_class: receiverClass,
        body: message
      }

      const response = await axios.post(`${API_URL}/messages`, requestBody, requestHeaders)
      const { data } = response

      if (data.data) {
        setMessage('')
        setIsMessageSent(true)
        navigate("/message")
        return alert("Successfully sent a message")
      }
    } catch (error) {
      if (error) {
        return alert("Cannot send message")
      }
    }
  }

  const handleReceiver = (e) => {
    e.preventDefault();

    const receiverUserInfo = userList.filter(user => user.email === receiverInfo)
    if (channels) {
      var receiverChannelInfo = channels.filter(user => user.name === receiverInfo)
    }
    if (receiverUserInfo.length !== 0) {
      setReceiverID(receiverUserInfo[0].id)
      setReceiverClass("User")
      setIsReceiverSet(true)
    } else if (receiverChannelInfo.length !== 0) {
      setReceiverID(receiverChannelInfo[0].id)
      setReceiverClass("Channel")
      setIsReceiverSet(true)
    } else {
      alert("user does not exist")
    }
  }

  const goBack = () => {
    navigate("/dashboard")
  }

  return (
    <div>
      {/* <div>{userList.length > 0 ? (
        userList.map((individual) => {
          const { id, email } = individual;
          return (
            <div key={id}>
              <p>ID: {id}</p>
              <p>Email: {email}</p>
            </div>
          );
        })
      ) : (
        <p>No users available...</p>
      )}</div> */}

      <div className="w-50 h-100 position-relative start-50">
        <button onClick={goBack}>Back</button>
        {
          !isReceiverSet &&
          <form onSubmit={handleReceiver}>
            <InputUser receiverInfo={receiverInfo} setReceiverInfo={setReceiverInfo} />
          </form>
        }

        {
          !isReceiverSet &&
          <div className="card-message border border-dark rounded p-10 me-5"></div>
        }

        {
          isReceiverSet &&
          <div>
            <h2>To: {receiverInfo}</h2>
            <RetrieveMessage receiverID={receiverID} receiverClass={receiverClass} isMessageSent={isMessageSent} setIsMessageSent={setIsMessageSent} />
          </div>
        }

        <form onSubmit={handleSubmit}>
          <input type="textarea" disabled={receiverID ? false : true} placeholder="Type message here..." className="text-black w-75 h-100 border-2 border-black col-span-7 p-2" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" className="btn btn-primary" disabled={message ? false : true}>Send</button>
        </form>

      </div>
    </div>
  )
}

export default Message