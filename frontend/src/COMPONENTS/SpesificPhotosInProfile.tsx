import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import '../CSS/PhotosInProfile.css'
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Comment from "./Comment"

function SpesificPhotosInProfile({ id }) {


    const [selectedPhoto, setSelectedPhoto] = React.useState({ id: 0, src: '', alt: '', like: 0, comment: '' });
      const [isClicked, setIsClicked] = React.useState(false);
      const [liked, setLiked] = React.useState(false);
      const [photos, setPhotos] = React.useState([]);
      const [neededUserInfo, setNeededUserInfo] = React.useState({ username: '', profilePhoto: '' });
      const [photosExists, setPhotosExists] = React.useState(true);
      const [loading, setLoading] = React.useState(true);
      const [likeCount, setLikeCount] = React.useState(0);
      const [open, setOpen] = React.useState(false);
    
      React.useEffect(() => {
        const getPhotos = async () => {
          const responseGetPhotos = await fetch(`http://localhost:3000/api/social/search/users/${id}/photos`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          });
    
          const dataGetPhotos = await responseGetPhotos.json();
    
          if (!responseGetPhotos.ok) {
            return toast.error(dataGetPhotos.message);
          }
    
          setPhotos(dataGetPhotos.photos)
          setNeededUserInfo(dataGetPhotos.neededUserInfo)
    
          setLoading(false);  
          
          if (photos.length === 0) {
            setPhotosExists(false);
          }else {
            setPhotosExists(true);
          }
        }
        getPhotos();
      })
    
      const handleImageClick = (id) => {
        const photo = photos.find(photo => photo._id === id);
        setSelectedPhoto(photo);
        setLikeCount(photo.likes.length);
        setIsClicked(true);
      }
    
      const handleClose = () => {
        setIsClicked(false);
        setLiked(false);
      };
    
      const handleLikeClick = async () => {
        const responseLike = await fetch("http://localhost:3000/api/social/home/like", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ photoId: selectedPhoto._id })
          })
    
        const dataLike = await responseLike.json();
        
        if (!responseLike.ok) {
          return toast.error(dataLike.message);
        }
        setLiked(true)
        setLikeCount(likeCount + 1);
      }
    
    
      const handleLikeInClick = async () => {
        const responseInLike = await fetch("http://localhost:3000/api/social/home/unlike", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ photoId: selectedPhoto._id })
            })
        
        const dataInLike = await responseInLike.json();
              
        if (!responseInLike.ok) {
          return toast.error(dataInLike.message);
        }
    
        setLiked(false)
        setLikeCount(likeCount - 1);
      } 
    
      
      const handleOpenComment = () => {
        setOpen(true);
      }
      
      const handleCloseComment = () => {
        setOpen(false);
      }

  return (
    <div style={{width:"750px"}}>

      {
        loading

        ?
        <CircularProgress />

        :
        
        <div>

          {

        photos.map((photo) => (
          <img onClick={() => handleImageClick(photo._id)} className='photos-in-profile' src={photo.photoSrc} /> 
        ))

      }
        {
        photosExists 
        ?
        <div>
      
      <Modal
        open={isClicked}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {
          open ? <Comment photoId={selectedPhoto._id} open={open} setOpen={setOpen} /> :
        
        <Card sx={{ width: 500, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover' }}>
          <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
            <Avatar src={neededUserInfo.profilePhoto} />
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: 2, marginRight: 40 }}>{neededUserInfo.username}</Typography>
          </div>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={selectedPhoto.photoSrc}
        sx={{ height: 300, maxWidth: 500, objectFit: 'cover' }}
      />
      <CardContent style={{ width: '100%' }} >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', width: '100%', marginLeft: 15 }}>
          {
            liked ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}> <FaHeart className='like-icon-clicked' onClick={handleLikeInClick} /> <p style={{ marginLeft: 5}} >{likeCount}</p> </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}} > <FaRegHeart className='like-icon' onClick={handleLikeClick} /> <p style={{ marginLeft: 5}} >{likeCount}</p> </div>

          }
          <FaRegComment onClick={handleOpenComment} className='comment-icon' />
          <LuSend className='send-icon' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 2, marginLeft: 15, alignItems: "center" }}>
          <Typography gutterBottom component="div" sx={{color: 'black', fontSize: 17, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ fontWeight: "bold" }} >{neededUserInfo.username}</p> <p style={{ marginLeft: 5, fontWeight: "none" }} >{selectedPhoto.caption}</p>
          </Typography>
          

        </div>
      </CardContent>
    </Card>

        }

      </Modal>


      </div>
        :
        <Typography variant="h6" component="h2" sx={{ marginTop: 10, marginLeft: 15, color: 'black' , fontSize: 50, fontWeight: 'bold' }}>
        No photos Available
        </Typography>
        } 
        </div>
      }

    </div>
  )
}

export default SpesificPhotosInProfile