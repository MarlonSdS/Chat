import {Component, Props} from 'react'
import '../styles/MyMsg.css'

export default function MyMsg(props){
    return(
        <div className="mymsg">
            <h1>{props.user}</h1>
            <p>{props.content}</p>
            <span>{props.time}</span>
        </div>
    )
}