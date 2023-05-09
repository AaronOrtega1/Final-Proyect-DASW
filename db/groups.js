const { mongoose } = require("./connectDB.js");
const { Teacher } = require("./teacher.js");

const groupSchema = mongoose.Schema({
  groupID: {
    type: String,
    unique: true,
    required: true,
  },
  group: {
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
  students: {
    type: Array,
    required: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  period: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
});

groupSchema.statics.getGroup = async (filters) => {
  let groups = await Groups.find(filters);
  console.log(
    "🚀 ~ file: groups.js:34 ~ groupSchema.static.getGroup= ~ groups:",
    groups
  );
  return groups;
};

groupSchema.statics.getGroupByID = async (groupID) => {
  let groups = await Groups.findOne({ groupID });
  console.log(
    "🚀 ~ file: groups.js:42 ~ groupSchema.static.getGroupByID= ~ groups:",
    groups
  );
  return groups;
};

groupSchema.statics.createGroup = async (groupData) => {
  let newGroup = Groups(groupData);
  console.log(
    "🚀 ~ file: groups.js:50 ~ groupSchema.static.createGroup= ~ newGroup:",
    newGroup
  );
  return await newGroup.save();
};

groupSchema.statics.updateGroup = async (groupID, groupData) => {
  let updatedGroup = await Groups.findOneAndUpdate(
    { groupID },
    { $set: groupData },
    { new: true }
  );
  console.log(
    "🚀 ~ file: groups.js:65 ~ groupSchema.static.updateGroup= ~ updatedGroup:",
    updatedGroup
  );
  return updatedTeacher;
};

groupSchema.statics.deleteGroup = async (groupID) => {
  let deletedGroup = await Groups.findOneAndDelete({ groupID });
  console.log(
    "🚀 ~ file: groups.js:72 ~ groupSchema.static.deleteGroup ~ deletedGroup:",
    deletedGroup
  );
  return deletedGroup;
};

const Groups = mongoose.model("Groups", groupSchema);

module.exports = { Groups };

/* Groups.getGroup({}); */
