/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { Router } = require('express');

const passport = require('../../config/passport/passportConfig');
const { isAuthenticated, deleteSession } = require('../helpers/helpers');

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
  res.status(200).send(
    `<h1>Users Page</h1>
     <ul>
      <li><a href="/users/login">Login</a></li>
     </ul>`,
  );
});

router.get('/login', (req, res) => {
  console.log('fOne from /users/login', req.flash('info'));
  res.status(200).send(
    `<h1>Users Login</h1>
      <h6>Error: ${req.flash('info')} </h6>
      <form action="/users/login" method="post">
        <div>
            <label>Username:</label>
            <input type="text" name="username" required/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password" required/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
      </form>`,
  );
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      console.log('error on userController.js post /login err', err);
      return err;
    }
    if (!user) {
      req.flash('info');
      return res.redirect('/users/login');
    }
    req.logIn(user, (logInErr) => {
      if (logInErr) {
        console.log('error on userController.js post /login logInErr', logInErr); return logInErr;
      }
      // return res.status(200).json(user[0]);
      req.flash('info', 'Bienvenido');
      req.session.save(() => res.redirect('/'));
    });
  })(req, res, next);
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(() => {
    deleteSession(req.sessionID, (err, itemDeleted) => {
      if (err) {
        console.log('err deleteSession userController.js', err);
        throw err;
      } else {
        console.log(`Session was ${itemDeleted.command.toLowerCase()} successfully`);
        res.redirect('/users/login');
      }
    });
  });
});

router.get('/info', isAuthenticated, (req, res) => {
  res.status(200).send(
    `<h1>this is users info</h1>
     <ul>
     <li>userID: ${req.user.idusuario}</li>
     <li>Name: ${req.user.nombre_u}</li>
     <li>Last Name: ${req.user.apellido_u}</li>
     <li>unitID: ${req.user.idundg}</li>
     <li>Email: ${req.user.correo}</li>
     <li>Email: ${req.sessionID}</li>
     </ul>`,
  );
});
module.exports = router;
