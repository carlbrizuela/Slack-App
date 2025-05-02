import { useState } from "react"
import RetrieveMessage from "./RetrieveMessage"
import { useNavigate } from "react-router"
import { useData } from "../../context/DataProvider"
import axios from "axios"
import { API_URL } from "../../constants/Constants"
import "bootstrap/dist/css/bootstrap.min.css"

function Message(){

   const [ receiverID, setReceiverID ] = useState()
   const [message, setMessage ] = useState('')
   const [isReceiverSet, setIsReceiverSet] = useState(false)
   const [ isMessageSent, setIsMessageSent ] = useState(false)
   const { userHeaders } = useData()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault();

      try{

         const requestHeaders = {
            headers: userHeaders
         }
         const requestBody = {
            receiver_id: Number(receiverID),
            receiver_class: "User",
            body: message
         }

         const response = await axios.post(`${API_URL}/messages`, requestBody, requestHeaders)
         const { data } = response

         if(data.data){
            setMessage('')
            setIsMessageSent(true)
            navigate("/message")
            return alert("Successfully sent a message")
         }
         console.log(data.data)

      }catch(error){
         if(error){
            return alert("Cannot send message")
         }
      }
   }

   const handleReceiver = (e) => {
      e.preventDefault();
      setIsReceiverSet(true)
   }

   const goBack = () =>{
      navigate("/dashboard")
   }
   return(
      <div className="w-50 h-100 position-relative start-50">
         <button onClick={goBack}>Back</button>
         {!isReceiverSet && <form onSubmit={handleReceiver}>
            <label>To:</label>
            <input type="number" onChange={(e) => setReceiverID(e.target.value)} />
         </form>
         }
         {!isReceiverSet && 
         <div className="card-message border border-dark rounded p-10 me-5">
         </div>
         }

         {
            isReceiverSet && <div>
               <h2>To: {receiverID}</h2> 
               <RetrieveMessage receiverID={receiverID} isMessageSent={isMessageSent} setIsMessageSent={setIsMessageSent}/>
            </div>
         }

         <form onSubmit={handleSubmit}>
            <input type="textarea" disabled={receiverID ? false:true}placeholder="Type message here..." className="text-black w-75 h-100 border-2 border-black col-span-7 p-2" value={message} onChange = { (e) => setMessage(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={message ? false:true}>Send</button>
         </form>
         
      </div>
   )
}

export default Message