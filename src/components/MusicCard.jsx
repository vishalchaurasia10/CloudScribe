import React, { useContext } from 'react'
import modeContext from '../context/modes/modeContext';

const MusicCard = (props) => {

    const context = useContext(modeContext);
    const { darkMode } = context;
    const convertDuration = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }


    return (
        <a className='w-full lg:w-80' key={props.trackLink} href={props.trackLink}>
            <div className={`musicCard ${darkMode?'bg-black text-white':''} transition-all duration-300 lg:h-[30rem] my-2 mx-auto lg:mx-2 p-3 space-y-4 border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl`}>
                <div className="image overflow-hidden rounded-xl">
                    <img className='hover:scale-110 w-full transition-all duration-500 rounded-xl' src={props.trackImage} alt={props.trackName} />
                </div>
                <div className="details px-2 py-2 w-full">
                    <p className='font-jost font-semibold text-xl'>{props.trackName}</p>
                    <p className='text-sm font-light'>Time: {convertDuration(props.duration)}</p>
                    <p className='text-sm font-light'>{props.artists.map(((artist, index) => (
                        <span key={artist.profile.id}>{artist.profile.name}{index + 1 === props.artists.length ? '' : ','}</span>
                    )))}</p>
                </div>
            </div>
        </a>
    )
}

export default MusicCard
