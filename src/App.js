import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from "./axios";
import { gapi } from "gapi-script";
import LoginButton from "./login";

const clientId =
  "728833144528-jnqafjlf2ogq6p7r7qn7lmkf22iulvs9.apps.googleusercontent.com";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);

    axios.get("/api/v1/messages/get").then((res) => {
      console.log("res Dtaa ", res.data);
      setMessages(res.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("9b476ce4b1727bdc687d", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      console.log("found datas", newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <div className="app">
      <LoginButton />

      {console.log("messae :::: ", messages)}
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
