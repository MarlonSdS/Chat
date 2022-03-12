import {Component, Props} from 'react'
import '../styles/OutMsg.css'

export default function OutMsg(props){
    return(
        <div className="outmsg">
            <h1>{props.user}</h1>
            <p>{props.content}</p>
            <span>{props.time}</span>
        </div>
    )
}