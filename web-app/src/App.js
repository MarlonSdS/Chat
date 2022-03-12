import {io} from 'socket.io-client'
import {useState, useEffect} from 'react'
import './App.css'

import MyMsg from './components/MyMsg'
import OutMsg from './components/OutMsg'

const socket = io('http://192.168.0.107:3030', {
  rejectUnauthorized: false
})
socket.on()


function App() {
  var [messages, setMessages] = useState([])
  socket.on('previousMessages', function(msg){
    console.log(msg)
    setMessages(msg)
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
    updateMessages(message)
  }


  return(
    <div className="App">
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

        <form>
          <input type='text' placeholder='Usuário' id='user'/><br />
          <input id='content' placeholder='sua mensagem' type='text'></input>
          <button type='submit' onClick={submit}>Enviar</button>
        </form>

        

    </div>
  )
}

export default App;
