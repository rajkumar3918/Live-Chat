import React from "react";

import Users from "./users";

const Sidebar = (props)=>{
    return(
        <div className={props.pass? "sidebar-container"+" "+"sidebar-none": "sidebar-container" }>
            
            <Users/>
        </div>
    )
}
export  default Sidebar;
