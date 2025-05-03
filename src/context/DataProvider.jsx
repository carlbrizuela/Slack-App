import { useState, createContext, useContext } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [userHeaders, setUserHeaders] = useState('')


  const handleHeaders = (header) => {
    const updatedHeader = {
      'access-token': header['access-token'],
      uid: header.uid,
      expiry: header.expiry,
      client: header.client,
    }
    setUserHeaders(updatedHeader)
  }
  // ------------------Code from Dashboard.jsx-------------------------------------------- //

  const [userList, setUserList] = useState([]);
  const [channels, setChannels] = useState([]);

  const getUsers = async () => {
    try {

      const requestHeaders = {
        headers: userHeaders
      };
      const response = await axios.get(`${API_URL}/users`, requestHeaders);
      const { data } = response;
      setUserList(data.data);

    } catch (error) {
      if (error) {
        return alert("Cannot get users");
      }
    }
  }

  const fetchChannels = async () => {
    try {
      const requestHeaders = {
        headers: userHeaders
      };
      const response = await axios.get(`${API_URL}/channels`, requestHeaders);
      setChannels(response.data.data);
    } catch (error) {
      return console.log("Error fetching channel");
    }
  };

  // --------------------------------------------------------------------------//
  return (
    <DataContext.Provider value={
      {
        handleHeaders,
        userHeaders,
        userList,//from dashboard
        getUsers, // from dashboard
        fetchChannels,
        channels
      }
    }>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}

export default DataProvider;