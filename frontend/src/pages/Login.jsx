import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/bacgroundimage.webp";

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async (e)=>{
e.preventDefault()

try{
const res = await API.post("/auth/login",{ email,password })

localStorage.setItem("token",res.data.token)
localStorage.setItem("user", JSON.stringify({
  _id: res.data._id,
  username: res.data.username,
  email: res.data.email,
  role: res.data.role || "user"
}))

navigate("/browse")
}catch(err){
const msg = err?.response?.data?.message || "Invalid credentials"
alert(msg)
}
}

return(

<div className="h-screen w-full bg-cover bg-center flex items-center justify-center"
style={{
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black bg-opacity-60"></div>

{/* Login Box */}
<div className="relative bg-black bg-opacity-80 p-10 rounded-md w-[380px]">

<h1 className="text-white text-3xl font-bold mb-6">
Sign In
</h1>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
className="w-full p-3 mb-4 rounded bg-gray-800 text-white focus:outline-none"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-3 mb-6 rounded bg-gray-800 text-white focus:outline-none"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition"
>
Sign In
</button>

</form>

<div className="text-gray-400 text-sm mt-6">

New to Streamora?{" "}

<Link to="/register" className="text-white hover:underline">
Sign up now
</Link>

</div>

</div>

</div>

)

}

export default Login