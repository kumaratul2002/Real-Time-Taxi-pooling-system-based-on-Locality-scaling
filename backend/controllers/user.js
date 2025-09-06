import userModel from "../models/user.js";

class userController {
  static getAllUsers = async (req, res) => {
    try {
      // First, clean up expired pools
      await userController.cleanupExpiredPools();
      
      // Get current time
      const currentTime = new Date();
      
      // Find all users with future departure times
      const allUsers = await userModel.find({
        time: { $gt: currentTime }
      });
      
      if (allUsers) {
        return res.status(200).json(allUsers);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  // Helper method to clean up expired pools
  static cleanupExpiredPools = async () => {
    try {
      const currentTime = new Date();
      const result = await userModel.deleteMany({
        time: { $lt: currentTime }
      });
      
      if (result.deletedCount > 0) {
        console.log(`Cleaned up ${result.deletedCount} expired pools`);
      }
      
      return result;
    } catch (error) {
      console.error('Error cleaning up expired pools:', error);
      throw error;
    }
  };

  static createUser = async (req, res) => {
    const { name, userId, time, phone, place } = req.body;
   
    try {
      if (name && userId && time && phone && place) {
        // Validate departure time is in the future
        const departureTime = new Date(time);
        const currentTime = new Date();
        
        if (departureTime <= currentTime) {
          return res.status(400).json({ 
            message: "Departure time must be in the future" 
          });
        }

        // Check if user already has a pool for this destination
        const existingPool = await userModel.findOne({ 
          userId, 
          place,
          time: { $gt: currentTime } // Only check future pools
        });
        
        if (existingPool) {
          return res.status(400).json({ 
            message: "You already have an active pool for this destination" 
          });
        }

        const newUser = userModel({
          name,
          userId,
          time: departureTime,
          phone,
          place,
        });
        console.log("Creating new pool for user:", userId, "departure:", departureTime)

        const saved_user = await newUser.save();
        if (saved_user) {
          console.log("Pool created successfully")
          return res.status(201).json(saved_user);
        } else {
          console.log("Failed to save pool")
          return res.status(400).json({ message: "Failed to create pool" });
        }
      } else {
        console.log("Missing required fields")
        return res.status(400).json({ message: "All fields are required including user authentication" });
      }
    } catch (error) {
      console.log("Error creating pool:", error)
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

  static manualCleanupExpired = async (req, res) => {
    try {
      const result = await userController.cleanupExpiredPools();
      return res.status(200).json({
        message: `Successfully cleaned up ${result.deletedCount} expired pools`,
        deletedCount: result.deletedCount
      });
    } catch (error) {
      console.error('Error in manual cleanup:', error);
      return res.status(500).json({
        message: "Failed to cleanup expired pools",
        error: error.message
      });
    }
  };
}

export default userController;
