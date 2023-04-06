import React , {useEffect, useState} from "react";
import {MdSend} from "react-icons/md";
import { addDoc, collection, onSnapshot,orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./message";
import { useSelector } from "react-redux";



const SendMessage = (props) => {
  const room = useSelector(state=>state.RoomName.value);
  const {pass} = props;
    const [newMessages , setMessage] = useState("");
    const messageRef = collection(db, "message");
    const [messages, setMessages] = useState([]);
    const scroll = pass;

    useEffect(()=>{
      const queryMessages = query(messageRef, where("room", "==", room), orderBy('createdAt'))
     const unsuscribe =  onSnapshot(queryMessages, (snapShot)=>{
        let messages = [];
        snapShot.forEach((doc)=>{
          messages.push({...doc.data(), id: doc.id})
        });
        setMessages(messages)
      })

      return ()=> unsuscribe();
    },[room])

    const sendMessage = async(e)=>{
        e.preventDefault();
        if(newMessages === "") return;

        await addDoc(messageRef,{
          text: newMessages,
          createdAt: serverTimestamp(),
          userEmail: auth.currentUser.email,
          username: auth.currentUser.displayName,
          image: auth.currentUser.photoURL,
          room: room,


        })

        setMessage("");
        scroll.current.scrollTop = scroll.current.scrollHeight

    }
  return (
    <div className="all-messages">    
      <div>{messages.map((e)=> {
        return(
        <div className="message" >
          <Message key={e.id} message={e}/>
        </div>
        )
      })}</div>
      <form className="send-message" onSubmit={sendMessage}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        onChange={e=>setMessage(e.target.value)}
        value={newMessages}
      />
      <button className="sendBtn" type="submit"><MdSend style={{fontSize:"25px"}}/></button>
    </form>
    </div>

  );
};
export default SendMessage;