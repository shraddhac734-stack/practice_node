const db = require("../configs/dbConfig");
const { DataTypes, ENUM } = require("sequelize");
const { UserRoleTypeList } = require("../enum/userRoleType");
const {genderType}= require("../enum/gender");
const {StatusUser}= require("../enum/userStatus");
const bcrypt = require("bcrypt");

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    initialLetter: {
      type: DataTypes.STRING(2),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(genderType),
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(StatusUser),
      allowNull: false,
      defaultValue:("ACTIVE"),
    },
    roles: {
      type: DataTypes.ENUM(UserRoleTypeList),
      allowNull: false,
      defaultValue:("USER"),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    softDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
},
  },
  {
    hooks: {
      beforeCreate:async  (user) => {
        user.fullName = getFullName(user);
        user.initialLetter=getInitial(user);
        await hashPass(user);
      },
      beforeUpdate: async (user)=>{
        user.fullName = getFullName(user);
        user.initialLetter=getInitial(user);

        await updatePass(user);
      },
}
    },
);

function getFullName(user) {
  return [user.firstName, user.middleName, user.lastName]
  .filter((name) => name && name.trim() !== "",)
  .join(" ");
}

function getInitial(user){
  return (
    (user.firstName?.[0]||"")+
    (user.lastName?.[0]||"")
  ).toUpperCase();
}

async function updatePass (user) {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }

async function hashPass(user) {
  if (user.password) {
   return user.password = await bcrypt.hash(user.password, 10);   
  }
}

module.exports = User;
