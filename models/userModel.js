import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  medicalHistory: [{
    condition: {
      type: String,
     default: undefined,
    },
    diagnosisDate: {
      type: Date,
     default: undefined,
    },
    treatment: {
      type: String,
     default: undefined,
    }
  }],
  emergencyContacts: [{
    name: {
      type: String,
     default: undefined,
    },
    phoneNumber: {
      type: String,
     default: undefined,
    },
  }]
});

const User = mongoose.model('User', userSchema);

export default User;
