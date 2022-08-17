const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const { roles, systems } = require("../utils/constants");

const UserSchema = new mongoose.Schema({
  given: {
    type: String,
    // require: true,
    require: false,
    maxlength: 32,
    trim: true,
  },
  family: { type: String, require: true, maxlength: 32, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  birthDate: { type: Date, require: true },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.doctor, roles.client],
    default: roles.client,
  },
  documents: {
    title: { type: String },
    system: {
      type: String,
      enum: [
        systems.vitals,
        systems.neuro,
        systems.ent,
        systems.resp,
        systems.cardiac,
        systems.abdo,
        systems.msk,
        systems.skin,
      ],
      default: systems.vitals,
    },
    effectiveDateTime: { type: Date, default: Date.now},
    documentImage: { type: String },
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      if (this.email === process.env.ADMIN_EMAIL?.toLowerCase()) {
        this.role = roles.admin;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
