"use strict";
const { MongoClient} = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const {getLocFromPlCode} = require("./GeoCoder")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addPost = async (req, res) =>{
    const client = new MongoClient(MONGO_URI, options);
    const {lat, lng}= await getLocFromPlCode(req.body.postalCode)
   
    console.log( req.body)  
    const post = {
        ...req.body, 
        lat: lat,
        lng: lng,
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

  const getSinglePost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const id = req.params.id;
  
    try{
        await client.connect();
        const db = client.db("find_your_food");
        
        let singlePost = await db.collection("posts").findOne({id: id});
      
        if (singlePost) {
          return res.status(200).json({status:200, data : singlePost, message:"The requested post data"})
        } else {
          return res.status(404).json({status:404, message:"No post was found based on this id"})
        }
    } catch(err){
        console.log(err.stack);
    }
    finally {
        client.close();
    }
  };


  const addFavorite = async(req, res) =>{
    const client = new MongoClient(MONGO_URI, options);
    console.log(req.body) 
  try{
      await client.connect();
  
      const db = client.db("find_your_food");
      if (req.body) {
        const findPost = await db.collection("favorites").findOne({"id": req.body.id, "userPicture": req.body.userPicture})
        console.log(findPost)
       if (findPost) {
         res.status(200).json({status:200, data:req.body, message:"This post is already in your favorite list"})
       } else {
        const userFavorite = await db.collection("favorites").insertOne(req.body)
    
        res.status(200).json({ status: 200, message: "post successfully added to favorite list", data: req.body});
       }
   
      }
    
    } catch (err){
      res.status(400).json({status: 400, message: "Post was not added to favorite list"});
      console.log(err.stack);
    } finally {
      client.close();
    }
  }


  const getFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
  try{
      await client.connect();
  
      const db = client.db("find_your_food");
  
      const allFavorites = await db.collection("favorites").find().toArray()
  
      res.status(200).json({ status: 200, message: "All favorite Posts", data: allFavorites});
    } catch (err){
      res.status(400).json({status: 400, message: "post not added"});
      console.log(err.stack);
    } finally {
      client.close();
    }
  }

  const deleteFavorite = async(req, res) =>{
    const client = new MongoClient(MONGO_URI, options);
    
    console.log(req.body) 
   
  try{
      await client.connect();
  
      const db = client.db("find_your_food");
    //in mongodb we use "" to access the keys in database, so we check db to pick "id" and based on   console.log(req.body) in terminal, we have  req.body.item.id
      const deleteOne = await db.collection("favorites").deleteOne({"id": req.body.post.id})
      console.log(deleteOne.deletedCount)
      res.status(200).json({ status: 200, message: "post successfully deleted from favorite list", data: deleteOne });
    } catch (err){
      res.status(400).json({status: 400, message: "post was not deleted"});
      console.log(err.stack);
    } finally {
      client.close();
    }
  }


module.exports = { addPost, getPosts, getSinglePost, addFavorite, getFavorites, deleteFavorite};