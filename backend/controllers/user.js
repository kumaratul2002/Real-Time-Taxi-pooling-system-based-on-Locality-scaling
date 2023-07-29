import userModel from "../models/user.js";

class userController {
  static getAllUsers = async (req, res) => {
    try {
      const allUsers = await userModel.find({});
      if (allUsers) {
        return res.status(200).json(allUsers);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static createUser = async (req, res) => {
    const { name, time,phone, place } = req.body;
   
    try {
      if (name && time && phone && place) {
        const newUser = userModel({
          name,
          time,
          phone,
          place,
        });
        console.log("try if")

        const saved_user = await newUser.save();
        if (saved_user) {
          console.log("try if if")
          return res.status(201).json(saved_user);
        } else {
          console.log("try if else")
          return res.status(400).json({ message: "something wrong" });
        }
      } else {
        console.log("try else")
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (error) {
      console.log("error")
      return res.status(400).json(error);
    }
  };

  static getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getSingleData = await userModel.findById(id);
        return res.status(200).json(getSingleData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getUpdatedData = await userModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json(getUpdatedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getDeletedData = await userModel.findByIdAndDelete(id);
        return res.status(200).json(getDeletedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}

export default userController;
