import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useData } from '../../context/DataProvider';
import { useState, useEffect } from 'react';

function InputUser(props) {

  const [emailList, setEmailList] = useState([])
  const { receiverInfo, setReceiverInfo } = props
  const { userList, channels } = useData()

  useEffect(() => {
    const tempEmailList = userList.map((user) => {
      return user.email
    })
    if (channels) {
      const tempChannelList = channels.map((channel) => {
        return channel.name
      })
      const receiverList = tempEmailList.concat(tempChannelList)
      setEmailList(receiverList)
    } else {
      setEmailList(tempEmailList)
    }
  }, [userList, channels])

  return (
    <div>
      {console.log(emailList)}
      <Autocomplete
        disablePortal
        value={receiverInfo}
        onChange={(event, email) => setReceiverInfo(email)}
        options={emailList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Email" />}
      />
    </div>
  );
}

export default InputUser