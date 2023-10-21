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
        <section className="recent-post">
          
            <div key={post.id} className="post section">
              <h3>{post.title}</h3>
              <p>{post.content} </p>
              
              <div className="timestamp">
                <p>CreatedAt:<br></br>{post.createdAt}</p>
              </div>
            </div>
            
          
        </section>
      ))}
    </div>
  );
};

export default RecentPosts;