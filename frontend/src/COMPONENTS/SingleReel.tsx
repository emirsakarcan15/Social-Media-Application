// SingleReel.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { GoMute, GoUnmute } from "react-icons/go";
import "../CSS/Reels.css";
import { toast } from 'react-toastify';
import Comment from "./Comment"
import CommentInReel from './CommentInReel';

const SingleReel = forwardRef(({ reel }, ref) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = React.useState(reel.likedByCurrentUser);
  const [isMuted, setIsMuted] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    reset: () => { if (videoRef.current) videoRef.current.currentTime = 0; },
    element: videoRef.current
  }));

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleLikeClick = async () => {
    const responseLike = await fetch("http://localhost:3000/api/social/reel/likeReel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: "include",
      body: JSON.stringify({ reelId: reel.reelId }),
    })

    const dataLike = await responseLike.json();

    if (!responseLike.ok) {
      return toast.error(dataLike.message);
    }

    setLiked(true) 
  }

  const handleLikeInClick = async () => {
    const responseUnlike = await fetch("http://localhost:3000/api/social/reel/unlikeReel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reelId: reel.reelId }),
    })

    const dataUnlike = await responseUnlike.json();

    if (!responseUnlike.ok) {
      return toast.error(dataUnlike.message);
    }

    setLiked(false)
  } 

  const handleOpenComment = () => {
    setOpen(true);
  }
  
  
  const handleCloseComment = () => {
    setOpen(false);
  }


  return (
    <div>
      {
        open ? <CommentInReel reelId={reel.reelId} open={open} setOpen={setOpen} /> :
      
      <div style={{ position: "relative", display:"flex", flexDirection: "row", alignItems: "center" }} >
              <div style={{ position: "relative" }} > 
                  <video ref={videoRef} src={reel.reelSrc} playsInline autoPlay muted={isMuted} loop onClick={handleTogglePlay} id="reelVideo" /> 
                  <div style={{ display: "flex"}} >
                      { isMuted ? <GoMute onClick={toggleMute} id="mutedIcon" /> : <GoUnmute onClick={toggleMute} id="unMutedIcon" /> } 
                  </div>

          <div style={{ display: "flex", flexDirection: "row" }} >
              <Avatar id="profileImageInReel" src={reel.createrPhoto} /> 
              <p id="usernameInReel" >{reel.createrUsername}</p> 
          </div> 
          <p id="descriptionInReel" >{reel.caption}</p> 
          <p id="dateInReel" >{reel.createdAt}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginLeft:"20px" }}>
              {liked ? <FaHeart id="likeInReel" onClick={handleLikeInClick}/> : <FaRegHeart id="redLikeInReel" onClick={handleLikeClick} />}
              <p className='likeCount'>{reel.likes.length}</p>
              <FaRegComment onClick={handleOpenComment} id='commentInReel' />
              <LuSend id='sendInReel' />
          </div>
      </div>

}
    </div>
    );
  });

export default SingleReel;
