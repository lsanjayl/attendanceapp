import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Server/Fireconfig";
import Navbar from "../Navbar/Navbar";
const Login = () => {
    const login=async(email, password)=> await signInWithEmailAndPassword(auth, email, password)     .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email)
    })
        const [email,setEmail]= useState("");
        const [password,setPass]=useState("");
    return (
        <div>
        <Navbar/>
        <div className="flex flex-col justify-center items-center my-20">
            <img width="250px" src="https://www.shamsaalam.com/wp-content/uploads/2019/10/Sri-Sairam-college.png" />
            <br />
            <input type="text" placeholder="Login ID" className="input input-bordered input-primary w-full max-w-xs" onChange={(e)=>setEmail(e.target.value)} value={email}  />
            <input type="text" placeholder="Password" className="input input-bordered input-primary w-full max-w-xs m-3" onChange={(e)=>setPass(e.target.value)} value={password}/>
            <button className="btn btn-primary w-10/12" onClick={()=>login(email,password)}>Login</button>
            <a href="/register" className="btn btn-ghost">Register new user ?</a>
        </div>
        </div>
    )
}
export default Login;
// 
// 
// 