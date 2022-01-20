const { API_DOMAIN } = require("config");
const { Manager } = require("socket.io-client");

const manager = new Manager(API_DOMAIN, {
  reconnectionDelayMax: 10000,
  extraHeaders: {
    Authorization: localStorage.getItem("authToken"),
  },
})

const socket = manager.socket("/chat", {
  auth: {
    token: "123"
  }
});


export default socket

