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
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  getAllTransaction: async () => {
    try {
      const transactions = await connectionTransaction.find({}).toArray();
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
      return result;
    } catch (err) {
      console.log(err);
    }
  },
};
