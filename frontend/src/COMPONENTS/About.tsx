import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import "../CSS/About.css"
import { TiTick } from "react-icons/ti";




 
function About() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
      id: 0,
      username: "",
      createdAt: new Date,
      profilePhoto: "",
      bio: "",
      followers: [],
      following: [],
      photos: [],
      reels: [],
    });

    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(user.profilePhoto);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const [editingUserName, setEditingUserName] = React.useState(false)

    const [editingBio, setEditingBio] = React.useState(false)

    useEffect(() => {
      const fetchProfile = async () => {
        const response = await fetch("http://localhost:3000/api/social/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });

        const data = await response.json();
  
        if (!response.ok) {
          toast.error(data.message);
          navigate("/account");
        }
        setUser(data.userInfo)
        setAvatarSrc(data.userInfo.profilePhoto)
      };

      fetchProfile();
    }, []);

    const handleAvatarChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = async () => {
        setAvatarSrc(reader.result as string);
        setUser( prev => ({ ...prev, profilePhoto: reader.result}))

        const formData = new FormData();
        formData.append("file", file);

        const responseProfilePhoto = await fetch(`http://localhost:3000/api/social/profile/photo/${user.id}`, {
          method: "PATCH",
          credentials: "include",
          body: formData
          })

          const dataProfilePhoto = responseProfilePhoto.json()

          if (!responseProfilePhoto.ok) {
            return toast.error(dataProfilePhoto.message)
          }

          toast.success(dataProfilePhoto.message)

        };
      reader.readAsDataURL(file);

    }
  };

  const handleUserNameEditClick = () => {
    setEditingUserName(true)
  }

  const handleUserNameTickClick = async () => {

    const newUsername = document.getElementById("userNameInputId").value

    const responseUsername = await fetch(`http://localhost:3000/api/social/profile/username/${user.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({username: newUsername})
    })

    const dataUsername = await responseUsername.json()

    if (!responseUsername.ok) {
      return toast.error(dataUsername.message)
    }

    setUser( prev => ({ ...prev, username: newUsername }))

    setEditingUserName(false)
    toast.success(dataUsername.message)
  }



  const handleBioEditClick = () => {
    setEditingBio(true)
  }

  const handleBioTickClick = async () => {

    const newBio = document.getElementById("bioInputId").value

    const responseBio = await fetch(`http://localhost:3000/api/social/profile/bio/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({bio: newBio})
    })

    const dataBio = await responseBio.json()

    if (!responseBio.ok) {
      return toast.error(dataBio.message)
    }

    setUser( prev => ({ ...prev, bio: newBio }))

    toast.success(dataBio.message)
    setEditingBio(false)
  }

  



  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <div style={{display:"flex", flexDirection:"row", }} >
          <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1} // prevent label from tab focus
        aria-label="Avatar image"
        sx={{
          borderRadius: '40px',
          '&:has(:focus-visible)': {
            outline: '2px solid',
            outlineOffset: '2px', 
            borderRadius: '50%'   
          },
        }}
      >
        <Avatar alt="Upload new avatar" src={avatarSrc} style={{ width:"200px", height:"200px"}} />
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '1px',
          }}
          onChange={handleAvatarChange}
        />
      </ButtonBase>

      <TableContainer sx={{ marginLeft:"80px"}}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'><h3>Posts</h3></TableCell>
              <TableCell align='center'><h3>Followers</h3></TableCell>
              <TableCell align='center'><h3>Following</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
                <TableCell align='center' component="th" scope="row"><h3>{user.photos.length}</h3></TableCell>
                <TableCell align='center' ><h3>{user.followers.length}</h3></TableCell>
                <TableCell align='center' ><h3>{user.following.length}</h3></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <div style={{display:"flex", flexDirection:"column", marginRight:"300px"}}>
        
          {
            editingUserName ? 
            <div style={{ display: "flex", flexDirection: "row", alignItems:"center", marginTop:"30px" }}>
              <input className='userNameInput' id="userNameInputId" placeholder="New Username" />
              <TiTick onClick={handleUserNameTickClick} className='tickIconUserName' />
            </div> 
            :
            <div style={{ display: "flex", flexDirection: "row", alignItems:"center" }} >
              <h2 style={{marginTop:"30px"}}>{user.username}</h2>
              <MdEdit onClick={handleUserNameEditClick} className='editIconUserName' />
            </div>
          }

          {
            editingBio ? 
            <div style={{ display:"flex", flexDirection:"row" }} >
              <input className='bioInput' id="bioInputId" placeholder='New Bio' ></input>
              <TiTick onClick={handleBioTickClick} className='tickIconBio' />
            </div>
            :
            <div style={{ display:"flex", flexDirection:"row" }} >
              <p style={{fontSize:"18px", margin:0}}>{user.bio}</p>
              <MdEdit onClick={handleBioEditClick} className='editIconBio' />
            </div>
            

          }
        
      </div>
      <Divider flexItem style={{borderColor:"gray", marginTop:"80px"}} />
    </div>
  )
}

export default About