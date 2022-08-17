const router = require('express').Router();
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  res.render('header.ejs')
// const person = req.user;
// console.log('person',person)
  // res.render('index.ejs', { person });
});

// //Edit User Settings
// router.get('/settings',ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
// const person = req.user;
//   res.render('settings.ejs', { person });
// });

// router.post('/settings',ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
// const person = req.user;

// });

module.exports = router;
