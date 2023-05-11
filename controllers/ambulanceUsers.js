import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Ambulance from '../models/ambulanceModel.js';

// Function to generate JWT token
// Sign up ambulance
const signup = async (req, res) => {
      try {
        const {
            licensePlate,
            make,
            model,
            year,
            insuranceProvider,
            phoneNumber,
            password,
            email,
            yearOfMake,

          } = req.body;
        // Check if ambulance already exists
        let ambulance = await Ambulance.findOne({ phoneNumber });
        if (ambulance) {
          return res.status(400).json({ message: "Ambulance already exists" });
        }
    
        // Create new ambulance
        ambulance = new Ambulance({
          licensePlate,
          make,
          model,
          year,
          insuranceProvider,
          phoneNumber,
          password,
          email,
          yearOfMake
        });
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        ambulance.password = await bcrypt.hash(password, salt);
    
        // Save ambulance
        await ambulance.save();
    
        // Generate JWT token
        const token = jwt.sign(
          { ambulanceId: ambulance.id, phoneNumber: ambulance.phoneNumber },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        res.status(201).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    };    
    
    
    
    
    
    
  const getAmbulanceById = async (req, res) => {
    const { id } = req.params;
    try {
      const ambulance = await Ambulance.findById(id);
      if (!ambulance) {
        return res.status(404).json({ message: 'Ambulance not found' });
      }
      // return ambulance details
      return res.status(200).json({ ambulance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  // Log in ambulance
  const login = async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;


      // Check if ambulance exists
      const ambulance = await Ambulance.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
      });
      if (!ambulance) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, ambulance.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if ambulance is authorized
      if (!ambulance.authorized) {
        return res.status(401).json({ message: 'Ambulance not authorized' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { ambulanceId: ambulance.id, email: ambulance.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  export { signup, login, getAmbulanceById };
