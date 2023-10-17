// Import statements for React and other dependencies
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ForumApi } from '../api/ForumApi';
import { useLocation } from 'react-router-dom';
import "../css/Reply.css";

// Reply component
export const Reply = () => {
    // Extracting discussion ID from the URL query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const discussonId = queryParams.get('id');

    // State variables
    const [replies, setReplies] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [sentReply, setSentReply] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(null);
    const isLoggedIn = sessionStorage.length > 0;

    // Function to handle changes in the textarea
    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
    };

    // Function to toggle the sentReply state
    const handleIsSent = () => {
        setSentReply(!sentReply);
    };

    // Function to handle reply submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (textareaValue) {
            const content = textareaValue;
            const userToken = sessionStorage.getItem('token');
            const decodedToken = jwtDecode(userToken);
            const userId = decodedToken.userId;

            ForumApi.createReply(userId, discussonId, content, handleIsSent);

            // Reset the textarea value
            e.target.value = '';
            setTextareaValue('');
        } else {
            alert("Looks like you didn't type anything :(");
        }
    };

    // Function to check if the current user is the author of a reply
    const isAuthor = (reply) => {
        const currentUser = sessionStorage.getItem('token')
            ? jwtDecode(sessionStorage.getItem('token'))
            : null;
        return currentUser && currentUser.userId === reply.author;
    };

    // Function to set the reply to be edited
    const startEditing = (replyId, content) => {
        setEditingReplyId(replyId);
        setEditedContent(content);
    };

    // Function to save the edited content
    const saveEdit = async (replyId) => {
        await ForumApi.editReply(replyId, editedContent);
        setEditingReplyId(null);
        ForumApi.getReplyByDiscussion(discussonId, setReplies);
    };

    // Function to handle editing a reply
    const handleEdit = async (replyId) => {
        // Placeholder function for editing a reply
        // You may choose to handle this differently based on your requirements
        startEditing(replyId, replies.find(reply => reply._id === replyId).content);
    };

    // Function to handle deleting a reply
    const handleDelete = async (replyId) => {
        // Placeholder function for deleting a reply
        // You may choose to handle this differently based on your requirements
        const confirmDelete = window.confirm('Are you sure you want to delete this reply?');
        if (confirmDelete) {
            await ForumApi.deleteReply(replyId);
            ForumApi.getReplyByDiscussion(discussonId, setReplies);
        }
    };

    // Fetch replies when sentReply state changes
    useEffect(() => {
        ForumApi.getReplyByDiscussion(discussonId, setReplies);
    }, [sentReply]);

    // Render the component
    return (
        <div>
            <div className="reply-outer-container">
                {replies.map((reply) => (
                    <div key={reply._id} className="reply-container">
                        {editingReplyId === reply._id ? (
                            // Editing mode
                            <div>
                                <input
                                    type="text"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <button onClick={() => saveEdit(reply._id)}>Save</button>
                            </div>
                        ) : (
                            // Display mode
                            <div>
                                <p className="reply-content">{reply.content}</p>
                                <small className='reply-metadata'>{reply.createdAt}</small>
                                {isAuthor(reply) && (
                                    <div className="edit-delete-buttons">
                                        <button onClick={() => handleEdit(reply._id)}>Edit</button>
                                        <button onClick={() => handleDelete(reply._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {isLoggedIn ? (
                    <div className='reply-input-container'>
                        <textarea className='reply-input' value={textareaValue} onChange={handleTextareaChange}/>
                        <button className='reply-button' onClick={handleSubmit}>Reply</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
