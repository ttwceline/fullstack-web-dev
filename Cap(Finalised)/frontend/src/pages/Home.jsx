// pages/Home.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom" // <-- Added import

export default function Home() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const navigate = useNavigate() // <-- Initialized useNavigate

   const textbox = {
      padding: 5,
      margin: 5,
      placeItems: "center"
   }

   const login = async (e) => {
      e.preventDefault()
      console.log(`Email: ${email}`)
      const response = await fetch("http://localhost:3000/auth/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email: email,
            password: password
         })
      })

      if (response.ok) { // Check for successful 200-299 status
          const result = await response.json()
          localStorage.setItem("jwt", result.token)
          navigate("/tasks") // <-- Changed to useNavigate for smooth redirect
      } else {
          // Handle login errors (e.g., show "Invalid Credentials" error to user)
          console.error("Login failed:", await response.json());
      }
   }
   return (
      // ... rest of the component is the same
      <div>
         <h1>Welcome to the Task Manager App</h1>
         <p>Please login to use the Task Manager</p>
         <form onSubmit={login}> {/* Changed onClick to onSubmit on the form for better handling */}
            <input type="email" id="emailInput" onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={textbox} />
            <br />
            <input type="password" id="passwordInput" onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={textbox} />
            <br />
            <input type="submit" id="loginBtn"/>
         </form>
      </div>
   )
}