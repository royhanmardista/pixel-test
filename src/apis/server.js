import axios from "axios";

const server = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default server;
