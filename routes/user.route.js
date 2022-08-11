const router = require("express").Router();
const { ensureLoggedOut, ensureLoggedIn } = require("connect-ensure-login");
const User = require("../models/user.model");
const Document = require("../models/documents.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadPath = path.join("public", Document.documentImageBasePath);
const imageMimeTypes = ["images/jpeg", "images/png", "application/pdf"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null);
  },
});

router.get("/documents/add", (req, res) => {
  const person = req.user;
  res.render("docuadd", { person });
});

router.post(
  "/documents/add",
  upload.single("documentImage"),
  async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null;
    const document = new Document({
      title: req.body.title,
      system: req.body.system,
      effectiveDateTime: req.body.effectiveDateTime,
      documentImage: fileName,
    });
    try {
      const newDocument = await document.save;
    } catch {}
    res.redirect("/");
  }
);
module.exports = router;
