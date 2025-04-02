const { DataTypes } = require('sequelize');
const { default: sequelize } = require('../lib/sequalize');
const { Subject } = require('./schemeModel');
// const {sequelize} = require('../lib/sequalize'); // Adjust the path as needed

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true, // ✅ FIX: Auto-increment for BIGINT
        primaryKey: true,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  Subject:{
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Teacher', 
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  programId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Programs", // Refers to the Program model
      key: "id",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duties: {
    type: DataTypes.ARRAY(DataTypes.STRING), // ✅ Store as an array
    allowNull: true,
    defaultValue: [],
  },
  class: {
    type: DataTypes.ARRAY(DataTypes.STRING), // ✅ Store as an array
    allowNull: true,
    defaultValue: [],
  },
  batch:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  section: {
    type: DataTypes.ARRAY(DataTypes.STRING), // ✅ Store as an array
    allowNull: true,
    defaultValue: [],
  },
  // teacherId: { 
  //   type: DataTypes.BIGINT, 
  //   allowNull: false, 
  //   references: { 
  //     model: "Teacher", 
  //     key: "id" 
  //   } 
  // },
}, {
  tableName: 'Teacher',
  timestamps: true,
});

module.exports = Teacher;
