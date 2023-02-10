import React from 'react'
import { StyledDispaly } from './styles/StyledDisplay'

const Display = ({ gameOver, text }) => {
    return (
        <StyledDispaly gameOver={gameOver} >{text}</StyledDispaly>
    )
}

export default Display