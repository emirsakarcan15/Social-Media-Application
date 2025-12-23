import React, { useEffect } from 'react'
import '../CSS/Profile.css'
import About from '../COMPONENTS/About'
import PhotosInProfile from '../COMPONENTS/PhotosInProfile'
import BottomNav from '../COMPONENTS/BottomNav'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../REDUX/slices/activeUserSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((s) => s.activeUserSlice.user)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogOut = async () => {

    const responseLogOut = await fetch("http://localhost:3000/api/social/profile/logout", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      credentials: "include"
    })

    const dataLogOut = await responseLogOut.json()
    
    if (!responseLogOut.ok) {
      return toast.error(dataLogOut.message)
    }

    toast.success(dataLogOut.message)
    navigate("/account")
  }

  const handleDeleteAccount = async () => {
    const responseDeleteAccount = await fetch(`http://localhost:3000/api/social/profile/delete/${user.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      },
      credentials: "include"
    })

    const dataDeleteAccount = await responseDeleteAccount.json()

    if (!responseDeleteAccount.ok) {
      return toast.error(dataDeleteAccount.message)
    }

    toast.success(dataDeleteAccount.message)
    navigate("/account")
  }
 
  return (
    <div>
      <div id="log" >
        <button onClick={handleLogOut} id='logOutButton'>Log Out</button>
        <button onClick={handleOpen} id="deleteAccountButton">Delete Account</button>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" style={{ marginLeft:"25px", marginBottom: "20px" }} variant="h6" component="h2">
              Do You Want To Delete Your Account ?
            </Typography>
            <button onClick={handleDeleteAccount} id="deleteAccountYes" >Yes</button>
            <button onClick={handleClose} id="deleteAccountNo" >No</button>
          </Box>
        </Fade>
      </Modal>
      </div>
      <div className='profile'>
        <About />
        <PhotosInProfile />
      </div>
      <BottomNav />
    </div>
  )
}

export default Profile