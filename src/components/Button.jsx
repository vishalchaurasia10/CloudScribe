import React from 'react'

const Button = (props) => {
    return (
        <>
            <button className={`text-left mx-${props.position} w-fit p-${props.padding} rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>{props.title}</button>
        </>
    )
}

export default Button
