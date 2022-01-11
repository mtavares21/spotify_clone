import React from "react";
import logo from "../spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png";

export default function Logo() {
  return (
    <div>
      {" "}
      <img
        src={logo}
        width={134}
        className="m-5"
        aria-label="spotify_logo"
      ></img>
    </div>
  );
}
