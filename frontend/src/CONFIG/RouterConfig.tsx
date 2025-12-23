import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../PAGES/Home'
import Profile from '../PAGES/Profile'
import Reels from '../PAGES/Reels'
import Search from '../PAGES/Search'
import Create from '../PAGES/Create'
import Account from '../PAGES/Account'
import SpesificProfile from '../PAGES/SpesificProfile'

function RouterConfig() {
  return (
    <Routes>
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={ <Profile />}/>
      <Route path="/create" element={<Create />} />
      <Route path="/reels" element={<Reels />} />
      <Route path="/search" element={<Search />}/>
      <Route path='/spesificprofile/:id' element={<SpesificProfile />} />
    </Routes>
  )
}

export default RouterConfig