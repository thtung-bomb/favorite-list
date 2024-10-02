import axios from "axios";

export const api = axios.create({
	baseURL: 'https://66f2725f71c84d8058754764.mockapi.io/api/v1/'
});
