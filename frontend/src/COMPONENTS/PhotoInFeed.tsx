import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { FaRegHeart } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa6"
import { FaRegComment } from "react-icons/fa6"
import { LuSend } from "react-icons/lu"
import { useSelector } from 'react-redux'
import Comment from "./Comment"
import { toast } from 'react-toastify';

function PhotoInFeed({ photo }) {
    const [liked, setLiked] = useState(photo.likedByCurrentUser);
    const [open, setOpen] = useState(false);
    const [likeCount, setLikeCount] = useState(photo.likes.length);

    const handleCloseComment = () => {
      setOpen(false)
    }

    const handleOpenComment = () => {
      setOpen(true)
    }

    const handleLikeClick = async () => {
      const responseLike = await fetch("http://localhost:3000/api/social/home/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ photoId: photo.photoId })
      })

      const dataLike = await responseLike.json();

      if (!responseLike.ok) {
        return toast.error(dataLike.message);
      }
      setLiked(!liked)
      setLikeCount(likeCount + 1)
    }

    const handleLikeInClick = async () => {
      const responseInLike = await fetch("http://localhost:3000/api/social/home/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ photoId: photo.photoId })
      })

      const dataInLike = await responseInLike.json();
      
      if (!responseInLike.ok) {
        return toast.error(dataInLike.message);
      }
      setLiked(!liked)
      setLikeCount(likeCount - 1)
    }

  return (
    <div style={{ display:"flex", flexDirection:"row"}} >
      {
        open ? <Comment photoId={photo.photoId} open={open} setOpen={setOpen} /> :
        <Card className="postCard" sx={{ width: 500, height: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover', marginTop: "20px"}} >
          <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "left", width: '100%', marginLeft: 15 }}>
            <Avatar src={photo.createrPhoto} />
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: 2, display: "flex", flexDirection: "row",  }}>{photo.createrUsername}</Typography>
          </div>
      <CardMedia
        component="img"
        alt="img"
        height="140"
        image={photo.photoSrc}
        sx={{ height: 300, maxWidth: 500, objectFit: 'cover' }}
      />
      <CardContent style={{ width: '100%'}} >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', width: '100%', marginLeft: 15 }}>
          {
            liked ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 30 }} > <FaHeart className='like-icon-clicked' onClick={handleLikeInClick} /> <p style={{ marginLeft: 8, fontSize: 18 }}>{likeCount}</p> </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 30 }}> <FaRegHeart className='like-icon' onClick={handleLikeClick} /> <p style={{ marginLeft: 8, fontSize: 18 }}>{likeCount}</p></div>
          }

          <FaRegComment onClick={handleOpenComment} className='comment-icon' />

          
          <LuSend className='send-icon' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 1, marginLeft: 15, alignItems: "center" }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>{photo.createrUsername}</p> <p style={{ marginLeft: 8, fontSize: 18 }} >{photo.caption}</p>
        </div>
      </CardContent>
    </Card>
}
    </div>
  )
}

export default PhotoInFeed