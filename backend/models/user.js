import mongoose from "mongoose";

const userShema = mongoose.Schema({
  name: {
    type: String,
  },
  time:{
    type:Date,
  },
  phone: {
    type: Number,
  },
  place: {
    type: String,
  },
});

const userModel = mongoose.model("users", userShema);
export default userModel;
