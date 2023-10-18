import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Discussion.css";
import { ForumApi } from "../api/ForumApi";
import jwtDecode from "jwt-decode";
import DiscussionForm from "./DiscussionForm";
import "../css/Discussion.css";

export const Discussion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const category = queryParams.get("name");
  const [discussions, setDiscussions] = useState([]);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const isLoggedIn = sessionStorage.length > 0; // Check if the user is logged in
  const [sentDiscussion, setSentDiscussion] = useState(false);
  const userToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(userToken);
  const userId = decodedToken.userId;

  const handleClick = (discussionId) => {
    navigate(`/forum/category/discussion?id=${discussionId}`);
  };

  const handleEdit = (discussion) => {
    setEditingDiscussion(discussion);
  };
  const handleDelete = async (discussionId) => {
    try {
      await ForumApi.deleteDiscussion(discussionId);

      // After successfully deleting the discussion, remove it from the state
      setDiscussions((prevDiscussions) =>
        prevDiscussions.filter((discussion) => discussion._id !== discussionId)
      );
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    // Logic to submit the form data to the API (create or edit)
    try {
      if (editingDiscussion) {
        // Edit existing discussion
        await ForumApi.editDiscussion(editingDiscussion._id, data);
      } else {
        // Create a new discussion
        await ForumApi.createDiscussion(id, data);
      }

      // After submitting, reset the form and set a flag to trigger a re-fetch
      setEditingDiscussion(null);
      setSentDiscussion(true);
    } catch (error) {
      console.error("Error in submitting form:", error);
    }
  };

  useEffect(() => {
    // Fetch discussions when the component mounts or when a new discussion is created/edited
    ForumApi.getDiscussionByCategory(id, setDiscussions);

    // Check if a new discussion has been created/edited
    if (sentDiscussion) {
      // Reset the flag and trigger a re-fetch
      setSentDiscussion(false);
      ForumApi.getDiscussionByCategory(id, setDiscussions);
    }
  }, [id, sentDiscussion]);

  const isAuthor = (reply) => {
    const currentUser = sessionStorage.getItem("token")
      ? jwtDecode(sessionStorage.getItem("token"))
      : null;
    return currentUser && currentUser.userId === reply.author;
  };

  return (
    <div>
      <h1>Welcome to {category}</h1>

      {/* Display a link to create a new thread */}
      {isLoggedIn && (
        <button onClick={() => navigate(`/forum/new-thread?id=${id}`)}>
          Create New Thread
        </button>
      )}

      {/* Display the form for creating/editing */}
      {editingDiscussion && (
        <DiscussionForm
          onSubmit={handleFormSubmit}
          discussion={editingDiscussion}
        />
      )}

      <div className="discussion-table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discussions.map((discussion) => {
              console.log("This is userId: ", userId);
              console.log("This is author: ", discussion.author);
              console.log("This is discussion title: ", discussion.title);
              return (
                <tr key={discussion._id}>
                  <td onClick={() => handleClick(discussion._id)}>
                    {/* Wrap the title content in a clickable element */}
                    <div>
                      <p>{discussion.title}</p>
                      <p>Created by</p>
                    </div>
                  </td>
                  <td>{discussion.content}</td>
                  <td>{discussion.createdAt}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(discussion)}
                      disabled={discussion.author !== userId}
                      className={discussion.author !== userId ? "disabled" : ""}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(discussion._id)}
                      disabled={discussion.author !== userId}
                      className={
                        discussion.author !== userId
                          ? "disabled"
                          : "delete-post-button"
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
