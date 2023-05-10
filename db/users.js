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

userSchema.statics.getUser = async (filters) => {
  let user = await User.find(filters);
  console.log(
    "🚀 ~ file: users.js:48 ~ userSchema.statics.getUser= ~ user:",
    user
  );
  return user;
};

teacherSchema.statics.getUserByID = async (userID) => {
  let user = await User.findOne({ userID });
  console.log(
    "🚀 ~ file: users.js:54 ~ teacherSchema.statics.getUserByID= ~ user:",
    user
  );
  return user;
};

userSchema.statics.getUserByUserName = async (userName) => {
  let user = await User.findOne({ userName });
  console.log(
    "🚀 ~ file: users.js:66 ~ userSchema.statics.getUserByUserName= ~ user:",
    user
  );
  return user;
};

userSchema.statics.createTeacher = async (userData) => {
  let newUser = User(userData);
  console.log(
    "🚀 ~ file: users.js:72 ~ userSchema.statics.createTeacher= ~ newUser:",
    newUser
  );
  return await newUser.save();
};

userSchema.statics.updateUser = async (userID, userData) => {
  let updatedUser = await User.findByIdAndUpdate(
    { userID },
    { $set: userData },
    { new: true }
  );
  console.log(
    "🚀 ~ file: users.js:82 ~ userSchema.statics.updateUser= ~ updatedUser:",
    updatedUser
  );
  return updatedUser;
};

userSchema.statics.deleteUser = async (userID) => {
  let deletedUser = await User.findByIdAndDelete({ userID });
  console.log(
    "🚀 ~ file: users.js:97 ~ userSchema.statics.deleteUser ~ deletedUser:",
    deletedUser
  );
  return deletedUser;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
