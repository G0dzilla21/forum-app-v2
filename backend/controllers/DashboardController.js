const Discussion = require("../models/Discussion");
const Reply = require("../models/Reply");
const User = require("../models/User");
const DiscussionController = require("../controllers/DiscussionController");
const UserController = require("../controllers/UserController");
const ReplyController = require("../controllers/ReplyController");

const getTopContributors = async () => {
    // Aggregate discussions
    const discussionContributors = await Discussion.aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } }
    ]);

    // Aggregate replies
    const replyContributors = await Reply.aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } }
    ]);

    // Combine and sum the counts
    const combined = [...discussionContributors, ...replyContributors];
    const contributors = combined.reduce((acc, curr) => {
        if (acc[curr._id]) {
            acc[curr._id] += curr.count;
        } else {
            acc[curr._id] = curr.count;
        }
        return acc;
    }, {});

    // Sort and get top 3
    const topContributors = Object.entries(contributors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => ({ userId: entry[0], contributions: entry[1] }));

    return topContributors;
};

const DashboardController = {
    getOverview: async (req, res) => {
        try {
            const recentDiscussions = await DiscussionController.getRecentDiscussions();
            const recentUsers = await UserController.getRecentUsers();
            const popularTopics = await ReplyController.getPopularTopics();
    
            // Get top contributors using the previously defined function
            let topContributors = await getTopContributors();
    
            // Filter out invalid userIds
            topContributors = topContributors.filter(contributor => contributor.userId !== "null" && contributor.userId);
    
            // Convert the aggregated results into a format suitable for Mongoose's populate method
            const topContributorsWithIds = topContributors.map(contributor => ({ _id: contributor.userId }));
    
            // Populate the usernames
            await User.populate(topContributorsWithIds, { path: '_id', select: 'username' });
    
            // Replace the userIds with usernames
            topContributors = topContributorsWithIds.map((contributor, index) => ({
                username: contributor._id.username,
                contributions: topContributors[index].contributions
            }));
    
            res.status(200).json({
                recentDiscussions,
                recentUsers,
                popularTopics,
                topContributors
            });
        } catch (error) {
            console.error("Error fetching dashboard overview:", error);
            res.status(500).json({ error: "Error fetching dashboard overview"});
        }
    }
};

module.exports = DashboardController;