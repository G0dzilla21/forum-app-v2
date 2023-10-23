import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch recent posts from your API
    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-overview');
        setPosts(response.data.recentDiscussions); 
      } catch (error) {
        console.error('Error fetching recent posts:', error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <section className="recent-post" key={post.id}>
        <div className="post section">
          <div className="post-header">
            <p></p>
            <h3 className="post-title">{post.title}</h3>
            
          </div>
          <p className="post-content">{post.content}</p>
          <div className="timestamp">
              <p>Created at:<br />{post.createdAt}</p>
            </div>
        </div>
      </section>
      ))}
    </div>
  );
};

export default RecentPosts;