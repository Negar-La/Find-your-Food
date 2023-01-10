"use strict";
const { MongoClient} = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addPost = async (req, res) =>{
    const client = new MongoClient(MONGO_URI, options);
   
    console.log( req.body)  
    const post = {
        ...req.body, 
        id: uuidv4()
    }
   
  try{
      await client.connect();
      const db = client.db("find_your_food");
  
      await db.collection("posts").insertOne(post)
    
      res.status(200).json({ status: 200, message: "post successfully added", data: post});
    } catch (err){
      res.status(400).json({status: 400, message: "post not added"});
      console.log(err.stack);
    } finally {
      client.close();
    }
  }

  const getPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
    const db = client.db("find_your_food");
  
    const posts = await db.collection("posts").find().toArray();
   
    console.log(posts) 
  
    res.status(200).json({status:204, data : posts, message:"Successful requested posts"})
    } catch(err){
        res.status(400).json({status:404, message:"No post found"})
        console.log(err.stack);
    }
    finally {
        client.close();
    }
  };







module.exports = { addPost, getPosts};