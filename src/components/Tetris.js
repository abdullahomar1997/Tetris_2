import React, { useState } from 'react'
import { checkCollision, createStage } from '../gameHelpers'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useInterval } from '../hooks/useInterval'
import Display from './Display'
import Stage from './Stage'
import StartButton from './StartButton'
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'
import useGameStatus from '../hooks/useGameStatus'

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = (direction) => {

        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 })
        }
    }

    const dropPlayer = () => {
        drop();
    }
    const drop = () => {

        //Increase level when players has cleared Rowss
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            //After increase speed
            setDropTime(1000 / (level + 1) + 200)
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, colided: false })
        } else {
            //GameOver
            if (player.pos.y < 1) {
                console.log("GAME oVER!!!!")
                setGameOver(true);
                setDropTime(null)
            }

            updatePlayerPos({ x: 0, y: 0, collided: true })
        }

    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(1000)
        setScore(0)
        setRows(0)
        setLevel(0)

    }

    const move = ({ keyCode }) => {
        console.log(keyCode)
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            }
            else if (keyCode === 39) {
                movePlayer(1);
            }
            else if (keyCode === 40) {
                dropPlayer();
            }
            else if (keyCode === 38) {
                playerRotate(stage, 1)
            }
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200)
            }
        }
    }

    useInterval(() => {
        // setDropTime(null);
        drop();
    }, dropTime)


    return (
        <StyledTetrisWrapper autofocus role='button' onKeyDown={e => move(e)} tabIndex="0" onKeyUp={keyUp}   >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="GameOver" />
                    ) : (
                        <div>
                            <Display text={`Score ${score} `} />
                            <Display text={`Rows ${rows} `} />
                            <Display text={`Level ${level} `} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                    {/* <button onClick={startGame} >Abdullah</button> */}
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris