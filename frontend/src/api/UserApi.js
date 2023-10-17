import axios from "axios";

const URI = process.env.REACT_APP_BACKEND_URI;
const UserApi = {


    loginUser: async (credentials, setIsLoggedIn) => {
        try {
            // Make a request to your backend to validate credentials
            const response = await axios.post('http://localhost:5000/api/login', credentials);
      
            setIsLoggedIn(true);  // Update the state to indicate that the user is logged in
            sessionStorage.setItem('token', response.data.token);
            alert(response.data.message);
          } catch (error) {
            console.error('Error in login:', error);
            alert(error.response.data.error);
            // Handle the error, e.g., show an error message to the user
          }
    },

    createUser: async (credentials) => {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', credentials);
        if (response) {
          // Access response data here
          alert(response.data.message);
        }
      } catch (error) {
        // Handle error
        console.error('Error in signup:', error);
        alert(error.response.data.error);
      }
    },

    updateProfile: async (profileData) => {
      try {
        let token = sessionStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token not found in session storage');
        }
        
        // Log the token to verify it
        console.log(token);
    
        const response = await axios.post('http://localhost:5000/api/updateProfile', profileData, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
    
        if (response.status === 200) {
          alert('Profile updated successfully!');
        } else {
          alert('Profile update failed.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
      }
    }
  };


export default UserApi;