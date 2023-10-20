import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewestUsers = () => {
  const [newestUsers, setNewestUsers] = useState([]);

  useEffect(() => {
    // Fetch newest users from your API
    const fetchNewestUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-overview');
        setNewestUsers(response.data.recentUsers);
      } catch (error) {
        console.error('Error fetching newest users:', error.message);
      }
    };

    fetchNewestUsers();
  }, []);

  return (
    <div className="widget">
      <h3>Newest Users</h3>
      <ul>
      {newestUsers.map((user, index) => (
        <li key={user._id}>{user.username}</li>
      ))}
      </ul>
    </div>
  );
};

export default NewestUsers;
