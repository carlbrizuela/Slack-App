import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useData } from '../../context/DataProvider';
import { useState, useEffect } from 'react';

function InputUser(props) {

  const [emailList, setEmailList] = useState()
  const { receiverEmail, setReceiverEmail } = props
  const { userList, channels } = useData()

  useEffect(() => {
    const tempEmailList = userList.map((user) => {
      return user.email
    })
    const tempChannelList = channels.data.map((channel) => {
      return channel.name
    })

    const receiverList = tempEmailList.concat(tempChannelList)

    console.log(tempEmailList)
    console.log(tempChannelList)
    console.log(receiverList)
    setEmailList(receiverList)
  }, [userList])

  return (
    <Autocomplete
      disablePortal
      value={receiverEmail}
      onChange={(event, email) => setReceiverEmail(email)}
      options={emailList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Email" />}
    />
  );
}

export default InputUser