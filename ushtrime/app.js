
//eventet ne nodejs, ushtrime
const EventEmitter = require('events');
const event = new EventEmitter();

event.on("sayHello", ()=> {
    console.log("Hello")
})

event.on("withParams", (message)=> {
    console.log("Loging with params", message)

})

event.once("eventOnce",()=>{
    console.log("Run once");
})


event.emit("sayHello");
event.emit("withParams", "test");
event.emit("eventOnce");