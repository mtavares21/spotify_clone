import React, { useEffect } from "react";
import Card from "./Track";

export default function TrackList({ tracksArray, isLiked, title, deviceId }) {
	console.log(tracksArray)
  return (
    <div className="w-full">
      <h1 className="mb-10 text-white text-4xl font-bold">{title}</h1>
      <div className="w-full h-1/2">
        {!!tracksArray && tracksArray.length > 0
          ? tracksArray.map((track) => {
              return (
                <Card
                  key={track.id }
                  deviceId={deviceId}
                  track={track}
                  like={true}
                  spotifyId={track.id}
                  isLiked={isLiked}
                />
              );
            })
          : null}
      </div>
      {/* <h1 className="my-10 text-white text-4xl font-bold">Artists</h1>
		  <div className="w-full h-1/2">
			  {searchArtists.map(artist =>{<div>artist.name</div>} )}
		  </div>
		  <h1 className="my-10 text-white text-4xl font-bold">Albums</h1>
		  <div className="w-full h-1/2">
			  {searchAlbums.map(album => {<div>album.name</div>})}
		  </div> */}
    </div>
  );
}
