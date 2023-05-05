const { mongoose } = require("./connectDB.js");

const teacherSchema = mongoose.Schema({
  teacherID: {
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
  birthDate: {
    type: Number,
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
  isCoord:{
    type: Boolean,
    default: false,
    required: true,
  }
});

teacherSchema.statics.getTeacher = async (filters) => {
  let teachers = await Teacher.find(filters);
  console.log(
    "🚀 ~ file: teacher.js:38 ~ teacherSchema.statics.getTeacher= ~ teachers: \n" +
      teachers
  );

  return teachers;
};

teacherSchema.statics.getTeacherByID = async (teacherID) => {
  let teachers = await Teacher.findOne({ teacherID });
  console.log(
    "🚀 ~ file: teacher.js:47 ~ teacherSchema.static.getTeacherByID= ~ teachers:",
    teachers
  );
  return teachers;
};

teacherSchema.statics.createTeacher = async (teacherData) => {
  let newTeacher = Teacher(teacherData);
  console.log(
    "🚀 ~ file: teacher.js:53 ~ teacherSchema.static.createTeacher= ~ newTeacher:",
    newTeacher
  );
  return await newTeacher.save();
};

teacherSchema.statics.updateTeacher = async (teacherID, teacherData) => {
  let updatedTeacher = await Teacher.findOneAndUpdate(
    { teacherID },
    { $set: teacherData },
    { new: true }
  );
  console.log(
    "🚀 ~ file: teacher.js:69 ~ teacherSchema.static.updateTeacher= ~ updatedTeacher:",
    updatedTeacher
  );
  return updatedTeacher;
};

teacherSchema.statics.deleteTeacher = async (teacherID) => {
  let deletedTeacher = await Teacher.findOneAndDelete({ teacherID });
  return deletedTeacher;
};

const Teacher = mongoose.model("Teacher", teacherSchema);

/* Teacher.getTeacher({}); */

module.exports = { Teacher };
