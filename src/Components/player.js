import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import PreviousIcon from "@mui/icons-material/SkipPrevious";
import NextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/PauseCircle";
import Slider from "@mui/material/Slider";
import Volume from "./Volume";
import Devices from "@mui/icons-material/Laptop";
import {playbackInit, getVolume} from "../playbackSdk";
import { playerAction, getPlayerState } from "../api";

export default function Player({ deviceId, setDeviceId, token }) {
  const [isPaused, setIsPaused] = useState(false);
  const [name, setName] = useState("54 - 46 (Was my number)");
  const [artist, setArtist] = useState("Ernest Ranglin");
  const [image, setImage] = useState(
    "https://i.scdn.co/image/ab67616d0000485191097c0e8accb1443e612b9c"
  );
  const [uri, setUri] = useState()
  const [volume, setVolume] = useState(50);
  const [player, setPlayer] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // ATENTION !! Not a component state
  const setState = (current_track) => {
    setName((prev) => current_track.name);
    setArtist((prev) => current_track.artists[0].name);
	setImage((prev) => current_track.album.images[2].url);
	setUri((prev => current_track.uri))
  };
  // Listening for state changes
  const streamInfo = (state) => {
    const current_track = state.track_window.current_track;
    setState(current_track);
  };

  const setDevice = async (device) => {
	setDeviceId((prev) => device);
	try{
		const state = await getPlayerState()
		if(!!state)
			setState(state.item)
  	} catch (error) {
		  setError(prev => error)
	  }
  };

  // Initialize SDK
  //playbackInit(token, setDevice, streamInfo);
  useEffect(() => {
	if(!loading){
		setLoading(prev => true)
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        setPlayer(prev => player);

        player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
			setDevice(device_id);
			setLoading(prev =>false)
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
		player.addListener(
			"player_state_changed",
			function ({ position, duration, track_window: { current_track } }) {
			  (streamInfo({
				position,
				duration,
				track_window: { current_track },
			  }))
			}
		  );

        player.connect();

	};
}
}, []);

  return (
    <div
      style={{
        borderTop: "solid 1px rgb(40,40,40)",
        backgroundColor: "rgb(24,24,24)",
        height: "114px",
        position: "absolute",
        bottom: 0,
      }}
      className="flex no-wrap justify-between w-full bg-gray-900 absolute bottom-0 "
    >
      <div className="w-1/3 flex no-wrap justify-start align-center">
        <div className="h-70 w-70 m-5 overflow-hidden">
          <img src={image} />
        </div>
        <div className="flex flex-col align-center justify-center align-between wrap">
          <p className="w-full text-white text-sm">{name}</p>
          <p className="w-full text-neutral-400 text-xs ">{artist}</p>
        </div>
      </div>
      <div className="flex wrap flex-col justify-center items-center w-1/3">
        <div className="flex no-wrap justify-center items-center w-1/3">
          <PreviousIcon
            onClick={() => playerAction("prev")}
            fontSize="medium"
            sx={{ color: "rgb(150, 150, 150)" }}
          />
          {isPaused ? (
            <PauseIcon
              onClick={() => {
                playerAction("pause");
                setIsPaused((prev) => !prev);
              }}
              sx={{ fontSize: "45px", color: "white" }}
            />
          ) : (
            <PlayArrowIcon
              onClick={() => {
                console.log(deviceId);
                playerAction("play", deviceId, uri);
                setIsPaused((prev) => !prev);
              }}
              sx={{ fontSize: "45px", color: "white" }}
            />
          )}
          <NextIcon
            onClick={() => playerAction("next")}
            sx={{ color: "rgb(150, 150, 150)" }}
          />
        </div>
        <Slider disabled defaultValue={30} aria-label="Disabled slider" />
      </div>
      <div className="flex items-center justify-end w-1/3">
        <Devices sx={{ marginRight: "15px", color: "rgb(150, 150, 150)" }} />
        <Volume volume={volume} player={player} />
      </div>
    </div>
  );
}
