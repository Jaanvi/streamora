import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleRegister = async (e)=>{
e.preventDefault()

try{

await API.post("/auth/register",{
username: name,
email,
password
})

alert("Account Created Successfully")

navigate("/login")

}catch(error){

alert("Registration Failed")

}

}

return(

<div className="h-screen flex items-center justify-center bg-black">

<div className="bg-black bg-opacity-80 p-10 rounded w-[380px]">

<h1 className="text-white text-3xl font-bold mb-6">
Sign Up
</h1>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Name"
className="w-full p-3 mb-4 bg-gray-800 text-white"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
className="w-full p-3 mb-4 bg-gray-800 text-white"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-6 mb-4 bg-gray-800 text-white"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="w-full bg-red-600 py-3 rounded hover:bg-red-700">
Sign Up
</button>

</form>

<p className="text-gray-400 mt-5 text-sm">

Already have an account?{" "}

<Link to="/login" className="text-white hover:underline">
Sign In
</Link>

</p>

</div>

</div>

)

}

export default Register