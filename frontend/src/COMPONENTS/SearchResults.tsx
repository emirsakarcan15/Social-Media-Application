import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import "../CSS/SearchResult.css"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from "../REDUX/slices/getAllUsersSlice"
import { useNavigate } from 'react-router-dom';


function SearchResults( {inputText} ) {

  const [userNotFound, setUserNotFound] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector((s) => s.getAllUsersSlice.users)  
  const loading = useSelector((s) => s.getAllUsersSlice.loading)

  const [filteredUsers, setFilteredUsers] = React.useState([]);

  useEffect( () => {
    const processFilteredUsers = users.filter( (user) => user.username.toLowerCase().includes(inputText.toLowerCase()))

    if (!loading) {
      if (processFilteredUsers.length === 0) {
        setUserNotFound(true)
        }
      else {
        setUserNotFound(false)
        setFilteredUsers(processFilteredUsers)
      }
    }
  }, [ inputText, loading ])


  const handleProfileClick = (id) => {
    navigate(`/spesificprofile/${id}`)
  }
  

  return (
    <div>

      { 
        userNotFound ? <h1>No Available Users</h1> 
        :
      
        
         filteredUsers.map( (user) => (
        <div key={user.id} id="searchResultDiv" onClick={() => handleProfileClick(user.id)} style={{ display: "flex", alignItems: "center",  width:"340px", left:0 }} >
          <Avatar src={user.profilePhoto} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
          <span>{user.username}</span>
        </div>
      ))
      
      }
      
    </div>
  )
}

export default SearchResults