const router = require("express").Router();
const { ensureLoggedOut, ensureLoggedIn } = require("connect-ensure-login");
const User = require("../models/user.model");
const Document = require("../models/documents.model");
const Multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadPath = path.join("public", Document.documentImageBasePath);
const imageMimeTypes = ["images/jpeg", "images/png", "application/pdf"];
const { cloudinary } = require('../config')
const { uploadImage } = require('../utils/multer');
const { executionAsyncId } = require("async_hooks");
// const multer = Multer({
//   storage: Multer.memoryStorage()
// })


router.get("/", async (req, res) => {
  try {
    let email = req?.query.email
    let system = req?.query.system
    console.log('email', email)
    console.log('system', system)
    if (system) {

      await Document.find({ userEmail: email, system: system }, async (err, data) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Something Went Wrong!'
          })
        }
        console.log(data)
        res.render('index', {
          path: 'index',
          documents: data,
          email: email
        })
      })
    } else {
      await Document.find({ userEmail: email }, async (err, data) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Something Went Wrong!'
          })
        }
        console.log(data)
        res.render('index', {
          path: 'index',
          documents: data,
          email: email
        })
      })
    }
  } catch (e) {
    return res.send({ success: false, message: 'Something Went Wrong' })
  }
});

router.post("/documents/delete/:id", async (req, res) => {
  try {
    let id = req.params.id
    let email;
    await Document.findOne({ _id: id }, async (err, data) => {
      email = data?.userEmail
    })
    await Document.deleteOne({ _id: id }, async (err, data) => {
      if (err) {
        return res.send({ success: false, message: 'Something Went Wrong!' })
      }
      res.redirect(`/user/${email}`);
      return res.send({ success: true, message: 'Successfully Deleted' })
    })
  } catch (e) {
    console.log('e', e)
    return res.send({ success: false, message: 'Something Went Wrong' })
  }
});

router.get('/addDocs/:email', async (req, res) => {
  let email = req?.params.email
  return res.render('docuadd', {
    path: 'docuadd',
    documents: email
  })
})

router.post("/documents/add/:email", uploadImage().single('file'), async (req, res) => {
  try {
    let email = req.params.email
    const { body } = req
    let fileName = req.file != null ? req.file : null

    cloudinary.uploader.upload(fileName?.path, async (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Something Went Wrong!'
        })
      }

      fileName = result && result?.url
      const document = new Document({
        title: body?.title,
        system: body?.system,
        effectiveDateTime: body?.effectiveDateTime,
        documentImage: fileName,
        userEmail: email
      })

      document.save()
        .then(() => {
          res.redirect(`/user/?email=${email}`);
        }).catch((err) => {
          console.log('ERR', err)
        });
    })
  } catch (e) {
    return res.send({ success: false, message: 'Something Went Wrong' })
  }

}
);


module.exports = router;
