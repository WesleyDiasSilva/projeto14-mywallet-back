import { connectionUser } from "../server.js";

export const userModel = {
  insertOne: async (obj) => {
    try {
      const result = await connectionUser.insertOne({ obj });
      return { result };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  },
};
