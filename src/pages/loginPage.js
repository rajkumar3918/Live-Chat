import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { enterRoomName } from "../components/redux/slice/roomSlice";

const Login = () => {
  const Room = useSelector(state=>state.RoomName);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    const room = formRef.current.room.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setErr(true);
      setLoading(false);
    }

    for(var i = 0; i<Room.rooms.length; i++){
      if(Room.rooms[i].roomName == room){
      dispatch(enterRoomName(room));
      }
  }

  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
      <div className={loading? "loading-container": "loading-none"}>
          <Loading/>
          </div>
        {/* <span className="logo">Lama Chat</span> */}
        <h3 className="title">Login</h3>
        <form ref={formRef}>
          <input type="email" name="email" placeholder="email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input name="room" placeholder="Enter Room Name" minLength={4} required type="text"/>
          <button onClick={handleSubmit}>Sign in</button>
          {err && <span style={{color:"red"}}>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;