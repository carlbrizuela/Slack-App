import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../constants/Constants"
import { useData } from "../../context/DataProvider"
import "bootstrap/dist/css/bootstrap.min.css"

function RetrieveMessage(props){

   const { receiverID, isMessageSent, setIsMessageSent} = props
   const { userHeaders } = useData()
   const [ messages, setMessages ] = useState([])
   
   const displayMessage = async () => {

   try{
      const requestHeaders = {
         headers: userHeaders
       }
      const response = await axios.get(`${API_URL}/messages?receiver_id=${receiverID}&receiver_class=User`, requestHeaders)
      const { data } = response
      const messageData = data.data
      setMessages(messageData)

      console.log(messageData)
   }catch(error){
      if(error){
         return alert("No message")
      }
   }
  }

  useEffect(() => {
   if(receiverID){
      displayMessage()
   }
  }, [receiverID])

  useEffect(() => {
   if(isMessageSent){
      displayMessage()
   }
   setIsMessageSent(false)
  }, [isMessageSent])

   return(
      <div className="card-message border border-dark rounded p-10">
        {
         messages && messages.map((message) => {
            if(message.receiver.id === Number(receiverID)){
               return(
                  <div className="mb-1 p-2 d-flex justify-content-end" key={message.id}>
                    <div className="msg_container">{message.body}</div>
                  </div>
               )
            }else{
               return(
                  <div className="mb-1 p-2 d-flex justify-content-start" key={message.id}>
                    <div className="msg_container_send">{message.body}</div>
                  </div>
               )
            }
         })
        }
      </div>
   )
}

export default RetrieveMessage