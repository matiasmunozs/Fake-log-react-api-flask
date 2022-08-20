import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function register() {
		fetch(
			process.env.BACKEND_URL +"/api/signup",
	
		  {
			mode: "no-cors",
			method: "POST",
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
			headers: {
			  "Content-Type": "application/json",
			},
		  }
		)
		  .then(response => response.json())
	
		  .then((data) => {
			console.log(data); //guardar datos en variable estado
			navigate('/login');
		  })
		  .catch((err) => console.log(err));
	  }


	return (

<form>
  <div className="form-group">

    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" 
	className="form-control w-50" 
	id="exampleInputEmail1" 
	aria-describedby="emailHelp" 
	placeholder="Enter email"
	//value={email}
	onChange={(e) => setEmail(e.target.value)}

	/>


    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" 
	className="form-control w-50" 
	id="exampleInputPassword1" 
	placeholder="Password"
	//value={password}
	onChange={(e) => setPassword(e.target.value)}
	/>
  </div>

  <button 
  type="submit" 
  className="btn btn-primary mt-1"
  onClick={register}
  >Submit</button>
</form>

	);
}
