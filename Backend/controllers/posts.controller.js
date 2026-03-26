import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";

export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "running" });
};

export const createPost = async (req,res) => {
  const {token} =req.body;
   
  try {
  const user = await User.findOne({token:token});
  if(!user) {
    return res.status(404).json({message:"user not found"});
  }

   const post = new post ({
    userId :user_id,
    body :req.body.body,
    media :req.file != undefined ? req.file.filename :"",
    fileType : req.file != undefined ? req.file.mimetype.split("/")[1]: ""
   })

   await post.save();
   return res.satatus(200).json({message : "post Created!"}); 
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
} 