import React, {useState} from "react";
import LikeIcon from "@mui/icons-material/Favorite";
import NotLikeIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export default function Like ({track}){
	const [isLiked, setIsLiked] = useState(false);
	const handleLike = () =>{
		setIsLiked(prev => !prev)
	}
	// useEffect( async () => {
	// 	console.log(likedSong)
	// 	if(likedSong === null){
	// 		console.log("liked song is null")
	// 	} else if(likedSong) {
	// 	  try {
	// 		await addTrackToPlaylist(
	// 		  likedSongsId,
	// 		  track.album.id,
	// 		  track.artists[0].id,
	// 		  track.external_urls.spotify,
	// 		  track.name,
	// 		  track.track_number,
	// 		  track.uri,
	// 		  track.id
	// 		);
	// 		console.log("addTrack")
	// 	  } catch (error) {
	// 		console.log(error);
	// 	  }
	// 	} else if (!likedSong){
	// 		console.log("remove")
	// 		try{
	// 			  await removeTrackFromPlaylist(likedSongsId, spotifyId);
	// 		} catch (error){
	// 			console.log(error)
	// 		}
	// 	}
	// 	return
	//   }, [likedSong, track, spotifyId]);
	return (<Box
		sx={{
		  display: "flex",
		  height: "fit-content",
		  alignItems: "center",
		}}
	  >
		<div className="flex content-center justify-center mr-5 border-none">
		  {isLiked ? (
			<IconButton aria-label="play/pause" onClick={handleLike}>
			  <LikeIcon
				sx={{
				  height: 30,
				  width: 30,
				  borderRadius: "500px",
				  color: "#1db954",
				}}
				color="secondary"
			  />{" "}
			</IconButton>
		  ) : (
			<IconButton aria-label="play/pause" onClick={handleLike}>
			  <NotLikeIcon
				sx={{
				  height: 30,
				  width: 30,
				  color: "rgb(70,70,70)",
				}}
				fontSize="smal"
				color="secondary"
			  />
			</IconButton>
		  )}
		</div>
	  </Box>
	)
}