// Home.js
import React from 'react';
import RecentPosts from '../components/RecentPosts'; // Assuming you have a component for recent posts
import NewestUsers from '../components/NewestUsers';
import TopContributors from '../components/TopContributors';
import PopularTopics from '../components/PopularTopics';
import '../css/home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-sidebar">
        <NewestUsers />
        <br></br>
        <TopContributors />
      </div>

      <div className="main-content">
        <div className="welcome-section">
          <h1>Welcome to the Forum!</h1>
        </div>

        <div className="recent-posts-section">
          <h2>Recent Posts</h2>
          <RecentPosts />
          
        </div>

        {/* Add more sections or blocks as needed */}
      </div>

      <div className="right-sidebar">
        <PopularTopics />
      </div>
    </div>
  );
};

export default Home;
