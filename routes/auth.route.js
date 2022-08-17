const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');
const HandyStorage = require('handy-storage');
const storage = new HandyStorage({ beautify: true })


router.get('/login',
  // ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    try {

      return res.render('login')
    }
    catch (e) {
      console.log('e', e)
    }
  }
)

router.get('/register',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('register')
  })

router.post('/login', passport.authenticate('local'),
  async (req, res) => {
    try {
      res.redirect(`/user/?email=${req?.user.email}`)
    } catch (e) {
      console.log('e', e)
    }
  }
);

router.post('/register',
  // ensureLoggedOut({ redirectTo: '/' }), registerValidator,
  // ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg)
        })
        res.render('register', {
          email: req.body.email,
          messages: req.flash(),
        })
        return
      }

      const { email } = req.body
      const doesExist = await User.findOne({ email })
      if (doesExist) {
        // req.flash('warning', 'Username/email already exists')
        res.redirect('/auth/register')
        return
      }
      const user = new User(req.body)
      await user.save()
      // req.flash(
      //   'success',
      //   `${user.email} registered succesfully, you can now login`
      // )
      res.redirect('/auth/login')
    } catch (error) {
      console.log('error', error)
      next(error)
    }
  }
)

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    req.logout()
    res.redirect('/auth/login')
  }
)

module.exports = router

//function ensureAuthenticated(req, res, next) {
//if (req.isAuthenticated()) {
//next();
//} else {
//res.redirect('/auth/login');
//}
//}

//function ensureNOTAuthenticated(req, res, next) {
//if (req.isAuthenticated()) {
//res.redirect('/auth/login');
//} else {
//next();
//}
//}
