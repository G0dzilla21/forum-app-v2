const express = require('express');
const CategoryController = require("../controllers/CategoryController");
const DiscussionController = require("../controllers/DiscussionController");
const ReplyController = require("../controllers/ReplyController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/category', CategoryController.getCategories);
// router.get('/category/:id', CategoryController.getCategoryById);
router.post('/category', CategoryController.createCategory);
router.put('/category/:id', CategoryController.updateCategoryById);
router.delete('/category/:id', CategoryController.deleteCategoryById);

router.get('/discussion', DiscussionController.getDiscussions);
router.get('/discussion/category/:categoryId', DiscussionController.getDiscussionsByCategory);
router.post('/discussion/category/:categoryId', authMiddleware.verifyToken, DiscussionController.createDiscussion);
router.get('/discussion/:id', DiscussionController.getDiscussionById);
router.post('/discussion', DiscussionController.createDiscussion);
router.put('/discussion/:id', DiscussionController.updateDiscussionById);
router.delete('/discussion/:id', DiscussionController.deleteDiscussionById);

router.get('/reply', ReplyController.getReplies);
router.get('/reply/:id', ReplyController.getReplyById);
router.get('/reply/discussion/:discussionId', ReplyController.getRepliesByDiscussion)
router.post('/reply', ReplyController.createReply);
router.put('/reply/:id', ReplyController.updateReplyById);
router.delete('/reply/:id', ReplyController.deleteReplyById);

module.exports = router;