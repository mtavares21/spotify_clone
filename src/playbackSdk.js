function playbackInit(token, callback, stateCb) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    if (window.Spotify !== undefined) {
      const player = new window.Spotify.Player({
        name: "Spotify Clone",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      // createEventHandlers();
      // Ready
      player.addListener("ready", ({ device_id }) => {
        callback(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener(
        "player_state_changed",
        function ({ position, duration, track_window: { current_track } }) {
          (stateCb({
            position,
            duration,
            track_window: { current_track },
          }))
        }
      );

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      // finally, connect!
      player.connect();
    }
  }
}

export {playbackInit, }