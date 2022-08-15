const router = require('express').Router();
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');

// router.get('/',ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
// const person = req.user;
//   res.render('index.ejs', { person });
// });

// //Edit User Settings
// router.get('/settings',ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
// const person = req.user;
//   res.render('settings.ejs', { person });
// });

// router.post('/settings',ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
// const person = req.user;

// });

router.get('/test', () => {
  res.send({ success: true, message: 'HELLO ' })
})

module.exports = router;
