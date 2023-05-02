const { mongoose } = require("./connectDB.js");

const studentSchema = mongoose.Schema({
  studentID: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  career: {
    type: String,
    required: true,
  },
});

studentSchema.statics.getStudent = async (filters) => {
  let students = await Student.find(filters);
  console.log(
    "🚀 ~ file: students.js:38 ~ studentSchema.static.getStudent= ~ students:",
    students
  );
  return students;
};

studentSchema.statics.getStudentByID = async (studentID) => {
  let students = await Student.findOne({ studentID });
  console.log(
    "🚀 ~ file: students.js:47 ~ studentSchema.static.getStudentByID= ~ students:",
    students
  );
  return students;
};

studentSchema.statics.createStudent = async (studentData) => {
  let newStudent = Student(studentData);
  console.log(
    "🚀 ~ file: students.js:53 ~ studentSchema.static.createStudent= ~ newStudent:",
    newStudent
  );
  return await newStudent.save();
};

studentSchema.statics.updateStudent = async (studentID, studentData) => {
  let updatedStudent = await Student.findOneAndUpdate(
    { studentID },
    { $set: studentData },
    { new: true }
  );
  console.log(
    "🚀 ~ file: students.js:69 ~ studentSchema.static.updateStudent= ~ updatedStudent:",
    updatedStudent
  );
  return updatedStudent;
};

studentSchema.statics.deleteStudent = async (studentID) => {
  let deletedStudent = await Student.findOneAndDelete({ studentID });
  return deletedStudent;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };

Student.getStudent({});
