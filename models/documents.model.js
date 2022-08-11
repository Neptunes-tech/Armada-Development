const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const { roles, systems } = require("../utils/constants");
const documentImageBasePath = "uploads/documents";
const documentSchema = new mongoose.Schema({
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
  effectiveDateTime: { type: Date, default: Date.now },
  documentImage: { type: String },
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
module.exports.documentImageBasePath = documentImageBasePath;
