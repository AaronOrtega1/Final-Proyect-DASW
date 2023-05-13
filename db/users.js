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
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
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

userSchema.statics.getUserByID = async (userID) => {
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

userSchema.statics.createUser = async (userData) => {
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
//Por alguna razon no me daba con la funcion de arriba asi qe tuve que implementar esta en users-route
userSchema.statics.updateUserById = async (userID, userData) => {
  let updatedUser = await User.findOneAndUpdate(
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

//De nuevo tuve que crear este porque el otro no me da, tambien se implementa en users-rout
userSchema.statics.deleteUserById = async (userID) => {
  let deletedUser = await User.findOneAndDelete({ userID });
  console.log(
    "🚀 ~ file: users.js:97 ~ userSchema.statics.deleteUser ~ deletedUser:",
    deletedUser
  );
  return deletedUser;
};

const User = mongoose.model("User", userSchema);
// User.updateUserById("ktsz_kPIgivokRSGzOy4E",{
//   userID: "borrar",
//   fullName: "Juan Perez con sss",
//   department: "Sistemas",
//   status: true,
//   userName: "jpejelagarto",
//   passWord: "1234",
//   isCoord: false,
//   isTeach: true,
//   email: "jperez@iteso.mx"
// })

User.getUser();
module.exports = { User };
