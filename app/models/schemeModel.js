const { DataTypes } = require("sequelize");
const { default: sequelize } = require("../lib/sequalize");
const User = require("./deptAdmin");
const Teacher = require("./teacherModel");
// const Teacher = require("./teacher-model")

/** Program Model (e.g., MCA, B.Tech) */
const Program = sequelize.define("Program", {
  id: { type: DataTypes.UUID,     defaultValue: DataTypes.UUIDV4,    primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // MCA, B.Tech, etc.
});

/** Batch Model (Each batch follows a program) */
const Batch = sequelize.define("Batch", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }, // Example: 2024-2025
  totalSemesters: { type: DataTypes.INTEGER, allowNull: false }, // 2, 4, 6, 8
});

/** Semester Model (Each batch has multiple semesters) */
const Semester = sequelize.define("Semester", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false }, // 1, 2, 3, etc.
});

/** Subject Model (Each semester has multiple subjects) */
const Subject = sequelize.define("Subject", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courseCode: { type: DataTypes.STRING, allowNull: false },
  totalMarks: { type: DataTypes.INTEGER, allowNull: false },
  internal: { type: DataTypes.INTEGER, allowNull: false },
  external: { type: DataTypes.INTEGER, allowNull: false },
  practicals: { type: DataTypes.STRING, allowNull: true },
  credits: { type: DataTypes.INTEGER, allowNull: false },
  lectures: { type: DataTypes.INTEGER, allowNull: false },
  courseOutcome: { type: DataTypes.TEXT, allowNull: true },
  electives: { type: DataTypes.BOOLEAN, defaultValue: false },
});

  // User creates multiple programs
User.hasMany(Program, { foreignKey: "userId", onDelete: "CASCADE" });
Program.belongsTo(User, { foreignKey: "userId" });

Program.hasMany(Teacher, { foreignKey: "programId", onDelete: "CASCADE" });
Teacher.belongsTo(Program, { foreignKey: "programId" });

Teacher.hasMany(Subject, { foreignKey: "teacherId", onDelete: "CASCADE" });
Subject.belongsTo(Teacher, { foreignKey: "teacherId" });

// A Program has multiple Batches
Program.hasMany(Batch, { foreignKey: "programId", onDelete: "CASCADE" });
Batch.belongsTo(Program, { foreignKey: "programId" });

// A Batch has multiple Semesters
Batch.hasMany(Semester, { foreignKey: "batchId", onDelete: "CASCADE" });
Semester.belongsTo(Batch, { foreignKey: "batchId" });

// A Semester has multiple Subjects
Semester.hasMany(Subject, { foreignKey: "semesterId", onDelete: "CASCADE" });
Subject.belongsTo(Semester, { foreignKey: "semesterId" });

module.exports = { Program, Batch, Semester, Subject }