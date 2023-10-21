const Reply = require('../models/Reply');
const mongoose = require('mongoose');
const Discussion = require("../models/Discussion.js");

const ReplyController = {
  
// Get all reply
  getReplies: async (req, res) => {
    try {
      const replies = await Reply.find(); 
      if (replies && replies.length > 0) {
        res.status(200).json(replies);
      } else {
        res.status(404).json({ message: 'No replies found' });
      }
    } catch (error) {
      console.error('Error in getting replies:', error);
      res.status(500).json({ error: 'Error in getting replies' });
    }
  },

  getRepliesByDiscussion: async (req, res) => {
    try {
      const discussionId = req.params.discussionId; // Access discussionId from params

      // Create a new ObjectId instance from discussionId
      const discussionIdObjectId = mongoose.Types.ObjectId.createFromHexString(discussionId);

      // Find all replies that belong to the specified discussion
      const replies = await Reply.find({ discussion: discussionIdObjectId });

      if (replies && replies.length > 0) {
        res.status(200).json(replies);
      } else {
        res.status(404).json({ message: 'No replies found for this discussion' });
      }
    } catch (error) {
      console.error('Error in getting replies by discussion:', error);
      res.status(500).json({ error: 'Error in getting replies by discussion' });
    }
  },


  // Get a reply by ID
  getReplyById: async (req, res) => {
    try {
      const replyId = req.params.id;
      console.log(replyId)
      const reply = await Reply.findById(replyId);
      console.log(reply)
      if (reply) {
        res.status(200).json(reply);
      } else {
        res.status(404).json({ message: 'Reply not found' });
      }
    } catch (error) {
      console.error('Error in getting reply by ID:', error);
      res.status(500).json({ error: 'Error in getting reply' });
    }
  },

  // Create a new reply
  createReply: async (req, res) => {
    try {
      const { content, author, discussion } = req.body;
      const reply = new Reply({ content, author, discussion });
      await reply.save();
      res.status(201).json({ message: 'Reply created!', reply });
    } catch (error) {
      console.error('Error in creating reply:', error);
      res.status(500).json({ error: 'Error in creating reply' });
    }
  },

  // Update a reply by ID
  updateReplyById: async (req, res) => {
    try {
      const { content } = req.body;
      const reply = await Reply.findByIdAndUpdate(req.params.id, { content }, { new: true });
      if (reply) {
        res.status(200).json({ message: 'Reply updated!', reply });
      } else {
        res.status(404).json({ message: 'Reply not found' });
      }
    } catch (error) {
      console.error('Error in updating reply by ID:', error);
      res.status(500).json({ error: 'Error in updating reply' });
    }
  },

  // Delete a reply by ID
  deleteReplyById: async (req, res) => {
    try {
      const reply = await Reply.findByIdAndRemove(req.params.id);
      if (reply) {
        res.status(200).json({ message: 'Reply deleted!', reply });
      } else {
        res.status(404).json({ message: 'Reply not found' });
      }
    } catch (error) {
      console.error('Error in deleting reply by ID:', error);
      res.status(500).json({ error: 'Error in deleting reply' });
    }
  },
  getPopularTopics: async () => {
    const aggregated = await Reply.aggregate([
      { $group: { _id: "$discussion", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const discussionIds = aggregated.map(a => a._id);
    const discussions = await Discussion.find({ '_id': { $in: discussionIds } });
    
    return discussions.map(d => d.title);
  }
};

module.exports = ReplyController;
