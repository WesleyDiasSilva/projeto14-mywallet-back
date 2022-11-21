import { ObjectId } from "mongodb";
import { connectionUser } from "../server.js";

export const userModel = {
  insertOne: async (obj) => {
    try {
      const result = await connectionUser.insertOne(obj);

      return { result };
    } catch (err) {
      return { status: false, erro: err };
    }
  },

  findOneToken: async ({ token }) => {
    try {
      const result = await connectionUser.findOne({ token: token });
      return result;
    } catch (err) {
      return { status: false, objeto: obj };
    }
  },

  findOneEmail: async (obj) => {
    try {
      const result = await connectionUser.findOne({ email: obj.email });
      return result;
    } catch (err) {
      return { status: false, objeto: obj, erro: err };
    }
  },

  updateOne: async (userId, updateDocument) => {
    try {
      const result = await connectionUser.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateDocument }
      );
      return result;
    } catch (err) {}
  },
};
