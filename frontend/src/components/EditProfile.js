import React, { useState, useEffect } from 'react';
import UserApi from '../api/UserApi';


const EditProfile = () => {
  const [userData, setUserData] = useState({
    displayName: '',
    nickname: '',
    email: '',
    title: '',
    userGroup: '',
    avatar: null,
    website: '',
    socialNetworks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
    location: '',
    timezone: '',
    occupation: '',
    signature: '',
    aboutMe: '',
  });

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, avatar: file });
  };

  const handleSocialNetworkChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      socialNetworks: {
        ...userData.socialNetworks,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserApi.updateProfile(userData);
  };
  
  useEffect(() => {
    // Fetch the user's profile data when the component mounts
    UserApi.getUserProfile()
      .then((response) => {
        // Update the state with the retrieved user data
        setUserData({
          displayName: response.data.displayName,
          nickname: response.data.nickname,
          email: response.data.email,
          title: response.data.title,
          userGroup: response.data.userGroup,
          avatar: null, // Update with the actual avatar data
          website: response.data.website,
          socialNetworks: {
            facebook: response.data.socialNetworks.facebook,
            twitter: response.data.socialNetworks.twitter,
            linkedin: response.data.socialNetworks.linkedin,
            instagram: response.data.socialNetworks.instagram,
          },
          location: response.data.location,
          timezone: response.data.timezone,
          occupation: response.data.occupation,
          signature: response.data.signature,
          aboutMe: response.data.aboutMe,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);



  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Change Avatar:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
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
            value={userData.socialNetworks.facebook}
            onChange={(e) => handleSocialNetworkChange('facebook', e)}
          />
        </div>
        <div>
          <label>Twitter:</label>
          <input
            type="url"
            name="twitter"
            value={userData.socialNetworks.twitter}
            onChange={(e) => handleSocialNetworkChange('twitter', e)}
          />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            value={userData.socialNetworks.linkedin}
            onChange={(e) => handleSocialNetworkChange('linkedin', e)}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="url"
            name="instagram"
            value={userData.socialNetworks.instagram}
            onChange={(e) => handleSocialNetworkChange('instagram', e)}
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
          <input
            type="text"
            name="timezone"
            value={userData.timezone}
            onChange={handleInputChange}
          />
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
