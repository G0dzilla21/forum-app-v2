import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopContributors = () => {
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    // Fetch top contributors from your API
    const fetchTopContributors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-overview');
        setTopContributors(response.data.topContributors.map(contrib => contrib.username)); // Extracting the username property
      } catch (error) {
        console.error('Error fetching top contributors:', error.message);
      }
    };

    fetchTopContributors();
  }, []);

  return (
    <div className="widget">
      <h3>Top Contributors</h3>
      <ul>
        {topContributors.map((contributor, index) => (
          <li key={index}>{contributor}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
