import { collection, doc, getDocs, query} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Navbar from "./navbar";
import UserCard from "./userCard";

const Users = ()=>{
    const usersRef = query(collection(db, "users")) ;
    const [usersList, setUsersList] = useState([]);
    
  
    useEffect(()=>{
       const getUsersList = async ()=>{
        try{
            const docSnap =  await getDocs(usersRef);
            const data = docSnap.docs.map((doc)=>({
                ...doc.data(), id: doc.id
            })) 
            // console.log(docSnap)
            setUsersList(data);
        }catch(error){
            console.log(error)
        }
       };
       getUsersList()
    },[])

    return(
        <div className="user-container">
             <Navbar/>
             <p style={{color:"rgb(35, 35, 35)", borderBottom:"1px solid black", fontSize:"small", paddingLeft:"10px"}}>Participants</p>

             <div className="usersList">
         {usersList.map((user)=>{
            return(

                <div >
                    <UserCard key={user.id} user={user}/>
                </div>
            )
         })}
         </div>
        </div>
    )
}
export  default Users;