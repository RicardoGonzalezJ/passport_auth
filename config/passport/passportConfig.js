const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./serialize_deserialize');
const dbcon = require('../../db/dbcon');

const option = {};

function findUser(username, password, cb) {
  const query = `SELECT idusuario, nombre_u, apellido_u, idundg, correo
                  FROM usuario 
                 WHERE 
                  idusuario = $1 AND password = $2;`;
  const values = [username, password];
  dbcon.query(query, values, cb);
}

init();

passport.use(new LocalStrategy(option, (username, password, done) => {
  findUser(username, password, (err, userData) => {
    if (err) {
      console.log('error on passportConfig.js LocalStrategy', err);
      throw done(err);
    } else {
      if (!userData) return done(null, false);
      if (!password) {
        return done(null, false);
      }
      return done(null, userData.rows);
    }
  });
}));

module.exports = passport;
