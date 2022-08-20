import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);


	return (
		<div >
			<h1>Welcome to the private link</h1>
			<p>Please don't <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">click here</a> ... also you will be out of this website if you do so...</p>
			 		

		
		</div>
	);
};
