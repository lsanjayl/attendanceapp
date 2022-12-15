import {createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Server/Fireconfig";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom"
const Register = () => {
    const navigate = useNavigate();
    const login = async (email, password) => await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email);
      console.log("Registration complete")
      if(user.email){
        navigate("./")
    }
    })
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    return (
        <div className="samplecollection">
            <Navbar />
            <div className="flex flex-col justify-center items-center my-20">
            <img width="250px" src="https://offthegridit.com/wp-content/uploads/2019/05/e-commerce-512x500.png" />
                <h3 className="text-2xl my-5">Registration</h3>
                <br />
                <input type="text" placeholder="Email ID" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="text" placeholder="Password" className="input input-bordered input-primary w-full max-w-xs m-3" onChange={(e) => setPass(e.target.value)} value={password} />
                <button className="btn btn-primary w-10/12" onClick={() => login(email, password)}>Register</button>
                <a href="/login" className="btn btn-ghost">Already a registered user login!!</a>
            </div>
        </div>
    )
}
export default Register;