import React, { useState } from "react";
import Chat from "../components/chatBox";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import CreateModal from "../components/createModal";

import "../styles/homePage.scss";

const Home = ()=>{
    const [showSB, setShowSB] = useState(true)
    const [modal, setModal] = useState(false);
    return(
        <div className="home-container">
            <div className={modal?"C-modal":"C-none"}>
            <CreateModal setModal1={setModal} />
            </div>
           <div className="Home-components">
            <Sidebar pass={showSB}/>
           <Chat pass={showSB} setPass={setShowSB} setModal={setModal}/>
           
           </div>
        </div>
    )
}

export default Home;