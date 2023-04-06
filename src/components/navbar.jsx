import React, { useContext, useEffect, useRef, useState } from "react";
import {FiLogOut} from "react-icons/fi";
import {MdModeEdit} from "react-icons/md";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { runTransaction } from "firebase/firestore";


const Navbar = ()=>{
    const [show, setShow] = useState(false);
    const navbarRef = useRef();
    const fileRef = useRef();
    const navigate = useNavigate();

    const profileHandler = ()=>{
       if(show){
        setShow(false);
        navbarRef.current.style.height = "50px";
        navbarRef.current.style.transition = ".5s";
       }else{
           navbarRef.current.style.height = "300px";
           navbarRef.current.style.transition = ".3s";
           setShow(true);
       }
    }
    const logoutHandler = async ()=>{
        try{
            await signOut(auth);
        }catch(error){
            console.log(error)
        }
        navigate("/")

    }

//     useEffect(()=>{

//         const updateProfile = async()=>{
//             const file = fileRef.current.files[0];
//         const storageRef = ref(storage);
//         // const usersRef = ref()
//         await uploadBytesResumable(storageRef,file).then(()=>{
//             getDownloadURL(storageRef).then(async(downloadURL)=>{
//                 try{
//                     await updateProfile(auth.currentUser,{
//                         photoURL:downloadURL,
//                     });
//                     // await runTransaction(db, async (transaction)=>{

//                     // })
//                 }catch(error){
//                     console.log(error)
//                 }
                
//             })
//         })
//     }
// },[])

   
   
 

    return(
        <div ref={navbarRef} className="navbar">
            <div className="logo" onClick={profileHandler}>MY PROFILE</div>
            <div className={show? "user":"userNone"}>
                <div className="img"><img src={auth?.currentUser?.photoURL} alt="" /></div>
                <input ref={fileRef} required style={{display:"none"}} name="file" type="file" id="file" />
          <label   htmlFor="file">
            Edit<MdModeEdit/>
          </label>
                <p className="name">{auth?.currentUser?.displayName}</p>
                <p style={{fontSize:'medium'}}>{auth?.currentUser?.email}</p>
                
                < FiLogOut onClick={logoutHandler} className="logout"/>
            
            </div>
        </div>
    )
}

export default Navbar;