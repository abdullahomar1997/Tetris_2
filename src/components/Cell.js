import React from 'react'
import { TETROMINOES } from '../tetrominoes'
import { StyledCell } from './styles/StyledCell'

const Cell = ({ type }) => {
    return (
        <StyledCell type={type} color={TETROMINOES[type].color} />
    )
}

export default React.memo(Cell)