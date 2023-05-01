const { mongoose } = require("./connectDB.js");

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
    type: String,
    required: true,
  },
});

groupSchema.static.getGroup = async (filters) => {
  let groups = await Groups.find(filters);
  console.log(
    "🚀 ~ file: groups.js:34 ~ groupSchema.static.getGroup= ~ groups:",
    groups
  );
  return groups;
};

groupSchema.static.getGroupByID = async (groupID) => {
  let groups = await Groups.findOne({ groupID });
  console.log(
    "🚀 ~ file: groups.js:42 ~ groupSchema.static.getGroupByID= ~ groups:",
    groups
  );
  return groups;
};

groupSchema.static.createGroup = async (groupData) => {
  let newGroup = Groups(groupData);
  console.log(
    "🚀 ~ file: groups.js:50 ~ groupSchema.static.createGroup= ~ newGroup:",
    newGroup
  );
  return newGroup;
};

groupSchema.static.updateGroup = async (groupID, groupData) => {
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

groupSchema.static.deleteGroup = async (groupID) => {
  let deletedGroup = await Groups.findOneAndDelete({ groupID });
  console.log(
    "🚀 ~ file: groups.js:72 ~ groupSchema.static.deleteGroup ~ deletedGroup:",
    deletedGroup
  );
  return deletedGroup;
};

const Groups = mongoose.model("Groups", groupSchema);

module.exports = { Groups };
