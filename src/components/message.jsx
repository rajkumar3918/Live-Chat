import React from "react";
import { auth } from "../firebase";

export default function Message({message}){
    return(
        <div className={auth.currentUser.displayName === message.username? "message-details"+" "+"rightalign" : "message-details"}>
            <img src={message.image? message.image:"https://i.pinimg.com/736x/85/5b/2b/855b2b606c64c961da2922a240a43236.jpg"} alt="" />
          <div className="message-text">
            <p className="username">~{auth.currentUser.displayName === message.username? "You" : message.username}</p>
            <p className="text">{message.text}</p>
          </div>
        </div>
    )
}