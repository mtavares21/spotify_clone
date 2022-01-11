import axios from "axios";

const baseUrl = "https://secure-lowlands-61829.herokuapp.com/v1/";
const hash = window.location.hash;
const urlParams = new URLSearchParams(hash);
const token = urlParams.get("#access_token");

async function getUserId() {
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers,
  });
  return response.data.id;
}

async function saveToken(user) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
    withCredentials: false,
  };
  try {
    const response = await axios.get(
      `${baseUrl}users/login?token=${token}&user=${user}`,
      { headers }
    );

    document.cookie = `name=connect.sid, value=s%3A9af820fb-1986-4836-a29f-aef8904594e6.vfFUeaUBaPEaIJIFi5pszdPDGGJrRZLIviOBVMF3p0M,originalMaxAge= ${response.data.originalMaxAge}, expires= ${response.data.expires}, secure= ${response.data.secure}, httpOnly= ${response.data.httpOnly}, path= ${response.data.path}`;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function search(query, type) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${baseUrl}data/search?q=${query}&type=${type}&token=${token}&user=${userId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function playerAction(action, device, context) {
  const userId = await getUserId();
  const params = new URLSearchParams();

  params.set("token", token);
  params.set("user", userId);
  if(context) params.set("uris", context);
  if(device) params.set("device_id", device);
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${baseUrl}player/${action}?${params.toString()}`,
      { headers }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}


async function createPlaylist(name, images) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `${baseUrl}db/playlist?token=${token}&user=${userId}&name=${name}&totalTracks=0&images=${images}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getPlaylist(playlistId) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  try {
    const response = await axios.get(
      `${baseUrl}db/playlist?id=${playlistId}&token=${token}&user=${userId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getPlayerState() {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  try {
    const response = await axios.get(
      `${baseUrl}player/state?&token=${token}&user=${userId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function addTrackToPlaylist(
  playlistId,
  album,
  artists,
  spotifyUrl,
  name,
  trackNumber,
  spotifyUri,
  trackId
) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  try {
    const response = await axios.put(
      `${baseUrl}db/playlist/${playlistId}/add?&token=${token}&user=${userId}&album=${album}&artists=${artists}&spotifyUrl=${spotifyUrl}&name=${name}&trackNumber=${trackNumber}&spotifyUri=${spotifyUri}&spotifyId=${trackId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function removeTrackFromPlaylist(playlistId, trackId) {
  const userId = await getUserId();
  const headers = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  try {
    const response = await axios.post(
      `${baseUrl}db/playlist/${playlistId}/remove?token=${token}&user=${userId}&trackId=${trackId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// createPlaylist(
//   "Liked Songs",
//   "https://misc.scdn.co/liked-songs/liked-songs-640.png"
// );
export {
  getUserId,
  saveToken,
  search,
  playerAction,
  getPlayerState,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
};
