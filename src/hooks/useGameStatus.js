import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';

const useGameStatus = (rowsCleared) => {

    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        //We have Score
        if (rowsCleared > 0) {
            //This is how original tetris score is calculated
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev * rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel]
}

export default useGameStatus