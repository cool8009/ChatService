import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import Navbar from './layout/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'



const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  //create connection
  const joinRoom = async (user, room) => {
    try {
      //using singnalr
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001 /chat")
        .configureLogging(LogLevel.Information)
        .build();

      //the server push message to the client
      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      //get list of connect users
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      //leave room
      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });
      
      
      await connection.start();
      //to notify connection to the room(Joinroom func at ChatHub)
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  //use singalr connection to the sendmessage(SendMessage func at ChatHub)
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  //to leave room
  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return <div className='app'>
    <Navbar/>
    <h2>Backgammon Chat</h2>
    {!connection //if there is connection desplay lobby
      ? <Lobby joinRoom={joinRoom} /> 
      : <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />}
  </div>
}

export default App;
