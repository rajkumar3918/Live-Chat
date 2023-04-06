import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { createRoom, enterRoomName } from "./redux/slice/roomSlice";
import "../styles/createModal.scss";

const CreateModal =  (props)=>{
    const roomsRef = collection(db, "rooms");
    const room = useSelector(state=>state.RoomName.rooms)
    const nameRef = useRef();
    const dispatch = useDispatch();
    const [valid, setValid] = useState(true);
    const [create, setCreate] = useState(false); 

    
    
    
    
    useEffect(()=>{
        const queryRooms = query(roomsRef);
        const unsuscribe = onSnapshot(queryRooms, (snapShot)=>{
            snapShot.forEach((doc)=>{
                dispatch(createRoom({...doc.data(), id: doc.id}))
            });
        })
        return ()=> unsuscribe();
    },[])
    
    
    
    const createHandler = (e)=>{
        e.preventDefault();
        setValid(false);
        const currentRoomName = nameRef.current.value.trim();
        for(let i = 0; i<room.length; i++){
            if(room[i].roomName === currentRoomName){
              return (setCreate(true));
            }
        }
        if(create === false){
            return (addToDb(currentRoomName));
            }
        
        setCreate(false)
           
    };

    const addToDb = async(currentRoomName)=>{
        setValid(true);
        await addDoc(roomsRef,{
            admin: auth.currentUser.displayName,
            roomName: currentRoomName,
        });
        dispatch(enterRoomName(currentRoomName));
        setCreate(false);
        nameRef.current.value = "";
        props.setModal1(false);
    }

    return(
        <div className="create-modal">
            <h3>Create New Room</h3>
            <p>Enter a name and click create button to create a new room, Note that you cannot change the room name. </p>
            <form action="">
                <input type="text" ref={nameRef} required minLength={4} />
                <p className="valid">{valid? "":"Room name Already exist"}</p>
                <div className="button-cont">
                <button className="cancle" onClick={()=>props.setModal1(false)}>Cancle</button>
                <button type="submit" onClick={createHandler}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateModal;