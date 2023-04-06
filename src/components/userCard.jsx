import React from "react";
import { useState } from "react";

const UserCard = ({user})=>{
    const [imgDisplay, setImgDisplay] = useState(false);

    return(
        <div className="user-profile" >
            <img className="sidebar-img" onMouseOver={()=>setImgDisplay(true)} onMouseLeave={()=>setImgDisplay(false)}
             src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
                    <img className={imgDisplay? "displayImg": "imgNone"}  src={user.photoURL}/>
             
        </div>
    )
}

export default UserCard;