/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { Router } = require('express');

const passport = require('../../config/passport/passportConfig');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send(
    `<h1>Users Page</h1>
     <ul>
      <li><a href="/users/login">Login</a></li>
     </ul>`,
  );
});

router.get('/login', (req, res) => {
  res.status(200).send(
    `<h1>Users Login</h1>
    <form action="/users/login" method="post">
      <div>
          <label>Username:</label>
          <input type="text" name="username"/>
      </div>
      <div>
          <label>Password:</label>
          <input type="password" name="password"/>
      </div>
      <div>
          <input type="submit" value="Log In"/>
      </div>
    </form>`,
  );
});

router.post('/login', (req, res, next) => {
  // const { username, password } = req.body;
  passport.authenticate('local', (err, user, info) => {
    if (err) { console.log('error on userController.js post /login err', err); return err; }
    if (!user) { return res.redirect('/users/login'); }
    req.logIn(user, (logInErr) => {
      if (logInErr) { console.log('error on userController.js post /login logInErr', logInErr); return logInErr; }
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

module.exports = router;
