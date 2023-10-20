const Discussion = require("../models/Discussion");
const mongoose = require("mongoose");

const DiscussionController = {
  // Get all discussions
  getDiscussions: async (req, res) => {
    try {
      const discussions = await Discussion.find();
      if (discussions && discussions.length > 0) {
        res.status(200).json(discussions);
      } else {
        res.status(404).json({ message: "No discussions found" });
      }
    } catch (error) {
      console.error("Error in getting discussions:", error);
      res.status(500).json({ error: "Error in getting discussions" });
    }
  },

  // Get a discussion by ID
  getDiscussionById: async (req, res) => {
    try {
      const discussionId = req.params.id; // Capture the discussion ID from the request params
      const discussion = await Discussion.findById(discussionId);
      if (discussion) {
        res.status(200).json(discussion);
      } else {
        res.status(404).json({ message: "Discussion not found" });
      }
    } catch (error) {
      console.error("Error in getting discussion by ID:", error);
      res.status(500).json({ error: "Error in getting discussion" });
    }
  },

  // Get discussions by category
  getDiscussionsByCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId; // Correctly access categoryId from params

      // Create a new ObjectId instance from categoryId
      const categoryIdObjectId =
        mongoose.Types.ObjectId.createFromHexString(categoryId);

      const discussions = await Discussion.find({
        category: categoryIdObjectId,
      }).populate({
        path: "author",
        select: "username",
      });
      // Use the ObjectId for querying

      if (discussions && discussions.length > 0) {
        res.status(200).json(discussions);
      } else {
        res
          .status(404)
          .json({ message: "No discussions found for this category" });
      }
    } catch (error) {
      console.error("Error in getting discussions by category:", error);
      res
        .status(500)
        .json({ error: "Error in getting discussions by category" });
    }
  },

  createDiscussion: async (req, res) => {
    try {
      // Extract necessary data from the request
      const { title, content } = req.body;

      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Get the user ID from the authenticated user
      const author = req.user.userId;
      console.log("Request: ", req);
      console.log("This is the Author", author);
      // Get the category ID from the request parameters
      const category = req.params.categoryId;

      // Create a new discussion instance
      const discussion = new Discussion({ title, content, author, category });

      // Save the discussion to the database
      await discussion.save();

      // Return the created discussion in the response
      res.status(201).json({ message: "Discussion created!", discussion });
    } catch (error) {
      // Handle errors
      console.error("Error in creating discussion:", error);
      res.status(500).json({ error: "Error in creating discussion" });
    }
  },

  updateDiscussionById: async (req, res) => {
    try {
      const { title, content } = req.body;
      const discussion = await Discussion.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
      if (discussion) {
        res.status(200).json({ message: "Discussion updated!", discussion });
      } else {
        res.status(404).json({ message: "Discussion not found" });
      }
    } catch (error) {
      console.error("Error in updating discussion by ID:", error);
      res.status(500).json({ error: "Error in updating discussion" });
    }
  },

  // Delete a discussion by ID
  deleteDiscussionById: async (req, res) => {
    try {
      const discussion = await Discussion.findByIdAndRemove(req.params.id);
      if (discussion) {
        res.status(200).json({ message: "Discussion deleted!", discussion });
      } else {
        res.status(404).json({ message: "Discussion not found" });
      }
    } catch (error) {
      console.error("Error in deleting discussion by ID:", error);
      res.status(500).json({ error: "Error in deleting discussion" });
    }
  },
  getRecentDiscussions: async () => {
    try{
    return await Discussion.find().sort({ createdAt: -1 }).limit(10);
    } catch (error){
      console.error("Couldn't get recent posts:", error);
    }
  }
};

module.exports = DiscussionController;
