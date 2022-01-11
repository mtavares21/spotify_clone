import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
import SideMenu from "./sideMenu";
import UserMenu from "./userMenu";
import CardTemplate from "./CardTemplate";
import SearchInput from "./searchInput";
import Player from "./player";
import TrackList from "./TrackList";
import { getUserId, saveToken, getPlaylist } from "../api";
import playbackInit from "../playbackSdk";
import Logo from "./Logo";

const likedSongsId = "61dbb0ad80b1263975289fc3";
const baseUrl = process.env.REACT_APP_BASE_URL;
const hash = window.location.hash;
const urlParams = new URLSearchParams(hash);
const token = urlParams.get("#access_token");

let trackDriver = (dbTracks) => {
  let buffer = dbTracks.map((track) => {
    return {
      album: {
        images: [
          track.album.images[0],
          track.album.images[0],
          track.album.images[0],
        ],
      },
      artists: [{ name: track.artists.name }],
      external_urls: { spotify: track.spotifyUrl },
      id: track.spotifyId,
      name: track.name,
      mongoId: track._id,
    };
  });
  return buffer;
};

export default function MainApp() {
  const [deviceId, setDeviceId] = useState(null);
  const [menuItem, setMenuItem] = useState("home");
  const [searchTracks, setSearchTracks] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [searchArtists, setSearchArtists] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);

  function updateSearchResults(tracks, artists, albums) {
    console.log("mainApp", tracks);
    setSearchTracks(() => tracks);
    //NOT IMPLEMENTED YET
    // setSearchArtists(() => artists);
    // setSearchAlbums(() => albums);
  }

  useEffect(async () => {
    if (menuItem === "liked_songs") {
      try {
        const response = await getPlaylist(likedSongsId);
        console.log({ response });
        //console.log({trackDrive:trackDriver(response.tracks)})
        setLikedSongs((prev) => trackDriver(response.tracks));
        console.log({ likedSongs });
      } catch (error) {
        console.error("getPlaylist: " + error);
      }
    }
  }, [menuItem]);
  return (
    <div className="flex no-wrap w-full h-full font-bold">
      <div className="flex wrap flex flex-col w-1/5 h-full">
        <Logo />
        <SideMenu setMenuItem={setMenuItem} />
      </div>
      <div className="flex flex-col wrap w-full h-full font-bold bg-neutral-900 overflow-scroll">
        <div className="h-2/3 bg-gradient-to-b from-indigo-900 to-neutral-900">
          <div className="flex no-wrap items-center h-20 w-full px-10 justify-between">
            {menuItem === "search" ? (
              <SearchInput updateSearchResults={updateSearchResults} />
            ) : null}
            <UserMenu />
          </div>
          {menuItem === "search" ? (
            <div className="m-10 w-6/7 h-16">
              <TrackList
                tracksArray={searchTracks}
                deviceId={deviceId}
                title={"Tracks"}
              />
            </div>
          ) : (
            <div className="w-full">
              <div className="m-10 w-2/5"></div>
              {menuItem === "liked_songs" ? (
                <div className="m-10 w-6/7 h-16">
                  <TrackList
                    tracksArray={likedSongs}
                    isLiked={true}
                    deviceId={deviceId}
                    title={"Liked Songs"}
                  />
                </div>
              ) : (
                <div className="m-10 w-2/5">
                  <h1 className="mb-10 text-white text-5xl font-bold">Hello</h1>
                  <CardTemplate
                    img="https://misc.scdn.co/liked-songs/liked-songs-640.png"
                    title={"Liked Songs"}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Player deviceId={deviceId} token={token} setDeviceId={setDeviceId} />
    </div>
  );
}
