import { ObjectId } from "mongodb";
import { connectionTransaction } from "../server.js";

export const transactionModel = {
  insertOne: async (obj) => {
    try {
      const result = await connectionTransaction.insertOne({
        date: obj.date,
        email: obj.email,
        description: obj.description,
        value: obj.value,
        type: obj.type,
      });
      return { status: true, result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },
  getAllTransaction: async (email) => {
    try {
      const transactions = await connectionTransaction
        .find({ email })
        .toArray();
      return transactions;
    } catch (err) {
      console.log(err);
    }
  },
  deleteOne: async (id) => {
    try {
      const result = await connectionTransaction.deleteOne({
        _id: new ObjectId(id),
      });
      return { status: true, result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },
  findOne: async (id) => {
    try {
      const result = await connectionTransaction.findOne({
        _id: new ObjectId(id),
      });
      return { status: true, result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },
  updateOne: async (id, updateDocument) => {
    try {
      const result = await connectionTransaction.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateDocument }
      );
      return { status: true, result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },
};
