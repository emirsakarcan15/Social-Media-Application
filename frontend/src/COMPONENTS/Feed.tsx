import React, { useState, useEffect } from 'react'
import PhotoInFeed from './PhotoInFeed'
import "../CSS/Feed.css"
import Skeleton from '@mui/material/Skeleton';
import { getPosts } from '../REDUX/slices/photosInFeedSlice';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




function Feed() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect( () => {
        const getPosts = async () => {
          const responseHome = await fetch("http://localhost:3000/api/social/home", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          });

          const dataHome = await responseHome.json();

          if (!responseHome.ok) {
            navigate("account")
            toast.error(dataHome.message);
            return;
          }
          setPhotos(dataHome.neededData)
          setLoading(false);
        }
        getPosts();
    }, [])


  return (
    <div>
      {
        loading ? <Card sx={{ width: 500, height: 300, m: 2 }}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        action={
          null 
        }
        title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
            <Skeleton animation="wave" height={10} width="40%" />
        }
      />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>

      </CardContent>
    </Card> :
          photos && photos.map((photo, index) => (
            <PhotoInFeed key={index} photo={photo}  />
          ))
      }
    </div>
  )
}

export default Feed