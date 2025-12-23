import React, { useEffect } from 'react'
import "../CSS/Create.css"
import CreatePhoto from './CreatePhoto';
import CreateReel from './CreateReel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ContentDecider() {
    const navigate = useNavigate()
    const [photoSelected, setPhotoSelected] = React.useState(true);

    
    useEffect(() => {
        const getCreate = async () => {
            const responseCreate = await fetch("http://localhost:3000/api/social/create", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })
            
            const dataCreate = await responseCreate.json()
            
            if (!responseCreate.ok) {
                navigate("/account")
                return toast.error(dataCreate.message)

            }
        }
        getCreate()
    }, [])

    const handlePhotoClick = () => {
        setPhotoSelected(true);
        document.getElementById("Creation")?.scrollIntoView({ behavior: "smooth" });
    }

    const handleReelClick = () => {
        setPhotoSelected(false);
        document.getElementById("Creation")?.scrollIntoView({ behavior: "smooth" });
    }



  return (
    <div style={{ display: "flex", flexDirection: "column" }} >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >

            <div id="photoDiv">
                <p id="photoText" >Post a Photo</p>
                <button id="photoButton" onClick={handlePhotoClick} >Photo</button>
            </div>

            <div style={{ marginRight: "60px", color: "gray", marginTop: "120px" }} >or</div>

            <div id="reelsDiv" >
                <p id="reelsText" >Post a Reel</p>
                <button id="reelsButton" onClick={handleReelClick} >Reel</button>
            </div>

        </div>
        <div id="Creation" style={{ marginTop: "300px", marginBottom: "500px" }} >
            {
                photoSelected ? <CreatePhoto /> : <CreateReel />
            }
        </div>


    </div>
  )
}

export default ContentDecider