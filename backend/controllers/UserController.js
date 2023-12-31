const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserController = {

    
    getUserByUsername: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                console.log("!user");
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Generate a JWT token for authenticated users
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.json({ message: 'Login successful!', token });
            } else {
                console.log("there is an error")
                res.status(401).json({ error: 'Invalid credentials' });
            }
          
        } catch (error) {
            console.error("Error in login: ", error);
            res.status(500).json({ error: 'Error in login' });
        }
    },

    createUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const alreadyExists = await User.findOne({ username });

            if (alreadyExists) {
                return res.status(400).json({ error: "Username is already taken" });
            }

            // Hash the password before saving it in the database
            // const hashedPassword = await bcrypt.hash(password, 10);
            
            // const user = new User({ username, password: hashedPassword });
            const user = new User({ username, password });
            await user.save();
            res.json({ message: 'Signup successful!' });
        } catch (error) {
            console.error("Error in signup: ", error);
            res.status(500).json({ error: 'Error in signup' });
        }
    },

    updateUserProfile: async (req, res) => {
      try {
        const {
          displayName,
          nickname,
          email,
          title,
          userGroup,
          avatar,
          website,
          facebook,    
          twitter,     
          linkedin,
          instagram,
          location,
          timezone,
          occupation,
          signature,
          aboutMe,
          currentPassword, 
          newPassword,     
        } = req.body;
    
        // Get the JWT token from the request headers
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        if (!token) {
          return res.status(403).json({ error: 'Token not provided' });
        }
    
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid token' });
          }
    
          // Extract the user ID from the decoded token
          const userId = decoded.userId;
    
          // Fetch the user from the database
          const user = await User.findById(userId);
    
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }    
          
          if (currentPassword) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatch) {
              return res.status(401).json({ error: 'Incorrect current password' });
            }
          }

          if (newPassword) {
            user.password = newPassword;
          }

          // Update the user's profile fields
          user.displayName = displayName;
          user.nickname = nickname;
          user.email = email;
          user.title = title;
          user.userGroup = userGroup;
          user.avatar = avatar;
          user.website = website;
          user.facebook = facebook;
          user.twitter = twitter;
          user.linkedin = linkedin;
          user.instagram = instagram;
          user.location = location;
          user.timezone = timezone;
          user.occupation = occupation;
          user.signature = signature;
          user.aboutMe = aboutMe;
    
          await user.save();
    
          res.json({ message: 'Profile updated successfully' });
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred while updating your profile' });
      }
    },
  

    getUserProfile: async (req, res) => {
      try {
        // Get the JWT token from the request headers
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        console.log(token);
        if (!token) {
          return res.status(403).json({ error: 'Token not provided' });
        }
        
        // Verify and decode the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid token' });
          }
    
          // Extract the user ID from the decoded token
          const userId = decoded.userId;
          
          // Now you have the user's ID, and you can use it to fetch the user's profile
          const user = await User.findById(userId);
    
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          res.json(user);
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Error fetching user profile' });
      }
    },
    getRecentUsers: async () => {
      try{
      return await User.find().sort({ _id: -1 }).limit(5);
      } catch (error){
        console.error("Couldn't get recent users:", error);
      }
    }

    
}

module.exports = UserController;
