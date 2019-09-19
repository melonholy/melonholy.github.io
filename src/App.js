import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('https://imod.herokuapp.com/');

function App() {
  const [inputMessage, setInputMessage] = useState('')
  const [response, setResponse] = useState([])

  useEffect(() => {
    socket.on('message', message => {
      const a = [...response]
      a.push(message)
      setResponse(a)
    })
  }, [response]);

  const onChange = e => {
    setInputMessage(e.target.value);
  };

  const onClick = () => {
    socket.emit("send", inputMessage);
  };
  
  const enter = (e) => {
    if (e.key === 'Enter')
      onClick()
  }

  return (
    <>
      <input onChange={onChange} onKeyDown={enter} autocomplete="off" />
      <button onClick={onClick}>
        Send
        </button>
      {response.length > 0 && response.map(item => (
        <p>{item}</p>
      ))}
    </>
  );
}

export default App;
