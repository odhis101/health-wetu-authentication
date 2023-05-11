import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  yearOfMake: {
    type: Number,
    required: true
  },
  insuranceProvider: {
    type: String,
    required: true
  },
  authorized: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
    password: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: false,
    unique: true
    }



});

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
export default Ambulance;
