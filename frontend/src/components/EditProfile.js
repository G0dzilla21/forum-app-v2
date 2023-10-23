import React, { useState, useEffect } from 'react';
import UserApi from '../api/UserApi';
import defaultAvatar from '../assets/default-avatar.jpg';
import '../css/EditProfile.css';

const avatarImages = [
  'avatar1.jpg',
  'avatar2.jpg',
  'avatar3.jpg',
  'avatar4.jpg',
  'avatar5.jpg',
  'avatar6.jpg',
];


const EditProfile = () => {
  const [userData, setUserData] = useState({
    displayName: '',
    nickname: '',
    email: '',
    title: '',
    userGroup: '',
    avatar: '',
    website: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    location: '',
    timezone: '',
    occupation: '',
    signature: '',
    aboutMe: '',
  });

  const commonTimezones = [
    'Etc/UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'America/Toronto',
    'America/Vancouver',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Dubai',
    'Asia/Singapore',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'America/Mexico_City',
    'America/Buenos_Aires',
    'Pacific/Honolulu',
    'Pacific/Auckland',
    'Asia/Kolkata',
    'Etc/GMT',
  ];  

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const selectedAvatarIndex = parseInt(e.target.value, 10);
    if (!isNaN(selectedAvatarIndex) && selectedAvatarIndex >= 0 && selectedAvatarIndex < avatarImages.length) {
      const selectedAvatar = avatarImages[selectedAvatarIndex];
      const s3Url = `https://forum-app-bucket.s3.us-east-2.amazonaws.com/${selectedAvatar}`;
      setUserData({ ...userData, avatar: s3Url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserApi.updateProfile({ ...userData, ...passwordChange });
  };
  
  useEffect(() => {
    // Fetch the user profile when the component mounts
    UserApi.getUserProfile()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error fetching user profile:', error);
      });
  }, []);



  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {userData.avatar ? (
        <div>
          <img
            src={userData.avatar} // Use the avatar URL directly
            alt="User Avatar"
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      ) : (
        <div>
          <img
            src={defaultAvatar} // Display the default avatar
            alt="Default Avatar"
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            name="displayName"
            value={userData.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={userData.nickname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={userData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>User Group:</label>
          <input
            type="text"
            name="userGroup"
            value={userData.userGroup}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Choose Avatar:</label>
          <div>
            {avatarImages.map((avatar, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="avatar"
                  value={index} 
                  checked={userData.avatar === `https://forum-app-bucket.s3.us-east-2.amazonaws.com/${avatar}`}
                  onChange={handleAvatarChange}
                />
                <img src={`https://forum-app-bucket.s3.us-east-2.amazonaws.com/${avatar}`} alt={`Avatar ${index + 1}`} style={{ width: '50px', height: '50px' }} />
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Website:</label>
          <input
            type="url"
            name="website"
            value={userData.website}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Facebook:</label>
          <input
            type="url"
            name="facebook"
            value={userData.facebook}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Twitter:</label>
          <input
            type="url"
            name="twitter"
            value={userData.twitter}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            value={userData.linkedin}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="url"
            name="instagram"
            value={userData.instagram}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={userData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Timezone:</label>
          <select
            name="timezone"
            value={userData.timezone}
            onChange={handleInputChange}
          >
            <option value="">Select Timezone</option>
            {commonTimezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={userData.occupation}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Signature:</label>
          <input
            type="text"
            name="signature"
            value={userData.signature}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>About Me:</label>
          <textarea
            name="aboutMe"
            value={userData.aboutMe}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordChange.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordChange.newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
