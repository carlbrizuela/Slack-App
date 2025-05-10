import { useState } from "react"
import RetrieveMessage from "./RetrieveMessage"
import { useNavigate } from "react-router"
import { useData } from "../../context/DataProvider"
import axios from "axios"
import { API_URL } from "../../constants/Constants"
import InputUser from "./InputUser"
import Sidebar from "../Sidebar"

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

  return (
    <div className="container-fluid mx-0 px-0">
      <div className="row">
        <div className="col-3 vh-100" style={{ maxWidth: "250px" }}>
          <Sidebar />
        </div>
        <div className="col container-fluid d-flex align-items-center justify-content-center vh-100 bg-light ms-4">
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "800px" }}>

            {!isReceiverSet && (
              <form onSubmit={handleReceiver} className="mb-4">
                <InputUser receiverInfo={receiverInfo} setReceiverInfo={setReceiverInfo} />
              </form>
            )}

            {!isReceiverSet && (
              <div className="card-message border border-dark rounded p-4 mb-4">
              </div>
            )}

            {isReceiverSet && (
              <div className="mb-4">
                <h3 className="text-primary">To: {receiverInfo}</h3>
                <RetrieveMessage
                  receiverID={receiverID}
                  receiverClass={receiverClass}
                  isMessageSent={isMessageSent}
                  setIsMessageSent={setIsMessageSent}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-start gap-3">
              <textarea
                disabled={!receiverID}
                placeholder="Type your message here..."
                className="form-control"
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100 mt-2" disabled={!message}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message