import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useData } from '../../context/DataProvider';
import { useState, useEffect } from 'react';

function InputUser(props) {

  const [ emailList, setEmailList ] = useState()
  const { receiverEmail, setReceiverEmail } = props
  const [ email, setEmail ] = useState(receiverEmail)
  const { userList } = useData()
    
  //console.log(userList)
  useEffect(() => {
  const tempEmailList = userList.map((user) => {
    return user.email
  })
  setEmailList(tempEmailList)
},[userList])

  return (
    <div>
    <Autocomplete
      disablePortal
      value={email}
      onChange = {(event, email) => setReceiverEmail(email)}
      options={emailList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Email" />}
    />
    </div>
  );
}

export default InputUser