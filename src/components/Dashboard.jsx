import { useNavigate } from "react-router"

function Dashboard(props){

   const { onLogout } = props

   const navigate = useNavigate()

   const handleMessage = () => {
      navigate("/message")
   }

   return(
      <div>
         <button onClick = {handleMessage}>Message</button>
      </div>
   )
}

export default Dashboard