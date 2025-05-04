import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { API_URL } from "../../constants/Constants"
import { useData } from "../../context/DataProvider"

function RetrieveMessage(props) {

  const { receiverID, receiverClass, isMessageSent, setIsMessageSent } = props
  const { userHeaders } = useData()
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null);

  const displayMessage = async () => {

    try {
      const requestHeaders = {
        headers: userHeaders
      }
      console.log(userHeaders.uid)
      const response = await axios.get(`${API_URL}/messages?receiver_id=${receiverID}&receiver_class=${receiverClass}`, requestHeaders)
      const { data } = response
      const messageData = data.data
      setMessages(messageData)
      console.log(messageData)

    } catch (error) {
      if (error) {
        return alert("No message")
      }
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages])


  useEffect(() => {
    if (receiverID) {
      displayMessage()
    }
  }, [receiverID])

  useEffect(() => {
    if (isMessageSent) {
      displayMessage()
    }
    setIsMessageSent(false)
  }, [isMessageSent])

  return (
    <div className="card-message border border-dark rounded p-10" ref={messagesEndRef}>
      {
        messages && messages.map((message) => {
          if (message.sender.uid === userHeaders.uid || message.sender.uid === userHeaders.uid) {
            const uname = userHeaders.uid.split("@")
            return (
              <div className="mb-1 p-2 d-flex justify-content-end" key={message.id}>
                <div className="d-flex flex-column justify-content-end">
                  <div className="me-1 d-flex flex-row justify-content-end"><span>{uname[0]}</span></div>
                  <div className="d-flex justify-content-end">
                    <div className="msg_container_send">{message.body}</div>
                  </div>
                </div>
              </div>
            )
          } else {
            const uname = message.sender.uid.split("@")
            return (
              <div className="mb-1 p-2 d-flex justify-content-start" key={message.id}>
                <div className="d-flex flex-column justify-content-start">
                  <div className="ms-1 d-flex flex-row justify-content-start"><span>{uname[0]}</span></div>
                  <div className="d-flex justify-content-start">
                    <div className="msg_container">{message.body}</div>
                  </div>
                </div>
              </div>
            )
          }
        })
      }
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default RetrieveMessage