const { DataTypes } = require("sequelize");
const { default: sequalize, default: sequelize } = require("../lib/sequalize");
const User = require("./deptAdmin");

const Scheme = sequelize.define("Scheme", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }, // MCA, B.Tech, etc.
  });
  
  const Batch = sequelize.define("Batch", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    year: { type: DataTypes.INTEGER, allowNull: false }, // Example: 2024
  });
  
  const Semester = sequelize.define("Semester", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }, // Example: Semester 1, Semester 2
  });
  
  const Subject = sequelize.define("Subject", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    courseCode: { type: DataTypes.STRING, allowNull: false },
    totalMarks: { type: DataTypes.INTEGER, allowNull: false },
    internal: { type: DataTypes.INTEGER, allowNull: false },
    external: { type: DataTypes.INTEGER, allowNull: false },
    practicals: { type: DataTypes.INTEGER, allowNull: true },
    credits: { type: DataTypes.INTEGER, allowNull: false },
    lectures: { type: DataTypes.INTEGER, allowNull: false },
    courseOutcome: { type: DataTypes.TEXT, allowNull: true },
    electives: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  User.hasMany(Batch, {foreignKey: 'userId', onDelete:'CASCADE'}) // user can have many batches 
  Batch.belongsTo(User,{foreignKey:'userId'}) //each batch belongs to the user 

  Scheme.hasMany(Batch,{foreignKey: "schemeId", onDelete: "CASCADE" }) // One scheme will have many batches 
  Batch.belongsTo(Scheme,{foreignKey:'schemeId'}) // Each batch belongs to the scheme

  Batch.hasMany(Semester,{foreignKey:'batchId', onDelete: "CASCADE"})// batch will have many semesters
  Semester.belongsTo(Batch,{foreignKey:'batchId'}) // each semester belongs to a batch 

  Semester.hasMany(Subject, { foreignKey: "semesterId", onDelete: "CASCADE" }); // each semester has many subjects
Subject.belongsTo(Semester,{foreignKey:'semesterId'}) // each subjects belongs to a semester
