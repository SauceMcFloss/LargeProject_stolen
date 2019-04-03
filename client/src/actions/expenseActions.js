import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// List all expenses for logged in user
export const loggedList = userData => => {
	console.log("Displaying all expenses for logged in user.");
	axios
		.post("/expenses/loggedListAll", userData)
		.then(res => {
			