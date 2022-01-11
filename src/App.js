import "./App.css";
import logo from "./spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png";
import SideMenu from "./Components/sideMenu";
import UserMenu from "./Components/userMenu";
import MediaControlCard from "./Components/Track";
import SearchInput from "./Components/searchInput";
import Player from "./Components/player";
import React, { useState } from "react";
import { getToken } from "./api";
import Login from "./Components/Login";
import MainApp from "./Components/mainApp";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/callback" element={<MainApp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}