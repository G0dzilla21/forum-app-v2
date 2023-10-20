import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularTopics = () => {
  const [popularTopics, setPopularTopics] = useState([]);

  useEffect(() => {
    // Fetch popular topics from your API
    const fetchPopularTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-overview');
        setPopularTopics(response.data.popularTopics);
      } catch (error) {
        console.error('Error fetching popular topics:', error.message);
      }
    };

    fetchPopularTopics();
  }, []);

  return (
    <div className="widget">
      <h3>Popular Topics</h3>
      <ul>
        {popularTopics.map((topic, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTopics;
