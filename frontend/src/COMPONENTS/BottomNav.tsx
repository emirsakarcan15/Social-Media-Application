import * as React from 'react';
import '../CSS/BottomNav.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { BsCameraReels, BsCameraReelsFill } from "react-icons/bs";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";




function bottomNav() {
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    const [homeClicked, setHomeClicked] = React.useState(true);
    const [searchClicked, setSearchClicked] = React.useState(false);
    const [createClicked, setCreateClicked] = React.useState(false);
    const [reelsClicked, setReelsClicked] = React.useState(false);
    const [profileClicked, setProfileClicked] = React.useState(false);

    React.useEffect(() => {

        if (location.pathname === '/'){
            setHomeClicked(true);
        }
        else {
            setHomeClicked(false);
        }
        

        if (location.pathname === '/search') {
            setSearchClicked(true);
        }
        else {
            setSearchClicked(false);
        }


        if (location.pathname === '/create') {
            setCreateClicked(true);
        } else {
            setCreateClicked(false);
        }


        if (location.pathname === '/reels') {
            setReelsClicked(true);
        }
        else {
            setReelsClicked(false);
        }


        if (location.pathname === '/profile') {
            setProfileClicked(true);
        }
        else {
            setProfileClicked(false);
        }

    })



    const handleHomeClick = () => {
        setHomeClicked(true);
        setSearchClicked(false);
        setCreateClicked(false)
        setReelsClicked(false);
        setProfileClicked(false);
        navigate('/');
    }

    const handleSearchClick = () => {
        setHomeClicked(false);
        setSearchClicked(true);
        setCreateClicked(false)
        setReelsClicked(false);
        setProfileClicked(false);
        navigate('/search');
    }

    const handleCreateClick = () => {
        setHomeClicked(false);
        setSearchClicked(false);
        setCreateClicked(true)
        setReelsClicked(false);
        setProfileClicked(false);
        navigate('/create');
    }

    const handleReelsClick = () => {
        setHomeClicked(false);
        setSearchClicked(false);
        setCreateClicked(false)
        setReelsClicked(true);
        setProfileClicked(false);
        navigate('/reels');
    }

    const handleProfileClick = () => {
        setHomeClicked(false);
        setSearchClicked(false);
        setCreateClicked(false)
        setReelsClicked(false);
        setProfileClicked(true);
        navigate('/profile');
    }

  return (
    <div>
        <Box sx={{ width: "100%", bottom: 0, position: 'fixed', left: 0, right: 0, zIndex: 1000 }}>
      <BottomNavigation
        
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', height: '90px', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' }}
      >
        <BottomNavigationAction onClick={handleHomeClick} sx={{width:"100%", height:"90px"}} icon=
        { 
            homeClicked ? <IoHome onClick={handleHomeClick} className='navIconsOnClick' /> : <IoHomeOutline onClick={handleHomeClick} className='navIcons' />
        }  
        />
        <BottomNavigationAction onClick={handleSearchClick} sx={{width:"100%", height:"90px"}} icon=
        {
            searchClicked ? <IoSearch onClick={handleSearchClick} className='navIconsOnClick' /> : <IoSearchOutline onClick={handleSearchClick} className='navIcons' />
        } 
        />
        <BottomNavigationAction onClick={handleCreateClick} sx={{width:"100%", height:"90px"}} icon=
        {
            createClicked ? <IoMdAddCircleOutline onClick={handleCreateClick} id='createIconOnClick' /> : <IoIosAddCircleOutline onClick={handleCreateClick} id='createIcon' />
        } 
        />
        <BottomNavigationAction onClick={handleReelsClick} sx={{width:"100%", height:"90px"}} icon=
        {
            reelsClicked ? <BsCameraReelsFill onClick={handleReelsClick} className='navIconsOnClick' /> : <BsCameraReels onClick={handleReelsClick} className='navIcons' />
        } 
        />
        <BottomNavigationAction onClick={handleProfileClick} sx={{width:"100%", height:"90px"}} icon=
        {
            profileClicked ? <MdAccountCircle onClick={handleProfileClick} className='navIconsOnClick'/> : <MdOutlineAccountCircle onClick={handleProfileClick} className='navIcons' />
        } 
        />
      </BottomNavigation>
    </Box>
    </div>
  )
}

export default bottomNav