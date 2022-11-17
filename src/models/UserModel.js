import { ObjectId } from "mongodb";
import { connectionUser } from "../server.js";

export const userModel = {
  insertOne: async (obj) => {
    try {
      const result = await connectionUser.insertOne( obj );
      
      return { result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },

  findOne: async (obj) => {
    try{
      const result = await connectionUser.findOne(obj);
      return result;
    } catch(err){
      console.log(err);
      return { status: false };
    }
  },

  updateOne: async (userId, updateDocument) => {
    try{
      await connectionUser.updateOne({_id: new ObjectId(userId)}, {$set: updateDocument})
    }catch(err){
      console.log(err)
    } 
  }
};


