import {React, useEffect, useState} from 'react'
// import './CardStyle.css'

import "./CardStyle.css";



export default function Card ({card, onClick, index, isInactive, isFlipped, isDisabled}){

    const handleClick = ()=>{
        !isFlipped && !isDisabled && onClick(index)
    }
    // const flippedClass =  card.flipped ? 'flipped' : '';

    return (
        <div className={`card`} 
            onClick={()=>{handleClick(index)}}>
            <div className={`card-inner    
            ${isFlipped ? "is-flipped" : ""}
            ${isInactive ? "is-inactive" : ""}`}>
                <div className="card-front" style={{backgroundColor:card.color}}>
                </div>
                <div className='card-back'></div>
            </div>
        </div>
    )

  
}