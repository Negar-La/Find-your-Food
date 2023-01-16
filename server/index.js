const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

const {addPost, getPosts, getSinglePost, addFavorite, getFavorites, deleteFavorite} = require("./handlers")

const port = 8000;

express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .post("/api/post-add", addPost)
    .get("/api/getPosts", getPosts)
    .get('/api/get-post/:id', getSinglePost)

    .post("/api/add-favorite", addFavorite)
    .get("/api/get-favorites", getFavorites)
    .delete("/api/delete-favorite", deleteFavorite)

    .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    });