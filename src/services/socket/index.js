/* eslint-disable import/no-anonymous-default-export */
import { io } from "socket.io-client";
const { API_DOMAIN } = require("config");

const socket = io(API_DOMAIN, { autoConnect: false, reconnectionDelayMax: 10000 });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    console.log('Error from socket')
  }
});


export default socket;

// const manager = new Manager(API_DOMAIN, {
//   reconnectionDelayMax: 10000,
//   // autoConnect: false,
//   extraHeaders: {
//     Authorization: localStorage.getItem("authToken"),
//   },
// })


// manager.open((err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Successfull connection')
//   }
// });

// const socket = manager.socket('/')


// export default manager
