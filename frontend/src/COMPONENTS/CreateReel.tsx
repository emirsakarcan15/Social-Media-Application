import React from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import "../CSS/Create.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function CreateReel() {
  const navigate = useNavigate()

  const [reelSrc, setReelSrc] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);


  const handleReelClick = async () => {
    const caption = document.getElementById("reelCaption").value;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);

    const responseReelShare = await fetch("http://localhost:3000/api/social/create/reel", {
      method: "POST",
      credentials: "include",
      body: formData
    })

    const dataReelShare = await responseReelShare.json()

    if (!responseReelShare.ok) {
      return toast.error(dataReelShare.message)
    }

    toast.success(dataReelShare.message)
    navigate("/")
  }
  
    const handleReelInput = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setReelSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }

  
  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginTop:"50px", gap:"20px" }} >
        <ButtonBase
          component="label"
          role={undefined}
          tabIndex={-1} 
          aria-label="Avatar image"
          sx={{
            borderRadius: '40px',
            '&:has(:focus-visible)': {
              outline: '2px solid',
              outlineOffset: '2px',
            },
          }}
        >
            <div style={{ width:"330px", height:"480px", backgroundColor:"#ccc", borderRadius:"20px", fontSize:"32px", fontWeight:"600", display:"flex", alignItems:"center", textAlign:"center"  }} alt="Upload new avatar" src={reelSrc}> Click to Choose a Reel
              <video src={reelSrc} autoPlay style={{ width:"330px", height:"480px", objectFit:"cover", borderRadius:"20px", position:"absolute" }} />
              <input
                type="file"
                accept="video/*"
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
                onChange={handleReelInput}
              />
            </div>
        </ButtonBase>

        <input id="reelCaption" placeholder="Add a caption" style={{ width:"330px", height:"40px", borderRadius:"10px", border:"1px solid #ccc", padding:"8px", fontSize:"16px", fontWeight:"400" }} />

        <button onClick={handleReelClick} id="shareReelButton">Share</button>

      </div>
    </div>
  )
}

export default CreateReel