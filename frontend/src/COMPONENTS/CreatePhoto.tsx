import React from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import "../CSS/Create.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function CreatePhoto() {
  const navigate = useNavigate()

  const [photoSrc, setPhotoSrc] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);


  const handlePhotoClick = async () => {
    const caption = document.getElementById("photoCaption").value;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);

    const responsePhotoShare = await fetch("http://localhost:3000/api/social/create/photo", {
      method: "POST",
      credentials: "include",
      body: formData
    })

    const dataPhotoShare = await responsePhotoShare.json()

    if (!responsePhotoShare.ok) {
      return toast.error(dataPhotoShare.message)
    }

    toast.success(dataPhotoShare.message)
    navigate("/")
  }

  const handlePhotoInput = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoSrc(reader.result);
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
            <div style={{ width:"330px", height:"300px", backgroundColor:"#ccc", borderRadius:"20px", fontSize:"30px", fontWeight:"600", display:"flex", alignItems:"center", textAlign:"center"  }} alt="Upload new avatar" src={photoSrc}> Click to Choose a Photo
              <img src={photoSrc} style={{ width:"330px", height:"300px", objectFit:"cover", borderRadius:"20px", position:"absolute" }} />
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
                onChange={handlePhotoInput}
              />
            </div>
        </ButtonBase>

        <input id="photoCaption" placeholder="Add a caption" style={{ width:"330px", height:"40px", borderRadius:"10px", border:"1px solid #ccc", padding:"8px", fontSize:"16px", fontWeight:"400" }} />

        <button onClick={handlePhotoClick} id="sharePhotoButton">Share</button>

      </div>
    </div>
  )
}

export default CreatePhoto