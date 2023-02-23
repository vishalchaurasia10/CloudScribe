import React, { useEffect, useState } from 'react'
import Music from './Music';
import SpotifyLogin from './SpotifyLogin'

const MusicManager = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // get the fragment from the URL
    const fragment = window.location.hash.substring(1); // remove the leading '#'

    // split the fragment into an array of key-value pairs
    const fragmentParts = fragment.split('&');

    // iterate over the key-value pairs to extract the access token;
    for (let i = 0; i < fragmentParts.length; i++) {
      const [key, value] = fragmentParts[i].split('=');
      if (key === 'access_token') {
        setAccessToken(value);
        break;
      }
    }
    if (accessToken.length > 0) localStorage.setItem('accessToken', accessToken);

    //eslint-disable-next-line
  }, []); // empty dependency array ensures that this effect runs only once

  console.log(accessToken);

  return (
    <>
      {accessToken ? <Music accessToken={accessToken} /> : <SpotifyLogin />}
    </>
  );
};

export default MusicManager;

