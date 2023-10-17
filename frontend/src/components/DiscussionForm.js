import React, { useState, useEffect } from 'react';
import '../css/DiscussionForm.css'; // Import your CSS file

const DiscussionForm = ({ onSubmit, discussion }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (discussion) {
      setTitle(discussion.title);
      setContent(discussion.content);
    }
  }, [discussion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <div className="discussion-form-container">
      <form onSubmit={handleSubmit} className="discussion-form">
        <label className="form-label">
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </label>
        <label className="form-label">
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-textarea" />
        </label>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default DiscussionForm;
