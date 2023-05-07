
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      $or: [{ email: id }, { phoneNumber: id }]
    });     
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // return user details
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Controller function for user signup
const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;
    console.log(req.body)

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    // we need the name 
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    // check if phone number is in db 


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in the database
    user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for user login
const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    console.log(req.body)

    // Check if user exists
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
    });    
    console.log(user)
    if (!user) {
 
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    console.log('login')
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export { signup, login,getUserById };
