const { mongoose } = require("./connectDB.js");

const userSchema = mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  isCoord: {
    type: Boolean,
    default: false,
    required: true,
  },
  isTeach: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
