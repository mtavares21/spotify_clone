import React from "react";
import spotifyLogo from "../spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";

export default function Login() {
  const originUrl = window.location.href;
  const redirectUrl = encodeURIComponent(originUrl + "callback");
  const authUrl = `https://accounts.spotify.com/authorize?client_id=e686d952f7cd423f97f7444797f78791&redirect_uri=${redirectUrl}&response_type=token`;
  return (
    <div className="w-full h-full flex justify-center items-center content-center">
      <div className="flex wrap flex-col items-center  justify-center w-1/4 h-1/4">
        <img width="200" src={spotifyLogo} alt="Spotify Logo" />
        <button className="m-10 w-1/2 h-10 rounded-full font-bold bg-green-500">
          <a href={authUrl}>Spotify Login</a>
        </button>
      </div>
    </div>
  );
}
