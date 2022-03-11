import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from "./axios";
import { gapi } from "gapi-script";
import LoginButton from "./login";
import { makeQueryString } from "./utils";
const clientId =
  "728833144528-jnqafjlf2ogq6p7r7qn7lmkf22iulvs9.apps.googleusercontent.com";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });
  const [roomId, setRoomId] = useState(0);
  const [rooms, setRooms] = useState([]);

  const onSuccess = (res) => {
    console.log("LOGIN Success", res.profileObj);
    setUser({
      loggedIn: true,
      name: res.profileObj.name,
    });
  };
  const onFailure = (res) => {
    console.log("LOGIN failure", res);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9b476ce4b1727bdc687d", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", (newMessage) => {
      console.log("found datas", newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    if (user.loggedIn && rooms.length > 0) {
      let query = makeQueryString({ roomId: roomId });
      axios.get("/api/v1/messages/get" + "?" + query).then((res) => {
        console.log("res Dtaa ", res.data);
        setMessages(res.data);
      });
    }
  }, [user, rooms, roomId]);

  useEffect(() => {
    if (user.loggedIn) {
      let query = makeQueryString({ userName: user.name });
      axios.get("/api/v1/user/fetchRooms" + "?" + query).then((res) => {
        console.log("room:: ", res.data);
        setRooms(res.data);
        setRoomId(res.data[0]);
      });
    }
  }, [user]);

  const roomChange = (_roomId, _rowIdx) => {
    console.log("_roomId", _roomId, "_rowIdx", _rowIdx);
    setRoomId(_roomId);
  };

  return (
    <div className="app">
      {user.loggedIn ? (
        <p>Welcome {user.name} !!</p>
      ) : (
        <LoginButton onSuccess={onSuccess} onFailure={onFailure} />
      )}

      <div className="app__body">
        <Sidebar rooms={rooms} roomChange={roomChange} />
        <Chat roomId={roomId} user={user} messages={messages} />
      </div>
    </div>
  );
}

export default App;
