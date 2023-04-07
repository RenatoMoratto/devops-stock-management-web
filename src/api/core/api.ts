import axios from "axios";

export const api = axios.create({
	baseURL: "https://642f63dfb289b1dec4b21ce5.mockapi.io",
	headers: {
		"Content-type": "application/json",
	},
});
