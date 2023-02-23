import React, { useContext, useEffect, useState } from 'react';
import queryContext from '../context/query/queryContext';
import modeContext from '../context/modes/modeContext';
import musicSearch from '../assets/musicSearching.gif'
import AlbumCard from './AlbumCard';
import MusicCard from './MusicCard';
// import MusicPlayer from './MusicPlayer';

const Music = (props) => {
  const [lastUsedIndex, setLastUsedIndex] = useState(0);
  const [results, setResults] = useState(null);
  const query_Context = useContext(queryContext);
  const mode_Context = useContext(modeContext);
  const { darkMode } = mode_Context;
  const { query } = query_Context;
  let albums, tracks, noImage;

  const apiKeys = [
    'b805229b79mshbd8f9f827c95d02p15beb5jsnfaee84bce7ec',
    '9273b55a75msh1a956d3ecef4fc9p1755e1jsn3fd8da60e412',
    '57cb42952amsh415b3b69e24c765p10ae71jsn599b87a8ee1d'
  ];


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKeys[lastUsedIndex],
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(query)}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options);
        const data = await response.json();
        setResults(data);

        // Increment the last used index and loop back to the start of the array
        setLastUsedIndex((lastUsedIndex + 1) % apiKeys.length);
      } catch (error) {
        console.error(error);
      }
    };

    if (query.length > 0) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [query]);

  if (results !== null) {
    albums = results.albums.items
    tracks = results.tracks.items
    noImage = 'https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo'
  }

  return (
    <>
      {results!==null?<div className={`${darkMode ? 'bg-[#212E35] text-white' : ''} lg:pt-[3.7rem] pt-16 w-full`}>

        {tracks && <h1 className=' py-4 font-DancingScript text-8xl text-center'>Songs</h1>}
        {tracks && <div className="trackWrapper lg:pl-[6.5rem] flex-wrap flex px-4 lg:px-10">
          {tracks.map((track) => (
            <MusicCard key={track.data.uri} trackName={track.data.name} artists={track.data.artists.items} artistProfileLink={track.data.artists.items[0].uri} trackImage={track.data.albumOfTrack.coverArt.sources[0].url === undefined ? noImage : track.data.albumOfTrack.coverArt.sources[0].url} trackLink={track.data.uri} duration={track.data.duration.totalMilliseconds} />
          ))}
        </div>}

        {albums && <h1 className=' py-8 font-DancingScript text-8xl text-center'>Albums</h1>}
        {albums && <div className="albumWrapper lg:pl-[6.5rem] flex-wrap flex px-4 lg:px-10">
          {albums.map((album) => (
            <AlbumCard key={album.data.uri} albumName={album.data.name} artists={album.data.artists.items} artistProfileLink={album.data.artists.items[0].uri} albumImage={album.data.coverArt.sources[0].url} albumYear={album.data.date.year} albumLink={album.data.uri} />
          ))}
        </div>}
      </div> : 
      <div className={`${darkMode ? 'bg-[#212E35] text-white' : ''}`}>
        <img className='mx-auto pt-24' src={musicSearch} alt='loading' />
        <p className='text-center font-jost my-4 text-xl'>Nothing to show here!</p>
        <h1 className=' py-4 font-DancingScript text-5xl lg:text-8xl text-center'>Start Searching for songs</h1>
      </div>
       }
      {/* <MusicPlayer accessToken={props.accessToken}/> */}
    </>
  );
};

export default Music;
