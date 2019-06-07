const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./serialize_deserialize');
const { isEmptyObject } = require('../../api/helpers/helpers');
const dbcon = require('../../db/dbcon');

const option = {
  passReqToCallback: true,
};

function findUser(username, password, cb) {
  const query = `SELECT idusuario, nombre_u, apellido_u, idundg, correo, 
                  (SELECT password = $2 from usuario where idusuario = $1) AS validPass 
                  FROM usuario 
                 WHERE 
                  idusuario = $1;`;
  const values = [username, password];
  dbcon.query(query, values, cb);
}

init();

passport.use(new LocalStrategy(option, (req, username, password, done) => {
  findUser(username, password, (err, userData) => {
    if (err) {
      console.log('error on passportConfig.js LocalStrategy', err);
      throw done(err);
    } else {
      if (isEmptyObject(userData.rows[0])) {
        return done(null, false, req.flash('info', 'user not found'));
      }
      if (!userData.rows[0].validpass) {
        return done(null, false, req.flash('info', 'password is incorrect'));
      }
      return done(null, userData.rows[0]);
    }
  });
}));

module.exports = passport;
