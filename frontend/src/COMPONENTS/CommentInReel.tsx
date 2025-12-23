import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import "../CSS/Comment.css"
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';



function CommentInReel({ setOpen, open, reelId }) {

  const [commentsState, setCommentsState] = React.useState([]);
  const [noComments, setNoComments] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [reRenderFactor, setReRenderFactor] = React.useState(false);

  useEffect(() => {
    const startComments = async () => {
      const responseComments = await fetch(`http://localhost:3000/api/social/reel/comment/${reelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })

      const dataComments = await responseComments.json();
      
      if (!responseComments.ok) {
        return toast.error(dataComments.message);
      }

      setCommentsState(dataComments.comments);

      if (commentsState.length === 0) {
        setNoComments(true);
      }

      setLoading(false);
    }

    startComments();
  }, [reRenderFactor])

  const handleCloseComment = () => {
    setOpen(false);
  }

  const handleDeleteComment = async (id) => {
    const responseDeleteComment = await fetch(`http://localhost:3000/api/social/reel/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reelId: reelId })
    })

    const dataDeleteComment = await responseDeleteComment.json();

    if (!responseDeleteComment.ok) {
      return toast.error(dataDeleteComment.message);
    }

    toast.success(dataDeleteComment.message);

    const updatedComments = commentsState.filter((comment) => comment.id !== id);

    if ( updatedComments.length === 0 ) {
      setNoComments(true);
    }

    setCommentsState(updatedComments);
  }

  const handleCreateComment = async () => {
    const newCommentText = document.getElementById("commentInput").value;

    const responseCreateComment = await fetch("http://localhost:3000/api/social/reel/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reelId: reelId, text: newCommentText })
    })
    
    const dataCreateComment = await responseCreateComment.json();

    if (!responseCreateComment.ok) {
      return toast.error(dataCreateComment.message);
    }

    toast.success(dataCreateComment.message);
    document.getElementById("commentInput").value = "";
    setReRenderFactor(!reRenderFactor);
  }

  React.useEffect(() => {
    if (commentsState.length > 0) {
      setNoComments(false);
    }else {
      setNoComments(true);
    }
  }, [commentsState])

  return (
    <div>
      <div id="commentDiv">
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>Comments</h2>
        <IoMdClose onClick={handleCloseComment} id="closeButton" />
        <div className="commentContainer" > 
          {
            loading ? <h3 style={{ textAlign: "center", marginTop: "130px", fontSize:"35px"}}><CircularProgress color='black' /></h3> : null
          }
          {
            noComments ? <h3 style={{ textAlign: "center", marginTop: "130px", fontSize:"35px"}}>Be the first to comment!</h3> : null
          }    
          {
            commentsState && commentsState.map( (comment) => (
              <div key={comment.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px", marginLeft: "20px"}} >
                <img src={comment.userProfilePhoto} alt="avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", marginRight: "10px" }}>{comment.username}</span>
                    <span>{comment.commentText}</span>
                  </div>
                  <div>
                    <MdDelete onClick={() => handleDeleteComment(comment.id)} style={{ cursor: "pointer", marginRight: "30px", width: "25px", height: "25px" }} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop:"20px", marginBottom: "20px" }}>
            <input type="text" id="commentInput" placeholder='Write a comment' />
            <button onClick={handleCreateComment} id="commentButton">Send</button>
        </div>
      </div>
    </div>
  )
}

export default CommentInReel