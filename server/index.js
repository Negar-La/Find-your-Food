const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

const {getMsg, postMsg, deleteMsg, addPost, getPosts, getSinglePost, deletePost, updatePost, addFavorite, getFavorites, deleteFavorite} = require("./handlers")

const port = process.env.PORT || 8000;

// const bp = require('body-parser');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', 'https://find-your-food.onrender.com'],
        methods: ["GET", "POST"],
	},
});

express()

    app.use(express.json())
    app.use(helmet())
    app.use(morgan('tiny'))
    .use(express.urlencoded({ extended: false }))
    app.use(cors({ origin: ['http://localhost:3000', 'https://find-your-food.onrender.com']}))


    app.get("/api/getMessage/:id", getMsg)
    app.post("/api/postMessage", postMsg)
    app.delete("/api/deleteMessage", deleteMsg)

    app.post("/api/post-add", addPost)
    app.get("/api/getPosts", getPosts)
    app.get('/api/get-post/:id', getSinglePost)
    app.delete("/api/delete-post", deletePost)
    app.patch('/api/update-post/:id', updatePost)

    app.post("/api/add-favorite", addFavorite)
    app.get("/api/get-favorites", getFavorites)
    app.delete("/api/delete-favorite", deleteFavorite)

    
    io.on("connection", (socket)=>{
        console.log(`User Connected: ${socket.id}`);

        socket.on("join-room", (data)=>{
            socket.join(data);
            console.log(`user with id = ${socket.id} joined room: ${data}`);
        });

        socket.on("send-message", (data) => {
            console.log(data);
            socket.to(data.room).emit("receive-message", data);
        })

        socket.on("disconnect", ()=>{
            console.log("user disconnected", socket.id);
        })
    })

    server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    });