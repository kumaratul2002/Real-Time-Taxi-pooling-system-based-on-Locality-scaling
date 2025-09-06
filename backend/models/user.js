import mongoose from "mongoose";

const userShema = mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
    description: "Auth0 user ID (user.sub)"
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
