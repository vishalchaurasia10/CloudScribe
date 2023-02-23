import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = (props) => {
  return (
    <SpotifyPlayer
      token='BQAXxUO1aUj_ntmgw-Q7XOkE_aco-m9iZ6AwgFnxgsu0cBkymUyb3OfvT8jjBGkujYG4BpRRvl8f-lZHlCRTEZVqCzn6SPt2UliCHeEsONQEGC-426GcQfgHmF5vK3nkIW1uiXHTRQHygJKDGIa3lYb1vpcNe-ve2X7eRNVrZZB3-ffcjgS44JUIe45N883_nybtpd8zvja5fc7KtUHcsQidewwF6xgMab6i-vxJtigXkiU'
      uris={['spotify:track:56zZ48jdyY2oDXHVnwg5Di']}
    />
  )
}

export default MusicPlayer
