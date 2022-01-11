import React, { useState, useEffect } from "react";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../api";
import {playerAction} from "../api"
import CardTemplate from "./CardTemplate";

const likedSongsId = "61dbb0ad80b1263975289fc3"
export default function Track({
  track,
  deviceId
}) {

  return (
    <CardTemplate  track={track} like={true} handlePlay={()=>playerAction("play", deviceId, track.external_urls.spotify)} />
  );
}
