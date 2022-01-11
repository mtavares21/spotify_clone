import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import Like from "./Like";

export default function ({track, handlePlay, like, img, title}) {
  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: "rgba(179,179,179,0.1)",
        height: "90px",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 90 }}
          image={img ? img : track.album.images[2].url}
          alt="Live from space album cover"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            overflow: "hidden",
          }}
        >
          <Typography
            component="div"
            sx={{ height: "fit-content", color: "#fff", fontWeight: "bold" }}
            variant="h8"
          >
            {track ? track.name : title}
          </Typography>
          <Typography
            component="div"
            sx={{
              height: "fit-content",
              color: "rgb(200,200,200)",
              fontWeight: "bold",
            }}
            variant="p"
          >
            {track ? track.artists[0].name : null}
          </Typography>
        </CardContent>
        {like ? (
          <Like track={track}/>
        ) : null}
        <Box
          sx={{ display: "flex", height: "fit-content", alignItems: "center" }}
        >
          <div className="flex content-center justify-center mr-5 bg-white rounded-full w-6 h-6 border-none">
            <IconButton
              onClick={handlePlay}
              aria-label="play/pause"
            >
              <PlayArrowIcon
                sx={{
                  height: 50,
                  width: 50,
                  borderRadius: "500px",
                  color: "#1db954",
                }}
                color="secondary"
              />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Card>
  );
}
