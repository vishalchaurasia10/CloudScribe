import React from 'react'

const Button = (props) => {
    return (
        <>
            <button className={`bg-orange-400 p-${props.padding} rounded-sm transition-all duration-300 hover:-translate-y-1`}>{props.title}</button>
        </>
    )
}

export default Button
