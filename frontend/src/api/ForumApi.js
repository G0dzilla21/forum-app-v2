import axios from "axios";

// const forumURI = process.env.REACT_APP_BACKEND_URI
const forumURI = "http://localhost:5000";

export const ForumApi = {
  createDiscussion: async (categoryId, data) => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve the token from local storage
      console.log("Token:", token);

      const response = await axios.post(
        forumURI + `/api/discussion/category/${categoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the token
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
      throw error;
    }
  },

  editDiscussion: async (discussionId, data) => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve the token from local storage

      const response = await axios.put(
        forumURI + `/api/discussion/${discussionId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the token
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error editing discussion:", error);
      throw error;
    }
  },
  deleteDiscussion: async (discussionId) => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve the token from local storage

      const response = await axios.delete(
        forumURI + `/api/discussion/${discussionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the token
          },
        }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error deleting discussion:", error);
      throw error;
    }
  },

  getCategories: async (setCategories, setIsLoading) => {
    try {
      const response = await axios.get(forumURI + "/api/category");

      if (response) {
        setCategories(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    } catch (error) {
      console.error("Error in getting categories: ", error);
    }
  },

  getDiscussionByCategory: async (categoryId, setDiscussions) => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);
      const response = await axios.get(
        forumURI + "/api/discussion/category/" + categoryId,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the token
          },
        }
      );

      if (response) {
        setDiscussions(response.data);
      }
    } catch (error) {
      console.error("Error in getting discussions: ", error);
    }
  },

  getReplyByDiscussion: async (discussionId, setReplies) => {
    try {
      const response = await axios.get(
        forumURI + "/api/reply/discussion/" + discussionId
      );

      if (response) {
        console.log(response);
        setReplies(response.data);
      }
    } catch (error) {
      console.error("Error in getting replies: ", error);
    }
  },

  createReply: async (userId, discussionId, content, handleIsSent) => {
    try {
      const requestBody = {
        author: userId,
        discussion: discussionId,
        content: content,
      };

      const response = await axios.post(forumURI + "/api/reply", requestBody);

      if (response) {
        handleIsSent();
        console.log(response);
      }
    } catch (error) {
      console.error("Error in creating replies: ", error);
    }
  },
  // Function to edit a reply
  editReply: async (replyId, content) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        forumURI + `/api/reply/${replyId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log(response);
        return response.data;
      }
    } catch (error) {
      console.error("Error editing reply:", error);
      throw error;
    }
  },

  // Function to delete a reply
  deleteReply: async (replyId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(forumURI + `/api/reply/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        console.log(response);
        return response.data;
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      throw error;
    }
  },
};
