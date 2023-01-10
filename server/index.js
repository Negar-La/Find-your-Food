const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

const {addPost, getPosts} = require("./handlers")

const port = 8000;

express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .post("/api/post-add", addPost)
    .get("/api/getPosts", getPosts)

    .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    });