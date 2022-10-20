 const io = require('socket.io')(8800, {
    cors : {
        origin:"http://localhost:3000"
    }
 })

 let activeUsers = []

 io.on("connection", (socket) => {
    // add new user 
    socket.on('new-user-add', (newUserId) => {
        //if user is not added previosly (test si l'utilisateur n'est pas dans le liste)
        if(!activeUsers.some((user) => user.userId === newUserId)){
            activeUsers.push({
                userId : newUserId,
                socketId: socket.id
            })
            console.log("New User connected", activeUsers);
        }
        //send data to client-side
        io.emit("get-users", activeUsers)
    });

    //send message
    socket.on("send-message", (data)=>{
        const {receverId} = data;
        const user = activeUsers.find(user => user.userId === receverId)
        console.log("sending from socket to: ", receverId)
        console.log("Data", data)
        if(user){
            io.to(user.socketId).emit("receive-message", data)
        }
    })


    socket.on("disconnect", ()=>{
        //remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User Disconnected", activeUsers)
        //send all active users to all users
        io.emit("get-users", activeUsers);
    })
 })