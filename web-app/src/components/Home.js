import {io} from 'socket.io-client'
import {useState, useEffect} from 'react'

import MyMsg from './MyMsg'
import OutMsg from './OutMsg'
import '../styles/Home.css'

const socket = io('http://192.168.0.107:3030', {
  rejectUnauthorized: false
})
socket.on()

export default function Home(){

    var [messages, setMessages] = useState([])
  socket.on('previousMessages', function(msg){
    console.log(msg)
    setMessages(msg)
  })

  useEffect(() =>{
    scrollDown()
  })

  function updateMessages(message){
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
  }
  

  function submit(e){
    e.preventDefault()
    var user = document.getElementById('user').value
    var content = document.getElementById('content').value
    var time = Date.now()
    var message = {user: user, content: content, time: time}
    socket.emit('sendMessages', message)
    document.getElementById('content').value = ''
    localStorage.setItem('username', user)
    scrollDown()
    updateMessages(message)
  }

  function scrollDown(){
    window.scrollTo(0,document.body.scrollHeight)
  }

  return(
    <div className="Home">
         <div className='chatlist'> 
        {messages.reverse().map(msg =>{
          if(msg.user == localStorage.getItem('username')){
            return(
              <MyMsg user={msg.user} content={msg.content} time={msg.time} className='my-msg'/>
            )
          }else{
            return(
                
              <OutMsg user={msg.user} content={msg.content} time={msg.time} className='out-msg'/>
              )
          }
              
            })}
        </div>

        <div className='inputbox'>
          <input type='text' placeholder='Usuário' id='user'/><br />
          <textarea id='content' placeholder='sua mensagem' type='text'></textarea>
          <button type='submit' onClick={submit}>Enviar</button>
        </div>

        

    </div>
  )
}
