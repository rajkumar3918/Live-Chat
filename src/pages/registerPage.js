import React, {  useRef, useState } from "react";
import {FcAddImage} from "react-icons/fc";
// import Add from "";
import "../styles/register.scss";
import { auth, storage,db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  {setDoc} from "firebase/firestore";
import  {doc} from "firebase/firestore";

import {useNavigate, Link} from "react-router-dom"
import Loading from "../components/loading";


const Register = ()=>{
    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleSubmit = async (e)=>{

        setLoading(true);
        e.preventDefault();
    const displayName = formRef.current.username.value;
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    const file = formRef.current.file.files[0]; 

    try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (error) {
              console.log(error);
              setError(true);
              setLoading(false);
            }
          });
        });
      } catch (error) {
        setError(true);
        setLoading(false);
      }


    }
    return(
        <div className="form-container">
            <div className="form-wrapper">
          <div className={loading? "loading-container": "loading-none"}>
          <Loading/>
          </div>
                <h3>Register</h3>
                <form ref={formRef}>
                <input type="text" name="username" placeholder="user name" required/>
                <input type="email" name="email" placeholder="email" required/>
                <input type="password" name="password" placeholder="password" required/>
                <input required style={{ opacity: "0",height:0 }} name="file" type="file" id="file" />
          <label htmlFor="file">
            {/* <img src={Add} alt="" /> */}
            <p style={{color:"rgb(4, 139, 249)", fontWeight:500}}><FcAddImage style={{fontSize:"25px"}}/>Add an avatar</p>
          </label>
          <button disabled={loading} onClick={handleSubmit}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
                </form>
                <p>You do have an account? 
                <Link to="/">Login</Link>
                </p>

            </div>

        </div>
    )
}

export default Register;