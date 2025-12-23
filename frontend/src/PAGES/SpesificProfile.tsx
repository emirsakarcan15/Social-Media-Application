import React, { useEffect, useState } from 'react'
import BottomNav from '../COMPONENTS/BottomNav'
import '../CSS/Profile.css'
import "../CSS/SpecificProfile.css"
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import SpesificPhotosInProfile from '../COMPONENTS/SpesificPhotosInProfile';

function SpesificProfile() {

    const id = window.location.pathname.split("/")[2]
    const [loading, setLoading] = useState(true)
    const [userNotFound, setUserNotFound] = useState(false)
    const [user, setUser] = useState({})
    const [userFollowed, setUserFollowed] = useState(false)

    useEffect( () => {

        const getUser = async () => {
            const responseUser = await fetch(`http://localhost:3000/api/social/search/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            const dataUser = await responseUser.json();

            if (!responseUser.ok) {
                return setUserNotFound(true)
            }
            setUserNotFound(false)
            setLoading(false)
            setUser(dataUser.userInfo)
            setUserFollowed(dataUser.isFollowed)
            }
            getUser();
        }, [userFollowed])


        const handleFollow = async () => {

            const responseFollow = await fetch(`http://localhost:3000/api/social/search/users/${id}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })

            const dataFollow = await responseFollow.json()

            if (!responseFollow.ok) {
                return toast.error(dataFollow.message)
            }

            toast.success(dataFollow.message)
            setUserFollowed(true)
        }


        const handleUnFollow = async () => {

            const responseUnfollow = await fetch(`http://localhost:3000/api/social/search/users/${id}/unfollow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })

            const dataUnfollow = await responseUnfollow.json()

            if (!responseUnfollow.ok) {
                return toast.error(dataUnfollow.message)
            }

            toast.success(dataUnfollow.message)
            setUserFollowed(false)
        }


  return (
    <div>
        {

            userNotFound ? <h1>User Not Found</h1> 
            :
            loading ?  <CircularProgress  style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"140px"}} size="70px" color="hata" /> 
            : 
            <div className='profile'>

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
                        <Avatar alt="Upload new avatar" src={user.profilePhoto} style={{ width:"200px", height:"200px"}} />
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
                                    <TableCell align='center' component="th" scope="row"><h3>{user.photos.length + user.reels.length}</h3></TableCell>
                                    <TableCell align='center' ><h3>{user.followers.length}</h3></TableCell>
                                    <TableCell align='center' ><h3>{user.following.length}</h3></TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                    
                </div>
                <div style={{display:"flex", flexDirection:"column", marginRight:"300px"}}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems:"center" }} >
                        <h2 style={{marginTop:"30px"}}>{user.username}</h2>
                        </div>

                        <div style={{ display:"flex", flexDirection:"row" }} >
                        <p style={{fontSize:"18px", margin:0}}>{user.bio}</p>
                        </div>
                </div>
                <div>
                    {
                        userFollowed ? <button onClick={handleUnFollow} id="unfollowButton" >Following</button> : <button onClick={handleFollow} id="followButton" >Follow</button>
                    }
                </div>
                <Divider flexItem style={{borderColor:"gray", marginTop:"10px"}} />
             </div>
             <SpesificPhotosInProfile id={id} />
            </div>
        }
        
        <BottomNav />
    </div>
  )
}

export default SpesificProfile