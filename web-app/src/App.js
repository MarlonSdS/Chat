import {io} from 'socket.io-client'
import {useState, useEffect} from 'react'

const socket = io('http://192.168.0.107:3030', {
  rejectUnauthorized: false
})
socket.on()


function App() {
  var [messages, setMessages] = useState([])
  socket.on('previousMessages', function(msg){
    localStorage.setItem('messages', JSON.stringify(msg))
  })

  useEffect(()=>{
    var local = localStorage.getItem('messages')
    //console.log(localStorage.getItem(JSON.parse(local)))
    setMessages(JSON.parse(local))
    console.log(messages)
  })

  function updateMessages(){
  }

  function submit(e){
    e.preventDefault()
    var user = document.getElementById('user').value
    var content = document.getElementById('content').value
    var time = Date.now()
    var message = {user: user, content: content, time: time}
    socket.emit('sendMessages', message)
    document.getElementById('content').value = ''
    updateMessages()
  }


  return(
    <div className="App">
        <form>
          <input type='text' placeholder='Usuário' id='user'/><br />
          <input id='content' placeholder='sua mensagem' type='text'></input>
          <button type='submit' onClick={submit}>Enviar</button>
        </form>
        <ul>
        {messages.map(msg =>{
              return(
                <li key={msg.time}>
                  <p>{msg.user}</p>
                  <p>{msg.content}</p>
                </li>
              )
            })}
        </ul>

        

    </div>
  )
}

export default App;
