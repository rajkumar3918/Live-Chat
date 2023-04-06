import React, { useRef, useState } from "react";
import SendMessage from "./chats";
import Navbar from "./navbar";
import {TfiShiftRightAlt} from "react-icons/tfi";
import {MdOutlineNoEncryptionGmailerrorred} from "react-icons/md";
import {AiOutlineSwap} from "react-icons/ai";
import {BsWindowSidebar,BsWindowFullscreen,BsPlusSquare} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { enterRoomName } from "./redux/slice/roomSlice";
// import CreateModal from "./createModal";




const Chat = (props)=>{
    const room = useSelector(state=>state.RoomName);
    console.log(room.rooms)
    const scrolRef = useRef();
    const roomChangeRef = useRef();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [valid, setValid] = useState(true)

    const changeRoom = ()=>{
        setValid(false)
        const roomName = roomChangeRef.current.value;
        
        for(var i = 0; i<room.rooms.length; i++){
            if(room.rooms[i].roomName == roomName){
            setShow(false);
            dispatch(enterRoomName(roomName));
            setValid(true)
            }
        }
    }

   
    return(
        <div className="chat-container">
            <div className="chat-navbar">
               <div className={show? ("changeRoom"+" "+"changeVisible"): "changeRoom"}>
               <input  type="text" ref={roomChangeRef} placeholder="Room name"/>
               <AiOutlineSwap onClick={changeRoom}  className="enter"/>
               {/* <p>name length must be more then 4</p> */}
               </div><TfiShiftRightAlt className="shift" onClick={()=>show? setShow(false):setShow(true)}/>
               <BsPlusSquare className="create" onClick={()=>props.setModal(true)}/>
                <BsWindowFullscreen  className="window-size" onClick={()=>props.setPass(false)}/>
                <BsWindowSidebar className="window-size" onClick={()=>props.setPass(true)}/>
            </div>
            <div ref={scrolRef} className="sendmessage-input">
                {valid?(<><p style={{fontSize:"small", color:"grey", textAlign:"center", margin:"5px"}}>Welcome to "{room.value}"</p>
                <SendMessage pass={scrolRef}/>
                </>):<h1 style={{textAlign:"center", marginTop:"100px", color:"darkred"}}><MdOutlineNoEncryptionGmailerrorred/> Enter a valid Room Name</h1>}

            </div>
        </div>
    )
}
export  default Chat;