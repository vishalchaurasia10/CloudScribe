import React, { useContext } from 'react'
import modeContext from '../context/modes/modeContext';

const AlbumCard = (props) => {

    const context = useContext(modeContext);
    const { darkMode } = context;

    return (
        <a className='w-full lg:w-80' key={props.albumLink} href={props.albumLink}>
            <div className={`albumCard ${darkMode ? 'bg-black text-white' : ''} transition-all duration-300 lg:h-[30rem] my-2 mx-auto lg:mx-2 p-3 space-y-4 border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl`}>
                <div className="image overflow-hidden rounded-xl">
                    <img className='hover:scale-110 w-full transition-all duration-500 rounded-xl' src={props.albumImage} alt={props.albumName} />
                </div>
                <div className="details px-2 py-2 w-full">
                    <p className='font-jost font-semibold text-xl'>{props.albumName}</p>
                    <p className='text-sm font-light'>Year: {props.albumYear}</p>
                    <p className='text-sm font-light'>{props.artists.map(((artist, index) => (
                        <span key={artist.profile.id}>{artist.profile.name}{index + 1 === props.artists.length ? '' : ','}</span>
                    )))}</p>
                </div>
            </div>
        </a>
    )
}

export default AlbumCard
