import React from 'react'
import Nav from '../Nav/Nav'
import style from './Board.module.css'

export default function Board() {
  return (
    <>
    <div className={style.board}>
    <Nav />
    <div className={style.board_content}>
        <div className={style.board_box}></div>
            <div className={style.board_text}>
                <h3>Welcoe Addhayna</h3>
                <h1>Board</h1>
            </div>
            <div className={style.board_time}>
                <p>
                    {new Date().toDateString()}
                </p>
            </div>


    </div>
    </div>
    </>
    
  )
}
